import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCustomTheme } from "../hooks/useTheme";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const ContactSection = () => {
  const { currentTheme } = useCustomTheme();

  return (
    <section
      id="contact"
      className={`py-24 px-6 text-center ${
        currentTheme === "dark" ? "bg-black" : "bg-green-50"
      }`}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-lg text-gray-600 dark:text-gray-100 mb-12 max-w-2xl mx-auto"
        >
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
              className={`w-full p-3 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-200 text-gray-800"
              }`}
            />
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full p-3 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-200 text-gray-800"
              }`}
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className={`w-full p-3 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-800 text-gray-100"
                  : "bg-gray-200 text-gray-800"
              }`}
            />
            <Button className="w-full text-md bg-green-600 hover:bg-green-700 font-semibold">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
