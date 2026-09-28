const express = require("express");
const {
  getCurrentWeather,
  getWeatherInsight
} = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public real-time weather endpoint
router.get("/current", getCurrentWeather);

// Authenticated AI weather insight endpoint
router.get("/insight", authMiddleware, getWeatherInsight);

module.exports = router;
