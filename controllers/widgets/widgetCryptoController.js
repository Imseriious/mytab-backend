const axios = require("axios");
const apiKey = "3b226db2-4211-4cf1-8aab-ca849a7d27d0";
const User = require("../../models/userModel");

const getCryptoLogo = async (ids) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
        params: {
          symbol: ids, // Pass the comma-separated string of IDs
          aux: "logo",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(`Error fetching cryptocurrency logos: ${error.message}`);
  }
};

const getCryptoInfo = async (req, res) => {
  try {
    const selectedSymbols = req.query.selectedSymbols;
    const selectedSymbolsString = selectedSymbols.join(",");

    const url =
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";

    const params = {
      symbol: selectedSymbolsString,
      convert: "USD",
    };

    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
      params: params,
    });

    // Processing data for multiple cryptocurrencies
    const coinsData = response.data.data;
    //const idsString = Object.keys(coinsData).join(","); // Join the keys into a comma-separated string
    const logos = await getCryptoLogo(selectedSymbolsString);
    const returnData = Object.keys(coinsData).map((key) => {
      const coin = coinsData[key][0];
      const coinPrice = coin.quote.USD.price;
      const coinName = coin.name;

      const coinLogo = logos[key][0].logo;

      return {
        symbol: key,
        price: coinPrice,
        name: coinName,
        convert: params.convert,
        logo: coinLogo,
      };
    });

    res.status(200).json(returnData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateCryptoPreferences = async (req, res) => {
  const { selectedCryptos } = req.body;
  if (!selectedCryptos) {
    res.status(400).json({ message: "selectedCryptos required in body" });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (selectedCryptos) user.preferences.cryptoWidget = selectedCryptos;
    await user.save();
    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCryptoInfo, updateCryptoPreferences };
