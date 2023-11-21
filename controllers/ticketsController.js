const AppRequest = require("../models/appRequests");
const BugReport = require("../models/bugReports");
const AccessRequest = require("../models/accessRequest");

const validator = require("validator");

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
      res.status(400).json({ error: "Max3Requests" });
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

const bugReport = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || description.length < 10) {
      res
        .status(400)
        .json({ error: "Description should be at least 10 characters" });
      return;
    }
    if (!req.user._id) {
      res.status(400).json({ error: "User not found" });
      return;
    }
    const currentBugReports = await BugReport.find({ userId: req.user._id });
    if (currentBugReports.length >= 20) {
      res.status(400).json({ error: "Max20Requests" });
      return;
    }
    const bugReport = new BugReport({
      description,
      userId: req.user._id,
    });

    await bugReport.save();
    res.status(201).json({ message: "Bug report created" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create the bug report" });
    return;
  }
};

const accessRequest = async (req, res) => {
  try {
    const { email, socialPlatform, userType } = req.body;
    if (!email || !socialPlatform || !userType) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ error: "Email is not valid" });
      return;
    }

    const currentAccessRequest = await AccessRequest.findOne({ email: email });
    if (currentAccessRequest) {
      res.status(400).json({
        error:
          "You have already requested access, we will process all requests soon!",
      });
      return;
    }

    const usedSocialMedia = await AccessRequest.findOne({
      socialPlatform: socialPlatform,
    });

    if (usedSocialMedia) {
      res.status(400).json({
        error:
          "You have already requested access, we will process all requests soon! (Social already used)",
      });
      return;
    }

    const accessRequest = new AccessRequest({
      email,
      socialPlatform,
      userType,
    });

    await accessRequest.save();
    res.status(201).json({ message: "Access requested" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to request access", error });
    return;
  }
};

module.exports = {
  createAppRequest,
  bugReport,
  accessRequest,
};
