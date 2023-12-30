const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voteType: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const postSchema = new mongoose.Schema(
  {
    pubDate: { type: Date, default: Date.now },
    votes: { type: Number, default: 1 },
    text: { type: String, required: true },
    userId: { type: String, required: true },
    votedBy: { type: [voteSchema], default: [] },
  },
  { timestamps: true }
);

const speakUpRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  refreshTime: { type: String, required: true },
  postLimit: { type: String, required: true },
  posts: [postSchema],
});

module.exports = mongoose.model("SpeakUpRoom", speakUpRoomSchema);
