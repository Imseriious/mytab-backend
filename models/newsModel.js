const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    articles: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        mediaUrl: String,
        articleUrl: { type: String, required: true },
        sourceName: { type: String, required: true },
        sourceFavicon: { type: String, required: true },
        sourceUrl: String,
        category: { type: String, required: true },
        pubDate: { type: Date },
      },
    ],
    newsDate: { type: Date }
  }
);

module.exports = mongoose.model("News", newsSchema);
