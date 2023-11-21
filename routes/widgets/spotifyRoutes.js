const express = require("express");
const router = express.Router();
const {
  loginSpotify,
  spotifyCallback,
  spotifyRefreshToken,
  loadPlaylist,
  fetchUserPlaylists,
  controlPlayback,
  checkIfSongLiked,
  likeOrDislikeSong,
  toggleShuffle,
} = require("../../controllers/widgets/spotifyController");

router.get("/auth", loginSpotify);
router.get("/callback", spotifyCallback);
router.post("/refresh_token", spotifyRefreshToken);
router.post("/loadPlaylist", loadPlaylist);
router.post("/fetchUserPlaylists", fetchUserPlaylists);
router.post("/controlPlayback", controlPlayback);
router.post("/checkIfSongLiked", checkIfSongLiked);
router.post("/likeOrDislikeSong", likeOrDislikeSong);
router.post("/toggleShuffle", toggleShuffle);

module.exports = router;
