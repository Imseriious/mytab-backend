const axios = require("axios");
require("dotenv").config();

const getTweetsFromTrend = async (trend) => {
  const formattedHasthtag = trend.startsWith("#") ? trend : `#"${trend}"`;

  const tweetsFromTrendOptions = {
    method: "GET",
    url: "https://twitter154.p.rapidapi.com/hashtag/hashtag",
    params: {
      hashtag: formattedHasthtag,
      limit: "5",
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
        title: trend,
        description: tweet.text || "",
        articleUrl: tweet.expanded_url,
        mediaUrl: tweet.media_url[0] && tweet.media_url[0],
        pubDate: tweet.creation_date,
        sourceName: "Twitter Trending",
        sourceFavicon:
          "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://twitter.com&size=64",
        sourceUrl: "https://www.x.com",
        category: "x",
      };
    });
    return formattedTrendTweets;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getTweetsFromTrend;
