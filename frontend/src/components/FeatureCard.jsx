import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCustomTheme } from "../hooks/useTheme";

const FeatureCard = ({ icon: Icon, title, description, delay, color }) => {
  const { currentTheme } = useCustomTheme(); // Replaced useTheme with useCustomTheme
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
      className={`${
        currentTheme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-gray-100 border-gray-200"
      } backdrop-blur-lg p-6 rounded-xl border hover:border-green-500/50 transition-all hover:scale-105`}
    >
      <Icon className={`h-12 w-12 ${color || "text-green-500"} mb-4`} />
      <h3 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
