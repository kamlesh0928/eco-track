import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What is EcoTrack?",
      answer:
        "EcoTrack is an AI-powered platform to track and reduce your environmental impact.",
    },
    {
      question: "How does the AI work?",
      answer:
        "Our AI analyzes your habits and provides personalized sustainability recommendations.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your information.",
    },
    {
      question: "Can I use it for free?",
      answer:
        "Yes, our free plan offers basic tracking and community features.",
    },
    {
      question: "How do I join the leaderboard?",
      answer: "Sign up, track your actions, and compete with others globally!",
    },
  ];

  return (
    <section className="py-24 px-6 text-center">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Got questions? We’ve got answers.
        </motion.p>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-card/50 dark:bg-gray-900 p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
