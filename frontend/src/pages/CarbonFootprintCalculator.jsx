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
import { useCustomTheme } from "../hooks/useTheme"; // Assuming this exists; replace with your custom hook

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
  const { currentTheme, setTheme } = useCustomTheme(); // Changed to useCustomTheme
  const [travelType, setTravelType] = useState("car");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [food, setFood] = useState("");
  const [shopping, setShopping] = useState("");
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState("");
  const [carbonCalcLoading, setCarbonCalcLoading] = useState(false);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  const fetchCarbonFootprint = async (data) => {
    const response = await fetch(
      "https://eco-track-demo-mpsa.onrender.com/calculate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to calculate carbon footprint");
    }
    return response.json();
  };

  const fetchRecommendations = async (data) => {
    const response = await fetch(
      "https://eco-track-demo-mpsa.onrender.com/recommend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
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
    setCarbonCalcLoading(true);

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
      setCarbonCalcLoading(false);
    }
  };

  const getRecommendations = async () => {
    setError("");
    setRecommendationsLoading(true);

    try {
      const data = {
        travel_emission: result.travel_emission,
        energy_emission: result.energy_emission,
        food_emission: result.food_emission,
        shopping_emission: result.shopping_emission,
      };

      const recommendationsData = await fetchRecommendations(data);

      const cleanRecommendations = (list) => {
        return list
          .filter((tip) => tip && !tip.includes(":") && tip.trim().length > 2)
          .map((tip) => tip.trim());
      };

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

      setRecommendations(cleanedRecommendations);
    } catch (err) {
      setError("Error fetching recommendations.");
    } finally {
      setRecommendationsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 mb-8 ${
        currentTheme === "dark" ? "bg-gray-950 text-gray-100" : ""
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
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className={`p-2.5 rounded-full shadow-lg transition-all duration-300 ${
              currentTheme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {currentTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-12"
        >
          <div className="absolute rounded-lg inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
          <motion.div className="relative inline-block">
            <Leaf
              size={70}
              className="mx-auto mb-6 text-green-500 animate-bounce"
            />
          </motion.div>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 1, 0], y: [0, 100, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-2 h-2 bg-green-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Calculate Your Carbon Footprint
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
          className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg border backdrop-blur-lg ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
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
                currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Travel Type
            </label>
            <div className="relative">
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  currentTheme === "dark"
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
                currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
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
                  currentTheme === "dark"
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
                currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
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
                  currentTheme === "dark"
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
                currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
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
                  currentTheme === "dark"
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
                currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
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
                  currentTheme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={carbonCalcLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
            className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center justify-center gap-2 ${
              carbonCalcLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {carbonCalcLoading ? "Calculating..." : "Calculate Footprint"}
          </motion.button>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.div
            variants={fadeInUp}
            className={`mt-6 p-4 rounded-lg flex items-center justify-center gap-2 ${
              currentTheme === "dark"
                ? "bg-red-900/50 text-red-400"
                : "bg-red-50 text-red-600"
            } max-w-2xl mx-auto`}
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
            className={`mt-8 max-w-2xl mx-auto p-8 rounded-xl shadow-lg border backdrop-blur-lg ${
              currentTheme === "dark"
                ? "bg-gray-900 border-gray-800"
                : "bg-green-50 border-gray-200"
            }`}
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
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } flex items-center gap-3`}
              >
                <Car className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    Travel
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {result.travel_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } flex items-center gap-3`}
              >
                <Zap className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    Energy
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {result.energy_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } flex items-center gap-3`}
              >
                <Utensils className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    Food
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {result.food_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } flex items-center gap-3`}
              >
                <ShoppingBag className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-200">
                    Shopping
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {result.shopping_emission.toFixed(2)} kg CO₂
                  </p>
                </div>
              </motion.div>
            </div>
            <motion.button
              onClick={getRecommendations}
              disabled={recommendationsLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUp}
              className={`mt-6 w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white ${
                recommendationsLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {recommendationsLoading ? "Loading..." : "Get Recommendations"}
            </motion.button>
          </motion.div>
        )}

        {/* Recommendations Section */}
        {recommendations && (
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
            className={`mt-8 max-w-2xl mx-auto p-8 rounded-xl shadow-lg border backdrop-blur-lg ${
              currentTheme === "dark"
                ? "bg-gray-900 border-gray-800"
                : "bg-green-50 border-gray-200"
            }`}
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
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Car className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">
                    Travel
                  </h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                  {recommendations.travel.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">
                    Energy
                  </h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                  {recommendations.energy.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Utensils className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">
                    Food
                  </h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                  {recommendations.food.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag className="w-6 h-6 text-green-500" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">
                    Shopping
                  </h4>
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
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
