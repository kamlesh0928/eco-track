import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Wind, Car, Recycle, Sun, Sprout, Droplet } from "lucide-react";

// Variants for animating feature cards with staggered delays
const featureVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.15, ease: "easeOut" },
  }),
};

const FeaturesSection = () => {
  // List of features with icons, titles, and descriptions
  const features = [
    {
      icon: Wind,
      title: "Renewable Energy Tracking",
      description:
        "Monitor your renewable energy usage and optimize for greener living.",
    },
    {
      icon: Car,
      title: "Smart Transportation",
      description: "Plan eco-friendly routes and reduce your travel emissions.",
    },
    {
      icon: Recycle,
      title: "Waste Reduction Tools",
      description:
        "Track waste and get recycling tips to minimize your footprint.",
    },
    {
      icon: Sun,
      title: "Solar Impact Calculator",
      description:
        "Estimate savings and environmental benefits from solar energy.",
    },
    {
      icon: Sprout,
      title: "Carbon Offset Programs",
      description: "Offset your emissions through verified green projects.",
    },
    {
      icon: Droplet,
      title: "Water Conservation",
      description: "Reduce waste and protect water supplies with innovative tracking.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/50 dark:bg-gray-950">
      <div className="container mx-auto px-6 text-center">
        {/* Section Heading with animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Sustainable Features
        </motion.h2>

        {/* Section Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Discover tools designed to help you live sustainably and reduce your
          environmental impact.
        </motion.p>

        {/* Features Grid with staggered animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index} // Pass index for staggered delay
              variants={featureVariants} // Apply animation variant
              
            >
              {/* Feature Card Component */}
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
