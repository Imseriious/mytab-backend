const User = require("../models/userModel");
const News = require("../models/newsModel");
const { getArticlesByPage } = require("../timeline/getArticles");
const { newsSources } = require("../timeline/newsSources");
const { getViralSources } = require("../timeline/viralUtils");

const getUserNews = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const page = parseInt(req.params.page) || 1;

    const userNewsSources = user.preferences.newsSources || []; //Default sources here ?
    const userNewsSourcesLowercase = userNewsSources.map((source) =>
      source.toLowerCase()
    );

    let newsData = await News.findOne();

    if (!newsData) {
      console.log("No news data available");
      res.status(500).send("No news data available");
      return;
    }


    let articlesFromUserSources;
    if (userNewsSourcesLowercase.length > 0) {
      articlesFromUserSources = newsData.articles.filter((article) => {
        if (article && article !== null) {
          return userNewsSourcesLowercase.includes(
            article.sourceName.toLowerCase()
          );
        }
      });
      if (!articlesFromUserSources) {
        articlesFromUserSources = [];
      }
    } else {
      articlesFromUserSources = newsData.articles;
    }

    const articlesToReturn = getArticlesByPage(articlesFromUserSources, page);

    res.status(200).json(articlesToReturn);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching news.");
  }
};

const getNewsSources = async (req, res) => {
  try {
    const viralSources = await getViralSources();
    const formattedSources = [viralSources];
    for (const category in newsSources) {
      const sources = newsSources[category].map((source) => ({
        name: source.name,
        URL: new URL(source.url).hostname, // Extracts the hostname from the URL
        favicon: source.favicon,
      }));

      formattedSources.push({ category, sources });
    }

    res.status(200).json(formattedSources);
  } catch (error) {
    res.status(500).send("An error occurred while fetching news.");
  }
};

const updateUserSources = async (req, res) => {
  const { userNewsSources } = req.body;
  if (!userNewsSources) {
    res.status(400).json({ message: "userNewsSources required in body" });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    user.preferences.newsSources = userNewsSources;
    await user.save();
    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserNews,
  getNewsSources,
  updateUserSources,
};
