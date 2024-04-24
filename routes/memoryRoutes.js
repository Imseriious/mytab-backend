const express = require("express");
const router = express.Router();
const {
    createBookmark
} = require("../controllers/memoryController");
const requireAuth = require("../middleware/requireAuth");

router.post("/bookmarks", requireAuth, createBookmark);

module.exports = router;
