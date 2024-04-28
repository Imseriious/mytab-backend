const findParentBookmark = (bookmarks, parentId) => {
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].custom_id === parentId) {
      return bookmarks[i];
    }

    if (bookmarks[i].children) {
      let found = findParentBookmark(bookmarks[i].children, parentId);
      if (found) return found;
    }
  }

  return null;
};

module.exports = {
  findParentBookmark,
};
