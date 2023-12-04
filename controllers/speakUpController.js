const SpeakUpRoom = require("../models/speakUpRoom");
const User = require("../models/userModel");

const getAllRooms = async (req, res) => {
  try {
    const rooms = await SpeakUpRoom.find({});
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

const addPostToRoom = async (req, res) => {
  const { roomId } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    const room = await SpeakUpRoom.findOne({ id: roomId });
    if (!room) {
      res.status(500).json({ error: "Room not found" });
      return;
    }

    const newPost = {
      username: user.username,
      userId: req.user._id,
      text,
      votedBy: [{ userId: req.user._id, voteType: "up" }],
    };
    room.posts.push(newPost);
    await room.save();

    // Save and get the updated room
    const updatedRoom = await room.save();

    // Retrieve the newly added post from the updated room
    const addedPost = updatedRoom.posts[updatedRoom.posts.length - 1];

    res
      .status(201)
      .json({ message: "Post added successfully", post: addedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add post" });
  }
};

const voteOnPost = async (req, res) => {
  const { roomId, postId } = req.params;
  const { voteType } = req.body;

  if (!["up", "down"].includes(voteType)) {
    return res.status(400).json({ error: "Invalid vote type" });
  }

  try {
    const room = await SpeakUpRoom.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Find the post by its ID
    const postIndex = room.posts.findIndex((p) => p._id.toString() === postId);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (
      room.posts[postIndex].votedBy.filter(
        (vote) => vote.userId.toString() === req.user._id.toString()
      ).length > 0
    ) {
      return res.status(400).json({ error: "Already voted" });
    }

    console.log(
      room.posts[postIndex].votedBy.filter((vote) => vote.userId),
      room.posts[postIndex].votedBy.filter(
        (vote) => vote.userId == req.user._id
      ),
      req.user._id
    );

    // Update the votes count based on voteType
    if (voteType === "up") {
      room.posts[postIndex].votes += 1;
    } else {
      room.posts[postIndex].votes -= 1;
    }

    room.posts[postIndex].votedBy.push({
      userId: req.user._id,
      voteType,
    });

    await room.save();

    res
      .status(200)
      .json({ message: "Vote recorded", post: room.posts[postIndex] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record vote" });
  }
};

module.exports = {
  addPostToRoom,
  getAllRooms,
  voteOnPost,
};
