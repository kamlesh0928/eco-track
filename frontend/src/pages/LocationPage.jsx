import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Leaf, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomTheme } from "../hooks/useTheme";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const LocationPage = () => {
  const { currentTheme } = useCustomTheme();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !state || !country) {
      alert("Please fill in all fields to continue your EcoTrack journey!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to save your location.");
      navigate("/login");
      return;
    }

    const locationData = { city, state, country };

    try {
      // Save location data to Firestore under the user's document
      await setDoc(
        doc(db, "users", user.uid),
        { location: locationData },
        { merge: true }
      );
      navigate("/features");
    } catch (error) {
      console.error("Error saving location data:", error);
      alert("Failed to save location data. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 mb-8 ${
        currentTheme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-16"
        >
          <div className="absolute rounded-lg inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 1, 0], y: [0, 150, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.2 }}
              className="absolute w-2 h-2 bg-green-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
          <motion.div className="relative inline-block">
            <MapPin
              size={70}
              className="mx-auto mb-6 text-green-500 animate-bounce"
            />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Set Your Eco Location
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pinpoint your location to unlock a world of personalized
            sustainability insights, tailored eco-actions, and a deeper
            connection with your local environment. Join the EcoTrack community
            and start making a measurable impact today.
          </p>
        </motion.div>

        {/* Location Form */}
        <motion.form
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          onSubmit={handleSubmit}
          className={`max-w-md mx-auto p-8 rounded-xl shadow-lg border backdrop-blur-lg ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          }`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-500 dark:text-green-400 flex items-center justify-center gap-3"
          >
            <Leaf size={32} className="text-green-500 animate-pulse" />
            Locate Your Green Path
          </motion.h2>

          {/* City Input */}
          <motion.div variants={fadeInUp} className="mb-6">
            <label className="block text-sm font-medium mb-2 text-black dark:text-gray-200">
              City
            </label>
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
                placeholder="e.g., Bengaluru"
                required
              />
            </div>
          </motion.div>

          {/* State Input */}
          <motion.div variants={fadeInUp} className="mb-6">
            <label className="block text-sm font-medium mb-2 text-black dark:text-gray-200">
              State / Region
            </label>
            <div className="relative">
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
                placeholder="e.g., Karnataka"
                required
              />
            </div>
          </motion.div>

          {/* Country Input */}
          <motion.div variants={fadeInUp} className="mb-8">
            <label className="block text-sm font-medium mb-2 text-black dark:text-gray-200">
              Country
            </label>
            <div className="relative">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  currentTheme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-green-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-green-500"
                }`}
                placeholder="e.g., India"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
            className="w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-300 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center justify-center gap-2"
          >
            <Send size={20} /> Save Location
          </motion.button>
        </motion.form>

        {/* Why Location Matters Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } p-8 rounded-xl shadow-lg border backdrop-blur-lg mt-12 mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-500 dark:text-green-400"
          >
            Why Your Location Matters
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto"
          >
            Your geographic location is the foundation of your eco-journey with
            EcoTrack. By setting it, you enable us to provide hyper-localized
            data, connect you with regional sustainability initiatives, and
            optimize your environmental impact based on your unique
            surroundings.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex items-start`}
            >
              <MapPin className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-100">
                  Localized Insights
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Receive data tailored to your city’s climate, pollution
                  levels, and eco-challenges.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex items-start`}
            >
              <Leaf className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-100">
                  Regional Actions
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Engage in sustainability projects specific to your state or
                  country.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Privacy & Info Section */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 text-center max-w-lg mx-auto text-gray-700 dark:text-gray-300"
        >
          <p className="text-md leading-relaxed">
            Your location helps us provide precise environmental data for you.
            It’s safeguarded under EcoTrack’s commitment to privacy.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-500"
          >
            <Leaf size={16} />
            <span>Committed to sustainability and privacy</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationPage;
