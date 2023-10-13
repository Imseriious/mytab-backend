const express = require('express');
const router = express.Router();
const { addFavorite, getUserFavorites, deleteFavorite, updateFavorite } = require('../controllers/favoritesController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, addFavorite);
router.get('/', requireAuth, getUserFavorites);
router.delete('/:id', requireAuth, deleteFavorite);
router.put('/:id', requireAuth, updateFavorite);



module.exports = router;
