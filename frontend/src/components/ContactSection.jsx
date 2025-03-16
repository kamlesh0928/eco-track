import React from 'react';
import { motion } from 'framer-motion'; 
import { Button } from "@/components/ui/button";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
};

const ContactSection = () => (
  <section id="contact" className="py-24 px-6 text-center bg-green-50 dark:bg-gray-900">
    <div className="container mx-auto px-6 text-center">
      <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
        Get in Touch
      </motion.h2>
      <motion.p {...fadeInUp} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Have questions or want to collaborate? We’d love to hear from you!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
          />
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
