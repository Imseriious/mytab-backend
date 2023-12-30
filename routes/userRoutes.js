const express = require("express");
const {
  signupUser,
  loginUser,
  logout,
  refreshUserToken,
  updateUsername,
  updateSidebarItemsOrder,
  updateSidebarCategoryFoldersOrder,
  updateFavoritesbarItemsOrder,
  updateUserThemeColor,
  updateUserBlurStyle,
  collapsedBookmarks,
  completeUserOnboarding,
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

router.post("/sidebar_items_order", requireAuth, updateSidebarItemsOrder);

router.post(
  "/sidebar_category_order",
  requireAuth,
  updateSidebarCategoryFoldersOrder
);

//Update Favoritesbar items order
router.post(
  "/favoritesbar_items_order",
  requireAuth,
  updateFavoritesbarItemsOrder
);

//Update Theme color
router.post("/theme_color", requireAuth, updateUserThemeColor);

//Complete user onboarding
router.post("/complete_user_onboarding", requireAuth, completeUserOnboarding);

//Update Blur style
router.post("/blur_style", requireAuth, updateUserBlurStyle);

//Update Bookmark collapsed
router.post("/bookmark_collapse", requireAuth, collapsedBookmarks);

module.exports = router;
