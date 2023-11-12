const mongoose = require("mongoose");

const appRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AppRequest", appRequestSchema);
