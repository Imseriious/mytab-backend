const express = require("express");
const router = express.Router();
const { getSectionContent } = require("../controllers/sectionsController");
const requireAuth = require("../middleware/requireAuth");

router.get("/getsection/:sectionId", requireAuth, getSectionContent);

module.exports = router;
