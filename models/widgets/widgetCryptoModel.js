const mongoose = require("mongoose");

// Define the schema for individual coin data
const CoinDataSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coinPriceChange1H: {
    type: Number,
  },
  coinPriceChange24H: {
    type: Number,
  },
  coinPriceChange7D: {
    type: Number,
  },
  coinPriceChange30D: {
    type: Number,
  },
  coinMarketCap: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  convert: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
});

// Define the schema for the collection of coin data
const CoinsCollectionSchema = new mongoose.Schema({
  coins: [CoinDataSchema],
  lastFetched: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const CoinsCollection = mongoose.model(
  "CoinsCollection",
  CoinsCollectionSchema
);

module.exports = CoinsCollection;
