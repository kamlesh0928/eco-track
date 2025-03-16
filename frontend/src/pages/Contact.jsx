import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
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

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call in production)
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div
      className={`min-h-screen pt-20 mb-8 ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-background text-foreground"
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 1, 0], y: [0, 100, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-2 h-2 bg-green-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Contact EcoTrack
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            Have questions or feedback? We’d love to hear from you! Reach out
            and let’s make the planet greener together.
          </p>
        </motion.div>

        {/* Contact Form & Info */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className="bg-card dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
          >
            <h2 className="text-3xl font-semibold mb-6 text-green-600 dark:text-green-400">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className={`w-full p-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-muted border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 text-foreground dark:text-gray-100`}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={`w-full p-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-muted border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 text-foreground dark:text-gray-100`}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  required
                  rows="4"
                  className={`w-full p-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-muted border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-green-500 text-foreground dark:text-gray-100`}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitted}
                className={`w-full py-3 px-4 rounded-lg shadow-lg font-semibold text-white ${
                  isSubmitted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                }`}
              >
                {isSubmitted ? (
                  "Sent!"
                ) : (
                  <>
                    <Send className="w-5 h-5 inline mr-2" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            variants={fadeInUp}
            className="bg-green-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
          >
            <h2 className="text-3xl font-semibold mb-6 text-green-600 dark:text-green-400">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Email Us</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    support@ecotrack.com
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    We respond within 24 hours!
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Call Us</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Mon-Fri, 9 AM - 5 PM PST
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Visit Us</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    123 Green Lane, Eco City, CA 94105
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    By appointment only
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="text-center py-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Let’s Build a Greener Future Together
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
            Your ideas and feedback fuel EcoTrack. Reach out today and join the
            sustainability movement!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-8 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Contact Us Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
