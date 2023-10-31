const mongoose = require("mongoose");

const tiktokSchema = new mongoose.Schema({
  description: String,
  title: String,
  thumbnail: String,
  url: String
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
      required: true,
    },
    reddit: {
      type: [redditContent],
      required: true,
    },
    tiktok: {
      type: [tiktokSchema]
    }
  },
});

module.exports = mongoose.model("WidgetPopular", widgetPopularSchema);
