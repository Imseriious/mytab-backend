const express = require('express');
const router = express.Router();
const requireAuth = require('../../middleware/requireAuth');
const { getQuote } = require('../../controllers/widgets/widgetQuoteController');

router.get('/', requireAuth, getQuote);

module.exports = router;
