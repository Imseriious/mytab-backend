const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createFolder,
  getUserFolders,
  deleteFolder,
  updateFolder,
  getFolderBookmarks,
} = require("../controllers/folderController");

router.post("/", requireAuth, createFolder);
router.get("/", requireAuth, getUserFolders);
router.delete("/:id", requireAuth, deleteFolder);
router.put("/:id", requireAuth, updateFolder);
router.get("/:id", requireAuth, getFolderBookmarks);

module.exports = router;
