const Favorite = require("../models/favoriteModel");
const Bookmark = require("../models/bookmarkModel");
const getBookmarkIconUrl = require("../utils/getFaviconFromUrl");
const getWebsiteInfo = require("../utils/getWebsiteInfo");

// 1. Creating a Favorite
const addFavorite = async (req, res) => {
  try {
    let { bookmarkId, name, url } = req.body;
    const iconUrl = getBookmarkIconUrl(url);

    let websiteDescription = await getWebsiteInfo(url);

    if (!name) {
      name = websiteDescription.title;
    }

    const description =
      websiteDescription.description ||
      websiteDescription.title ||
      "Missing description ... ";

    // 2. Checking and Creating Bookmark if it doesn't exist
    if (!bookmarkId) {
      const newBookmark = new Bookmark({
        userId: req.user._id,
        name,
        url,
        iconUrl,
        description,
      });
      await newBookmark.save();
      bookmarkId = newBookmark._id; // Assigning the newly created Bookmark's ID
    } else {
      const existingBookmark = await Bookmark.findById(bookmarkId);
      if (!existingBookmark) {
        return res
          .status(404)
          .json({ error: "Provided bookmarkId does not exist" });
      }
    }

    // Creating a Favorite
    const favorite = new Favorite({
      userId: req.user._id,
      bookmarkId,
      name,
      description,
      url,
      iconUrl,
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add to favorites" });
  }
};

// 2. Retrieving a User's Favorites
const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve favorites" });
  }
};

// 3. Deleting a Favorite
const deleteFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const favorite = await Favorite.findById(favoriteId);

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    if (String(favorite.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this favorite" });
    }

    await favorite.deleteOne();
    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the favorite" });
  }
};

// 4. Updating a Favorite
const updateFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const { name, url } = req.body;

    const favorite = await Favorite.findById(favoriteId);
    const relatedBookmark = await Bookmark.findById(favorite.bookmarkId);

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    if (!relatedBookmark) {
      console.log("Related bookmark for this favorite was not found");
    }

    if (String(favorite.userId) !== String(req.user._id)) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this favorite" });
    }

    if (name) {
      favorite.name = name;
      relatedBookmark.name = name;
    }
    if (url) {
      favorite.url = url;
      relatedBookmark.url = url;
    }

    await relatedBookmark.save();
    await favorite.save();

    res
      .status(200)
      .json({ message: "Favorite updated successfully", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the favorite" });
  }
};

module.exports = {
  addFavorite,
  getUserFavorites,
  deleteFavorite,
  updateFavorite,
};
