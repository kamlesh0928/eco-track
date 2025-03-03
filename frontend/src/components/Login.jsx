import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Facebook } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";

const InputField = ({ icon, type, value, onChange, placeholder, required }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white border-gray-300 font-normal focus:ring-2 focus:ring-green-500 focus:border-green-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const SocialLoginButton = ({ icon, label, onClick, color }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-1/2 py-3 px-4 border font-normal rounded-lg text-gray-700 bg-white hover:bg-gray-100 shadow-sm`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  const handleEmailChange = useCallback((e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validator.isEmail(newEmail) ? "" : "Invalid email address");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    console.log("Login attempt with:", { email, password });
  };

  const handleGoogleLogin = async () => {
    alert("Google login clicked! (Implement Firebase login here)");
  };

  const handleFacebookLogin = async () => {
    alert("Facebook login clicked! (Implement Firebase login here)");
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-300"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-normal">
              Login to continue your eco journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <InputField
                icon={<Mail size={18} className="text-gray-400" />}
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <InputField
                  icon={<Lock size={18} className="text-gray-400" />}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start">
              <Link
                to="/forgot-password"
                className="text-green-500 hover:text-green-600 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg font-normal shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <LogIn size={18} className="mr-2" />
              Login
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 font-normal text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            <SocialLoginButton
              icon={<FcGoogle size={20} className="mr-2" />}
              label="Google"
              onClick={handleGoogleLogin}
            />
            <SocialLoginButton
              icon={<Facebook size={20} className="mr-2 text-blue-600" />}
              label="Facebook"
              onClick={handleFacebookLogin}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 font-normal">
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-500 hover:text-green-600 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
