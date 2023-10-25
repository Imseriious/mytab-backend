const Category = require("../models/categoryModel");
const Folder = require("../models/folderModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name,
      userId: req.user._id,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the category" });
  }
};

const getUserCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id });
    const categoriesResponse = {
      length: categories.length,
      categories,
    };
    res.status(200).json(categoriesResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (String(category.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this category" });
    }

    // Find and delete all folders associated with this category
    await Folder.deleteMany({ categoryId: categoryId });

    await category.deleteOne();
    res
      .status(200)
      .json({
        message: "Category and associated folders deleted successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to delete the category and associated folders" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (String(category.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this category" });
    }

    if (name) category.name = name;

    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the category" });
  }
};

const getCategoryFolders = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (String(category.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this category" });
    }

    const categoryFolders = await Folder.find({ categoryId: categoryId });

    res
      .status(200)
      .json({ length: categoryFolders.length, folders: categoryFolders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get category folders" });
  }
};

module.exports = {
  createCategory,
  getUserCategories,
  deleteCategory,
  updateCategory,
  getCategoryFolders,
};
