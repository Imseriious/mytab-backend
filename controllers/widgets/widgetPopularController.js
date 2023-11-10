const WidgetPopular = require("../../models/widgets/widgetPopularModel");
const axios = require("axios");
const getTweetsFromTrend = require("../../utils/getTweetsFromTrend");
require("dotenv").config();

const getTikTokPopular = async () => {
  const options = {
    method: "GET",
    url: "https://scraptik.p.rapidapi.com/search",
    params: {
      keyword: "viral",
      count: "10",
      offset: "0",
      use_filters: "0",
      publish_time: "7",
      sort_type: "1", // bylikes
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "scraptik.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const formattedOptions = response.data.data.map(
      (option) =>
        option.aweme_info?.desc && //TODO Check if this really works
        option.aweme_info?.search_desc &&
        option.preload_img?.urls?.[1] &&
        option.aweme_info?.share_url && {
          description: option.aweme_info?.desc,
          title: option.aweme_info?.search_desc,
          thumbnail: option.preload_img?.urls?.[1],
          url: option.aweme_info?.share_url,
        }
    );
    return formattedOptions;
  } catch (error) {
    console.error(error);
  }
};

const getTwitterPopular = async () => {
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

    // Create an array to hold the promises for fetching tweets.
    const tweetsPromises = [];

    // Loop through the formattedTrends and add a delay before each request.
    for (const trend of formattedTrends) {
      // Introduce a one-second delay before making each request.
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const tweetsPromise = getTweetsFromTrend(trend.name);
      tweetsPromises.push(tweetsPromise);
    }

    // Wait for all of the tweets promises to resolve and flatten the array.
    const tweetsFromTrends = [].concat(...(await Promise.all(tweetsPromises)));

    // Return the array of tweets from all of the trends.
    const xContent = {
      trends: formattedTrends,
      tweets: tweetsFromTrends,
    };
    return xContent;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getYoutubePopular = async () => {
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
    // Filtering the first five elements and then formatting them
    const formattedOptions = response.data
      .filter((option, i) => i < 10)
      .map((option) => ({
        title: option.title,
        url: option.videoUrl,
        thumbnail: option.thumbnails[1].url,
      }));
    return formattedOptions;
  } catch (error) {
    console.error(error);
  }
};

const getPopularReddit = async () => {
  const axios = require("axios");

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
          title: post.title,
          url: post.permalink,
          subReddit: subreddit,
          thumbnail: post.thumbnail.url,
        };
      })
      .slice(0, 10); // Only get the first 10 items after filtering

    return formattedOptions;
  } catch (error) {
    console.error(error);
  }
};

const getPopularToday = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format

    let widgetPopular = await WidgetPopular.findOne(); // Fetch the record from the database

    // If no record or outdated record is found, fetch new data, update the record and save it
    if (!widgetPopular || widgetPopular.updatedDate !== currentDate) {
      const youtubePopular = await getYoutubePopular();
      const redditPopular = await getPopularReddit();
      const tiktokPopular = await getTikTokPopular();
      const twitterPopular = await getTwitterPopular();

      if (!widgetPopular) {
        widgetPopular = new WidgetPopular(); // If no record is found, create a new one
      }

      widgetPopular.updatedDate = currentDate;
      widgetPopular.apps.youtube = youtubePopular;
      widgetPopular.apps.reddit = redditPopular;
      widgetPopular.apps.tiktok = tiktokPopular;
      widgetPopular.apps.xContent = twitterPopular;

      await widgetPopular.save(); // Save the updated record in the database
    }

    res.status(200).json(widgetPopular.apps); // Return the content (either fetched or from the database)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPopularToday };
