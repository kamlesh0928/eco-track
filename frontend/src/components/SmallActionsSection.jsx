import { motion } from "framer-motion";
import { useCustomTheme } from "../hooks/useTheme";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { duration: 0.3 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, delay: index * 0.1 },
  }),
  exit: { opacity: 0, scale: 0.85, y: 40, transition: { duration: 0.2 } },
};

const SmallActionsSection = () => {
  const { currentTheme } = useCustomTheme();
  const actions = [
    {
      title: "Plant a Tree",
      desc: "Each tree absorbs up to 22 kg of CO₂ annually, improving air quality.",
      icon: "🌳",
    },
    {
      title: "Use Public Transport",
      desc: "Cuts individual CO₂ emissions by 50% per trip compared to driving.",
      icon: "🚆",
    },
    {
      title: "Reusable Bottle",
      desc: "Prevents 83g of plastic waste per use, reducing landfill impact.",
      icon: "🚰",
    },
    {
      title: "Compost Food Scraps",
      desc: "Lowers methane emissions by diverting waste from landfills.",
      icon: "🍃",
    },
    {
      title: "Switch to LED Bulbs",
      desc: "Consumes 80% less energy than traditional bulbs, saving power.",
      icon: "💡",
    },
    {
      title: "Cloth Bags",
      desc: "Prevents over 150 plastic bags from polluting the environment yearly.",
      icon: "🛍",
    },
    {
      title: "Reduce Meat Consumption",
      desc: "Lowers your carbon footprint by up to 2.5 tons annually.",
      icon: "🥗",
    },
    {
      title: "Unplug Devices",
      desc: "Saves up to 10% of household energy by avoiding phantom power.",
      icon: "🔌",
    },
    {
      title: "Cycle Short Distances",
      desc: "Eliminates emissions entirely for trips under 5 km.",
      icon: "🚲",
    },
  ];

  return (
    <section
      id="impact"
      className={`pt-4 sm:pt-6 md:pt-8 lg:pt-12 mb-4 sm:mb-6 ${
        currentTheme === "dark" ? "bg-black" : "bg-white"
      } overflow-x-hidden`}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`${
            currentTheme === "dark"
              ? "bg-card border-border"
              : "bg-green-50 border-border"
          } p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border mb-6 sm:mb-8 md:mb-12`}
        >
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Small Actions, Big Impact
          </motion.h2>
          <motion.p
            {...fadeInUp}
            className="text-lg mb-12 max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300"
          >
            Simple changes in your daily routine can lead to massive
            environmental benefits.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.05 }}
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                className={`${
                  currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
                } p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
              >
                <span
                  className="text-4xl"
                  aria-label={`icon for ${action.title}`}
                >
                  {action.icon}
                </span>
                <h3 className="text-xl font-semibold mt-2 text-black dark:text-gray-100">
                  {action.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {action.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SmallActionsSection;
