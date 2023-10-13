const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
