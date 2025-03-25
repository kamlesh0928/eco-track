import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  Trophy,
  Leaf,
  Activity,
  BusFront,
  Globe,
  Zap,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.1 },
  }),
};

const WhyEcoTrack = () => {
  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Analyze your carbon footprint with advanced AI tools.",
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Get personalized data to optimize your impact.",
    },
    {
      icon: Trophy,
      title: "Gamified Challenges",
      description: "Compete with friends and earn eco-rewards.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Tips",
      description: "Daily suggestions for sustainable living.",
    },
    {
      icon: Activity,
      title: "Real-Time Metrics",
      description: "Track CO₂, water, and waste savings instantly.",
    },
    {
      icon: BusFront,
      title: "Smart Travel Planner",
      description: "Identify the most eco-friendly transportation methods.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Contribute to worldwide sustainability goals.",
    },
    {
      icon: Zap,
      title: "Energy Efficiency",
      description: "Optimize household energy consumption.",
    },
  ];

  return (
      // Main content of the WhyEcoTrack component
    <section className="py-24 px-6 text-center bg-green-50 dark:bg-card">
      <div className="container mx-auto px-6 text-center">
        <div>
          <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Why Choose{" "}
          <span className="text-green-600 dark:text-green-400">EcoTrack</span>?
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Harness cutting-edge technology to live sustainably and make a
          difference.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              <FeatureCard {...benefit} />
            </motion.div>
          ))}
        </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default WhyEcoTrack;
