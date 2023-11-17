const express = require("express");
const router = express.Router();
const {
  createAppRequest,
  bugReport,
  accessRequest,
} = require("../controllers/ticketsController");
const requireAuth = require("../middleware/requireAuth");

router.post("/apprequests", requireAuth, createAppRequest);
router.post("/bugreport", requireAuth, bugReport);
router.post("/accessRequest", accessRequest);

module.exports = router;
