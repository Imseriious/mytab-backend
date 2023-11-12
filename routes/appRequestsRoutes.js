const express = require("express");
const router = express.Router();
const { createAppRequest } = require("../controllers/appRequestController");
const requireAuth = require("../middleware/requireAuth");

router.post("/", requireAuth, createAppRequest);

module.exports = router;
