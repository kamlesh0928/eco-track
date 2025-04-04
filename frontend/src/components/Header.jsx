"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Edit,
  BarChart2,
  Crown,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../services/useAuth";
import { useCustomTheme } from "../hooks/useTheme"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentTheme, toggleTheme } = useCustomTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const sidebarLinks = [
    { name: "Edit Profile", path: "/edit-profile", icon: Edit },
    { name: "Dashboard", path: "/user-dashboard", icon: BarChart2 },
    {name: "Leaderboard", path: "/leaderboard", icon:  Crown},
    { name: "Give Feedback", path: "/feedback", icon: MessageSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const isDarkMode = currentTheme === "dark";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
      } backdrop-blur-lg border-b shadow-sm`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500 animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoTrack
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { name: "Home", path: "/home" },
            { name: "Features", path: "/features" },
            { name: "How It Works", path: "/how-it-works" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className={`text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors font-medium ${
                isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              } p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-300 hover:opacity-90`}
            >
              {name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-green-500"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-green-500 animate-pulse" />
            )}
          </Button>

          {/* Conditional Rendering for Authenticated/Unauthenticated Users */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border-2 border-green-500"
                  />
                ) : (
                  <User
                    className={`h-8 w-8 p-1 rounded-full ${
                      isDarkMode
                        ? "bg-green-900 text-green-400"
                        : "bg-green-100 text-green-500"
                    }`}
                  />
                )}
              </button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className={`border-green-500 text-green-500 ${
                  isDarkMode ? "hover:bg-green-900" : "hover:bg-green-50"
                }`}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className={`${
                  isDarkMode
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden absolute top-full left-0 right-0 ${
              isDarkMode
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            } border-b p-4`}
          >
            <div className="flex flex-col gap-4">
              {[
                { name: "Home", path: "/home" },
                { name: "Features", path: "/features" },
                { name: "How It Works", path: "/how-it-works" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {name}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:text-green-500"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-green-500" />
                )}
              </Button>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-500"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-8 w-8 rounded-full border-2 border-green-500"
                    />
                  ) : (
                    <User
                      className={`h-8 w-8 p-1 rounded-full ${
                        isDarkMode
                          ? "bg-green-900 text-green-400"
                          : "bg-green-100 text-green-500"
                      }`}
                    />
                  )}
                  <span>Profile</span>
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className={`w-full border-green-500 text-green-500 ${
                      isDarkMode ? "hover:bg-green-900" : "hover:bg-green-50"
                    }`}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                  <Button
                    className={`w-full ${
                      isDarkMode
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white`}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Drawer for Authenticated Users */}
      <AnimatePresence>
        {isSidebarOpen && isAuthenticated && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 h-full w-64 z-60 p-6 ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            } shadow-lg border-l`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border-2 border-green-500"
                  />
                ) : (
                  <User
                    className={`h-10 w-10 p-2 rounded-full ${
                      isDarkMode
                        ? "bg-green-900 text-green-400"
                        : "bg-green-100 text-green-500"
                    }`}
                  />
                )}
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Sidebar Links */}
            <div
              className={`flex flex-col gap-4 fixed right-0 w-64 p-4 ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              } shadow-lg border-l border-b`}
            >
              {sidebarLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  to={path}
                  className="flex items-center gap-3 mb-2 text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 text-green-500" />
                  <span>{name}</span>
                </Link>
              ))}

              {/* Logout Button */}
              <Button
                variant="outline"
                className={`w-full border-red-700 text-red-500 ${
                  isDarkMode ? "hover:bg-red-900" : "hover:bg-red-500"
                }`}
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                  navigate("/login");
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black/50 z-50 ${
              isDarkMode === "dark" ? "bg-gray-900/50" : "bg-black/50"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
