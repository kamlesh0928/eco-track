const express = require("express");
const { getWeatherData } = require("../services/weatherService");

const router = express.Router();

router.get("/weather/:city", async (req, res) => {
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
