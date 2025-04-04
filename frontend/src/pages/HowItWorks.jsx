import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Globe,
  Trophy,
  Users,
  Award,
  Sprout,
  Activity,
  BarChart,
  Gift,
  Heart,
  TrendingUp,
  Globe2,
  ArrowRight,
  MessageSquare,
  Share2,
} from "lucide-react";
import { useCustomTheme } from "../hooks/useTheme";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } };

const HowItWorks = () => {
  const { currentTheme } = useCustomTheme();

  const steps = [
    {
      icon: Users,
      title: "Sign Up & Get Started",
      desc: "Create your EcoTrack account or log in to begin your journey towards sustainability.",
      color: "text-green-500",
    },
    {
      icon: Activity,
      title: "Log Your Daily Activities",
      desc: "Input your daily habits—like transportation, energy use, and waste management—to track your impact.",
      color: "text-blue-500",
    },
    {
      icon: BarChart,
      title: "AI Analyzes Your Footprint",
      desc: "Our AI calculates your carbon footprint and identifies areas for improvement.",
      color: "text-indigo-500",
    },
    {
      icon: Leaf,
      title: "Get Personalized Recommendations",
      desc: "Receive tailored eco-tips and actions to reduce your environmental impact effectively.",
      color: "text-green-600",
    },
    {
      icon: Trophy,
      title: "Take On Gamified Challenges",
      desc: "Join weekly challenges, complete tasks, and earn points to climb the leaderboard.",
      color: "text-yellow-500",
    },
    {
      icon: Globe2,
      title: "Track Your Impact in Real-Time",
      desc: "Visualize your progress with stats on CO₂ saved, water conserved, and trees planted.",
      color: "text-teal-500",
    },
    {
      icon: Sprout,
      title: "Fund Global Eco-Projects",
      desc: "Use your points to support real-world initiatives like tree planting and renewable energy.",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Join the Eco-Community",
      desc: "Connect with a global network of eco-warriors, share tips, and inspire others.",
      color: "text-purple-500",
    },
    {
      icon: Award,
      title: "Celebrate Your Milestones",
      desc: "Earn badges, rewards, and recognition for your sustainable habits and contributions.",
      color: "text-amber-500",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Feel Good About Your Impact",
      desc: "Every action you take helps the planet, and you’ll see the difference you’re making.",
    },
    {
      icon: TrendingUp,
      title: "Measurable Progress",
      desc: "Track your carbon reduction, water savings, and more with detailed stats.",
    },
    {
      icon: Gift,
      title: "Earn Rewards",
      desc: "Unlock exclusive perks from eco-friendly partners as you hit milestones.",
    },
    {
      icon: Globe,
      title: "Global Change",
      desc: "Contribute to worldwide sustainability goals with every step you take.",
    },
  ];

  return (
    <div
      className={`min-h-screen pt-20 mb-8 ${
        currentTheme === "dark" ? "bg-gray-950" : ""
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-16"
        >
          <div className="absolute rounded-lg inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
          {[...Array(20)].map((_, i) => (
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
            How EcoTrack Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A simple, rewarding journey to sustainability—track your impact,
            take action, and make a difference for the planet.
          </p>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`p-8 rounded-xl shadow-lg border backdrop-blur-lg ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Your EcoTrack Journey
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center"
          >
            Follow these steps to reduce your environmental footprint and
            contribute to a greener future.
          </motion.p>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-6 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center mr-4">
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{`${
                      index + 1
                    }. ${step.title}`}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-green-500 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`p-8 rounded-xl ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } shadow-lg border mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Benefits of Using EcoTrack
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center"
          >
            Here’s why EcoTrack is the perfect companion for your sustainability
            journey.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-6 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } flex items-start`}
              >
                <benefit.icon className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-100">
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

        {/* What’s Next for EcoTrack Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`p-8 mt-10 rounded-xl ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } shadow-lg border backdrop-blur-lg mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            What’s Next for EcoTrack
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center"
          >
            We’re just getting started! Here’s a glimpse of what’s coming to
            make your sustainability journey even more impactful.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upcoming Feature 1: AR Impact Visualization */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Globe className="w-12 h-12 text-green-500 mb-4 animate-pulse" />
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                AR Impact Visualization
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                See your eco-impact in augmented reality—watch virtual trees
                grow and carbon emissions shrink right in your surroundings.
              </p>
            </motion.div>

            {/* Upcoming Feature 2: Social Challenges */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Users className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                Social Challenges
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Team up with friends for group challenges—compete, collaborate,
                and amplify your collective impact.
              </p>
            </motion.div>

            {/* Upcoming Feature 3: Eco-Lifestyle Marketplace */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Gift className="w-12 h-12 text-green-500 mb-4 animate-bounce" />
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                Eco-Lifestyle Marketplace
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Redeem points for sustainable products—from reusable bottles to
                eco-friendly gadgets.
              </p>
            </motion.div>

            {/* Get Involved: Beta Testing */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <MessageSquare className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                Join Our Beta Program
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Be among the first to test EcoTrack, provide feedback, and shape
                its future.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                Sign Up for Beta
              </motion.button>
            </motion.div>

            {/* Get Involved: Share Ideas */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Heart className="w-12 h-12 text-green-500 mb-4 animate-pulse" />
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                Share Your Ideas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Have a feature in mind? Let us know how we can make EcoTrack
                even better for you.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                Submit Feedback
              </motion.button>
            </motion.div>

            {/* Get Involved: Spread the Word */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-lg ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } flex flex-col items-center text-center`}
            >
              <Share2 className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                Spread the Word
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Invite friends to join the eco-movement and grow our community
                of change-makers.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                Invite Friends
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="text-center py-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Your EcoTrack Journey Today
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users making a real difference. Track, act, and
            impact the planet—one step at a time.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-10 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
