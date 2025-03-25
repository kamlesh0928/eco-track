import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Animation variant for a smooth fade-in effect
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 }, // Ensures animation triggers when 20% of the section is visible
  transition: { duration: 0.6, ease: "easeOut" }, // Smooth transition effect
};

const ContactSection = () => (
  <section
    id="contact"
    className="py-24 px-6 text-center bg-green-50 dark:bg-card"
  >
    <div className="container mx-auto px-6 text-center">
      {/* Heading Section with Animation */}
      <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
        Get in Touch
      </motion.h2>

      {/* Subtext for context */}
      <motion.p
        {...fadeInUp}
        className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
      >
        Have questions or want to collaborate? We’d love to hear from you!
      </motion.p>

      {/* Form Section with Smooth Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <form className="space-y-6">
          {/* Name Input Field */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
          />

          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
          />

          {/* Message Input Field */}
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
          />

          {/* Submit Button */}
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
