import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Activity,
  Calendar,
  Globe,
  Car,
  Zap,
  ShoppingBag,
  Sprout,
  Droplet,
  Utensils,
  Leaf,
  Award,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  WiThermometer,
  WiStrongWind,
  WiHumidity,
  WiDust,
  WiRain,
  WiCloudy,
} from "react-icons/wi";
import { fetchWeatherData } from "@/services/api";
import { db, auth } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerChildren = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const WeatherCard = ({ weather }) => {
  const weatherData = weather || {
    temp: 22,
    condition: "Sunny",
    wind: 12,
    humidity: 65,
    airQuality: 45,
    feelsLike: 23,
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <WiThermometer className="text-yellow-500 w-12 h-12" />;
      case "rainy":
        return <WiRain className="text-blue-500 w-12 h-12" />;
      case "cloudy":
        return <WiCloudy className="text-gray-500 w-12 h-12" />;
      default:
        return <WiThermometer className="text-yellow-500 w-12 h-12" />;
    }
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 2) return { color: "text-green-500", status: "Good" };
    if (aqi <= 3) return { color: "text-yellow-500", status: "Moderate" };
    if (aqi <= 5)
      return {
        color: "text-orange-500",
        status: "Unhealthy for Sensitive Groups",
      };
    return { color: "text-red-500", status: "Unhealthy" };
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg max-w-full mx-auto"
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
        Today's Weather
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-6 sm:space-y-0">
        <div className="text-center sm:text-left">
          <p className="text-3xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100">
            {weatherData.temp}°C
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 capitalize">
            {weatherData.condition}
          </p>
        </div>
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          {getWeatherIcon(weatherData.condition)}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 p-2 sm:p-3 rounded-lg">
          <WiStrongWind className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Wind
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {weatherData.wind} km/h
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 p-2 sm:p-3 rounded-lg">
          <WiHumidity className="text-green-400 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Humidity
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {weatherData.humidity}%
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 p-2 sm:p-3 rounded-lg">
          <WiThermometer className="text-red-400 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Feels Like
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {weatherData.feelsLike}°C
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800/50 p-2 sm:p-3 rounded-lg col-span-1 sm:col-span-3">
          <WiDust className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Air Quality
            </p>
            <p
              className={`text-gray-900 dark:text-white font-medium ${
                getAirQualityStatus(weatherData.airQuality).color
              }`}
            >
              {weatherData.airQuality} (AQI) -{" "}
              {getAirQualityStatus(weatherData.airQuality).status}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs sm:text-sm text-center text-gray-600 dark:text-gray-400">
        Weather impacts your eco-choices—plan accordingly!
      </p>
    </motion.div>
  );
};

