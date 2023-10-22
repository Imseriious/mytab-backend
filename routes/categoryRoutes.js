const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const {
    createCategory,
    getUserCategories,
    deleteCategory,
    updateCategory,
    getCategoryFolders
} = require('../controllers/categoryController');

// All routes will require authentication
router.use(requireAuth);

// Create a new category
router.post('/', createCategory);

// Get all categories of the user
router.get('/', getUserCategories);

// Get all categories of the user
router.get('/:id', getCategoryFolders);

// Delete a specific category by ID
router.delete('/:id', deleteCategory);

// Update a specific category by ID
router.put('/:id', updateCategory);

module.exports = router;
