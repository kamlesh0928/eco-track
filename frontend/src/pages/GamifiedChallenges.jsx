// src/pages/GamifiedChallenges.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Leaf,
  Trophy,
  Gift,
  Target,
  Flame,
  Sprout,
  Award,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

// Sample weekly challenges data
const weeklyChallenges = [
  {
    id: 1,
    title: "Use Public Transport 5 Times",
    description: "Take public transport 5 times this week to reduce emissions.",
    target: 5,
    points: 20,
    category: "Commute",
    tip: "Plan your trips in advance to make public transport more convenient!",
  },
  {
    id: 2,
    title: "Reduce Water Usage by 10L",
    description: "Save 10 liters of water by taking shorter showers.",
    target: 10,
    points: 15,
    category: "Water",
    tip: "Use a timer to keep your showers under 5 minutes.",
  },
  {
    id: 3,
    title: "Recycle 5 Items",
    description: "Recycle 5 items to reduce waste.",
    target: 5,
    points: 10,
    category: "Recycling",
    tip: "Check local recycling guidelines to ensure proper sorting.",
  },
  {
    id: 4,
    title: "Turn Off Lights for 10 Hours",
    description: "Save energy by turning off lights when not in use.",
    target: 10,
    points: 15,
    category: "Energy",
    tip: "Use natural light during the day to reduce energy consumption.",
  },
];

// Featured challenge (special challenge with bonus points)
const featuredChallenge = {
  id: 5,
  title: "Plant a Tree This Week",
  description: "Plant a tree in your community to earn bonus points!",
  target: 1,
  points: 50,
  category: "Planting",
  tip: "Visit a local nursery or join a community planting event.",
};

// Sample leaderboard data
const leaderboardData = [
  { name: "Alex", points: 150, rank: 1 },
  { name: "Maya", points: 120, rank: 2 },
  { name: "Sam", points: 100, rank: 3 },
  { name: "You", points: 80, rank: 4 },
  { name: "Liam", points: 70, rank: 5 },
];

// Sample rewards data
const rewardsData = [
  { id: 1, name: "Plant a Tree", points: 50, icon: Sprout },
  { id: 2, name: "EcoTrack Badge", points: 100, icon: Award },
  { id: 3, name: "Eco-Friendly Sticker", points: 30, icon: Gift },
];