const UserDashboard = () => {
  const { theme } = useTheme();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [ecoStats, setEcoStats] = useState({
    co2Saved: 0,
    treesPlanted: 0,
    waterSaved: 0,
  });
  const [userName, setUserName] = useState("User");
  const footprint = {
    travel: 19.2,
    energy: 25.0,
    food: 30.0,
    shopping: 2.0,
  };
  const recentActivity = [
    "Calculated footprint: 76.20 kg CO₂ on March 12, 2025",
    "Reduced energy usage by 5% on March 10, 2025",
    "Switched to public transport on March 8, 2025",
  ];
  const achievements = [
    "Reduced 10% emissions this month!",
    "Eco-Warrior: Used public transport 5 times!",
  ];
  const recommendations = {
    travel: [
      "Use public transport more often.",
      "Consider biking for short trips.",
    ],
    energy: ["Switch to LED lighting.", "Use renewable energy sources."],
    food: ["Reduce meat consumption.", "Buy locally sourced produce."],
    shopping: ["Opt for second-hand items.", "Choose sustainable brands."],
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Simulated weather data
    const fetchWeather = async (userCity) => {
      try {
        const weatherData = await fetchWeatherData(userCity);
        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    // Simulated eco-stats animation
    const animateStats = () => {
      setEcoStats({ co2Saved: 500, treesPlanted: 1200, waterSaved: 3000 });
    };
    setTimeout(animateStats, 1000);

    // Fetch user data from Firestore
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || "User");
          fetchWeather(userData.location.city);
          if (userData.location) {
            setLocation(
              `${userData.location.city}, ${userData.location.state}, ${userData.location.country}`
            );
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const quickActions = [
    {
      icon: Leaf,
      label: "Log Activity",
      color: "text-green-500",
      action: () => console.log("Log Activity"),
    },
    {
      icon: Activity,
      label: "View Progress",
      color: "text-blue-500",
      action: () => console.log("View Progress"),
    },
    {
      icon: Award,
      label: "Achievements",
      color: "text-yellow-500",
      action: () => console.log("Achievements"),
    },
    {
      icon: Calendar,
      label: "Set Goals",
      color: "text-purple-500",
      action: () => console.log("Set Goals"),
    },
  ];

  return (
    <div
      className={`min-h-screen pt-4 sm:pt-6 md:pt-8 lg:pt-12 mb-4 sm:mb-6 ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-white text-gray-800"
      } overflow-x-hidden`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Hero Welcome Section */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 sm:mb-8 mt-12 md:mb-10 lg:mb-12 text-center relative overflow-hidden py-8 sm:py-10 md:py-12 lg:py-16 rounded-xl shadow-lg bg-gradient-to-br from-green-100/50 to-blue-100/50 dark:from-green-500/20 dark:to-blue-500/20 max-w-full mx-auto"
          style={{ minHeight: "150px", maxHeight: "250px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 via-blue-200/20 to-purple-200/20 dark:from-green-400/20 dark:via-blue-500/20 dark:to-purple-600/20 -z-10" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 1, 0], y: [0, 100, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-2 h-2 bg-green-400 dark:bg-green-300 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: "1.5px",
                height: "1.5px",
                sm: { width: "2px", height: "2px" },
              }}
            />
          ))}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-500 pb-2">
            {greeting}, {userName}!
          </h1>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-500 dark:text-green-400" />
            <span className="text-sm sm:text-base md:text-lg">
              {location || "Loading location..."}
            </span>
          </div>
          <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto">
            Your journey to a greener future starts here with EcoTrack.
          </p>
        </motion.div>

        {/* Main Dashboard Grid */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {/* Weather Card */}
          <WeatherCard weather={weather} />

          {/* Quick Actions */}
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800 dark:text-gray-200">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className={`p-2 sm:p-4 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-50 hover:bg-gray-100"
                  } transition-colors flex flex-col items-center`}
                >
                  <action.icon
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${action.color} mb-1 sm:mb-2`}
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-300">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Eco Stats */}
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-800 dark:text-gray-200">
              Your Eco Impact
            </h2>
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3" />
                <div>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {ecoStats.co2Saved} kg
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    CO₂ Saved
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3" />
                <div>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {ecoStats.treesPlanted}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Trees Planted
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3" />
                <div>
                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {ecoStats.waterSaved} L
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Water Saved
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Carbon Footprint Overview */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-semibold mb-6 mt-6 text-center text-green-600 dark:text-green-400"
          >
            Your Carbon Footprint
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Travel</h3>
              </div>
              <p className="text-lg font-medium text-muted-foreground dark:text-gray-300">
                {footprint.travel.toFixed(2)} kg CO₂
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Energy</h3>
              </div>
              <p className="text-lg font-medium text-muted-foreground dark:text-gray-300">
                {footprint.energy.toFixed(2)} kg CO₂
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Shopping</h3>
              </div>
              <p className="text-lg font-medium text-muted-foreground dark:text-gray-300">
                {footprint.shopping.toFixed(2)} kg CO₂
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Utensils className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Meals</h3>
              </div>
              <p className="text-lg font-medium text-muted-foreground dark:text-gray-300">
                {footprint.food.toFixed(2)} kg CO₂
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Eco-Friendly Recommendations
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Travel</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                {recommendations.travel.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Energy</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                {recommendations.energy.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Shopping</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                {recommendations.shopping.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Utensils className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold">Meals</h3>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground dark:text-gray-300">
                {recommendations.food.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity and Achievements */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Recent Activity */}
          <motion.div
            variants={fadeInUp}
            className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
              theme === "dark" ? "bg-gray-900" : "bg-card"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
                Recent Activity
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-300">
              {recentActivity.map((activity, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-500" />
                  {activity}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements */}
          <motion.div
            variants={fadeInUp}
            className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
              theme === "dark" ? "bg-gray-900" : "bg-card"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
                Achievements
              </h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-300">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-400" />
                  {achievement}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
