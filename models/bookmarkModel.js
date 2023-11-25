const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String || null,
    },
    description: {
      type: String,
    },
    currentFolderName: {
      type: String,
      required: false,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
