const User = require("../models/userModel");

const getProfile = async (req, res) => {
  try {
    const profileUser = await User.findOne({
      username: req.params.username,
    });

    if (!profileUser) {
      res.status(400).json({
        error: `Could not find user user: ${req.params.username} `,
      });
      return;
    }

    const profileData = {
      picture: "default",
      username: profileUser.username,
    };

    res.status(200).json({ profileData: profileData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  getProfile,
};
