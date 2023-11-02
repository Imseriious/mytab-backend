
const express = require('express');
const router = express.Router();
const requireAuth = require('../../middleware/requireAuth');
const { getCryptoInfo, updateCryptoPreferences } = require('../../controllers/widgets/widgetCryptoController');

router.get('/', requireAuth, getCryptoInfo);
router.put('/preferences', requireAuth, updateCryptoPreferences);

module.exports = router;

