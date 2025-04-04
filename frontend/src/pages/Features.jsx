import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import {
  Leaf,
  ShoppingBag,
  Footprints,
  Trophy,
  Users,
  Sun,
  BarChart,
  Shield,
  TrendingUp,
  Heart,
  Gift,
} from "lucide-react";
import { useCustomTheme } from "../hooks/useTheme";
import FeaturesSection from "@/components/FeaturesSection";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } };

const Features = () => {
  const { currentTheme } = useCustomTheme();

  const coreFeatures = [
    {
      icon: Leaf,
      title: "Activity Tracking",
      desc: "Log your daily eco-friendly actions—walking, recycling, or reducing energy use—and see your impact grow.",
      color: "text-green-500",
      path: "/activity-tracking",
    },
    {
      icon: Footprints,
      title: "Carbon Footprint Calculator",
      desc: "Measure your carbon emissions with our AI-powered tool and get personalized tips to reduce them.",
      color: "text-green-500",
      path: "/carbon-footprint-calculator",
    },
    {
      icon: Trophy,
      title: "Gamified Challenges",
      desc: "Take on weekly eco-challenges, earn points, and compete on the leaderboard to become an eco-champion.",
      color: "text-green-500",
      path: "/gamified-challenges",
    },
    {
      icon: Users,
      title: "Community Hub",
      desc: "Join a global network of eco-warriors, share tips, and inspire each other to live sustainably.",
      color: "text-green-500",
      path: "/community-hub",
    },
    {
      icon: FaGlobe,
      title: "3D Earth View",
      desc: "Heatmap showcasing eco-friendly habits adopted across different regions.",
      color: "text-green-500",
      path: "/earth",
    },
    {
      icon: ShoppingBag,
      title: "Carbon Offset Market",
      desc: "Offset your carbon footprint by trading credits in our eco-friendly market, supporting global sustainability.",
      color: "text-green-500",
      path: "/carbon-offset-market",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Privacy First",
      desc: "Your data is secure with top-tier encryption.",
    },
    {
      icon: TrendingUp,
      title: "Measurable Impact",
      desc: "See your contributions add up in real-time.",
    },
    {
      icon: Heart,
      title: "Feel Good",
      desc: "Every action makes a difference for the planet.",
    },
    {
      icon: Gift,
      title: "Exclusive Rewards",
      desc: "Unlock perks from eco-friendly partners.",
    },
  ];

  return (
    <div
      className={`min-h-screen pt-4 sm:pt-6 md:pt-8 lg:pt-12 mb-4 sm:mb-6 ${
        currentTheme === "dark" ? "bg-gray-950" : ""
      } overflow-x-hidden`}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-16"
        >
          <div className="absolute rounded-lg inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
          {[...Array(25)].map((_, i) => (
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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            EcoTrack Features
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the powerful tools and unique features that make EcoTrack
            your ultimate companion for sustainable living.
          </p>
        </motion.div>

        {/* Core Features */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`${
            currentTheme === "dark"
              ? "bg-gray-950 border-gray-800"
              : "bg-green-50 border-gray-200"
          } p-6 rounded-xl shadow-md border mb-6 sm:mb-8 md:mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-green-600 dark:text-green-400"
          >
            Core Features
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-8 text-center"
          >
            Everything you need to kickstart your eco-journey with EcoTrack.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
                } shadow-md flex flex-col items-center text-center`}
              >
                <div
                  className={`relative w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 ${
                    currentTheme === "dark"
                      ? "bg-gradient-to-br from-emerald-500 to-cyan-500 border-cyan-400"
                      : "bg-gradient-to-br from-emerald-200 to-cyan-200 border-emerald-300"
                  } ${window.innerWidth >= 640 ? "shadow-sm" : ""}`} // Shadow only on larger screens
                >
                  {/* Overlay with blur only on larger screens */}
                  <div
                    className={`absolute inset-0 rounded-full ${
                      window.innerWidth >= 640
                        ? "bg-white/20 dark:bg-black/20 backdrop-blur-sm"
                        : ""
                    }`}
                  />
                  <feature.icon
                    className={`relative w-6 h-6 sm:w-7 md:w-8 sm:h-7 md:h-8 ${
                      currentTheme === "dark" ? "text-white" : "text-gray-800"
                    } ${feature.color}`}
                  />
                </div>
                <h3 className="text-xl text-black dark:text-gray-300 font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
                  {feature.desc}
                </p>
                <Link to={feature.path}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 sm:mt-3 md:mt-4 text-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:bg-clip-text hover:text-transparent font-medium text-sm sm:text-base"
                  >
                    Explore Feature
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Unique Features */}
        <FeaturesSection />

        {/* Interactive Demo */}
        <motion.div
          variants={fadeInUp}
          className={`mt-12 ${
            currentTheme === "dark"
              ? "bg-gray-950 border-gray-800"
              : "bg-green-50 border-gray-200"
          } p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border mb-6 sm:mb-8 md:mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-green-600 dark:text-green-400"
          >
            See It in Action
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-8 text-center"
          >
            Explore a mini-demo of EcoTrack’s key features right here!
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-4 sm:p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Sun className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2 sm:mb-4 animate-pulse" />
              <h3 className="text-base sm:text-lg text-black dark:text-gray-300 font-semibold mb-1 sm:mb-2">
                Weather Sync
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time weather updates to guide your eco-choices.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-4 sm:p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <BarChart className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500 mb-2 sm:mb-4" />
              <h3 className="text-base sm:text-lg text-black dark:text-gray-300 font-semibold mb-1 sm:mb-2">
                Impact Stats
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Visualize your CO₂ savings and resource conservation.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-4 sm:p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Trophy className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2 sm:mb-4 animate-bounce" />
              <h3 className="text-base sm:text-lg text-black dark:text-gray-300 font-semibold mb-1 sm:mb-2">
                Leaderboard Peek
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Check your rank and aim for the top spot!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`p-4 sm:p-6 md:p-8 ${
            currentTheme === "dark"
              ? "bg-gray-950 border-gray-800"
              : "bg-green-50 border-gray-200"
          } rounded-lg shadow-lg border mb-6 sm:mb-8 md:mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-green-600 dark:text-green-400"
          >
            Why Choose EcoTrack?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-8 text-center"
          >
            Beyond features, here’s what you gain by joining the EcoTrack
            movement.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-4 sm:p-6 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
                } flex items-start`}
              >
                <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mr-2 sm:mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl text-black dark:text-gray-300 font-semibold mb-1 sm:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="text-center py-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Unlock the Full EcoTrack Experience
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            From tracking your impact to earning rewards, EcoTrack’s features
            empower you to live greener every day.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-10 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
