import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import validator from "validator";
import { auth } from "../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useCustomTheme } from "../hooks/useTheme"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentTheme } = useCustomTheme();

  const handleEmailChange = useCallback(
    (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      setEmailError(validator.isEmail(newEmail) ? "" : "Invalid email address");
    },
    [setEmail, setEmailError]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    try {
      setIsSubmitted(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: currentTheme,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: currentTheme,
      });
      setIsSubmitted(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center pt-20 ${
        currentTheme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-md w-full px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`p-6 sm:p-8 rounded-xl shadow-lg border backdrop-blur-sm ${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800 text-gray-100"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1
              className={`text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r ${
                currentTheme === "dark"
                  ? "from-green-400 to-emerald-400"
                  : "from-green-500 to-emerald-500"
              } bg-clip-text text-transparent`}
            >
              Reset Your EcoTrack Password
            </h1>
            <p className="text-md sm:text-base text-gray-600 dark:text-gray-300">
              Enter your email to reset your password
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`text-center p-4 sm:p-6 rounded-lg ${
                currentTheme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } shadow-sm`}
            >
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <p className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-200">
                A password reset link has been sent to your email.
              </p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
              <Link
                to="/login"
                className="mt-4 sm:mt-6 inline-block text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-medium text-sm sm:text-base"
              >
                Back to Login
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    currentTheme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      size={18}
                      className="text-gray-500 dark:text-gray-300"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      currentTheme === "dark"
                        ? "bg-gray-800 border-gray-700 text-gray-100"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="you@example.com"
                  />
                </div>
                {emailError && (
                  <p className="text-xs mt-1 text-red-500 dark:text-red-400">
                    {emailError}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!!emailError || !email}
                className={`w-full flex justify-center items-center font-medium py-3 px-4 border border-transparent rounded-lg shadow-sm text-white ${
                  emailError || !email
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : currentTheme === "dark"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
              >
                Reset Password
              </motion.button>
            </form>
          )}

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-center font-medium text-gray-700 dark:text-gray-300">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
