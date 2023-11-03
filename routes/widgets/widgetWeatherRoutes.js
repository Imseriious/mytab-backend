const express = require("express");
const router = express.Router();
const requireAuth = require("../../middleware/requireAuth");
const {
  getWeather,
  updateWeatherPreferences,
  findCity
} = require("../../controllers/widgets/widgetWeatherController");

router.get("/:city", requireAuth, getWeather);
router.put("/preferences", requireAuth, updateWeatherPreferences);
router.post("/find", requireAuth, findCity);

module.exports = router;
