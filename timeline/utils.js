const { getViralContent } = require("../timeline/viralUtils");
const { getArticlesFromCategories } = require("../timeline/getArticles");
const News = require("../models/newsModel");

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

module.exports = {
  updateDatabaseNews,
};
