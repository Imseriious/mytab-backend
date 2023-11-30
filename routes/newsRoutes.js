const express = require("express");
const { getUserNews, getNewsSources, updateUserSources } = require("../controllers/newsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//login router
router.get("/usernews/:page", requireAuth, getUserNews);
router.put("/usernews", requireAuth, updateUserSources);
router.get("/sources", requireAuth, getNewsSources);

module.exports = router;
