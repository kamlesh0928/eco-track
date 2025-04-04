import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import handleGoogleAuth from "../services/handleGoogleAuth";
import { useCustomTheme } from "../hooks/useTheme";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const InputField = ({
  icon,
  type,
  value,
  onChange,
  placeholder,
  required,
  showPasswordToggle,
  onTogglePassword,
  error,
}) => (
  <div className="relative">
    <div className="relative flex items-center">
      <div className="absolute left-0 pl-3 flex items-center h-full">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-10 py-3 rounded-lg border ${
          type === "password" && showPasswordToggle ? "pr-16" : ""
        } ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
        } bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500`}
        placeholder={placeholder}
        required={required}
        style={{ lineHeight: "normal" }} // Ensure text is vertically centered
      />
      {showPasswordToggle && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={onTogglePassword}
            className="text-gray-400 dark:text-gray-400 hover:text-green-500 focus:outline-none"
          >
            {type === "password" ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      )}
    </div>
    {error && (
      <div className="flex items-center mt-1 text-red-500 text-sm">
        <AlertCircle size={14} className="mr-1" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

const SocialLoginButton = ({ icon, label, onClick, isLoading }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={isLoading}
    className="flex items-center justify-center w-full py-3 px-4 border rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 shadow-lg transition-colors"
  >
    {isLoading ? <Loader size={18} className="animate-spin mr-2" /> : icon}
    <span className="ml-2">{label}</span>
  </motion.button>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentTheme } = useCustomTheme();

  const handleEmailChange = useCallback((e) => {
    const newEmail = e.target.value.toLowerCase(); // lowercase me convert;
    setEmail(newEmail);
    setEmailError("");
    setFormError("");
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
    setFormError("");
  }, []);

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setEmailError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      window.location.href = "/features";
      toast.success("Logged in successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: currentTheme === "dark" ? "dark" : "light",
      });
    } catch (error) {
      console.error("Login error:", error.code);
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "Incorrect password for this email";
          setFormError(errorMessage);
          break;
        default:
          errorMessage = "Login failed. Please try again.";
          setFormError(errorMessage);
      }
      if (errorMessage) {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: currentTheme === "dark" ? "dark" : "light",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 flex items-center justify-center ${
        currentTheme === "dark" ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="max-w-md w-full px-6 py-8">
        <motion.div
          {...fadeInUp}
          className={`${
            currentTheme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-green-50 border-gray-200"
          } p-8 rounded-xl shadow-lg border backdrop-blur-lg`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2"
            >
              Welcome Back to <span className="text-green-500">EcoTrack</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Log in to continue your journey towards a sustainable future
            </motion.p>
          </div>

          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center"
            >
              <AlertCircle className="text-red-500 mr-2" size={18} />
              <span className="text-red-700 dark:text-red-300">
                {formError}
              </span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
                htmlFor="email"
              >
                Email Address
              </label>
              <InputField
                icon={
                  <Mail
                    size={18}
                    className="text-gray-400 dark:text-gray-400"
                  />
                }
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                required
                error={emailError}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-100"
                htmlFor="password"
              >
                Password
              </label>
              <InputField
                icon={
                  <Lock
                    size={18}
                    className="text-gray-400 dark:text-gray-400"
                  />
                }
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                required
                showPasswordToggle
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={passwordError}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-start">
              <Link
                to="/forgot-password"
                className="text-green-500 hover:text-green-600 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader size={18} className="animate-spin mr-2" />
              ) : (
                <LogIn size={18} className="mr-2" />
              )}
              {isLoading ? "Logging In..." : "Login"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-4 text-gray-600 dark:text-gray-300">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center space-x-4">
            <SocialLoginButton
              icon={<FcGoogle size={20} />}
              label="Google"
              onClick={handleGoogleAuth}
            />
          </div>

          {/* Signup Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-500 hover:text-green-600 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
