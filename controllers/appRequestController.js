const AppRequest = require("../models/appRequests");

const createAppRequest = async (req, res) => {
  try {
    const { name, description, email } = req.body;
    if (!description || description.length < 20) {
      res
        .status(400)
        .json({ error: "Description should be at least 20 characters" });
      return;
    }
    if (!req.user._id) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    const currentRequests = await AppRequest.find({ userId: req.user._id });
    if (currentRequests.length >= 3) {
      res
        .status(400)
        .json({ error: "Max3Requests" });
      return;
    }
    const request = new AppRequest({
      name,
      description,
      contact: email,
      userId: req.user._id,
    });

    await request.save();
    res.status(201).json({ message: "Request created" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create the request" });
    return;
  }
};

module.exports = {
  createAppRequest,
};
