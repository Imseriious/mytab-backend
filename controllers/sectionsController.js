const Sections = require("../models/sectionModel");
const CoinsCollection = require("../models/widgets/widgetCryptoModel");

const getSectionContent = async (req, res) => {
  const sectionId = req.params.sectionId;

  try {
    if (!sectionId) {
      console.log("Id was not provided");
      res.status(500).send("Section ID was not provided");
      return;
    }

    let section = await Sections.findOne({ sectionId });

    if (!section) {
      console.log("Section not found");
      res.status(404).send("No section found with id");
      return;
    }

    if (sectionId === "section-crypto") {
      const cryptoData = await CoinsCollection.findOne();
      const itemsWithPricePromises = section.items.map(async (item) => {
        const cryptoItem = cryptoData.coins.find(
          (x) => x.name.toLowerCase() === item.main.toLowerCase()
        );

        return { ...item, text: cryptoItem ? cryptoItem.price : "Price not found" };
      });

      const itemsWithPrice = await Promise.all(itemsWithPricePromises);
      section.items = itemsWithPrice; // Now 'section.items' contains the updated items with prices
      res.status(200).send(section);
    } else {
      res.status(200).send(section);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occurred while fetching section.`);
  }
};

module.exports = {
  getSectionContent,
};
