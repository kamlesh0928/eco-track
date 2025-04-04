import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
import {
  User,
  Home,
  Users,
  Target,
  Trophy,
  Settings,
  Leaf,
  Droplet,
  Cloud,
  Bike,
  Bus,
  Flame,
  Share2,
  Zap,
  Sprout,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Activity categories with icons and impact calculations
const activityCategories = [
  { name: "Commute", icon: Bike, impact: (qty) => ({ co2Saved: qty * 0.5 }) },
  {
    name: "Energy Usage",
    icon: Zap,
    impact: (qty) => ({ co2Saved: qty * 0.3 }),
  },
  {
    name: "Water Consumption",
    icon: Droplet,
    impact: (qty) => ({ waterSaved: qty }),
  },
  {
    name: "Recycling",
    icon: Sprout,
    impact: (qty) => ({ co2Saved: qty * 1.2 }),
  },
];

// Sample leaderboard data
const leaderboardData = [
  { name: "Alex", ecoScore: 92 },
  { name: "Maya", ecoScore: 88 },
  { name: "Sam", ecoScore: 85 },
  { name: "You", ecoScore: 80 },
];

// Achievements data with conditions
const achievementsData = [
  {
    name: "Eco Starter",
    icon: Sprout,
    description: "Logged your first activity!",
    condition: (activities) => activities.length >= 1,
  },
  {
    name: "Carbon Crusher",
    icon: Cloud,
    description: "Saved 50kg of CO2!",
    condition: (totalImpact) => totalImpact.co2Saved >= 50,
  },
  {
    name: "Water Warrior",
    icon: Droplet,
    description: "Saved 500L of water!",
    condition: (totalImpact) => totalImpact.waterSaved >= 500,
  },
  {
    name: "Waste Wizard",
    icon: Trash2,
    description: "Reduced 10kg of waste!",
    condition: (totalImpact) => totalImpact.wasteReduced >= 10,
  },
];

// Activity Tracking Component
const ActivityTracking = () => {
  const { currentTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [ecoScore, setEcoScore] = useState(80);
  const [streak, setStreak] = useState(5);
  const [activities, setActivities] = useState([]);
  const [wasteActivities, setWasteActivities] = useState([]);
  const [transportMode, setTransportMode] = useState("Walking");
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Reduce energy usage by 10 kWh",
      target: 10,
      current: 6,
      unit: "kWh",
    },
    {
      id: 2,
      name: "Use public transport 5 times",
      target: 5,
      current: 4,
      unit: "times",
    },
  ]);
  const [newGoal, setNewGoal] = useState({ name: "", target: "" });
  const [carbonFootprintData, setCarbonFootprintData] = useState([
    { day: "Mon", footprint: 2.5 },
    { day: "Tue", footprint: 2.0 },
    { day: "Wed", footprint: 3.0 },
    { day: "Thu", footprint: 1.8 },
    { day: "Fri", footprint: 2.2 },
    { day: "Sat", footprint: 1.5 },
    { day: "Sun", footprint: 2.0 },
  ]);

  useEffect(() => {
    setMounted(true);
    const savedActivities =
      JSON.parse(localStorage.getItem("activities")) || [];
    const savedWasteActivities =
      JSON.parse(localStorage.getItem("wasteActivities")) || [];
    setActivities(savedActivities);
    setWasteActivities(savedWasteActivities);

    const totalPoints =
      savedActivities.reduce((acc, activity) => {
        if (activity.impact.co2Saved) acc += activity.impact.co2Saved;
        if (activity.impact.waterSaved) acc += activity.impact.waterSaved;
        return acc;
      }, 0) +
      savedWasteActivities.reduce(
        (acc, activity) => acc + activity.quantity,
        0
      );
    setEcoScore(Math.min(100, 80 + totalPoints * 0.1));

    const transportModes = ["Walking", "Public Transport", "Cycling"];
    const interval = setInterval(() => {
      setTransportMode(
        transportModes[Math.floor(Math.random() * transportModes.length)]
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const isDarkMode = currentTheme === "dark";

  const totalImpact = activities.reduce(
    (acc, activity) => {
      if (activity.impact.co2Saved) acc.co2Saved += activity.impact.co2Saved;
      if (activity.impact.waterSaved)
        acc.waterSaved += activity.impact.waterSaved;
      return acc;
    },
    {
      co2Saved: 0,
      waterSaved: 0,
      wasteReduced: wasteActivities.reduce(
        (acc, activity) => acc + activity.quantity,
        0
      ),
    }
  );

  const points =
    totalImpact.co2Saved + totalImpact.waterSaved + totalImpact.wasteReduced;
  const treesPlanted = Math.floor(points / 10);

  // Log activity for a category
  const logActivity = (categoryName, qty) => {
    const category = activityCategories.find(
      (cat) => cat.name === categoryName
    );
    const impact = category.impact(qty);
    const newEntry = {
      id: Date.now(),
      category: categoryName,
      quantity: qty,
      impact,
      timestamp: new Date().toLocaleString(),
    };
    const updatedActivities = [...activities, newEntry];
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
    setEcoScore((prev) => Math.min(100, prev + qty * 0.1));
  };

  const logWasteReduction = (qty) => {
    const newEntry = {
      id: Date.now(),
      quantity: qty,
      timestamp: new Date().toLocaleString(),
    };
    const updatedWasteActivities = [...wasteActivities, newEntry];
    setWasteActivities(updatedWasteActivities);
    localStorage.setItem(
      "wasteActivities",
      JSON.stringify(updatedWasteActivities)
    );
    setEcoScore((prev) => Math.min(100, prev + qty * 0.1));
  };

  // Share progress
  const shareProgress = () => {
    const message = `🌍 I'm making a difference with EcoTrack! My EcoScore is ${ecoScore}, I've saved ${totalImpact.co2Saved}kg of CO2, ${totalImpact.waterSaved}L of water, and planted ${treesPlanted} trees! Join me! #EcoTrack`;
    alert(`Sharing to social media:\n\n${message}`);
  };

  return (
    <div
      className={`min-h-screen mt-16 ${
        isDarkMode ? "bg-gray-950" : "bg-white"
      } flex flex-col md:flex-row overflow-x-hidden relative`}
    >
      {/* Sidebar */}
      <motion.div
        className={`w-full md:w-64 lg:w-72 ${
          isDarkMode
            ? "bg-gray-800/90"
            : "bg-gradient-to-b from-green-700 to-emerald-500"
        } border-b md:border-r p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-6 md:h-screen md:sticky md:top-0 transition-all duration-300 backdrop-blur-md`}
        initial={{ height: "auto" }}
        animate={{ height: isSidebarExpanded ? "auto" : "60px" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <User
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 ${
                isDarkMode ? "text-green-400" : "text-white"
              } animate-pulse`}
            />
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-bold ${
                isDarkMode ? "text-green-400" : "text-white"
              } ${isSidebarExpanded ? "block" : "hidden md:block"}`}
            >
              Activity Tracking
            </h2>
          </div>
          <button
            onClick={() => setIsSidebarExpanded((prev) => !prev)}
            className="md:hidden p-2 rounded-full bg-green-600 text-white"
          >
            {isSidebarExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div
          className={`${
            isSidebarExpanded ? "block" : "hidden md:block"
          } space-y-2`}
        >
          {[
            {
              name: "Dashboard",
              path: "/user-dashboard",
              icon: <Home className="w-4 sm:w-5 h-4 sm:h-5" />,
            },
            {
              name: "Community Hub",
              path: "/community-hub",
              icon: <Users className="w-4 sm:w-5 h-4 sm:h-5" />,
            },
            {
              name: "Activity Tracking",
              path: "/activity-tracking",
              icon: <Leaf className="w-4 sm:w-5 h-4 sm:h-5" />,
            },
            {
              name: "Settings",
              path: "/settings",
              icon: <Settings className="w-4 sm:w-5 h-4 sm:h-5" />,
            },
          ].map((section) => (
            <motion.div
              key={section.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={section.path}
                className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-left text-sm md:text-base ${
                  section.name === "Activity Tracking"
                    ? isDarkMode
                      ? "bg-green-600 text-white"
                      : "bg-white text-green-800"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-white hover:bg-green-400"
                } transition-all duration-300`}
              >
                {section.icon}
                {section.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Stats */}
        <div
          className={`${
            isSidebarExpanded ? "block" : "hidden md:block"
          } mt-auto ${
            isDarkMode
              ? "bg-gray-700"
              : "bg-emerald-900"
          }`}
        >
          <div className="p-3 sm:p-4 rounded-lg bg-white/20 text-white">
            <p className="text-xs sm:text-sm font-medium">EcoScore</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {ecoScore}%
            </p>
            <p className="text-xs sm:text-sm font-medium mt-2">Streak</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {streak} Days
            </p>
            <p className="text-xs sm:text-sm font-medium mt-2">Trees Planted</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {treesPlanted}
            </p>
            <p className="text-xs sm:text-sm font-medium mt-2">Progress</p>
            <div className="w-full bg-gray-300 rounded-full h-2.5 mt-1">
              <motion.div
                className="bg-green-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${ecoScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto ${
          isDarkMode ? "bg-gray-950" : "bg-white"
        } backdrop-blur-md`}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Activity Tracking{" "}
            <Leaf className="w-6 h-6 text-green-500 animate-pulse-slow" />
          </h1>
        </motion.div>

        {/* EcoScore Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Leaf className="w-5 h-5" /> Your EcoScore
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40">
                <CircularProgressbar
                  value={ecoScore}
                  text={`${ecoScore}%`}
                  styles={buildStyles({
                    pathColor: isDarkMode ? "#34d399" : "#10b981",
                    textColor: isDarkMode ? "#fff" : "#333",
                    trailColor: isDarkMode ? "#444" : "#ddd",
                    textSize: "16px",
                  })}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {ecoScore >= 80
                    ? "Great job! You're a sustainability champion! 🌟"
                    : ecoScore >= 50
                    ? "Good effort! Keep pushing for a greener future! 🌱"
                    : "Let's improve! Small actions make a big difference! 🌍"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareProgress}
                  className={`mt-3 px-3 sm:px-4 py-2 flex items-center gap-2 mx-auto sm:mx-0 ${
                    isDarkMode
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white rounded-lg transition-all duration-300 text-sm sm:text-base`}
                >
                  <Share2 className="w-4 sm:w-5 h-4 sm:h-5" /> Share Progress
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Carbon Footprint Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Cloud className="w-5 h-5" /> Daily Carbon Footprint
            </h2>
            <div className="h-[200px] sm:h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbonFootprintData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? "#444" : "#ddd"}
                  />
                  <XAxis
                    dataKey="day"
                    stroke={isDarkMode ? "#888" : "#666"}
                    tick={{ fill: isDarkMode ? "#ccc" : "#666" }}
                  />
                  <YAxis
                    stroke={isDarkMode ? "#888" : "#666"}
                    tick={{ fill: isDarkMode ? "#ccc" : "#666" }}
                    label={{
                      value: "kg CO2",
                      angle: -90,
                      position: "insideLeft",
                      fill: isDarkMode ? "#ccc" : "#666",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#333" : "#fff",
                      border: "none",
                      borderRadius: "8px",
                      color: isDarkMode ? "#fff" : "#333",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="footprint"
                    stroke={isDarkMode ? "#34d399" : "#10b981"}
                    strokeWidth={2}
                    dot={{ fill: isDarkMode ? "#34d399" : "#10b981", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Activity Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Leaf className="w-5 h-5" /> Activity Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {activityCategories.map((category) => {
                const categoryActivities = activities.filter(
                  (activity) => activity.category === category.name
                );
                const categoryImpact = categoryActivities.reduce(
                  (acc, activity) => {
                    if (activity.impact.co2Saved)
                      acc.co2Saved += activity.impact.co2Saved;
                    if (activity.impact.waterSaved)
                      acc.waterSaved += activity.impact.waterSaved;
                    return acc;
                  },
                  { co2Saved: 0, waterSaved: 0 }
                );
                return (
                  <motion.div
                    key={category.name}
                    className={`p-3 sm:p-4 rounded-lg text-center ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    } hover:bg-opacity-80 transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <category.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 ${
                        category.name === "Commute"
                          ? "text-blue-500"
                          : category.name === "Energy Usage"
                          ? "text-yellow-500"
                          : category.name === "Water Consumption"
                          ? "text-cyan-500"
                          : "text-green-500"
                      } animate-pulse-slow`}
                    />
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {categoryImpact.co2Saved
                        ? `Saved ${categoryImpact.co2Saved}kg CO2`
                        : categoryImpact.waterSaved
                        ? `Saved ${categoryImpact.waterSaved}L water`
                        : "No activity yet"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => logActivity(category.name, 5)}
                      className={`mt-2 px-2 sm:px-3 py-1 text-xs sm:text-sm ${
                        isDarkMode
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white rounded-lg transition-all duration-300`}
                    >
                      Log Activity
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Live Transport Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Bus className="w-5 h-5" /> Live Transport Mode
            </h2>
            <div className="flex items-center gap-3 sm:gap-4">
              {transportMode === "Walking" && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Bike className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </motion.div>
              )}
              {transportMode === "Public Transport" && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Bus className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </motion.div>
              )}
              {transportMode === "Cycling" && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Bike className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </motion.div>
              )}
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  Current Mode: {transportMode}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {transportMode === "Walking" || transportMode === "Cycling"
                    ? "Great job! You're reducing your carbon footprint! 🚶‍♂️"
                    : "Nice! Public transport is an eco-friendly choice! 🚆"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Streaks & Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Flame className="w-5 h-5" /> Streaks & Challenges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">
                  Your Streak
                </h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 animate-pulse" />
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {streak} Days
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Keep up your eco-friendly habits! 🔥
                </p>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">
                  Active Challenges
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      Reduce water usage by 10%
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      60% Complete
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      Use public transport 5 times
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      80% Complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Trophy className="w-5 h-5" /> Leaderboard
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.name}
                  className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg ${
                    user.name === "You"
                      ? isDarkMode
                        ? "bg-green-700"
                        : "bg-green-200"
                      : isDarkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                    {index + 1}.
                  </span>
                  <Trophy
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-400"
                        : index === 2
                        ? "text-amber-600"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {user.ecoScore} Points
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Set a New Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Target className="w-5 h-5" /> Set a New Goal
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newGoal.name || !newGoal.target) return;
                setGoals([
                  ...goals,
                  {
                    id: Date.now(),
                    name: newGoal.name,
                    target: parseInt(newGoal.target),
                    current: 0,
                    unit: "units",
                  },
                ]);
                setNewGoal({ name: "", target: "" });
              }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3"
            >
              <input
                type="text"
                placeholder="Goal (e.g., Reduce energy usage)"
                value={newGoal.name}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, name: e.target.value })
                }
                className={`flex-1 px-3 sm:px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base`}
              />
              <input
                type="number"
                placeholder="Target"
                value={newGoal.target}
                min={0}
                max={15}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, target: e.target.value })
                }
                className={`w-full sm:w-24 px-3 sm:px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 py-2 ${
                  isDarkMode
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-green-600 hover:bg-green-700"
                } text-white rounded-lg transition-all duration-300 text-sm sm:text-base`}
              >
                Add Goal
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/*  Active Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Target className="w-5 h-5" /> Active Goals
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {goals.map((goal) => (
                <div key={goal.id}>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {goal.name}
                  </p>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5 mt-1">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{
                        width: `${(goal.current / goal.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {goal.current}/{goal.target} {goal.unit}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setGoals(
                        goals.map((g) =>
                          g.id === goal.id
                            ? {
                                ...g,
                                current: Math.min(g.target, g.current + 1),
                              }
                            : g
                        )
                      )
                    }
                    className={`text-xs sm:text-sm mt-1 ${
                      isDarkMode
                        ? "text-green-400 hover:text-green-300"
                        : "text-green-600 hover:text-green-700"
                    }`}
                  >
                    Update Progress
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tree Planting Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Sprout className="w-5 h-5" /> Tree Planting Rewards
            </h2>
            <div className="flex items-center gap-3 sm:gap-4">
              <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 animate-pulse-slow" />
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  Points Earned: {points}
                </p>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                  Trees Planted: {treesPlanted}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  You’ve helped plant {treesPlanted} trees! Keep earning points!
                  🌳
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Trash2 className="w-5 h-5" /> Zero-Waste Tracker
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                Total Waste Reduced: {totalImpact.wasteReduced} kg
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => logWasteReduction(1)}
                className={`px-3 sm:px-4 py-2 ${
                  isDarkMode
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-green-600 hover:bg-green-700"
                } text-white rounded-lg transition-all duration-300 text-sm sm:text-base`}
              >
                Log Waste Reduction
              </motion.button>
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mt-4">
              Zero-Waste Tips
            </h3>
            <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
              <li>Switch to reusable bags and containers.</li>
              <li>Compost food waste to reduce landfill impact.</li>
              <li>Buy in bulk to minimize packaging waste.</li>
            </ul>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div
            className={`p-4 sm:p-6 rounded-xl ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-green-50 border-gray-200"
            } border shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-500 dark:text-green-400">
              <Trophy className="w-5 h-5" /> Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {achievementsData.map((achievement) => {
                const isUnlocked = achievement.condition(
                  totalImpact,
                  activities
                );
                return (
                  <motion.div
                    key={achievement.name}
                    className={`p-3 sm:p-4 rounded-lg text-center ${
                      isUnlocked
                        ? isDarkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                        : isDarkMode
                        ? "bg-gray-600 opacity-80"
                        : "bg-gray-200 opacity-80"
                    } hover:bg-opacity-80 transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <achievement.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 ${
                        isUnlocked ? "text-yellow-500" : "text-gray-400"
                      } animate-pulse-slow`}
                    />
                    <p
                      className={`text-xs sm:text-sm font-medium ${
                        isUnlocked
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {achievement.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isUnlocked
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityTracking;
