const express = require("express");
const router = express.Router();
const {
  getWallpapers,
  changeWallpaperCollection,
  createWallpaperPack,
  getUserWallpapersPacks,
} = require("../controllers/wallpapersController.js");
const requireAuth = require("../middleware/requireAuth");

router.get("/getwallpaper/:id", requireAuth, getWallpapers);
router.put("/", requireAuth, changeWallpaperCollection);
router.post("/", requireAuth, createWallpaperPack);
router.get("/mycollections", requireAuth, getUserWallpapersPacks);

module.exports = router;
