const Memory = require("../models/memoryModel");
const User = require("../models/userModel");

const createBookmark = async (req, res) => {
  const userId = req.user._id;

  const bookmarkData = {
    date_added: "13355356361664437",
    date_last_used: "13355356722085468",
    guid: "a23a4586-7a3c-4be9-b851-6b43c14b34ae",
    id: "832",
    name: "(31) Linux for Hackers Tutorial (And Free Courses) - YouTube",
    type: "url",
    url: "https://www.youtube.com/watch?v=YJUVNlmIO6E&t=1s",
  };

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

module.exports = {
  createBookmark,
};
