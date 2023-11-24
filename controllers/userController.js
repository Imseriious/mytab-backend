const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Function to create Access Token
const createAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "50m" });
};

// Function to create Access Token
const createExtensionToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

// Function to create Refresh Token
const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH_SECRET, { expiresIn: "365d" });
};

// Refresh token
const refreshUserToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res
      .status(401)
      .send("Access Denied - Refresh token cookie not found");

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid Refresh Token");

    const accessToken = createAccessToken(user._id);
    const extensionToken = createExtensionToken(user._id);
    res.json({ accessToken, extensionToken });
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    const extensionToken = createExtensionToken(user._id);
    // Send refresh token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      extensionToken,
      email,
      preferences: user.preferences,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Logout endpoint
const logout = async (req, res) => {
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// SignUp User
const signupUser = async (req, res) => {
  const { email, password, inviteCode } = req.body;

  try {
    const user = await User.signup(email, password, inviteCode);
    const accessToken = createAccessToken(user._id);
    const extensionToken = createExtensionToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    const userPreferences = user.preferences;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      extensionToken,
      email,
      preferences: userPreferences,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Change username
const updateUsername = async (req, res) => {
  const { username } = req.body;

  try {
    if (!username) {
      res.status(400).json({ error: "Username is required" });
    }

    if (username.length < 3) {
      res.status(400).json({ error: "Username is too short" });
    }

    const userNameExists = await User.findOne({ username });

    if (userNameExists) {
      res.status(400).json({ error: "Username is already in use" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.username = username.toLowerCase();
    await user.save();

    res.status(200).json({ message: "Username updated correctly" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Sidebar Items Order
const updateSidebarItemsOrder = async (req, res) => {
  const { newOrder } = req.body;

  try {
    if (!newOrder) {
      res.status(500).json({ error: "Order is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.preferences.sidebarItemsOrder = newOrder;
    await user.save();

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Sidebar Items Order
const updateSidebarCategoryFoldersOrder = async (req, res) => {
  const { categoryId, newOrder } = req.body;

  try {
    if (!categoryId) {
      res.status(500).json({ error: "Category ID is required" });
    }

    if (!newOrder) {
      res.status(500).json({ error: "Order is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const userCategoryOrder =
      user.preferences.sidebarCategoryFoldersOrder.filter(
        (category) => category.categoryId === categoryId
      )[0];

    if (userCategoryOrder) {
      userCategoryOrder.order = newOrder;
    } else {
      const newCategoryOrderObject = {
        categoryId: categoryId,
        order: newOrder,
      };
      user.preferences.sidebarCategoryFoldersOrder.push(newCategoryOrderObject);
    }

    await user.save();

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Favoritesbar Items Order
const updateUserThemeColor = async (req, res) => {
  const { newColor } = req.body;

  try {
    if (!newColor) {
      res.status(500).json({ error: "Color is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.preferences.theme.color = newColor;
    await user.save();

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Favoritesbar Items Order
const updateFavoritesbarItemsOrder = async (req, res) => {
  const { newOrder } = req.body;

  try {
    if (!newOrder) {
      res.status(500).json({ error: "Order is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.preferences.favoritesBarItemsOrder = newOrder;
    await user.save();

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logout,
  refreshUserToken,
  updateUsername,
  updateSidebarItemsOrder,
  updateSidebarCategoryFoldersOrder,
  updateFavoritesbarItemsOrder,
  updateUserThemeColor
};
