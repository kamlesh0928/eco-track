import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Car,
  Zap,
  ShoppingBag,
  Utensils,
  Leaf,
  Sun,
  Moon,
  Award,
  Clock,
} from "lucide-react";
import { useTheme } from "next-themes";
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

const UserDashboard = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState({
    name: "Loading...", // Default name while fetching
    email: "Loading...",
    footprint: {
      travel: 19.2, // kg CO₂
      energy: 25.0,
      food: 30.0,
      shopping: 2.0,
    },
    recentActivity: [
      "Calculated footprint: 76.20 kg CO₂ on March 12, 2025",
      "Reduced energy usage by 5% on March 10, 2025",
      "Switched to public transport on March 8, 2025",
    ],
    achievements: [
      "Reduced 10% emissions this month!",
      "Eco-Warrior: Used public transport 5 times!",
    ],
    recommendations: {
      travel: [
        "Use public transport more often.",
        "Consider biking for short trips.",
      ],
      energy: ["Switch to LED lighting.", "Use renewable energy sources."],
      food: ["Reduce meat consumption.", "Buy locally sourced produce."],
      shopping: ["Opt for second-hand items.", "Choose sustainable brands."],
    },
  });

  // Fetch user data from Firestore using auth.currentUser
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser; // Get the currently logged-in user
        if (currentUser) {
          const userId = currentUser.uid; // Use the UID from auth
          const userDocRef = doc(db, "users", userId); // Reference to the Firestore document
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser((prevUser) => ({
              ...prevUser,
              name: userData.name || "User", // Use the name from Firestore or a default
              email: userData.email || currentUser.email || "No email", // Fallback to auth email
            }));
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No user is logged in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className={`min-h-screen pt-20 pb-12 ${
        theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Welcome, {user.name}!
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Track your carbon footprint, get personalized recommendations, and
            earn eco-friendly achievements.
          </p>
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
            className="text-2xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
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
                {user.footprint.travel.toFixed(2)} kg CO₂
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
                {user.footprint.energy.toFixed(2)} kg CO₂
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
                {user.footprint.shopping.toFixed(2)} kg CO₂
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
                {user.footprint.food.toFixed(2)} kg CO₂
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
                {user.recommendations.travel.map((tip, idx) => (
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
                {user.recommendations.energy.map((tip, idx) => (
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
                {user.recommendations.shopping.map((tip, idx) => (
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
                {user.recommendations.food.map((tip, idx) => (
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
              {user.recentActivity.map((activity, idx) => (
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
              {user.achievements.map((achievement, idx) => (
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
