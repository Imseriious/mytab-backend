const express = require('express');
const router = express.Router();
const { addBookmark, getUserBookmarks, deleteBookmark, updateBookmark } = require('../controllers/bookmarkController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, addBookmark);
router.get('/', requireAuth, getUserBookmarks);
router.delete('/:id', requireAuth, deleteBookmark);
router.put('/:id', requireAuth, updateBookmark);



module.exports = router;
