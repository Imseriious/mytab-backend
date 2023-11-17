const mongoose = require("mongoose");

const accessRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    socialPlatform: {
      type: String,
      required: true,
      unqiue: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccessRequest", accessRequestSchema);
