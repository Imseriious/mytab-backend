const Bookmark = require("../models/bookmarkModel");
const getBookmarkIconUrl = require("../utils");

const addBookmark = async (req, res) => {
  const { name, url, folderId } = req.body;
  const description = "missing description logic";

  const iconUrl = getBookmarkIconUrl(url);

  if (!name || !url) {
    return res.status(400).json({ error: "Name and URL are required" });
  }

  if (folderId === "none") {
    folderId === null;
  }

  try {
    const bookmark = new Bookmark({
      name,
      url,
      iconUrl,
      folderId,
      description,
      userId: req.user._id,
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add the bookmark" });
  }
};

const getUserBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    const bookmarksResponse = {
      length: bookmarks.length,
      bookmarks: bookmarks,
    };
    res.status(200).json(bookmarksResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve bookmarks" });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id; //In params not body
    const bookmark = await Bookmark.findById(bookmarkId);

    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    if (String(bookmark.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this bookmark" });
    }

    await bookmark.deleteOne();
    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the bookmark" });
  }
};

const updateBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const { name, url, folderId } = req.body;
    const bookmark = await Bookmark.findById(bookmarkId);

    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    if (String(bookmark.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this bookmark" });
    }

    if (name) bookmark.name = name;
    if (url) bookmark.url = url;
    if (folderId) {
      bookmark.folderId = folderId === "none" ? null : folderId;
    }

    await bookmark.save();

    res
      .status(200)
      .json({ message: "Bookmark updated successfully", bookmark });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the bookmark" });
  }
};

module.exports = {
  addBookmark,
  getUserBookmarks,
  deleteBookmark,
  updateBookmark,
};
