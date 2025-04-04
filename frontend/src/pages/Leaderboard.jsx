import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Users,
  Leaf,
  Zap,
  CheckCircle,
  Star,
  Crown,
  ChevronUp,
  ChevronDown,
  Globe,
  Trash2,
  Droplet,
} from "lucide-react";
import { useCustomTheme } from "../hooks/useTheme";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};
const staggerChildren = { animate: { transition: { staggerChildren: 0.1 } } };

const Leaderboard = () => {
  const { currentTheme } = useCustomTheme();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    // Simulate fetching leaderboard data and tasks
    const mockLeaderboard = [
      {
        rank: 1,
        name: "Priya S.",
        points: 3250,
        tasksCompleted: 15,
        avatarColor: "from-yellow-500 to-amber-500",
      },
      {
        rank: 2,
        name: "Liam K.",
        points: 2980,
        tasksCompleted: 14,
        avatarColor: "from-gray-400 to-gray-600",
      },
      {
        rank: 3,
        name: "Alex G.",
        points: 2750,
        tasksCompleted: 13,
        avatarColor: "from-amber-600 to-orange-600",
      },
      {
        rank: 4,
        name: "Sanya G.",
        points: 2400,
        tasksCompleted: 12,
        avatarColor: "from-green-500 to-teal-500",
      },
      {
        rank: 5,
        name: "Kamlesh P.",
        points: 2200,
        tasksCompleted: 11,
        avatarColor: "from-blue-500 to-indigo-500",
      },
      {
        rank: 6,
        name: "Akash K.",
        points: 1950,
        tasksCompleted: 10,
        avatarColor: "from-purple-500 to-pink-500",
      },
      {
        rank: 7,
        name: "Emma W.",
        points: 1800,
        tasksCompleted: 9,
        avatarColor: "from-pink-500 to-red-500",
      },
      {
        rank: 8,
        name: "Rahul M.",
        points: 1650,
        tasksCompleted: 8,
        avatarColor: "from-red-500 to-orange-500",
      },
      {
        rank: 9,
        name: "Sophie L.",
        points: 1500,
        tasksCompleted: 7,
        avatarColor: "from-orange-500 to-yellow-500",
      },
      {
        rank: 10,
        name: "Sandeep M.",
        points: 1400,
        tasksCompleted: 6,
        avatarColor: "from-teal-500 to-cyan-500",
      },
    ];

    const mockTasks = [
      {
        id: 1,
        title: "No Plastic Challenge",
        desc: "Avoid single-use plastics for a week.",
        points: 100,
        category: "Waste",
        icon: Trash2,
      },
      {
        id: 2,
        title: "Eco Commute",
        desc: "Use public transport or bike for 5 days.",
        points: 150,
        category: "Transport",
        icon: Globe,
      },
      {
        id: 3,
        title: "Water Saver",
        desc: "Reduce shower time by 2 mins daily.",
        points: 80,
        category: "Water",
        icon: Droplet,
      },
      {
        id: 4,
        title: "Plant a Tree",
        desc: "Plant a tree in your community.",
        points: 200,
        category: "Nature",
        icon: Leaf,
      },
      {
        id: 5,
        title: "Energy Fast",
        desc: "Unplug devices for 24 hours.",
        points: 120,
        category: "Energy",
        icon: Zap,
      },
    ];

    setLeaderboardData(mockLeaderboard);
    setWeeklyTasks(mockTasks);
  }, []);

  const toggleExpand = (rank) =>
    setExpandedUser(expandedUser === rank ? null : rank);

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
            EcoTrack Leaderboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Climb the ranks by completing eco-challenges! Weekly winners are
            celebrated here—make a difference and shine!
          </p>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className={`${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } p-8 rounded-xl shadow-lg border backdrop-blur-lg mb-12`}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Weekly Top Eco-Warriors
          </motion.h2>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <motion.div
                key={user.rank}
                variants={fadeInUp}
                className={`p-4 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } shadow-md`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(user.rank)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${user.avatarColor} flex items-center justify-center mr-4`}
                    >
                      {user.rank === 1 && (
                        <Crown className="w-6 h-6 text-white" />
                      )}
                      {user.rank === 2 && (
                        <Trophy className="w-6 h-6 text-white" />
                      )}
                      {user.rank === 3 && (
                        <Award className="w-6 h-6 text-white" />
                      )}
                      {user.rank > 3 && (
                        <Users className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-black dark:text-gray-100">
                        {user.rank}. {user.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {user.points} Points | {user.tasksCompleted} Tasks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {user.rank <= 3 && (
                      <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    )}
                    {expandedUser === user.rank ? (
                      <ChevronUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                {expandedUser === user.rank && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 p-4 bg-green-100 dark:bg-gray-700 rounded-lg"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user.name} has been crushing it this week! Here’s a peek
                      at their top contributions:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-center">
                        <Leaf className="w-5 h-5 text-green-500 mr-2" />
                        Planted 3 trees (+60 pts)
                      </li>
                      <li className="flex items-center">
                        <Zap className="w-5 h-5 text-blue-500 mr-2" />
                        Completed Energy Fast (+120 pts)
                      </li>
                      <li className="flex items-center">
                        <Trash2 className="w-5 h-5 text-red-500 mr-2" />
                        No Plastic Challenge (+100 pts)
                      </li>
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 lg:w-1/2 mx-auto py-3 px-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600"
            >
              See Full Leaderboard
            </motion.button>
          </div>
        </motion.div>

        {/* Weekly Tasks */}
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
            className="text-3xl font-semibold mb-6 text-center text-green-600 dark:text-green-400"
          >
            Weekly Eco-Challenges
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center"
          >
            Complete these tasks to earn points and climb the leaderboard!
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyTasks.map((task) => (
              <motion.div
                key={task.id}
                variants={fadeInUp}
                className={`p-6 rounded-lg ${
                  currentTheme === "dark" ? "bg-gray-800" : "bg-gray-100"
                } shadow-lg flex flex-col items-start`}
              >
                <div className="flex items-center mb-3">
                  <task.icon className="w-6 h-6 text-green-500 mr-2" />
                  <h3 className="text-lg font-semibold text-black dark:text-gray-100">
                    {task.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {task.desc}
                </p>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-bold text-yellow-500">
                    {task.points} pts
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                  >
                    Start Task
                  </motion.button>
                </div>
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
            Ready to Lead the Eco-Revolution?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-xl mx-auto">
            Take on challenges, earn points, and become an EcoTrack legend. The
            planet—and the leaderboard—needs you!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-8 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100"
          >
            Join the Challenge
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
