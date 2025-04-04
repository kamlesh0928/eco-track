import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomTheme } from "../hooks/useTheme";
import {
  Users,
  MessageSquare,
  Calendar,
  Leaf,
  Heart,
  Share2,
  Send,
  Image,
  Video,
  FileText,
  Smile,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

// Sample discussions data with media support
const initialDiscussions = [
  {
    id: 1,
    user: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    content: "What are some easy ways to reduce plastic waste at home?",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    likes: 12,
    comments: [
      {
        id: 1,
        user: "Maya",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        content: "Switch to reusable bags and containers! 😊",
      },
      {
        id: 2,
        user: "Sam",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        content: "I started using a metal straw—works great! 🌟",
      },
    ],
  },
  {
    id: 2,
    user: "Maya",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    content: "I composted my food waste this week—feels so good! 🌱",
    media: null,
    likes: 8,
    comments: [],
  },
];

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Tree Planting Drive",
    date: "April 5, 2025",
    time: "10:00 AM",
    description: "Join us to plant 100 trees in the local park!",
    joined: false,
  },
  {
    id: 2,
    title: "Eco-Webinar: Sustainable Living",
    date: "April 10, 2025",
    time: "2:00 PM",
    description: "Learn tips for sustainable living from experts.",
    joined: false,
  },
];

