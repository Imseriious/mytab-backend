const express = require("express");
const router = express.Router();
const {
  addBookmark,
  getUserBookmarks,
  deleteBookmark,
  updateBookmark,
  searchBookmarks,
  importBrowserBookmarks,
} = require("../controllers/bookmarkController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, addBookmark);
router.get("/search", requireAuth, searchBookmarks);
router.get("/", requireAuth, getUserBookmarks);
router.delete("/:id", requireAuth, deleteBookmark);
router.put("/:id", requireAuth, updateBookmark);
router.post("/import_bookmarks", requireAuth, importBrowserBookmarks);

module.exports = router;
