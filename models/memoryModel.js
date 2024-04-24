const mongoose = require("mongoose");

const customAttributesSchema = new mongoose.Schema(
  {
    iconUrl: { type: String },
    description: {type: String}
  },
  { _id: false }
);

const bookmarkSchema = new mongoose.Schema(
  {
    date_added: { type: String, required: true },
    date_last_used: { type: String, required: true },
    date_modified: { type: String },
    custom_id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["url", "folder"] },
    url: { type: String },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookmark" }],
    customAttributes: customAttributesSchema,
  },
  { _id: true }
);

const memorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  bookmarks: [bookmarkSchema],
});

module.exports = mongoose.model("Memory", memorySchema);
