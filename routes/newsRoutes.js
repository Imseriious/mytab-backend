const express = require("express");
const { getUserNews } = require("../controllers/newsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//login router
router.get("/:page", requireAuth, getUserNews);

module.exports = router;
