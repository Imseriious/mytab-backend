const axios = require("axios");
const xml2js = require("xml2js");
const { newsSources } = require("./newsSources");
const getFaviconFromUrl = require("../utils/getFaviconFromUrl");

function cleanText(text) {
  if (!text) return "Unknown";
  if (typeof text !== "string") return "Unknown";

  return text
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/\r\n|\r|\n/g, " ") // Replace newlines with spaces
    .replace(/&rsquo;/g, "'") // Replace special HTML entities
    .replace(/&[a-z]+;/g, "") // Remove other HTML entities
    .trim(); // Trim whitespace
}

const getMedia = async (item, sourceUrl) => {
  let mediaUrl;
  if (
    item["media:content"] &&
    item["media:content"][0] &&
    item["media:content"][0].$.url
  ) {
    mediaUrl = item["media:content"][0].$.url;
  } else if (
    item["media:thumbnail"] &&
    item["media:thumbnail"][0] &&
    item["media:thumbnail"][0].$.url
  ) {
    mediaUrl = item["media:thumbnail"][0].$.url;
  } else if (item.enclosure && item.enclosure[0] && item.enclosure[0].$.url) {
    mediaUrl = item.enclosure[0].$.url;
  } else if (item["content:encoded"]) {
    const contentEncoded = item["content:encoded"][0];
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(contentEncoded);

    if (match && match[1]) {
      mediaUrl = match[1];
    }
  }

  if (item.description && item.description[0]) {
    let descriptionContent = item.description[0];

    // Check if description is enclosed in CDATA and parse accordingly
    if (typeof descriptionContent === "object" && descriptionContent._) {
      descriptionContent = descriptionContent._;
    }

    if (typeof descriptionContent === "string") {
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const match = imgRegex.exec(descriptionContent);

      if (match && match[1]) {
        mediaUrl = match[1];
      }
    }
  }

  // Handle relative URLs
  if (mediaUrl && !mediaUrl.startsWith("http")) {
    mediaUrl = new URL(mediaUrl, sourceUrl).href;
  }

  return mediaUrl;
};

async function getCategoryArticles(category) {
  const articles = [];
  if (!newsSources[category]) {
    console.log(`No sources found for category: ${category}`);
    return articles;
  }

  const twoDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000); // 48 hours ago

  for (const source of newsSources[category]) {
    try {
      const response = await axios.get(source.rssUrl);
      const result = await xml2js.parseStringPromise(response.data);

      let items;

      // Check if the feed is RSS format
      if (result.rss && result.rss.channel) {
        items = result.rss.channel[0].item;
      }
      // Check if the feed is Atom format
      else if (result.feed && result.feed.entry) {
        items = result.feed.entry;
      } else {
        console.log("Unknown feed format for source:", source);
        continue;
      }

      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          const pubDateString =
            item.pubDate && item.pubDate[0] ? item.pubDate[0] : null;

          if (!pubDateString) {
            continue; // Skip if pubDate is not available
          }

          const pubDate = new Date(pubDateString);

          if (isNaN(pubDate.getTime()) || pubDate < twoDaysAgo) {
            continue; // Skip articles older than 48 hours or with invalid date
          }

          const title =
            item.title && item.title[0] ? cleanText(item.title[0]) : "Unknown";
          const information =
            item.description && item.description[0]
              ? cleanText(item.description[0])
              : "Unknown";
          let mediaUrl = (await getMedia(item, source.url)) || "Unknown";
          const articleUrl =
            item.link && item.link[0] ? cleanText(item.link[0]) : "Unknown";
          const sourceName = source.name || "Unknown";
          const sourceUrl = source.url || "Unknown";
          const sourceFavicon = source.favicon;

          const formattedArticle = {
            title,
            description: information,
            mediaUrl,
            articleUrl,
            sourceName,
            category,
            sourceUrl,
            pubDate,
            sourceFavicon,
          };

          articles.push(formattedArticle);
        }
      }
    } catch (error) {
      console.error(
        `Error fetching or parsing feed from ${source.name}:`,
        error
      );
    }
  }

  return articles;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring syntax for swapping elements
  }
}

async function getArticlesFromCategories(viralContent) {
  let allArticles = [...viralContent];

  for (const category in newsSources) {
    if (newsSources.hasOwnProperty(category)) {
      try {
        const articles = await getCategoryArticles(category);
        allArticles.push(...articles); // Spread operator to flatten the array
      } catch (error) {
        console.error(
          `Error fetching articles for category ${category}:`,
          error
        );
      }
    }
  }

  shuffleArray(allArticles);
  return allArticles;
}

function getArticlesByPage(userArticles, page) {
  const articlesPerPage = 6; // Number of articles per page
  const startIndex = (page - 1) * articlesPerPage; // Calculate start index

  return userArticles.slice(startIndex, startIndex + articlesPerPage);
}

module.exports = {
  getArticlesFromCategories,
  getArticlesByPage,
};
