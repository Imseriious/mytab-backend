const axios = require("axios");

const getWeather = (req, res) => {
  const city = req.params.city;
  const units = "metric"; // TODO user config
  const apiKey = "34abe7ce36d9d34ff5f2248ccc2971b8"; // Make sure to replace 'myapikey' with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios
    .get(url)
    .then((response) => {
      const returnData = {
        city: response.data.name,
        weather: response.data.weather[0].main,
        temperature: response.data.main.temp,
        units: units,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      };
      res.status(200).json(returnData);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = { getWeather };
