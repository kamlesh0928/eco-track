"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
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
  MessageSquare,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../services/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  // Sidebar navigation links
  const sidebarLinks = [
    { name: "Edit Profile", path: "/edit-profile", icon: Edit },
    { name: "Dashboard", path: "/user-dashboard", icon: BarChart2 },
    { name: "Give Feedback", path: "/feedback", icon: MessageSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
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
            { name: "Leaderboard", path: "/leaderboard" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors font-medium"
            >
              {name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-700 dark:text-gray-300 hover:text-green-500"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
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
                  <User className="h-8 w-8 p-1 rounded-full bg-green-100 dark:bg-green-900 text-green-500" />
                )}
              </button>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-gray-200 dark:border-gray-800 p-4"
        >
          <div className="flex flex-col gap-4">
            {[
              { name: "Home", path: "/home" },
              { name: "Features", path: "/features" },
              { name: "Leaderboard", path: "/leaderboard" },
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
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-700 dark:text-gray-300 hover:text-green-500"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
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
                  <User className="h-8 w-8 p-1 rounded-full bg-green-100 dark:bg-green-900 text-green-500" />
                )}
                <span>Profile</span>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Sidebar Drawer for Authenticated Users */}
      <AnimatePresence>
        {isSidebarOpen && isAuthenticated && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 p-6"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border-2 border-green-500 flex items-center justify-center overflow-hidden">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to an icon if the image fails to load
                        e.currentTarget.src = ""; // Clear the invalid src
                        e.currentTarget.className = "hidden"; // Hide the broken image
                      }}
                    />
                  ) : null}
                  {!user?.photoURL && (
                    <User className="h-6 w-6 text-green-500 bg-green-100 dark:bg-green-900 rounded-full p-1" />
                  )}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Sidebar Links */}
            <div className="flex flex-col gap-4">
              {sidebarLinks.map(({ name, path, icon: Icon }) => (
                <Link
                  key={name}
                  to={path}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 text-green-500" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              className="w-full mt-6 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
              onClick={() => {
                logout();
                setIsSidebarOpen(false);
                navigate("/login");
              }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
