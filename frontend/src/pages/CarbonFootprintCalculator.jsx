import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Zap,
  Utensils,
  ShoppingBag,
  Leaf,
  Sun,
  Moon,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "next-themes";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const CarbonFootprintCalculator = () => {
  const { theme, setTheme } = useTheme();
  const [travelType, setTravelType] = useState("car");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [food, setFood] = useState("");
  const [shopping, setShopping] = useState("");
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCarbonFootprint = async (data) => {
    const response = await fetch("http://127.0.0.1:5000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to calculate carbon footprint");
    }
    return response.json();
  };

  const fetchRecommendations = async (data) => {
    const response = await fetch("http://127.0.0.1:5000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }
    return response.json();
  };

  const calculateFootprint = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setRecommendations(null);
    setLoading(true);

    try {
      const data = {
        travelType,
        distance: parseFloat(distance) || 0,
        electricity: parseFloat(electricity) || 0,
        food: parseFloat(food) || 0,
        shopping: parseFloat(shopping) || 0,
      };

      const footprintData = await fetchCarbonFootprint(data);
      setResult(footprintData);
    } catch (err) {
      setError("Error calculating footprint. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendations = async () => {
    setError("");
    setLoading(true);

    try {
      const data = {
        travel_emission: result.travel_emission,
        energy_emission: result.energy_emission,
        food_emission: result.food_emission,
        shopping_emission: result.shopping_emission,
      };

      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const recommendationsData = await response.json();

      // Helper function to clean recommendations
      const cleanRecommendations = (list) => {
        return list
          .filter((tip) => {
            // Remove tips that are empty, contain only a colon, or are too short
            return (
              tip &&
              !tip.includes(":") && // Remove tips like "Travel:"
              tip.trim().length > 2 // Remove tips with less than 3 characters
            );
          })
          .map((tip) => tip.trim()); // Trim whitespace from tips
      };

      // Clean up each category of recommendations
      const cleanedRecommendations = {
        travel: cleanRecommendations(
          recommendationsData.recommendations?.travel || []
        ),
        energy: cleanRecommendations(
          recommendationsData.recommendations?.energy || []
        ),
        food: cleanRecommendations(
          recommendationsData.recommendations?.food || []
        ),
        shopping: cleanRecommendations(
          recommendationsData.recommendations?.shopping || []
        ),
      };

      // Set the cleaned recommendations in the state
      setRecommendations(cleanedRecommendations);
    } catch (err) {
      setError("Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 mb-8 ${
        theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-black"
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 sm:px-6 lg:px-8">
        {/* Dark Mode Toggle */}
        <motion.div
          className="fixed top-5 right-5 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2.5 rounded-full shadow-lg transition-all duration-300 ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? (
              <Sun size={28} className="text-yellow-400 animate-pulse" />
            ) : (
              <Moon size={28} className="text-green-500 animate-spin" />
            )}
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.div {...fadeInUp} className="mb-12 text-center py-16">
          <motion.div className="relative inline-block">
            <Leaf
              size={70}
              className="mx-auto mb-6 text-green-500 animate-bounce"
            />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Calculate Your Carbon Footprint
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Understand your environmental impact with EcoTrack’s advanced
            calculator. Input your daily activities and receive personalized
            recommendations to reduce your carbon footprint.
          </p>
        </motion.div>

        {/* Calculator Form */}
        <motion.form
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          onSubmit={calculateFootprint}
          className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
            theme === "dark" ? "bg-gray-900" : "bg-card"
          }`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Your Daily Impact
          </motion.h2>

          {/* Travel Type */}
          <motion.div variants={fadeInUp} className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Travel Type
            </label>
            <div className="relative">
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
              >
                <option value="car">Car</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="flight">Flight</option>
              </select>
            </div>
          </motion.div>

          {/* Distance */}
          <motion.div variants={fadeInUp} className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Distance Travelled (km)
            </label>
            <div className="relative">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                min="0"
                placeholder="Enter distance in km"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Electricity */}
          <motion.div variants={fadeInUp} className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Electricity Used (kWh)
            </label>
            <div className="relative">
              <input
                type="number"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
                min="0"
                placeholder="Enter electricity in kWh"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Food */}
          <motion.div variants={fadeInUp} className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Food Consumption (kg of meat/dairy)
            </label>
            <div className="relative">
              <input
                type="number"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                min="0"
                placeholder="Enter food in kg"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Shopping */}
          <motion.div variants={fadeInUp} className="mb-8">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Shopping Spent ($)
            </label>
            <div className="relative">
              <input
                type="number"
                value={shopping}
                onChange={(e) => setShopping(e.target.value)}
                min="0"
                placeholder="Enter shopping amount"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
            className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Calculate Footprint
          </motion.button>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.div
            variants={fadeInUp}
            className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center gap-2 max-w-2xl mx-auto"
          >
            <AlertTriangle size={20} />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Results Section */}
        {result && (
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="mt-8 max-w-2xl mx-auto bg-card dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
            >
              Your Carbon Footprint: {result.total_emission.toFixed(2)} kg CO₂
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-center gap-3`}
              >
                <Car className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold">Travel</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    {result.travel_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-center gap-3`}
              >
                <Zap className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold">Energy</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    {result.energy_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-center gap-3`}
              >
                <Utensils className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold">Food</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    {result.food_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-center gap-3`}
              >
                <ShoppingBag className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold">Shopping</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    {result.shopping_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.button
              onClick={getRecommendations}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUp}
              className={`mt-6 w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Get Recommendations"}
            </motion.button>
          </motion.div>
        )}

        {/* Recommendations Section */}
        {recommendations && (
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className="mt-8 max-w-2xl mx-auto bg-green-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
            >
              Eco-Friendly Recommendations
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Car className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold">Travel</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                  {recommendations.travel.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold">Energy</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                  {recommendations.energy.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Utensils className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold">Food</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                  {recommendations.food.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold">Shopping</h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                  {recommendations.shopping.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 text-center py-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Take the Next Step
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Reduce your carbon footprint and contribute to a sustainable future.
            Explore more features on EcoTrack and join a global community of
            eco-warriors.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-10 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Explore More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
