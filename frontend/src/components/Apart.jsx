import { motion } from "framer-motion";
import {
  Trash2,
  Calendar,
  Award,
  Sprout,
  Cloud,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";

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

const Apart = () => {
  const { theme } = useTheme();
  const uniqueFeatures = [
    {
      icon: Trash2,
      title: "Zero-Waste Tracker",
      desc: "Monitor your waste reduction progress with detailed stats and tips for a zero-waste lifestyle.",
      color: "text-red-500",
    },
    {
      icon: Calendar,
      title: "Eco-Goal Planner",
      desc: "Set and manage personal sustainability goals with reminders and progress tracking.",
      color: "text-orange-500",
    },
    {
      icon: Award,
      title: "Achievement Badges",
      desc: "Earn unique badges for completing tasks and milestones—show off your eco-credentials!",
      color: "text-amber-500",
    },
    {
      icon: Sprout,
      title: "Tree Planting Rewards",
      desc: "Contribute to real-world tree planting with points earned from your eco-actions.",
      color: "text-green-600",
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      desc: "Adapt your eco-choices based on local weather data, seamlessly integrated into your dashboard.",
      color: "text-gray-500",
    },
    {
      icon: MessageSquare,
      title: "Eco-Tips Feed",
      desc: "Daily curated tips and articles to keep you informed and motivated on your green journey.",
      color: "text-pink-500",
    },
  ];
  return (
    <div
      className={`pt-4 sm:pt-6 md:pt-8 lg:pt-12 ${
        theme === "dark" ? "dark" : ""
      } bg-background text-foreground overflow-x-hidden`}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="bg-green-50 dark:bg-card p-4 rounded-lg shadow-lg border border-border dark:border-border mb-2" // Reduced mb-4 sm:mb-6 to mb-2, simplified p-4 sm:p-6 md:p-8 to p-4
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-green-600 dark:text-green-400"
          >
            What Sets Us Apart
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-muted-foreground dark:text-muted-foreground mb-4 sm:mb-8 text-center"
          >
            EcoTrack’s unique features make sustainability fun, rewarding, and
            impactful.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className={`p-4 sm:p-6 rounded-lg ${
                  theme === "dark" ? "bg-card" : "bg-muted"
                } shadow-md flex flex-col items-start`}
              >
                <div className="flex items-center mb-2 sm:mb-3">
                  <feature.icon
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.color} mr-2 sm:mr-3`}
                  />
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-2 sm:mb-4">
                  {feature.desc}
                </p>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-1 sm:mr-2" />
                  <span className="text-sm text-green-500">Active Feature</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Apart;
