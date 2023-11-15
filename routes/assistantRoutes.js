const express = require('express');
const router = express.Router();
const { talkAssistant } = require('../controllers/assistantController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, talkAssistant);


module.exports = router;


