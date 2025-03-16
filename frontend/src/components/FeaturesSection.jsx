import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Wind, Car, Recycle, Sun, Sprout, Droplet } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Wind,
      title: "Renewable Energy Tracking",
      description:
        "Monitor your renewable energy usage and optimize for greener living.",
      delay: 0.2,
    },
    {
      icon: Car,
      title: "Smart Transportation",
      description: "Plan eco-friendly routes and reduce your travel emissions.",
      delay: 0.4,
    },
    {
      icon: Recycle,
      title: "Waste Reduction Tools",
      description:
        "Track waste and get recycling tips to minimize your footprint.",
      delay: 0.6,
    },
    {
      icon: Sun,
      title: "Solar Impact Calculator",
      description:
        "Estimate savings and environmental benefits from solar energy.",
      delay: 0.8,
    },
    {
      icon: Sprout,
      title: "Carbon Offset Programs",
      description: "Offset your emissions through verified green projects.",
      delay: 1.0,
    },
    {
      icon: Droplet,
      title: "Water Conservation",
      description: "Track and reduce water usage with smart insights.",
      delay: 1.2,
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/50 dark:bg-gray-950">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
          Sustainable Features
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Discover tools designed to help you live sustainably and reduce your
          environmental impact.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
