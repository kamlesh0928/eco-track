import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Activity,
  Award,
  Calendar,
  MapPin,
  Globe,
  Sprout,
  Droplet,
  Trophy,
  CheckCircle,
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

import { auth, db } from "../services/firebase";
import { fetchWeatherData } from "../services/api";
import { doc, getDoc } from "firebase/firestore";

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

// WeatherCard Component
const WeatherCard = ({ weather }) => {
  const weatherData = weather || {
    temp: 22,
    condition: "Sunny",
    wind: 12,
    humidity: 65,
    airQuality: 45,
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
    if (aqi <= 50) return { color: "text-green-500", status: "Good" };
    if (aqi <= 100) return { color: "text-yellow-500", status: "Moderate" };
    if (aqi <= 150)
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

// Home Component
const Home = () => {
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

  const ecoTips = [
    "Switch to LED bulbs to save up to 80% energy.",
    "Carry a reusable bag to reduce plastic waste.",
    "Opt for plant-based meals to lower your carbon footprint.",
    "Unplug electronics when not in use to cut phantom power.",
    "Choose walking or cycling for short trips.",
    "Compost organic waste to enrich soil naturally.",
  ];

  const challenges = [
    {
      title: "No Plastic Week",
      desc: "Avoid single-use plastics for 7 days.",
      points: 100,
    },
    {
      title: "Eco Commute",
      desc: "Use public transport or bike for a week.",
      points: 150,
    },
    {
      title: "Water Saver",
      desc: "Reduce shower time by 2 minutes daily.",
      points: 80,
    },
  ];

  const leaderboard = [
    { name: "Alex G.", points: 2450, rank: 1 },
    { name: "Priya S.", points: 2100, rank: 2 },
    { name: "Liam K.", points: 1980, rank: 3 },
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
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center relative overflow-hidden py-8 sm:py-10 md:py-12 lg:py-16 rounded-xl shadow-lg bg-gradient-to-br from-green-100/50 to-blue-100/50 dark:from-green-500/20 dark:to-blue-500/20 max-w-full mx-auto"
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

        {/* Activity Overview */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Today’s Activity Snapshot
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className={`p-3 sm:p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Carbon Footprint
              </p>
              <p className="text-xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                2.5 kg CO₂
              </p>
              <p className="text-xs sm:text-sm text-green-500 mt-1 sm:mt-2">
                ↓ 15% vs. yesterday
              </p>
            </div>
            <div
              className={`p-3 sm:p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Tasks Completed
              </p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                4/6
              </p>
              <p className="text-xs sm:text-sm text-blue-500 mt-1 sm:mt-2">
                2 remaining
              </p>
            </div>
            <div
              className={`p-3 sm:p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                Points Earned
              </p>
              <p className="text-xl sm:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                150
              </p>
              <p className="text-xs sm:text-sm text-yellow-500 mt-1 sm:mt-2">
                +50 today
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-6 w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold shadow-lg hover:from-green-600 hover:to-blue-600 text-sm sm:text-base"
          >
            View Full Report
          </motion.button>
        </motion.div>

        {/* Eco Tips Section */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-green-50 dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Daily Eco Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {ecoTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-2 sm:p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-start`}
              >
                <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 mt-0.5 mr-1 sm:mr-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Challenges Section */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-card dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Current Challenges
          </h2>
          <div className="space-y-3 sm:space-y-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-2 sm:p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500 mr-1 sm:mr-3" />
                  <div>
                    <p className="text-base sm:text-lg font-semibold">
                      {challenge.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
                      {challenge.desc}
                    </p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-yellow-500">
                  {challenge.points} pts
                </span>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-6 w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-green-500 text-white font-semibold shadow-lg hover:bg-green-600 text-sm sm:text-base"
          >
            Join a Challenge
          </motion.button>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-card dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Leaderboard Top 3
          </h2>
          <div className="space-y-3 sm:space-y-6">
            {leaderboard.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-2 sm:p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <Trophy
                    className={`w-4 h-4 sm:w-6 sm:h-6 ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-400"
                        : "text-amber-600"
                    } mr-1 sm:mr-3`}
                  />
                  <div>
                    <p className="text-base sm:text-lg font-semibold">
                      {user.name}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300">
                      Rank #{user.rank}
                    </p>
                  </div>
                </div>
                <span className="text-base sm:text-lg font-bold text-yellow-500">
                  {user.points} pts
                </span>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-6 w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 text-sm sm:text-base"
          >
            View Full Leaderboard
          </motion.button>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-center py-8 sm:py-10 md:py-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Ready to Make a Bigger Impact?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-5 md:mb-6 max-w-xs sm:max-w-sm md:max-w-xl mx-auto">
            Join thousands of users reducing their footprint with EcoTrack’s
            AI-powered tools.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 sm:py-3 px-4 sm:px-6 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 text-sm sm:text-base"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
