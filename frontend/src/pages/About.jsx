import React from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Globe, Zap, Sprout, Droplet } from "lucide-react";
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

const About = () => {
  const { theme } = useTheme();

  // Team members with profile picture paths (replace with your image imports)
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

  // Handle image load error
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/100?text=Profile"; // Fallback placeholder
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
            About EcoTrack
          </h1>
          <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
            A passion project by four friends dedicated to making sustainability
            accessible, actionable, and rewarding for everyone.
          </p>
        </motion.div>

        {/* EcoTrack Description */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="bg-card dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            What is EcoTrack?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground dark:text-gray-300 mb-6"
          >
            EcoTrack is more than just an app—it’s a movement. Born from a
            shared vision among four friends, EcoTrack empowers individuals to
            reduce their environmental footprint through smart tracking,
            actionable challenges, and a vibrant community. Whether it’s cutting
            CO₂ emissions, saving water, or planting trees, EcoTrack turns small
            actions into big impacts.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="flex items-start">
              <Globe className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Global Impact</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Track and contribute to worldwide sustainability goals with
                  real-time data.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Smart Tools</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  AI-powered insights to optimize your eco-friendly lifestyle
                  effortlessly.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Leaf className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Community Driven</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Join a global network of eco-warriors making a difference
                  together.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg text-muted-foreground dark:text-gray-300"
          >
            Our mission is simple: make sustainability fun, measurable, and
            achievable for everyone. From daily eco-tips to gamified challenges,
            EcoTrack is your companion in building a greener future—one step at
            a time.
          </motion.p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="bg-green-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-8 text-center text-green-600 dark:text-green-400"
          >
            Meet the Creators
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground dark:text-gray-300 mb-8 text-center"
          >
            EcoTrack was brought to life by four friends united by a passion for
            technology and the planet. Here’s who we are:
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-6 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-muted"
                } shadow-lg flex flex-col items-center text-center`}
              >
                <div className="w-24 h-24 mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name}'s profile`}
                    className="w-full h-full object-cover rounded-full border-2 border-green-500"
                    onError={handleImageError} // Fallback if image fails to load
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-sm text-green-500 dark:text-green-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
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
