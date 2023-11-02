
const express = require('express');
const router = express.Router();
const requireAuth = require('../../middleware/requireAuth');
const { getWeather } = require('../../controllers/widgets/widgetWeatherController');

router.get('/:city', requireAuth, getWeather);

module.exports = router;

