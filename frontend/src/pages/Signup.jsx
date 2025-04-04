import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import handleGoogleAuth from "../services/handleGoogleAuth";
import { toast } from "react-toastify";
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
  id,
  required,
  showPasswordToggle,
  onTogglePassword,
  error,
}) => (
  <div className="relative">
    <div className="relative flex items-center">
      <span className="absolute left-0 pl-3 flex items-center h-full">
        {icon}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
          showPasswordToggle ? "pr-10" : "pr-3"
        }`}
        name={id}
        placeholder={placeholder}
        required={required}
        id={id}
        style={{ lineHeight: "normal" }}
      />
      {showPasswordToggle && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
          type="button"
          onClick={onTogglePassword}
          className="text-gray-600 dark:text-gray-400 hover:text-green-500 focus:outline-none"
          aria-label={type === "password" ? "Show password" : "Hide password"}
        >
          {type === "password" ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        </div>
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordStrengthIndicator = ({ password }) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  const strength =
    (isLongEnough ? 1 : 0) +
    (hasLowercase ? 1 : 0) +
    (hasUppercase ? 1 : 0) +
    (hasNumber ? 1 : 0) +
    (hasSpecialChar ? 1 : 0);

  const PASSWORD_STRENGTH_LABELS = [
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ];
  const PASSWORD_STRENGTH_COLORS = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-500",
  ];

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          Password strength:
        </span>
        <span className="text-xs font-medium text-gray-900 dark:text-gray-200">
          {PASSWORD_STRENGTH_LABELS[strength - 1] || "Weak"}
        </span>
      </div>
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`${
            PASSWORD_STRENGTH_COLORS[strength - 1] || "bg-red-500"
          } h-full transition-all duration-300`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      <div className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 text-xs">
        <div className="flex items-center">
          {isLongEnough ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least 8 characters long</span>
        </div>
        <div className="flex items-center">
          {hasLowercase ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one lowercase letter</span>
        </div>
        <div className="flex items-center">
          {hasUppercase ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one uppercase letter</span>
        </div>
        <div className="flex items-center">
          {hasNumber ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one number</span>
        </div>
        <div className="flex items-center">
          {hasSpecialChar ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one special character</span>
        </div>
      </div>
    </div>
  );
};

const SocialSignupButton = ({ icon, label, onClick, isLoading }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={isLoading}
    className={`flex items-center justify-center w-full py-3 px-4 border rounded-lg ${
      isLoading
        ? "bg-gray-300 dark:bg-gray-700"
        : "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
    } border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 shadow-lg transition-colors`}
  >
    {isLoading ? <Loader size={18} className="animate-spin mr-2" /> : icon}
    <span className="ml-2">{label}</span>
  </motion.button>
);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { currentTheme } = useCustomTheme();
  const navigate = useNavigate();
  const isDarkMode = currentTheme === "dark";

  const handleNameChange = useCallback((e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName.trim() ? "" : "Name is required");
  }, []);

  const handleEmailChange = useCallback((e) => {
    const newEmail = e.target.value.toLowerCase(); // lowercase me convert;
    setEmail(newEmail);
    setEmailError(validator.isEmail(newEmail) ? "" : "Invalid email address");
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
  }, []);

  const handleConfirmPasswordChange = useCallback(
    (e) => {
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      setConfirmPasswordError(
        newConfirmPassword === password ? "" : "Passwords do not match"
      );
    },
    [password]
  );

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else if (name.length < 2) {
      setNameError("Name must be at least 2 characters");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword()) {
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!agreeTerms) {
      setFormError("You must agree to the terms and conditions");
      isValid = false;
    }

    return isValid;
  };

  const validatePassword = () => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (
      !isLongEnough ||
      !hasLowercase ||
      !hasUppercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          createdAt: new Date(),
        });
      }

      toast.success("Account created successfully!", {
        position: "top-center",
        theme: isDarkMode ? "dark" : "light",
      });
      navigate("/location");
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already registered. Please use a different email or login.";
          setEmailError(errorMessage);
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          setPasswordError(errorMessage);
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address";
          setEmailError(errorMessage);
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Network error. Please check your internet connection.";
          setFormError(errorMessage);
          break;
        default:
          errorMessage =
            error.message || "Registration failed. Please try again.";
          setFormError(errorMessage);
      }

      toast.error(errorMessage, {
        position: "top-center",
        theme: isDarkMode ? "dark" : "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 flex items-center justify-center ${
        isDarkMode ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="max-w-md w-full px-6 py-8">
        <motion.div
          {...fadeInUp}
          className={`bg-green-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-2"
            >
              Join <span className="text-green-500">EcoTrack</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300"
            >
              Start your journey towards a sustainable future
            </motion.p>
          </div>

          {/* Form Error Display */}
          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 ${
                isDarkMode
                  ? "bg-red-900/30 border-red-700"
                  : "bg-red-100 border-red-400"
              } border text-red-700 dark:text-red-300 rounded-lg text-sm`}
            >
              <div className="flex items-center">
                <AlertCircle className="mr-2 flex-shrink-0" size={16} />
                <span>{formError}</span>
              </div>
            </motion.div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                htmlFor="name"
              >
                Full Name
              </label>
              <InputField
                icon={
                  <User
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                }
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="John Doe"
                id="name"
                required
                error={nameError}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                htmlFor="email"
              >
                Email Address
              </label>
              <InputField
                icon={
                  <Mail
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                }
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="you@example.com"
                id="email"
                required
                error={emailError}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <InputField
                icon={
                  <Lock
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                }
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                id="password"
                required
                showPasswordToggle
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={passwordError}
              />
              {password && <PasswordStrengthIndicator password={password} />}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <InputField
                icon={
                  <Lock
                    size={18}
                    className="text-gray-600 dark:text-gray-400"
                  />
                }
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="••••••••"
                id="confirmPassword"
                required
                showPasswordToggle
                onTogglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                error={confirmPasswordError}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => {
                    setAgreeTerms(!agreeTerms);
                    if (agreeTerms) setFormError("");
                  }}
                  className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-700 rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-600 dark:text-gray-300"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-green-500 hover:text-green-600 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-green-500 hover:text-green-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {formError && !agreeTerms && (
                <p className="text-red-500 text-xs ml-6 -mt-1">{formError}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={
                isLoading ||
                !agreeTerms ||
                passwordError ||
                confirmPasswordError
              }
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-white ${
                isDarkMode
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-600 hover:bg-green-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <Loader size={18} className="animate-spin mr-2" />
              ) : (
                <UserPlus size={18} className="mr-2" />
              )}
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-4 ${
                  isDarkMode
                    ? "bg-gray-900 text-gray-300"
                    : "bg-white text-gray-600"
                }`}
              >
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="flex justify-center space-x-4">
            <SocialSignupButton
              icon={<FcGoogle size={20} />}
              label="Google"
              onClick={handleGoogleAuth}
            />
          </div>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-500 hover:text-green-600 font-medium transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
