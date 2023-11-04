const express = require("express");
const {
  signupUser,
  loginUser,
  logout,
  refreshUserToken,
  updateUsername,
  updateSidebarItemsOrder,
  updateDockItemsOrder
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//login router
router.post("/login", loginUser);

router.post("/logout", logout);

//signup route
router.post("/signup", signupUser);

//refresh token route
router.post("/refresh_token", refreshUserToken);

//Update username
router.post("/update_username", requireAuth, updateUsername);

//Update sidebar items order
router.post("/sidebar_items_order", requireAuth, updateSidebarItemsOrder);

//Update dock items order
router.post("/dock_items_order", requireAuth, updateDockItemsOrder);

module.exports = router;
