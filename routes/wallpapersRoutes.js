const express = require('express');
const router = express.Router();
const { getWallpapers, changeWallpaperCollection } = require('../controllers/wallpapersController.js');
const requireAuth = require('../middleware/requireAuth');

router.get('/:id', requireAuth, getWallpapers);
router.put('/:symbols', requireAuth, changeWallpaperCollection);

module.exports = router;
