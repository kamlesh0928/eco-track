import React from "react";
import { motion } from "framer-motion";
import {
  CarFront,
  BusFront,
  TrainFront,
  BikeIcon,
  Lightbulb,
  Battery,
  Sun,
  Wind,
  Shirt,
  Recycle,
  Gift,
  Utensils,
  Fish,
  Carrot,
  Apple,
  Package,
} from "lucide-react";
import { useTheme } from "next-themes";

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

const CarbonFootprintOverview = () => {
  const { theme } = useTheme();

  const categories = [
    {
      title: "Transportation",
      items: [
        {
          name: "Car",
          emission: "192g",
          color: "text-red-500",
          icon: CarFront,
        },
        {
          name: "Bus",
          emission: "105g",
          color: "text-yellow-500",
          icon: BusFront,
        },
        {
          name: "Train",
          emission: "41g",
          color: "text-green-500",
          icon: TrainFront,
        },
        {
          name: "Bicycle",
          emission: "0g",
          color: "text-green-600",
          icon: BikeIcon,
        },
      ],
    },
    {
      title: "Energy",
      items: [
        {
          name: "Coal Power",
          emission: "820g",
          color: "text-red-500",
          icon: Battery,
        },
        {
          name: "Solar Energy",
          emission: "48g",
          color: "text-green-500",
          icon: Sun,
        },
        {
          name: "Wind Energy",
          emission: "11g",
          color: "text-green-600",
          icon: Wind,
        },
        {
          name: "LED Lighting",
          emission: "20g",
          color: "text-yellow-500",
          icon: Lightbulb,
        },
      ],
    },
    {
      title: "Shopping",
      items: [
        {
          name: "Fast Fashion",
          emission: "33kg",
          color: "text-red-500",
          icon: Shirt,
        },
        {
          name: "Electronics",
          emission: "20kg",
          color: "text-orange-500",
          icon: Package,
        },
        {
          name: "Second-Hand",
          emission: "1kg",
          color: "text-green-500",
          icon: Recycle,
        },
        {
          name: "Local Products",
          emission: "2kg",
          color: "text-green-600",
          icon: Gift,
        },
      ],
    },
    {
      title: "Meals",
      items: [
        {
          name: "Beef",
          emission: "27kg",
          color: "text-red-500",
          icon: Utensils,
        },
        { name: "Fish", emission: "6kg", color: "text-yellow-500", icon: Fish },
        {
          name: "Vegetables",
          emission: "2kg",
          color: "text-green-500",
          icon: Carrot,
        },
        {
          name: "Fruits",
          emission: "1kg",
          color: "text-green-600",
          icon: Apple,
        },
      ],
    },
  ];

  return (
    <section
      className={`py-16 ${
        theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Carbon Footprint Overview
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
            Your daily habits contribute to the health of our planet. Discover
            how you can reduce your carbon footprint and live more sustainably.
          </p>
        </motion.div>

        {/* 2x2 Grid of Cards */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg ${
                theme === "dark" ? "bg-gray-900" : "bg-card"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className={`text-sm ${item.color}`}>
                      {item.name}: {item.emission} CO₂
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CarbonFootprintOverview;
