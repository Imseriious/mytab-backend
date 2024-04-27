const express = require("express");
const router = express.Router();
const {
    createBookmark,
    getUserBookmarks,
    deleteBookmark,
    updateBookmark
} = require("../controllers/memoryController");
const requireAuth = require("../middleware/requireAuth");

router.post("/bookmarks", requireAuth, createBookmark);
router.get("/bookmarks", requireAuth, getUserBookmarks);
router.delete("/bookmarks/:custom_id", requireAuth, deleteBookmark);
router.put("/bookmarks/:custom_id", requireAuth, updateBookmark);

module.exports = router;
