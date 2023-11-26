const express = require("express");
const router = express.Router();
const {
  getWallpaper,
  changeWallpaperCollection,
  createWallpaperPack,
  getUserWallpapersPacks,
  addToLibrary,
  deleteFromLibrary,
  getAllWallpapersPacks,
} = require("../controllers/wallpapersController.js");
const requireAuth = require("../middleware/requireAuth");

router.get("/", requireAuth, getAllWallpapersPacks);
router.get("/getwallpaper/:id", requireAuth, getWallpaper);
router.put("/", requireAuth, changeWallpaperCollection);
router.post("/", requireAuth, createWallpaperPack);
router.get("/mycollections", requireAuth, getUserWallpapersPacks);
router.post("/library", requireAuth, addToLibrary);
router.put("/library", requireAuth, deleteFromLibrary);

module.exports = router;