// Gamified Challenges Component
const GamifiedChallenges = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("Challenges");
  const [userPoints, setUserPoints] = useState(80); // Starting points for the user
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [challengeStreak, setChallengeStreak] = useState(3); // Sample streak

  useEffect(() => {
    setMounted(true);
    // Load challenges progress from localStorage
    const savedChallenges =
      JSON.parse(localStorage.getItem("challenges")) ||
      weeklyChallenges.map((challenge) => ({
        ...challenge,
        current: 0,
        completed: false,
      }));
    setChallenges(savedChallenges);

    const savedCompletedChallenges =
      JSON.parse(localStorage.getItem("completedChallenges")) || [];
    setCompletedChallenges(savedCompletedChallenges);

    const savedPoints = JSON.parse(localStorage.getItem("userPoints")) || 80;
    setUserPoints(savedPoints);

    const savedStreak =
      JSON.parse(localStorage.getItem("challengeStreak")) || 3;
    setChallengeStreak(savedStreak);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  // Update challenge progress
  const updateChallengeProgress = (challengeId) => {
    const updatedChallenges = challenges.map((challenge) => {
      if (
        challenge.id === challengeId &&
        challenge.current < challenge.target &&
        !challenge.completed
      ) {
        const newCurrent = challenge.current + 1;
        const isCompleted = newCurrent >= challenge.target;
        if (isCompleted) {
          setUserPoints((prev) => {
            const newPoints = prev + challenge.points;
            localStorage.setItem("userPoints", JSON.stringify(newPoints));
            return newPoints;
          });
          setCompletedChallenges((prev) => {
            const updated = [...prev, challengeId];
            localStorage.setItem(
              "completedChallenges",
              JSON.stringify(updated)
            );
            return updated;
          });
          setChallengeStreak((prev) => {
            const newStreak = prev + 1;
            localStorage.setItem("challengeStreak", JSON.stringify(newStreak));
            return newStreak;
          });
        }
        return { ...challenge, current: newCurrent, completed: isCompleted };
      }
      return challenge;
    });
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  // Redeem points for rewards
  const redeemReward = (reward) => {
    if (userPoints >= reward.points) {
      setUserPoints((prev) => {
        const newPoints = prev - reward.points;
        localStorage.setItem("userPoints", JSON.stringify(newPoints));
        return newPoints;
      });
      alert(`Congratulations! You've redeemed: ${reward.name}`);
    } else {
      alert("Not enough points to redeem this reward!");
    }
  };

  // Reset challenges weekly (with confirmation)
  const resetChallenges = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all challenges? Your progress will be lost."
      )
    ) {
      const resetChallenges = weeklyChallenges.map((challenge) => ({
        ...challenge,
        current: 0,
        completed: false,
      }));
      setChallenges(resetChallenges);
      setCompletedChallenges([]);
      setChallengeStreak(0);
      localStorage.setItem("challenges", JSON.stringify(resetChallenges));
      localStorage.setItem("completedChallenges", JSON.stringify([]));
      localStorage.setItem("challengeStreak", JSON.stringify(0));
    }
  };

  return (
    <div
      className={`min-h-screen mt-16 flex flex-col md:flex-row relative overflow-hidden ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-emerald-50 via-emerald-100 to-cyan-100 text-gray-900"
      }  bg-center bg-opacity-20`}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10%",
            }}
            animate={{
              y: "110vh",
              rotate: Math.random() * 360,
              opacity: [0.5, 0.8, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            <Leaf className="w-4 h-4 sm:w-6 sm:h-6" />
          </motion.div>
        ))}
      </div>

      {/* Sidebar */}
      <motion.div
        className={`relative z-10 w-full md:w-64 lg:w-72 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } border-b md:border-r p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-6 md:h-screen md:sticky md:top-0 transition-all duration-300 backdrop-blur-md`}
        initial={{ height: "auto" }}
        animate={{ height: isSidebarExpanded ? "auto" : "60px" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <Leaf
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 ${
                isDarkMode ? "text-green-400" : "text-green-600"
              } animate-pulse-slow`}
            />
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${
                isDarkMode
                  ? "from-green-400 to-emerald-400"
                  : "from-green-500 to-emerald-500"
              } bg-clip-text text-transparent ${
                isSidebarExpanded ? "block" : "hidden md:block"
              }`}
            >
              Gamified Challenges
            </h2>
          </div>
          <button
            onClick={() => setIsSidebarExpanded((prev) => !prev)}
            className="md:hidden p-2 rounded-full bg-green-600 text-white"
          >
            {isSidebarExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div
          className={`${
            isSidebarExpanded ? "block" : "hidden md:block"
          } space-y-2`}
        >
          {["Challenges", "Leaderboard", "Redeem Points"].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section)}
              className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-left text-sm md:text-base ${
                activeSection === section
                  ? isDarkMode
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              } transition-all duration-300`}
            >
              {section === "Challenges" && (
                <Target className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
              {section === "Leaderboard" && (
                <Trophy className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
              {section === "Redeem Points" && (
                <Gift className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
              {section}
            </motion.button>
          ))}
        </div>

        {/* User Stats */}
        <div
          className={`${
            isSidebarExpanded ? "block" : "hidden md:block"
          } mt-auto`}
        >
          <div
            className={`p-3 sm:p-4 rounded-lg ${
              isDarkMode ? "bg-gray-700/50" : "bg-white/50"
            } backdrop-blur-md text-gray-900 dark:text-white`}
          >
            <p className="text-xs sm:text-sm font-medium">Your Points</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {userPoints}
            </p>
            <p className="text-xs sm:text-sm font-medium mt-2">Your Rank</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {leaderboardData.find((user) => user.name === "You")?.rank}
            </p>
            <p className="text-xs sm:text-sm font-medium mt-2">
              Progress to Next Rank
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-1">
              <motion.div
                className="bg-green-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (userPoints / (leaderboardData[2].points + 10)) * 100
                  }%`,
                }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeSection === "Challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Featured Challenge */}
              <motion.div
                className={`p-4 sm:p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white/90 border-gray-200"
                } border shadow-lg backdrop-blur-md relative overflow-hidden`}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className={`absolute inset-0 ${
                    isDarkMode ? "bg-green-500/30" : "bg-green-600/30"
                  } blur-xl animate-pulse-slow`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 animate-pulse-slow" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Featured Challenge: {featuredChallenge.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    {featuredChallenge.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                      Bonus Reward: {featuredChallenge.points} Points
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        updateChallengeProgress(featuredChallenge.id)
                      }
                      className={`px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 ${
                        isDarkMode
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      } shadow-lg hover:shadow-xl`}
                    >
                      Start Challenge
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Challenge Streak */}
              <motion.div
                className={`p-4 sm:p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white/90 border-gray-200"
                } border shadow-lg backdrop-blur-md relative overflow-hidden`}
              >
                <motion.div
                  className={`absolute inset-0 ${
                    isDarkMode ? "bg-yellow-400/30" : "bg-yellow-500/30"
                  } blur-xl animate-pulse-slow`}
                />
                <div className="relative z-10 flex items-center gap-3">
                  <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse-slow" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                      Challenge Streak
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      You’re on a {challengeStreak}-day streak! Keep going to
                      earn bonus points.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Weekly Challenges */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Weekly Eco-Challenges
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetChallenges}
                  className={`px-3 sm:px-4 py-2 text-sm sm:text-base ${
                    isDarkMode
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  Reset Challenges
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    className={`p-4 sm:p-6 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-800/90 border-gray-700"
                        : "bg-white/90 border-gray-200"
                    } border shadow-md hover:shadow-lg transition-shadow duration-300 relative group`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {challenge.category === "Commute" && (
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 animate-pulse-slow" />
                      )}
                      {challenge.category === "Water" && (
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500 animate-pulse-slow" />
                      )}
                      {challenge.category === "Recycling" && (
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 animate-pulse-slow" />
                      )}
                      {challenge.category === "Energy" && (
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse-slow" />
                      )}
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {challenge.title}
                      </h3>
                      <div className="relative">
                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
                        <div className="absolute hidden group-hover:block -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg p-2 w-48 z-20">
                          {challenge.tip}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {challenge.description}
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                      <motion.div
                        className="bg-green-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (challenge.current / challenge.target) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Progress: {challenge.current}/{challenge.target}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        Reward: {challenge.points} Points
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateChallengeProgress(challenge.id)}
                        disabled={challenge.completed}
                        className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-300 ${
                          challenge.completed
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : isDarkMode
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        } shadow-lg hover:shadow-xl`}
                      >
                        {challenge.completed ? "Completed" : "Update Progress"}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips for Success */}
              <motion.div
                className={`p-4 sm:p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-800/90 border-gray-700"
                    : "bg-white/90 border-gray-200"
                } border shadow-lg backdrop-blur-md`}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Tips for Success
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Set daily reminders to track your progress.
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Involve friends and family to make challenges more fun.
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    Celebrate small wins to stay motivated!
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          )}

          {activeSection === "Leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Leaderboard
              </h2>
              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      user.name === "You"
                        ? isDarkMode
                          ? "bg-green-700/90"
                          : "bg-green-100/90"
                        : isDarkMode
                        ? "bg-gray-800/90 border-gray-700"
                        : "bg-white/90 border-gray-200"
                    } border shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-md`}
                  >
                    <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {user.rank}.
                    </span>
                    <Trophy
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        user.rank === 1
                          ? "text-yellow-500"
                          : user.rank === 2
                          ? "text-gray-400"
                          : user.rank === 3
                          ? "text-amber-600"
                          : "text-gray-600 dark:text-gray-400"
                      } animate-pulse-slow`}
                    />
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {user.points} Points
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "Redeem Points" && (
            <motion.div
              key="redeem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Redeem Points
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {rewardsData.map((reward) => (
                  <motion.div
                    key={reward.id}
                    className={`p-4 sm:p-6 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-800/90 border-gray-700"
                        : "bg-white/90 border-gray-200"
                    } border shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-md relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className={`absolute inset-0 ${
                        userPoints >= reward.points
                          ? isDarkMode
                            ? "bg-green-500/30"
                            : "bg-green-600/30"
                          : "bg-gray-500/30"
                      } blur-xl animate-pulse-slow`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <reward.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse-slow" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          {reward.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Cost: {reward.points} Points
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => redeemReward(reward)}
                        className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-all duration-300 ${
                          userPoints >= reward.points
                            ? isDarkMode
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        } shadow-lg hover:shadow-xl`}
                        disabled={userPoints < reward.points}
                      >
                        Redeem
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamifiedChallenges;
