import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import validator from "validator";
import { auth } from "../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useTheme } from "next-themes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();

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
      console.log("Password reset email sent to:", email);

      toast.success("Password reset email sent successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light", // Align toast with theme
      });
    } catch (error) {
      console.error("Error sending password reset email:", error.message);

      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
      });

      setIsSubmitted(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center pt-20 ${
        theme === "dark" ? "bg-gray-950" : "border-gray-200"
      }`}
    >
      <div className="max-w-md w-full px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`bg-card dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 backdrop-blur-sm ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
              Reset Your EcoTrack Password
            </h1>
            <p
              className={`text-gray-500 dark:text-gray-400 text-sm sm:text-base`}
            >
              Enter your email to reset your password
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`text-center p-4 sm:p-6 rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200"
              } border shadow-sm`}
            >
              <CheckCircle
                size={48}
                className="text-green-500 dark:text-green-400 mx-auto mb-4"
              />
              <p
                className={`text-gray-700 dark:text-gray-200 font-medium text-base sm:text-lg`}
              >
                A password reset link has been sent to your email.
              </p>
              <p className={`text-gray-500 dark:text-gray-400 text-sm mt-2`}>
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
              <Link
                to="/login"
                className="mt-4 sm:mt-6 inline-block text-green-500 dark:text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:bg-clip-text hover:text-transparent font-medium text-sm sm:text-base"
              >
                Back to Login
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      size={18}
                      className="text-gray-400 dark:text-gray-500"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-normal focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-100"
                    placeholder="you@example.com"
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                    {emailError}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!!emailError || !email}
                className={`w-full flex justify-center items-center font-medium py-3 px-4 border border-transparent rounded-lg shadow-sm text-white 
                  ${
                    emailError || !email
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700"
                  } 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
              >
                Reset Password
              </motion.button>
            </form>
          )}

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-center font-medium text-gray-700 dark:text-gray-300">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-green-500 dark:text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:bg-clip-text hover:text-transparent font-medium"
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
