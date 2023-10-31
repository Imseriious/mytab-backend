const mongoose = require("mongoose");

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
  },
});

module.exports = mongoose.model("WidgetPopular", widgetPopularSchema);
