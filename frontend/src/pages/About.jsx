import React from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Globe, Zap, Sprout, Droplet } from "lucide-react";
import { useCustomTheme } from "../hooks/useTheme";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const About = () => {
  const { currentTheme } = useCustomTheme();

  const teamMembers = [
    {
      name: "Sandeep Mehta",
      role: "Visionary & Lead Developer",
      desc: "The driving force behind EcoTrack, Sandeep conceptualized the app and led the development, ensuring a seamless user experience.",
      image:
        "https://res.cloudinary.com/drhrgs6y5/image/upload/v1742040146/Sandeep_image_ayzhid.png",
    },
    {
      name: "Akash Kumar",
      role: "UI/UX Designer",
      desc: "Akash crafted the stunning visuals and intuitive design, making EcoTrack both beautiful and user-friendly.",
      image:
        "https://res.cloudinary.com/drhrgs6y5/image/upload/v1742040152/Akash_image_vtsbgz.png",
    },
    {
      name: "Sanya Gupta",
      role: "Data & Sustainability Expert",
      desc: "Sanya brought expertise in eco-data and sustainability metrics, ensuring EcoTrack’s impact is measurable and meaningful.",
      image:
        "https://res.cloudinary.com/drhrgs6y5/image/upload/v1742040155/Sanya_image_ijligx.png",
    },
    {
      name: "Kamlesh Prajapati",
      role: "Backend & Systems Architect",
      desc: "Kamlesh built the robust backend, integrating APIs and ensuring EcoTrack runs smoothly behind the scenes.",
      image:
        "https://res.cloudinary.com/drhrgs6y5/image/upload/v1742040157/Kamlesh_image_z6xq0s.png",
    },
  ];

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/100?text=Profile";
  };

  return (
    <div
      className={`min-h-screen pt-20 mb-8 ${
        currentTheme === "dark" ? "bg-gray-950" : ""
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="mb-12 text-center relative overflow-hidden py-12"
        >
          <div className="absolute rounded-lg inset-0 bg-gradient-to-br from-green-400/20 via-blue-500/20 to-purple-600/20 -z-10" />
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
            About EcoTrack
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A passion project by four friends dedicated to making sustainability
            accessible, actionable, and rewarding for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`relative ${
            currentTheme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-green-50 border-gray-200"
          } p-10 rounded-2xl shadow-xl border backdrop-blur-sm mb-12 overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-400/10 to-blue-500/10 -z-10" />
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent"
          >
            Discover EcoTrack
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto leading-relaxed"
          >
            Born from a hackathon dream, EcoTrack is your key to a sustainable
            life. Track your impact, join fun challenges, and connect with a
            global community—all in one beautifully simple app.
          </motion.p>
          <motion.div
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center p-6 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-900 hover:bg-gray-950"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-all duration-300`}
            >
              <Globe className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-black dark:text-gray-300 mb-2">
                Global Reach
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                See your efforts contribute to worldwide eco-goals in real time.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center p-6 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-900 hover:bg-gray-950"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-all duration-300`}
            >
              <Zap className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-black dark:text-gray-300 mb-2">
                Smart Tools
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                AI-driven insights make green living effortless and effective.
              </p>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center p-6 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-900 hover:bg-gray-950"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition-all duration-300`}
            >
              <Leaf className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-black dark:text-gray-300 mb-2">
                United Efforts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Join a passionate community turning small steps into big change.
              </p>
            </motion.div>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto"
          >
            <span className="font-semibold text-green-600 dark:text-green-400">
              Our Promise:
            </span>{" "}
            Sustainability that’s fun, measurable, and within reach—powered by
            you, every day.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } p-8 rounded-xl shadow-lg border mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-8 text-center text-green-600 dark:text-green-400"
          >
            Meet the Creators
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center"
          >
            EcoTrack was brought to life by four friends united by a passion for
            technology and the planet. Here’s who we are:
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800 hover:bg-gray-950" : "bg-gray-100 hover:bg-gray-200"
                } shadow-lg flex flex-col items-center text-center`}
              >
                <div className="w-24 h-24 mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name}'s profile`}
                    className="w-full h-full object-cover rounded-full border-2 border-green-500"
                    onError={handleImageError}
                  />
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-sm text-green-500 dark:text-green-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="text-center py-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
            EcoTrack is just the beginning. Be part of a growing community
            inspired by four friends who dared to dream green.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-8 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Get Started with EcoTrack
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
