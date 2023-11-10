const axios = require("axios");
require("dotenv").config();

const getTweetsFromTrend = async (trend) => {
  const formattedHasthtag = trend.startsWith("#") ? trend : `#"${trend}"`;

  const tweetsFromTrendOptions = {
    method: "GET",
    url: "https://twitter154.p.rapidapi.com/hashtag/hashtag",
    params: {
      hashtag: formattedHasthtag,
      limit: "3",
      section: "top",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_SECONDARY, //mill key
      "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(tweetsFromTrendOptions);
    const trendTweetsResult = response.data.results;
    const formattedTrendTweets = trendTweetsResult.map((tweet) => {
      return {
        trend: trend,
        url: tweet.expanded_url,
        text: tweet.text,
        media: tweet.media_url[0] && tweet.media_url[0],
      };
    });
    return formattedTrendTweets;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getTweetsFromTrend;
