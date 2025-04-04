import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, AlertTriangle, Home } from "lucide-react";
import { useCustomTheme } from "../hooks/useTheme"; // Replace with your custom hook

const NotFound = () => {
  const { currentTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        currentTheme === "dark"
          ? "bg-gray-950 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 opacity-50"
            style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
            animate={{
              y: "110vh",
              rotate: Math.random() * 360,
              opacity: [0.5, 0.8, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            <Leaf className="w-4 h-4 sm:w-6 sm:h-6" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md w-full px-4 sm:px-6 text-center">
        <motion.div
          className={`p-6 sm:p-8 rounded-xl ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } border shadow-lg backdrop-blur-md`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-6 sm:mb-8 relative"
          >
            <motion.div
              className={`absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full ${
                currentTheme === "dark"
                  ? "bg-yellow-400/30"
                  : "bg-yellow-500/30"
              } blur-xl animate-pulse-slow`}
            />
            <AlertTriangle
              className={`w-20 h-20 sm:w-24 sm:h-24 relative z-10 ${
                currentTheme === "dark" ? "text-yellow-400" : "text-yellow-500"
              } animate-pulse-slow`}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-6xl sm:text-7xl font-bold mb-4 bg-clip-text text-transparent ${
              currentTheme === "dark"
                ? "bg-gradient-to-r from-green-400 to-yellow-400"
                : "bg-gradient-to-r from-green-600 to-yellow-500"
            }`}
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl font-semibold mb-4 text-green-500 dark:text-green-400 flex items-center justify-center gap-2"
          >
            <Leaf className="w-6 h-6 animate-pulse-slow" /> Work in Progress!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8"
          >
            This page is still under construction as we continue to grow our
            platform. Stay tuned—exciting updates are coming soon to help us
            save the planet together! 🌍
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link
              to="/home"
              className={`relative inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 ${
                currentTheme === "dark"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-600 hover:bg-green-700"
              } text-white rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl`}
            >
              <motion.div
                className={`absolute inset-0 rounded-lg ${
                  currentTheme === "dark"
                    ? "bg-green-500/50"
                    : "bg-green-600/50"
                } blur-md animate-pulse-slow`}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-4 sm:w-5 h-4 sm:h-5" /> Back to Home
              </span>
            </Link>
            <Link
              to="/user-dashboard"
              className={`relative inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 ${
                currentTheme === "dark"
                  ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                  : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              } border rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl`}
            >
              <motion.div
                className={`absolute inset-0 rounded-lg ${
                  currentTheme === "dark"
                    ? "bg-green-400/30"
                    : "bg-green-600/30"
                } blur-md animate-pulse-slow`}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Leaf className="w-4 sm:w-5 h-4 sm:h-5" /> Explore Dashboard
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
