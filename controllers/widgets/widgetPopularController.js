const WidgetPopular = require("../../models/widgets/widgetPopularModel");
const axios = require("axios");

const getYoutubePopular = async () => {
  const options = {
    method: "GET",
    url: "https://youtube-trending.p.rapidapi.com/trending",
    params: {},
    headers: {
      "X-RapidAPI-Key": "a4f0813135msh4995daeba316f20p16560cjsne1ea93c10bdd",
      "X-RapidAPI-Host": "youtube-trending.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // Filtering the first five elements and then formatting them
    const formattedOptions = response.data
      .filter((option, i) => i < 5)
      .map((option) => ({
        title: option.title,
        description: option.description,
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
      "X-RapidAPI-Key": "a4f0813135msh4995daeba316f20p16560cjsne1ea93c10bdd",
      "X-RapidAPI-Host": "reddit34.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    const formattedOptions = response.data.data.posts // Corrected here
      .filter((option, i) => i < 5)
      .map((option) => {
        // Extracting subreddit from permalink
        const subredditMatch = option.permalink.match(/\/r\/(.*?)\//);
        const subreddit = subredditMatch
          ? subredditMatch[1]
          : "Unknown subreddit";

        return {
          title: option.title,
          url: option.permalink,
          subReddit: subreddit,
          thumbnail: option.thumbnail.url,
        };
      });
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

      if (!widgetPopular) {
        widgetPopular = new WidgetPopular(); // If no record is found, create a new one
      }

      widgetPopular.updatedDate = currentDate;
      widgetPopular.apps.youtube = youtubePopular;
      widgetPopular.apps.reddit = redditPopular;

      await widgetPopular.save(); // Save the updated record in the database
    }

    res.status(200).json(widgetPopular.apps); // Return the content (either fetched or from the database)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPopularToday };
