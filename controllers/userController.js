const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Function to create Access Token
const createAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30m" }); //TODO, maybe longer
};

// Function to create Refresh Token
const createRefreshToken = (_id) => {
  return jwt.sign({ _id }, process.env.REFRESH_SECRET, { expiresIn: "60d" });
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
    res.json({ accessToken });
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    // Send refresh token as a cookie
    // Send refresh token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // The cookie is only accessible by the server
      secure: true, // Ensure the cookie is sent over HTTPS
      sameSite: "None", // The cookie is sent with every request when None, use 'Lax' or 'Strict' for CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // Set the cookie to expire after one day
    });

    res.status(200).json({
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
  res.cookie("accessToken", "", { maxAge: 0 });
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// SignUp User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    const userPreferences = user.preferences;

    res.cookie("refreshToken", token, {
      httpOnly: true, // The cookie is only accessible by the server
      secure: true, // Ensure the cookie is sent over HTTPS
      sameSite: "None", // The cookie is sent with every request when None, use 'Lax' or 'Strict' for CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // Set the cookie to expire after one day
    });

    res.status(200).json({ email, preferences: userPreferences });
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

    user.username = username;
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

// Update Dock Items Order
const updateDockItemsOrder = async (req, res) => {
  const { newOrder } = req.body;

  try {
    if (!newOrder) {
      res.status(500).json({ error: "Order is required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    user.preferences.dockItemsOrder = newOrder;
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
  updateDockItemsOrder,
};
