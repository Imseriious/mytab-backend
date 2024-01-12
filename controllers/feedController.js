const News = require("../models/newsModel");

const getFeedCategoryHot = async (req, res) => {
  const category = req.params.category;
  try {
    let newsData = await News.findOne();

    if (!newsData) {
      console.log("No news data available");
      res.status(500).send("No news data available");
      return;
    }

    const filteredArticles = newsData.articles.filter(
      (article) => article.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredArticles.length === 0) {
      res.status(404).send(`No articles found for category: ${category}`);
      return;
    }

    const limit = 4;

    const resultArticles = filteredArticles.slice(0, limit);

    res.status(200).json(resultArticles);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`An error occurred while fetching feed content for ${category} .`);
  }
};

module.exports = {
  getFeedCategoryHot,
};
