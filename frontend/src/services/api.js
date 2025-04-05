import axios from "axios";

const API_BASE_URL = "https://eco-track-mvp-backend.onrender.com/api";

export const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weather/${city}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};
