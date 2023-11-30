const User = require("../models/userModel");
const News = require("../models/newsModel");
const {
  getArticlesFromCategories,
  getArticlesByPage,
} = require("../timeline/getArticles");
const { newsSources } = require("../timeline/newsSources");
const { getViralContent, getViralSources } = require("../timeline/viralUtils");

const updateDatabaseNews = async () => {
  console.log("Updating timeline ...");
  const viralContent = await getViralContent();
  const newArticles = await getArticlesFromCategories(viralContent);

  // Update or create news data
  const newsData = await News.findOneAndUpdate(
    {},
    { articles: newArticles, newsDate: new Date() },
    { upsert: true, new: true }
  );
  return newsData;
};

const getUserNews = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const page = parseInt(req.params.page) || 1;

    const userNewsSources = user.preferences.newsSources || []; //Default sources here ?
    const userNewsSourcesLowercase = userNewsSources.map((source) =>
      source.toLowerCase()
    );

    let newsData = await News.findOne();

    if (
      !newsData ||
      newsData.newsDate.toDateString() !== new Date().toDateString()
    ) {
      newsData = await updateDatabaseNews();
    }

    let articlesFromUserSources;

    if (userNewsSourcesLowercase.length > 0) {
      articlesFromUserSources = newsData.articles.filter((article) => {
        return userNewsSourcesLowercase.includes(
          article.sourceName.toLowerCase()
        );
      });
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
