import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, Activity, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const HeroSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to track logged-in user

  // Check authentication status on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in, null if not
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle button click based on login status
  const handleGetStarted = () => {
    if (user) {
      navigate("/features"); // Navigate to features page if logged in
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Background animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 -z-10"
        >
          {/* Gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -100, x: Math.random() * 100 - 50 }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, Math.random() * 300 - 150, 0],
                x: [0, Math.random() * 300 - 150, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 bg-green-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Be the Change for a<br className="hidden sm:block" /> Greener
            Future!
          </h1>

          {/* Hero Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-gray-700 text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Join our eco-friendly community and reduce your carbon footprint
            with AI-powered tracking and sustainable solutions.
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg px-8"
              onClick={handleGetStarted}
            >
              Get Started Now
            </Button>
          </motion.div>

          {/* Animated Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Leaf className="text-green-500 animate-bounce" size={32} />
            <Activity className="text-blue-500 animate-bounce" size={32} />
            <Trophy className="text-yellow-500 animate-bounce" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
