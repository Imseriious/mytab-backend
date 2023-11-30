const { default: axios } = require("axios");
const getTweetsFromTrend = require("../utils/getTweetsFromTrend");

const getYoutubePopular = async () => {
  console.log("Fetching Youtube...");
  const options = {
    method: "GET",
    url: "https://youtube-trending.p.rapidapi.com/trending",
    params: {},
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-trending.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const formattedOptions = response.data.map((option) => ({
      title: option.title,
      description: option.description || "",
      articleUrl: option.videoUrl,
      mediaUrl: option.thumbnails[1].url,
      pubDate: option.publishedDate,
      sourceName: "Youtube Trending",
      sourceFavicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://youtube.com&size=64",
      sourceUrl: "https://www.youtube.com",
      category: "Viral",
    }));
    return formattedOptions;
  } catch (error) {
    console.error(error);
  }
};

const getTwitterPopular = async () => {
  console.log("Fetching Twitter...");

  const trendsOptions = {
    method: "GET",
    url: "https://twitter154.p.rapidapi.com/trends/",
    params: { woeid: "23424977" }, // USA
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
    },
  };

  try {
    const trendsResponse = await axios.request(trendsOptions);
    const trends = trendsResponse.data[0].trends;

    // Filter the trends to the top 2.
    const formattedTrends = trends
      .filter((option, i) => i < 4)
      .map((trend) => ({
        name: trend.name,
        url: trend.url,
      }));

    const tweetsPromises = [];

    for (const trend of formattedTrends) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const tweetsPromise = getTweetsFromTrend(trend.name);
      tweetsPromises.push(tweetsPromise);
    }

    const tweetsFromTrends = [].concat(...(await Promise.all(tweetsPromises)));

    return tweetsFromTrends;

    // const xContent = {
    //   trends: formattedTrends,
    //   tweets: tweetsFromTrends,
    // };
    //return xContent;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getRedditPopular = async () => {
  console.log("Fetching Reddit...");

  const options = {
    method: "GET",
    url: "https://reddit34.p.rapidapi.com/getTopPopularPosts",
    params: { time: "day" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "reddit34.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const posts = response.data.data.posts;

    const formattedOptions = posts
      .filter((post) => {
        // Extracting subreddit from permalink
        const subredditMatch = post.permalink.match(/\/r\/(.*?)\//);
        return subredditMatch; // Only allow posts with a subreddit
      })
      .map((post) => {
        // Extracting subreddit from permalink
        const subredditMatch = post.permalink.match(/\/r\/(.*?)\//);
        const subreddit = subredditMatch[1];
        return {
          title: `r/${subreddit}`,
          description: post.title || "",
          articleUrl: post.permalink,
          mediaUrl:
            post.preview?.url ||
            post.media?.posterUrl ||
            post.thumbnail.url ||
            "",
          pubDate: new Date(post.created),
          sourceName: "Reddit Popular Today",
          sourceFavicon:
            "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://reddit.com&size=64",
          sourceUrl: "https://www.reddit.com",
          category: "Viral",
        };
      });

    return formattedOptions;
  } catch (error) {
    console.error(error);
  }
};

// const getTikTokPopular = async () => {
//   const options = {
//     method: "GET",
//     url: "https://scraptik.p.rapidapi.com/search",
//     params: {
//       keyword: "viral",
//       count: "10",
//       offset: "0",
//       use_filters: "0",
//       publish_time: "7",
//       sort_type: "1", // bylikes
//     },
//     headers: {
//       "X-RapidAPI-Key": process.env.RAPID_API_KEY,
//       "X-RapidAPI-Host": "scraptik.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     const formattedOptions = response.data.data
//       .map(
//         (option) =>
//           option.aweme_info?.desc &&
//           option.aweme_info?.search_desc &&
//           option.preload_img?.urls?.[1] &&
//           option.aweme_info?.share_url && {
//             description: option.aweme_info?.desc,
//             title: option.aweme_info?.search_desc,
//             thumbnail: option.preload_img?.urls?.[1],
//             url: option.aweme_info?.share_url,
//           }
//       )
//       .filter((option) => option !== undefined);
//     return formattedOptions;
//   } catch (error) {
//     console.error(error);
//   }
// };

const getViralContent = async () => {
  console.log("Fetching virals...");
  let viralContent = [];
  const youtubeContent = await getYoutubePopular();
  const twitterContent = await getTwitterPopular();
  const redditContent = await getRedditPopular();

  if (youtubeContent) {
    viralContent.push(...youtubeContent);
  }
  if (twitterContent) {
    viralContent.push(...twitterContent);
  }

  if (redditContent) {
    viralContent.push(...redditContent);
  }

  return viralContent;
};

const getViralSources = async () => {
  const availableViralSources = [
    {
      name: "Reddit Popular Today",
      url: "www.reddit.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://reddit.com&size=64",
    },
    {
      name: "Youtube Trending",
      url: "www.youtube.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://youtube.com&size=64",
    },
    {
      name: "Twitter Trending",
      url: "www.x.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://x.com&size=64",
    },
  ];
  const sourcesObject = {
    category: "Viral",
    sources: availableViralSources,
  };

  return sourcesObject;
};

module.exports = {
  getViralContent,
  getViralSources,
};
