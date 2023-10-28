const express = require('express');
const router = express.Router();
const requireAuth = require('../../middleware/requireAuth');
const { getPopularToday } = require('../../controllers/widgets/widgetPopularController');

router.get('/', requireAuth, getPopularToday);

module.exports = router;


