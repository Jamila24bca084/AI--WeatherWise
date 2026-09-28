const axios = require("axios");
const { generateWeatherInsight } = require("../utils/gemini");

async function fetchWeather(city, country) {
  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OPENWEATHER_API_KEY is missing in .env");
  }

  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: country ? `${city},${country}` : city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric"
      },
      timeout: 10000
    }
  );

  const data = response.data;

  return {
    city: data.name,
    country: data.sys?.country || country || "",
    temperature: data.main?.temp,
    feelsLike: data.main?.feels_like,
    minTemperature: data.main?.temp_min,
    maxTemperature: data.main?.temp_max,
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    windSpeed: data.wind?.speed,
    description: data.weather?.[0]?.description || "Unknown",
    condition: data.weather?.[0]?.main || "Unknown",
    visibility: data.visibility,
    sunrise: data.sys?.sunrise
      ? new Date(data.sys.sunrise * 1000).toISOString()
      : null,
    sunset: data.sys?.sunset
      ? new Date(data.sys.sunset * 1000).toISOString()
      : null,
    coordinates: data.coord || null
  };
}

async function getCurrentWeather(req, res, next) {
  try {
    const { city, country } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City query parameter is required"
      });
    }

    const weather = await fetchWeather(city, country);

    res.json({
      success: true,
      weather
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    next(error);
  }
}

async function getWeatherInsight(req, res, next) {
  try {
    const { city, country } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City query parameter is required"
      });
    }

    const weather = await fetchWeather(city, country);
    const insight = await generateWeatherInsight(weather);

    res.json({
      success: true,
      weather,
      aiInsight: insight
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "City not found"
      });
    }

    next(error);
  }
}

module.exports = {
  getCurrentWeather,
  getWeatherInsight
};
