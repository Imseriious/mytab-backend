const User = require("../models/userModel");
const News = require("../models/newsModel");
const {
  getArticlesFromCategories,
  getArticlesByPage,
} = require("../news/getArticles");

const updateDatabaseNews = async () => {
  console.log("updating news");
  const newArticles = await getArticlesFromCategories();

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

    const userNewsCategories = user.preferences.newsCategories || [];

    let newsData = await News.findOne();

    if (
      !newsData ||
      newsData.newsDate.toDateString() !== new Date().toDateString()
    ) {
      newsData = await updateDatabaseNews();
    }

    let articlesFromUserCategories;

    if (userNewsCategories.length > 0) {
      articlesFromUserCategories = newsData.articles.filter((article) =>
        userNewsCategories.includes(article.category)
      );
    } else {
      articlesFromUserCategories = newsData.articles;
    }

    const articlesToReturn = getArticlesByPage(
      articlesFromUserCategories,
      page
    );

    // Send the news data to the client
    res.status(200).json(articlesToReturn);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching news.");
  }
};

module.exports = {
  getUserNews,
};
