const axios = require("axios");

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
      "X-RapidAPI-Key": "b798dd5d32mshbf6107bae7a0893p1c44dfjsn4707e13257f3", //mill key
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
