const { v4: uuidv4 } = require("uuid"); // Import UUID version 4

const Memory = require("../models/memoryModel");
const User = require("../models/userModel");

const getBookmarkIconUrl = require("../utils/getFaviconFromUrl");
const getWebsiteInfo = require("../utils/getWebsiteInfo");

// ---NOTES---
// TODO: Register Click on Memory Item (custom attributes: cliked)
// TODO: Tags
// TODO: Screenshot

const createBookmark = async (req, res) => {
  const userId = req.user._id;
  let { name, url, type, description } = req.body;

  if (type !== "folder" && !url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (!type) {
    return res.status(400).json({ error: "Type is required" });
  }

  if (type == "folder" && !name) {
    return res.status(400).json({ error: "Folders require a name" });
  }

  let iconUrl;
  let websiteDescription;

  if (type == "url") {
    iconUrl = await getBookmarkIconUrl(url);
    if (!description || !name) {
      websiteDescription = await getWebsiteInfo(url);
      name = websiteDescription.title;
      description = websiteDescription.description || websiteDescription.title;
    }
  }

  const nowTimestamp = new Date().getTime(); // Get current timestamp

  let bookmarkData;

  if (type == "url") {
    bookmarkData = {
      date_added: nowTimestamp,
      date_last_used: nowTimestamp,
      custom_id: uuidv4(),
      name: name,
      type: type,
      url: url,
      customAttributes: {
        description,
        iconUrl,
      },
    };
  } else if (type == "folder") {
    bookmarkData = {
      date_added: nowTimestamp,
      date_last_used: nowTimestamp,
      custom_id: uuidv4(),
      name: name,
      type: type,
      customAttributes: {
        description,
      },
    };
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Try to find an existing memory for the user
    let memory = await Memory.findOne({ userId });

    // If no memory exists, create a new one
    if (!memory) {
      memory = new Memory({
        userId,
        bookmarks: [bookmarkData],
      });
    } else {
      // Add the new bookmark to the existing memory
      memory.bookmarks.push(bookmarkData);
    }

    // Save the updated or new memory
    await memory.save();

    res
      .status(201)
      .json({ message: "Bookmark added successfully", bookmark: bookmarkData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add bookmark" });
  }
};

const getUserBookmarks = async (req, res) => {
  const userId = req.user._id; // Assuming user ID is attached to request by authentication middleware

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the memory for the user
    const memory = await Memory.findOne({ userId });
    if (!memory) {
      return res
        .status(404)
        .json({ message: "No bookmarks found for this user" });
    }

    // Return the bookmarks array if the memory exists
    res.status(200).json({ bookmarks: memory.bookmarks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve bookmarks" });
  }
};

const deleteBookmark = async (req, res) => {
  const userId = req.user._id;
  const { custom_id } = req.params;  // Assuming custom_id is passed as a URL parameter

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const memory = await Memory.findOne({ userId });
    if (!memory) {
      return res.status(404).json({ error: "Memory not found" });
    }

    // Find and remove the bookmark from the memory
    const bookmarkIndex = memory.bookmarks.findIndex(bookmark => bookmark.custom_id === custom_id);
    if (bookmarkIndex === -1) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    // Remove the bookmark
    memory.bookmarks.splice(bookmarkIndex, 1);

    // Save the updated memory
    await memory.save();

    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
};

const updateBookmark = async (req, res) => {
  const userId = req.user._id;
  const { custom_id } = req.params; 
  const updates = req.body;  // Name, url, description
  
  if(!updates.name && !updates.url && !updates.description) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const memory = await Memory.findOne({ userId });
    if (!memory) {
      return res.status(404).json({ error: "Memory not found" });
    }

    const bookmark = memory.bookmarks.find(bookmark => bookmark.custom_id === custom_id);
    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    // Perform updates
    if (updates.name) {
      bookmark.name = updates.name;
    }
    if (updates.url && bookmark.type === "url") {
      bookmark.url = updates.url;
      // Optionally update the icon URL if you have such a function
      bookmark.customAttributes.iconUrl = await getBookmarkIconUrl(updates.url);
    }
    if (updates.description) {
      bookmark.customAttributes.description = updates.description;
    }

    // Save the updated memory
    await memory.save();

    res.status(200).json({ message: "Bookmark updated successfully", bookmark });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update bookmark" });
  }
};



module.exports = {
  createBookmark,
  getUserBookmarks,
  deleteBookmark,
  updateBookmark
};
