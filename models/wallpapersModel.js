const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wallpapersPackSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  storageId: {
    type: String,
    required: true,
  },
  mediaLinks: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  marketApproved: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  live: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("WallpapersPack", wallpapersPackSchema);
