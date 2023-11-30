const express = require("express");
const router = express.Router();
const {
  addPostToRoom,
  getAllRooms,
  voteOnPost,
} = require("../controllers/speakUpController");
const requireAuth = require("../middleware/requireAuth");

router.post("/post/:roomId", requireAuth, addPostToRoom);
router.get("/rooms", requireAuth, getAllRooms);
router.post("/vote/:roomId/:postId", requireAuth, voteOnPost);

module.exports = router;
