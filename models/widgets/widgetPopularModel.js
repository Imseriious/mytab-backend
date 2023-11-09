const mongoose = require("mongoose");

const tiktokSchema = new mongoose.Schema({
  description: String,
  title: String,
  thumbnail: String,
  url: String,
});

const xTrends = new mongoose.Schema({
  name: String,
  url: String,
});

const xTweets = new mongoose.Schema({
  trend: String,
  url: String,
  text: String,
  media: { type: String, required: false },
});

const xContent = new mongoose.Schema({
  trends: [xTrends],
  tweets: [xTweets],
});

const youtubeContent = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const redditContent = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  subReddit: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const widgetPopularSchema = new mongoose.Schema({
  updatedDate: {
    type: String,
    required: true,
  },
  apps: {
    youtube: {
      type: [youtubeContent],
    },
    reddit: {
      type: [redditContent],
    },
    tiktok: {
      type: [tiktokSchema],
    },
    xContent: {
      type: xContent,
    },
  },
});

module.exports = mongoose.model("WidgetPopular", widgetPopularSchema);
