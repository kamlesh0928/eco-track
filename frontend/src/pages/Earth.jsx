import React from "react";
import { motion } from "framer-motion";
import EarthLeftSection from "../components/EarthLeftSection";
import EarthRightSection from "../components/EarthRightSection";
import { useCustomTheme } from "../hooks/useTheme";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Earth = () => {
  const { currentTheme } = useCustomTheme();

  return (
    <div
      className={`min-h-screen pt-20 mb-8 flex flex-col ${
        currentTheme === "dark" ? "bg-gray-950" : ""
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-12"
        >
          <div className="absolute rounded-lg inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
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
            Explore Earth's Eco Impact
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track global emissions and your contribution in real-time.
          </p>
        </motion.div>
      </div>

      <main className="container max-w-8xl mx-auto px-6 py-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full lg:w-1/2 flex flex-col">
            <EarthLeftSection />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <EarthRightSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Earth;
