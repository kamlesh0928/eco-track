const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getWeatherData = async (city) => {
  try {

    const prompt = `You are a weather simulation tool. Based on the general climate of the city ${city}, generate a JSON response with the following fields:
    - temperature (in °C)
    - feelsLike (in °C)
    - condition (e.g., sunny, rainy, cloudy)
    - wind (in km/h)
    - humidity (in %)
    - airQuality (AQI value from 1 to 5)
    - summary (a short conversational summary of the weather)

    Example JSON response:
    {
      "temp": 28,
      "feelsLike": 30,
      "condition": "sunny",
      "wind": 12,
      "humidity": 65,
      "airQuality": 2,
      "summary": "The weather in ${city} is warm and sunny, with a gentle breeze. It feels like 30°C due to the humidity."
    }

    Generate a valid JSON response for the current weather in ${city}. Do not include any additional text or formatting.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Response:", text);

    const cleanedResponse = text.replace(/```json|```/g, "").trim();

    try {
      const weatherData = JSON.parse(cleanedResponse);
      return weatherData;
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      throw new Error("Failed to parse weather data");
    }
  } catch (error) {
    console.error("Error fetching weather data from Gemini:", error);
    throw error;
  }
};

module.exports = { getWeatherData };