// Sample eco-tips data with media support
const initialEcoTips = [
  {
    id: 1,
    user: "Sam",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    content: "Turn off lights when not in use to save energy. 💡",
    media: null,
    likes: 15,
  },
  {
    id: 2,
    user: "Liam",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    content: "Use a reusable water bottle to reduce plastic waste. 🥤",
    media: { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    likes: 10,
  },
];

// Community Hub Component
const CommunityHub = () => {
  const { currentTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("Discussions");
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [events, setEvents] = useState(eventsData);
  const [ecoTips, setEcoTips] = useState(initialEcoTips);
  const [newPost, setNewPost] = useState("");
  const [newTip, setNewTip] = useState("");
  const [userStats, setUserStats] = useState({ posts: 0, eventsJoined: 0 });
  const [mediaFile, setMediaFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const savedDiscussions =
      JSON.parse(localStorage.getItem("discussions")) || initialDiscussions;
    setDiscussions(savedDiscussions);

    const savedEvents =
      JSON.parse(localStorage.getItem("events")) || eventsData;
    setEvents(savedEvents);

    const savedEcoTips =
      JSON.parse(localStorage.getItem("ecoTips")) || initialEcoTips;
    setEcoTips(savedEcoTips);

    const savedStats = JSON.parse(localStorage.getItem("userStats")) || {
      posts: 0,
      eventsJoined: 0,
    };
    setUserStats(savedStats);
  }, []);

  if (!mounted) return null;

  const isDarkMode = currentTheme === "dark";

  // Handle media upload
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.startsWith("image")
        ? "image"
        : file.type.startsWith("video")
        ? "video"
        : "document";
      const url = URL.createObjectURL(file);
      setMediaFile({ type: fileType, url });
    }
  };

  // Post a new discussion
  const handlePostDiscussion = () => {
    if (!newPost.trim()) return;
    const newDiscussion = {
      id: Date.now(),
      user: "You",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      content: newPost,
      media: mediaFile,
      likes: 0,
      comments: [],
    };
    const updatedDiscussions = [...discussions, newDiscussion];
    setDiscussions(updatedDiscussions);
    localStorage.setItem("discussions", JSON.stringify(updatedDiscussions));
    setNewPost("");
    setMediaFile(null);
    setUserStats((prev) => {
      const updatedStats = { ...prev, posts: prev.posts + 1 };
      localStorage.setItem("userStats", JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  // Like a discussion
  const handleLikeDiscussion = (id) => {
    const updatedDiscussions = discussions.map((discussion) =>
      discussion.id === id
        ? { ...discussion, likes: discussion.likes + 1 }
        : discussion
    );
    setDiscussions(updatedDiscussions);
    localStorage.setItem("discussions", JSON.stringify(updatedDiscussions));
  };

  // Add a comment to a discussion
  const handleAddComment = (discussionId, comment) => {
    if (!comment.trim()) return;
    const updatedDiscussions = discussions.map((discussion) => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          comments: [
            ...discussion.comments,
            {
              id: Date.now(),
              user: "You",
              avatar: "https://randomuser.me/api/portraits/men/5.jpg",
              content: comment,
            },
          ],
        };
      }
      return discussion;
    });
    setDiscussions(updatedDiscussions);
    localStorage.setItem("discussions", JSON.stringify(updatedDiscussions));
  };

  // Join an event
  const handleJoinEvent = (id) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, joined: true } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setUserStats((prev) => {
      const updatedStats = { ...prev, eventsJoined: prev.eventsJoined + 1 };
      localStorage.setItem("userStats", JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  // Post a new eco-tip
  const handlePostEcoTip = () => {
    if (!newTip.trim()) return;
    const newEcoTip = {
      id: Date.now(),
      user: "You",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      content: newTip,
      media: mediaFile,
      likes: 0,
    };
    const updatedEcoTips = [...ecoTips, newEcoTip];
    setEcoTips(updatedEcoTips);
    localStorage.setItem("ecoTips", JSON.stringify(updatedEcoTips));
    setNewTip("");
    setMediaFile(null);
    setUserStats((prev) => {
      const updatedStats = { ...prev, posts: prev.posts + 1 };
      localStorage.setItem("userStats", JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  // Like an eco-tip
  const handleLikeEcoTip = (id) => {
    const updatedEcoTips = ecoTips.map((tip) =>
      tip.id === id ? { ...tip, likes: tip.likes + 1 } : tip
    );
    setEcoTips(updatedEcoTips);
    localStorage.setItem("ecoTips", JSON.stringify(updatedEcoTips));
  };

  // Share an eco-tip (simulated)
  const handleShareEcoTip = (content) => {
    alert(`Sharing eco-tip: ${content}`);
  };

  // Add emoji to post or tip
  const handleEmojiSelect = (emoji) => {
    if (activeSection === "Discussions") {
      setNewPost((prev) => prev + emoji.native);
    } else if (activeSection === "Eco-Tips") {
      setNewTip((prev) => prev + emoji.native);
    }
    setShowEmojiPicker(false);
  };

  return (
    <div
      className={`min-h-screen mt-16 ${
        isDarkMode ? "bg-gray-950 text-gray-200" : "bg-white text-gray-900"
      } flex flex-col md:flex-row overflow-x-hidden`}
    >
      {/* Sidebar */}
      <motion.div
        className={`w-full md:w-64 lg:w-72 ${
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-gradient-to-b from-green-700 to-emerald-500 border-gray-200"
        } border-b md:border-r p-3 sm:p-4 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-6 md:h-screen md:sticky md:top-0 transition-all duration-300`}
        initial={{ height: "auto" }}
        animate={{ height: isSidebarExpanded ? "auto" : "60px" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <Users
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 ${
                isDarkMode ? "text-green-400" : "text-white"
              } animate-pulse`}
            />
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-bold ${
                isDarkMode ? "text-green-400" : "text-white"
              } ${isSidebarExpanded ? "block" : "hidden md:block"}`}
            >
              Community Hub
            </h2>
          </div>
          <button
            onClick={() => setIsSidebarExpanded((prev) => !prev)}
            className="md:hidden p-2 rounded-full bg-green-500 text-white"
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
          {["Discussions", "Events", "Eco-Tips"].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section)}
              className={`w-full flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-left text-sm md:text-base ${
                activeSection === section
                  ? isDarkMode
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-800"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-white hover:bg-green-400"
              } transition-all duration-300`}
            >
              {section === "Discussions" && (
                <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
              {section === "Events" && (
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
              )}
              {section === "Eco-Tips" && (
                <Leaf className="w-4 sm:w-5 h-4 sm:h-5" />
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
          <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-green-800 to-emerald-800 text-white">
            <p className="text-xs sm:text-sm font-medium">Your Posts</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {userStats.posts}
            </p>
            <p className="text-xs sm:text-sm font-medium mt-2">Events Joined</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">
              {userStats.eventsJoined}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div
        className={`flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto ${
          isDarkMode ? "bg-gray-950" : "bg-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {activeSection === "Discussions" && (
            <motion.div
              key="discussions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                Community Discussions
              </h2>

              {/* Post a new discussion */}
              <motion.div
                className={`p-3 sm:p-4 md:p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-green-50 border-gray-200"
                } border shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-start gap-2 sm:gap-3 mb-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/5.jpg"
                    alt="User Avatar"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  />
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts or ask a question..."
                    className={`flex-1 p-3 sm:p-4 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20 sm:h-24 text-sm sm:text-base`}
                  />
                </div>
                {mediaFile && (
                  <div className="relative mb-4">
                    {mediaFile.type === "image" && (
                      <img
                        src={mediaFile.url}
                        alt="Uploaded"
                        className="w-full h-40 sm:h-48 object-cover rounded-lg"
                      />
                    )}
                    {mediaFile.type === "video" && (
                      <video
                        src={mediaFile.url}
                        controls
                        className="w-full h-40 sm:h-48 rounded-lg"
                      />
                    )}
                    {mediaFile.type === "document" && (
                      <a
                        href={mediaFile.url}
                        download
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                        Download Document
                      </a>
                    )}
                    <button
                      onClick={() => setMediaFile(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <Image className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <Video className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <Smile className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePostDiscussion}
                    className={`px-3 sm:px-4 py-2 ${
                      isDarkMode
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white rounded-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base`}
                  >
                    <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    Post
                  </motion.button>
                </div>
                {showEmojiPicker && (
                  <div className="absolute z-10 mt-2">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      theme={isDarkMode ? "dark" : "light"}
                    />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  className="hidden"
                />
              </motion.div>

              {/* Discussions Feed */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {discussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    className={`p-3 sm:p-4 md:p-6 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-green-50 border-gray-200"
                    } border shadow-md hover:shadow-lg transition-shadow duration-300`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 mb-4">
                      <img
                        src={discussion.avatar}
                        alt="User Avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-200 text-sm sm:text-base">
                          {discussion.user}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          {discussion.content}
                        </p>
                        {discussion.media && (
                          <div className="mt-4">
                            {discussion.media.type === "image" && (
                              <img
                                src={discussion.media.url}
                                alt="Post Media"
                                className="w-full h-40 sm:h-48 object-cover rounded-lg"
                              />
                            )}
                            {discussion.media.type === "video" && (
                              <video
                                src={discussion.media.url}
                                controls
                                className="w-full h-40 sm:h-48 rounded-lg"
                              />
                            )}
                            {discussion.media.type === "document" && (
                              <a
                                href={discussion.media.url}
                                download
                                className="flex items-center gap-2 text-blue-500"
                              >
                                <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                                Download Document
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLikeDiscussion(discussion.id)}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <Heart className="w-4 sm:w-5 h-4 sm:h-5" />
                        <span className="text-sm sm:text-base">
                          {discussion.likes}
                        </span>
                      </motion.button>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-3">
                      {discussion.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`p-3 rounded-lg ${
                            isDarkMode ? "bg-gray-800" : "bg-gray-200"
                          } flex items-start gap-2`}
                        >
                          <img
                            src={comment.avatar}
                            alt="User Avatar"
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                              {comment.user}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const comment = e.target.comment.value;
                          handleAddComment(discussion.id, comment);
                          e.target.reset();
                        }}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4"
                      >
                        <input
                          name="comment"
                          placeholder="Add a comment..."
                          className={`flex-1 p-2 rounded-lg border text-sm ${
                            isDarkMode
                              ? "bg-gray-800 border-gray-700 text-gray-200"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className={`px-3 sm:px-4 py-2 ${
                            isDarkMode
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white rounded-lg transition-all duration-300 text-sm sm:text-base`}
                        >
                          Comment
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "Events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                Community Events
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    className={`p-3 sm:p-4 md:p-6 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-green-50 border-gray-200"
                    } border shadow-md hover:shadow-lg transition-shadow duration-300`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-4">
                      <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500 animate-pulse-slow" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {event.date} at {event.time}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {event.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={event.joined}
                      className={`w-full px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                        event.joined
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : isDarkMode
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {event.joined ? "Joined" : "Join Event"}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Eco-Tips Section */}
          {activeSection === "Eco-Tips" && (
            <motion.div
              key="eco-tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6 md:space-y-8"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-200">
                Eco-Tips
              </h2>

              {/* Post a new eco-tip */}
              <motion.div
                className={`p-3 sm:p-4 md:p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-green-50 border-gray-200"
                } border shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-start gap-2 sm:gap-3 mb-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/5.jpg"
                    alt="User Avatar"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  />
                  <textarea
                    value={newTip}
                    onChange={(e) => setNewTip(e.target.value)}
                    placeholder="Share an eco-tip with the community..."
                    className={`flex-1 p-3 sm:p-4 rounded-lg border ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20 sm:h-24 text-sm sm:text-base`}
                  />
                </div>
                {mediaFile && (
                  <div className="relative mb-4">
                    {mediaFile.type === "image" && (
                      <img
                        src={mediaFile.url}
                        alt="Uploaded"
                        className="w-full h-40 sm:h-48 object-cover rounded-lg"
                      />
                    )}
                    {mediaFile.type === "video" && (
                      <video
                        src={mediaFile.url}
                        controls
                        className="w-full h-40 sm:h-48 rounded-lg"
                      />
                    )}
                    {mediaFile.type === "document" && (
                      <a
                        href={mediaFile.url}
                        download
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                        Download Document
                      </a>
                    )}
                    <button
                      onClick={() => setMediaFile(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <Image className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <Video className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current.click()}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className={`p-2 rounded-lg ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-all duration-300`}
                  >
                    <Smile className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 dark:text-gray-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePostEcoTip}
                    className={`px-3 sm:px-4 py-2 ${
                      isDarkMode
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white rounded-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base`}
                  >
                    <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    Post Tip
                  </motion.button>
                </div>
                {showEmojiPicker && (
                  <div className="absolute z-10 mt-2">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmojiSelect}
                      theme={isDarkMode ? "dark" : "light"}
                    />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  className="hidden"
                />
              </motion.div>

              {/* Eco-Tips Feed */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {ecoTips.map((tip) => (
                  <motion.div
                    key={tip.id}
                    className={`p-3 sm:p-4 md:p-6 rounded-xl ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-green-50 border-gray-200"
                    } border shadow-md hover:shadow-lg transition-shadow duration-300`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-2 sm:gap-3 mb-4">
                      <img
                        src={tip.avatar}
                        alt="User Avatar"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-200 text-sm sm:text-base">
                          {tip.user}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          {tip.content}
                        </p>
                        {tip.media && (
                          <div className="mt-4">
                            {tip.media.type === "image" && (
                              <img
                                src={tip.media.url}
                                alt="Tip Media"
                                className="w-full h-40 sm:h-48 object-cover rounded-lg"
                              />
                            )}
                            {tip.media.type === "video" && (
                              <video
                                src={tip.media.url}
                                controls
                                className="w-full h-40 sm:h-48 rounded-lg"
                              />
                            )}
                            {tip.media.type === "document" && (
                              <a
                                href={tip.media.url}
                                download
                                className="flex items-center gap-2 text-blue-500"
                              >
                                <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
                                Download Document
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLikeEcoTip(tip.id)}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <Heart className="w-4 sm:w-5 h-4 sm:h-5" />
                        <span className="text-sm sm:text-base">
                          {tip.likes}
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShareEcoTip(tip.content)}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />
                        <span className="text-sm sm:text-base">Share</span>
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

export default CommunityHub;
