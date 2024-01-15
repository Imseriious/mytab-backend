const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  items: [
    {
      main: { type: String, required: false },
      text: { type: String, required: false },
      media: { type: String, required: false },
      icon: { type: String, required: false },
      url: { type: String, required: false },
    },
  ],
  sectionTitle: { type: String, required: true },
  sectionId: { type: String, required: true },
  sectionDescription: { type: String, required: true },
  sectionIcon: { type: String, required: false },
  sectionCardBackground: { type: String, required: false },
  sectionCreator: { type: String, required: false },
  sectionItems: { type: Number },
  sectionUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Section", sectionSchema);
