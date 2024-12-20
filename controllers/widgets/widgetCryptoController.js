const axios = require("axios");
const User = require("../../models/userModel");
const topCryptoSymbols = require("../../utils/coinMarketCapUtil");
const CoinsCollection = require("../../models/widgets/widgetCryptoModel");
require("dotenv").config();

const getCryptoLogo = async (ids) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_KEY,
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
    const topCryptoSymbolsString = topCryptoSymbols.join(",");

    // Check for existing data in the database
    let cryptoData = await CoinsCollection.findOne();
    let formattedData;
    const halfHourAgo = new Date(Date.now() - 30 * 60 * 1000);

    if (cryptoData && cryptoData.lastFetched > halfHourAgo) {
      // If data is up-to-date, filter for the requested symbols
      formattedData = cryptoData.coins;
    } else {
      const url =
        "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";
      const params = {
        symbol: topCryptoSymbolsString,
        convert: "USD",
      };

      const response = await axios.get(url, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_KEY,
        },
        params: params,
      });

      const coinsData = response.data.data;

      // Check if logos need to be fetched
      let logos = {};
      const shouldFetchLogos =
        !cryptoData || cryptoData.coins.some((coin) => !coin.logo);

      if (shouldFetchLogos) {
        logos = await getCryptoLogo(topCryptoSymbolsString);
      }

      formattedData = Object.keys(coinsData).map((key) => {
        const coin = coinsData[key][0];
        const coinPrice = coin.quote.USD.price;
        const coinPriceChange1H = coin.quote.USD.percent_change_1h;
        const coinPriceChange24H = coin.quote.USD.percent_change_24h;
        const coinPriceChange7D = coin.quote.USD.percent_change_7d;
        const coinPriceChange30D = coin.quote.USD.percent_change_30d;
        const coinMarketCap = coin.quote.USD.market_cap;
        const coinName = coin.name;
        const coinSlug = coin.slug;
        const coinLogo =
          shouldFetchLogos && logos[key] && logos[key].length > 0
            ? logos[key][0].logo
            : cryptoData.coins.find((c) => c.symbol === key)?.logo || "";

        return {
          symbol: key,
          price: coinPrice,
          coinPriceChange1H,
          coinPriceChange24H,
          coinPriceChange7D,
          coinPriceChange30D,
          coinMarketCap,
          name: coinName,
          convert: params.convert,
          logo: coinLogo,
          link: `https://coinmarketcap.com/currencies/${coinSlug}/`,
        };
      });

      // Save new data to the database
      if (cryptoData) {
        // Update the record
        cryptoData.coins = formattedData;
        cryptoData.lastFetched = Date.now();
        await cryptoData.save();
      } else {
        // Create a new record
        cryptoData = new CoinsCollection({ coins: formattedData });
        await cryptoData.save();
      }
    }

    // Filter the formatted data to return only the selected symbols
    const returnData = formattedData;

    res.status(200).json(returnData);
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
