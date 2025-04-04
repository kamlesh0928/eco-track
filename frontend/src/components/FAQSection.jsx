import { motion } from "framer-motion";
import { useCustomTheme } from "../hooks/useTheme";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
const faqVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, delay: index * 0.1 },
  }),
};

const FAQSection = () => {
  const { currentTheme } = useCustomTheme();
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
    <section
      className={`py-24 px-6 text-center ${
        currentTheme === "dark" ? "bg-black" : "bg-green-50"
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-lg mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-100"
        >
          Got questions? We’ve got answers.
        </motion.p>
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={faqVariants}
              className={`${
                currentTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
              } p-6 rounded-lg shadow-lg text-left`}
            >
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-gray-100">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
