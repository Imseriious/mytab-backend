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

module.exports = {
  createBookmark,
  getUserBookmarks,
};
