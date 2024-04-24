const express = require("express");
const router = express.Router();
const {
    createBookmark,
    getUserBookmarks
} = require("../controllers/memoryController");
const requireAuth = require("../middleware/requireAuth");

router.post("/bookmarks", requireAuth, createBookmark);
router.get("/bookmarks", requireAuth, getUserBookmarks);

module.exports = router;
