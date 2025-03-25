import { motion } from "framer-motion";
import { useTheme } from "next-themes";

// Fade-in animation for headings and text
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

// Animation for action cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 }, // Cards start faded and slightly scaled down
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    y: 0, // Moves to its normal position
    transition: { duration: 0.3, delay: index * 0.1 }, // Delays each card for a staggered effect
  }),
  exit: { opacity: 0, scale: 0.85, y: 40, transition: { duration: 0.2 } }, // Exit animation
};

const SmallActionsSection = () => {
  const { theme } = useTheme();
  // List of small actions with their descriptions and icons
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
        theme === "dark" ? "dark" : ""
      } bg-background text-foreground overflow-x-hidden`}
    >
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="bg-green-50 dark:bg-card p-4 sm:p-6 md:p-8 rounded-lg shadow-lg border border-border dark:border-border mb-6 sm:mb-8 md:mb-12"
        >
          {/* Section Title */}
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Small Actions, Big Impact
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            {...fadeInUp}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-center"
          >
            Simple changes in your daily routine can lead to massive
            environmental benefits.
          </motion.p>

          {/* Grid container for action cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.05 }} // Triggers animation when 5% of the element is visible
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                custom={index} // Used for staggered animation delay
                variants={cardVariants} // Assigns animation variants
                className="bg-card/50 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Action Icon */}
                <span
                  className="text-4xl"
                  aria-label={`icon for ${action.title}`}
                >
                  {action.icon}
                </span>

                {/* Action Title */}
                <h3 className="text-xl font-semibold mt-2">{action.title}</h3>

                {/* Action Description */}
                <p className="mt-2 text-muted-foreground dark:text-gray-300">
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
