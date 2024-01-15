const express = require("express");
const { getFeedCategoryHot } = require("../controllers/feedController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/hot/:category", requireAuth, getFeedCategoryHot);

module.exports = router;
