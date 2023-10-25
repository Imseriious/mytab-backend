const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Function to create Access Token
const createAccessToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "15m" }); //TODO, maybe longer
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
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });


    res
      .status(200)
      .json({ email, token: accessToken, preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SignUp User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    const userPreferences = user.preferences;

    // Send refresh token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ email, token: accessToken, preferences: userPreferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, refreshUserToken };
