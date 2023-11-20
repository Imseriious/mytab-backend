const Bookmark = require("../models/bookmarkModel");
const Category = require("../models/categoryModel");
const Folder = require("../models/folderModel");

const getBookmarkIconUrl = require("../utils/getFaviconFromUrl");
const getWebsiteInfo = require("../utils/getWebsiteInfo");

const addBookmark = async (req, res) => {
  let { name, url, folderId, faviconUrl } = req.body;

  let currentFolderName;
  if (!url) {
    return res.status(400).json({ error: "URL are required" });
  }

  if (folderId === "none") {
    folderId = null;
  } else {
    const folder = await Folder.findById(folderId);
    if (folder) {
      currentFolderName = folder.name;
    }
  }

  let iconUrl;
  if (!faviconUrl) {
    iconUrl = await getBookmarkIconUrl(url);
  } else {
    iconUrl = faviconUrl;
  }

  let websiteDescription = await getWebsiteInfo(url);

  if (!name) {
    name = websiteDescription.title;
  }

  const description =
    websiteDescription.description ||
    websiteDescription.title ||
    "Missing description ... ";

  try {
    const bookmark = new Bookmark({
      name,
      url,
      iconUrl,
      folderId,
      currentFolderName,
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

    if (name && name !== bookmark.name) bookmark.name = name;
    if (url && url !== bookmark.url) {
      let websiteDescription = await getWebsiteInfo(url);

      bookmark.url = url;
      bookmark.iconUrl = await getBookmarkIconUrl(url);
      bookmark.description = websiteDescription.description;
    }

    if (folderId && folderId !== bookmark.folderId) {
      if (folderId === ("none" || "None")) {

        bookmark.folderId = null;
        bookmark.currentFolderName = null;
      } else {

        const folder = await Folder.findById(folderId);
        if (folder) {

          bookmark.currentFolderName = folder.name;
          bookmark.folderId = folderId;
        }
      }
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

const importBrowserBookmarks = async (req, res) => {
  try {
    const { browserBookmarks } = req.body;

    const userBookmarks = browserBookmarks[0].children.filter(
      (bookmarksList) => bookmarksList.children.length > 0
    );

    let categoriesToCreate = [];
    let foldersToCreate = [];
    let bookmarksToCreatePromises = [];

    userBookmarks.forEach((bookmarkSections) => {
      //Create categories from sections:
      categoriesToCreate.push({
        name: bookmarkSections.title,
        userId: req.user._id,
      });

      bookmarkSections.children.forEach((bookmarkItem) => {
        if (!bookmarkItem.children) {
          //This are not folders
          bookmarksToCreatePromises.push(
            (async () => {
              const iconUrl = await getBookmarkIconUrl(bookmarkItem.url);
              let websiteDescription = await getWebsiteInfo(bookmarkItem.url);
              const description =
                websiteDescription.description ||
                websiteDescription.title ||
                "Missing description ... ";

              return {
                name: bookmarkItem.title,
                url: bookmarkItem.url,
                iconUrl: iconUrl,
                description: description,
                userId: req.user._id,
              };
            })()
          ); // Again, notice the extra parentheses
        } else {
          //Create folders from Bookmark folders:
          foldersToCreate.push({
            name: bookmarkItem.title,
            userId: req.user._id,
            categoryName: bookmarkSections.title,
          });

          bookmarkItem.children.forEach((item) => {
            bookmarksToCreatePromises.push(
              (async () => {
                const iconUrl = await getBookmarkIconUrl(item.url);
                let websiteDescription = await getWebsiteInfo(item.url);
                const description =
                  websiteDescription.description ||
                  websiteDescription.title ||
                  "Missing description ... ";
                return {
                  name: item.title,
                  url: item.url,
                  iconUrl: iconUrl,
                  description: description,
                  userId: req.user._id,
                  folderName: bookmarkItem.title,
                };
              })()
            ); // Notice the extra parentheses
          });
        }
      });
    });

    const bookmarksToCreate = await Promise.all(bookmarksToCreatePromises);

    if (bookmarksToCreate.length > 0) {
      const bookmarksWithoutFolder = bookmarksToCreate
        .filter((bookmark) => !bookmark.folderName)
        .map((bookmark) => ({
          name: bookmark.name,
          url: bookmark.url,
          iconUrl: bookmark.iconUrl,
          description: bookmark.description,
          userId: bookmark.userId,
        }))
        .reverse(); // Reverse the array after filtering

      try {
        await Bookmark.insertMany(bookmarksWithoutFolder);
      } catch (error) {
        console.error("Error in bulk bookmark creation: ", error);
      }
    }

    if (categoriesToCreate.length > 0) {
      try {
        const newCreatedCategories = await Category.insertMany(
          categoriesToCreate
        );
        if (newCreatedCategories && foldersToCreate.length > 0) {
          const formattedFolders = foldersToCreate.map((folder) => ({
            categoryId: newCreatedCategories.filter(
              (newCategory) => newCategory.name === folder.categoryName
            )[0]._id,
            name: folder.name,
            userId: folder.userId,
          }));
          try {
            const newCreatedFolders = await Folder.insertMany(formattedFolders);
            const bookmarksFromFolders = bookmarksToCreate.filter(
              (bookmark) => bookmark.folderName
            );
            if (bookmarksFromFolders.length > 0) {
              const formattedBookmarksFromFolder = bookmarksFromFolders.map(
                (bookmark) => ({
                  name: bookmark.name,
                  url: bookmark.url,
                  iconUrl: bookmark.iconUrl,
                  description: bookmark.description,
                  userId: bookmark.userId,
                  folderName: newCreatedFolders.filter(
                    (newFolder) => newFolder.name === bookmark.folderName
                  )[0].name,
                  folderId: newCreatedFolders.filter(
                    (newFolder) => newFolder.name === bookmark.folderName
                  )[0]._id,
                })
              );
              try {
                await Bookmark.insertMany(formattedBookmarksFromFolder);
              } catch (error) {
                console.error(
                  "Error in bulk bookmark (folder) creation: ",
                  error
                );
              }
            }
          } catch (error) {
            console.error("Error in bulk folder creation: ", error);
          }
        }
      } catch (error) {
        console.error("Error in bulk category creation: ", error);
      }
    }

    res.status(200).json({ message: "Received bookmarks" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to import bookmark" });
  }
};

module.exports = {
  addBookmark,
  getUserBookmarks,
  deleteBookmark,
  updateBookmark,
  importBrowserBookmarks,
};
