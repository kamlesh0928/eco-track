import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import validator from "validator";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = useCallback(
    (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      setEmailError(validator.isEmail(newEmail) ? "" : "Invalid email address");
    },
    [setEmail, setEmailError]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setIsSubmitted(true);
    console.log("Password reset requested for:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-md w-full px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-300"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
            <p className="text-gray-500">
              Enter your email to reset your password
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium">
                A password reset link has been sent to your email.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-block text-green-500 hover:text-green-600 font-medium"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white border-gray-300 font-normal focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="you@example.com"
                  />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
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
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                Reset Password
              </motion.button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-center font-medium">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-green-500 hover:text-green-600 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ForgotPassword;
