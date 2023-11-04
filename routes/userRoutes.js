const express = require("express");
const {
  signupUser,
  loginUser,
  refreshUserToken,
  updateUsername,
  updateSidebarItemsOrder
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//login router
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//refresh token route
router.post("/refresh_token", refreshUserToken);

//Update username
router.post("/update_username", requireAuth, updateUsername);

//Update sidebar items order
router.post("/sidebar_items_order", requireAuth, updateSidebarItemsOrder);

module.exports = router;
