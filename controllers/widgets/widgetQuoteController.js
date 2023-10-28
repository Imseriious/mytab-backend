const WidgetQuote = require("../../models/widgets/widgetQuoteModel");

// Helper function to get a random element from an array
const getRandomElement = array => {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

const getQuote = (req, res) => {
  WidgetQuote.find({})
    .then(quotes => {
      // Get a random quote from the retrieved quotes
      const randomQuote = getRandomElement(quotes);
      if (!randomQuote) {
        return res.status(404).json({ error: "No quotes found" });
      }

      // Send the random quote as a response
      res.status(200).json(randomQuote);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
};

module.exports = { getQuote };
