const User = require("../../models/userModel");
const axios = require("axios");
require("dotenv").config();

const getWeather = (req, res) => {
  const city = req.params.city;
  const units = "metric"; // TODO user config
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios
    .get(url)
    .then((response) => {
      const returnData = {
        city: response.data.name,
        weather: response.data.weather[0].main,
        temperature: response.data.main.temp,
        units: units,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      };
      res.status(200).json(returnData);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const findCity = (req, res) => {
  const { query } = req.body;
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}  `;
  axios
    .get(url)
    .then((response) => {
      if (response.data && response.data.length) {
        const formattedData = response.data.map((city) => {
          return { name: city.name, country: city.country };
        });
        res.status(200).json(formattedData);
      } else {
        res.status(500).json({ message: "City not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

const updateWeatherPreferences = async (req, res) => {
  const { selectedCity } = req.body;
  if (!selectedCity) {
    res.status(400).json({ message: "selectedCity required in body" });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (selectedCity) user.preferences.weatherWidget.city = selectedCity;
    await user.save();
    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getWeather, updateWeatherPreferences, findCity };
