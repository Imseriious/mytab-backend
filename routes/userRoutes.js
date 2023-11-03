const express = require("express");
const {
  signupUser,
  loginUser,
  refreshUserToken,
  updateUsername,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//login router
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//refresh token route
router.post("/refresh_token", refreshUserToken);

//refresh token route
router.post("/update_username", requireAuth, updateUsername);

module.exports = router;
