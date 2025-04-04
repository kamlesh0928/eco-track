import { motion } from "framer-motion";
import {
  FiActivity,
  FiTrendingUp,
  FiTrendingDown,
  FiGlobe,
  FiAlertTriangle,
  FiAward,
  FiUsers,
  FiClock,
} from "react-icons/fi";
import { useCustomTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";

// Animation settings
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const EarthRightSection = () => {
  const { currentTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is stable before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until mounted
  if (!mounted) return null;

  const stats = [
    {
      title: "Carbon Intensity",
      value: "387 ppm",
      description: "Atmospheric CO₂ levels",
      icon: <FiActivity className="text-red-600 dark:text-red-500" />,
      trend: "up",
      action: "View Trend",
    },
    {
      title: "Your Footprint",
      value: "3.2 t",
      description: "23% better than average",
      icon: <FiTrendingDown className="text-green-600 dark:text-green-500" />,
      trend: "down",
      action: "See Tips",
    },
    {
      title: "Your Offset",
      value: "12 Trees",
      description: "Equivalent impact",
      icon: <FiTrendingUp className="text-green-600 dark:text-green-500" />,
      trend: "up",
      action: "Plant More",
    },
    {
      title: "Community Rank",
      value: "#42",
      description: "Top 15% globally",
      icon: <FiUsers className="text-purple-600 dark:text-purple-500" />,
      trend: "up",
      action: "Climb Top",
    },
  ];

  const topContributors = [
    {
      country: "India",
      percent: 92,
      value: "0.8 t",
      trend: "down",
      action: "Learn Their Strategy",
    },
    {
      country: "Your Region",
      percent: 68,
      value: "2.1 t",
      trend: "down",
      action: "Improve Ranking",
    },
    {
      country: "Global Target",
      percent: 42,
      value: "2.0 t",
      trend: "alert",
      action: "See Roadmap",
    },
  ];

  const emissionSources = [
    {
      sector: "Transport",
      percent: 45,
      color: "bg-red-600 dark:bg-red-500",
      tip: "Try carpooling 2x/week",
    },
    {
      sector: "Energy",
      percent: 18,
      color: "bg-blue-600 dark:bg-blue-500",
      tip: "Switch to LED bulbs",
    },
    {
      sector: "Shopping",
      percent: 9,
      color: "bg-green-600 dark:bg-green-500",
      tip: "Choose package-free",
    },
  ];

  const heatmapLegend = [
    { level: "Critical", color: "bg-red-600 dark:bg-red-500", regions: 12 },
    { level: "High", color: "bg-orange-500 dark:bg-orange-400", regions: 28 },
    {
      level: "Moderate",
      color: "bg-yellow-400 dark:bg-yellow-300",
      regions: 45,
    },
    { level: "Low", color: "bg-green-600 dark:bg-green-500", regions: 63 },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={`h-full flex flex-col p-6 ${
        currentTheme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-green-100 border-gray-200"
      } overflow-y-auto overflow-x-hidden rounded-xl shadow-lg border backdrop-blur-lg`}
    >
      {/* Header with Heatmap Toggle */}
      <motion.div
        {...fadeInUp}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center">
          <FiGlobe className="text-3xl text-green-600 dark:text-green-500 mr-3 animate-pulse" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
            Earth Pulse
          </h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg flex items-center shadow-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
        >
          <FiActivity className="mr-2" /> Live Heatmap
        </motion.button>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-green-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-5 hover:shadow-xl hover:border-green-300 dark:hover:border-green-700 transition-all flex flex-col min-h-[200px]"
          >
            <div className="flex items-center justify-between flex-1 flex-wrap">
              <div
                className={`p-3 rounded-full flex-shrink-0 mb-2 ${
                  item.trend === "up"
                    ? "bg-red-100 dark:bg-red-900/40"
                    : "bg-green-100 dark:bg-green-900/40"
                } flex items-center justify-center lg:order-first order-last`}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.title}
                </p>
                <p className="text-xl font-bold mt-1 text-gray-900 dark:text-gray-300 truncate">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 w-full py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 text-sm font-medium transition-colors"
            >
              {item.action} →
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Climate Leaders Board */}
        <motion.div
          {...fadeInUp}
          className="bg-green-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center">
            <FiAward className="mr-2 text-yellow-500 dark:text-yellow-400" />
            Climate Leaders
          </h2>
          <div className="space-y-5">
            {topContributors.map((item, index) => (
              <motion.div key={index} whileHover={{ y: -3 }} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                    {item.country}
                  </span>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 mr-2 text-sm">
                      {item.value}
                    </span>
                    {item.trend === "up" ? (
                      <FiTrendingUp className="text-red-600 dark:text-red-500" />
                    ) : item.trend === "down" ? (
                      <FiTrendingDown className="text-green-600 dark:text-green-500" />
                    ) : (
                      <FiAlertTriangle className="text-yellow-500 dark:text-yellow-400" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === 0
                        ? "bg-green-600 dark:bg-green-500"
                        : index === 1
                        ? "bg-blue-600 dark:bg-blue-500"
                        : "bg-yellow-500 dark:bg-yellow-400"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-2 text-sm text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {item.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Impact Breakdown */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="bg-green-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center">
            <FiActivity className="mr-2 text-purple-600 dark:text-purple-500" />
            Your Impact
          </h2>
          <div className="space-y-5">
            {emissionSources.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {item.sector}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-300`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex items-center group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                  <FiClock className="mr-1" /> Tip: {item.tip}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Heatmap Legend */}
      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-green-50 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4 flex items-center">
          <FiAlertTriangle className="mr-2 text-orange-500 dark:text-orange-400" />
          Heatmap Legend
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {heatmapLegend.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex items-center"
            >
              <div
                className={`w-5 h-5 rounded-md ${item.color} mr-3 shadow-sm`}
              />
              <div className="text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {item.level}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  ({item.regions})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Click regions on the globe for detailed insights
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarthRightSection;
