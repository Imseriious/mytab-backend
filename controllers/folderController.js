const Folder = require("../models/folderModel");
const Bookmark = require("../models/bookmarkModel");

const createFolder = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const folder = new Folder({
      name,
      userId: req.user._id,
      categoryId,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the folder" });
  }
};

const getUserFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user._id });
    const foldersResponse = {
      length: folders.length,
      folders: folders,
    };
    res.status(200).json(foldersResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve folders" });
  }
};

const getFolderBookmarks = async (req, res) => {
  try {
    const folderId = req.params.id; //In params not body
    const folderBookmarks = await Bookmark.find({ folderId: folderId });
    const folderBookmarksResponse = {
      length: folderBookmarks.length,
      folderBookmarks: folderBookmarks,
    };
    res.status(200).json(folderBookmarksResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve folders" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id; //In params not body
    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    if (String(folder.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this folder" });
    }

    await folder.deleteOne();
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the folder" });
  }
};

const updateFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const { name, categoryId } = req.body;
    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    if (String(folder.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this folder" });
    }

    if (name) folder.name = name;
    if (categoryId || categoryId === null) folder.categoryId = categoryId;

    await folder.save();

    res.status(200).json({ message: "Folder updated successfully", folder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the folder" });
  }
};

module.exports = {
  createFolder,
  getUserFolders,
  deleteFolder,
  updateFolder,
  getFolderBookmarks,
};
