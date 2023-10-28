const mongoose = require("mongoose");

const widgetQuoteSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    }
  },
);

module.exports = mongoose.model("WidgetQuote", widgetQuoteSchema);
