import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
import { useTheme } from "next-themes";

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
      <div className="absolute left-0 pl-3 flex items-center h-full">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-10 py-3 rounded-lg border bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
          error ? "border-red-500" : ""
        }`}
        name={id}
        placeholder={placeholder}
        required={required}
        id={id} // Added for better accessibility
        style={{ lineHeight: "normal" }} // Ensure text is vertically centered
      />
      {showPasswordToggle && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={onTogglePassword}
            className="text-muted-foreground dark:text-gray-400 hover:text-green-500 focus:outline-none"
            aria-label={type === "password" ? "Show password" : "Hide password"} // Accessibility improvement
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
        <span className="text-xs font-medium text-muted-foreground dark:text-gray-300">
          Password strength:
        </span>
        <span className="text-xs font-medium text-foreground dark:text-gray-100">
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
      <div className="mt-2 space-y-1 text-muted-foreground dark:text-gray-300">
        <div className="flex items-center text-xs">
          {isLongEnough ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least 8 characters long</span>
        </div>
        <div className="flex items-center text-xs">
          {hasLowercase ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one lowercase letter</span>
        </div>
        <div className="flex items-center text-xs">
          {hasUppercase ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one uppercase letter</span>
        </div>
        <div className="flex items-center text-xs">
          {hasNumber ? (
            <CheckCircle size={12} className="text-green-500 mr-1" />
          ) : (
            <AlertCircle size={12} className="text-red-500 mr-1" />
          )}
          <span>At least one number</span>
        </div>
        <div className="flex items-center text-xs">
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
    className="flex items-center justify-center w-full py-3 px-4 border rounded-lg bg-card dark:bg-gray-900 text-foreground dark:text-gray-100 hover:bg-muted dark:hover:bg-gray-800 shadow-lg transition-colors"
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
  const { theme } = useTheme();

  const handleNameChange = useCallback((e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName.trim() ? "" : "Name is required");
  }, []);

  const handleEmailChange = useCallback((e) => {
    const newEmail = e.target.value;
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

  const validatePassword = () => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!password.trim()) {
      setPasswordError("Password is required");
      return false;
    }

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

    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }
    if (!validatePassword()) {
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }
    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions", {
        theme: theme === "dark" ? "dark" : "light",
      });
      isValid = false;
    }

    if (!isValid) return;

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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
      });

      window.location.href = "/location";
    } catch (error) {
      console.error(error.message);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-background dark:bg-gray-950">
      <div className="max-w-md w-full px-6 py-8">
        <motion.div
          {...fadeInUp}
          className="bg-card dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-4xl font-bold text-foreground dark:text-gray-100 mb-2"
            >
              Join <span className="text-green-500">EcoTrack</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground dark:text-gray-300"
            >
              Start your journey towards a sustainable future
            </motion.p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 text-foreground dark:text-gray-100"
                htmlFor="name"
              >
                Full Name
              </label>
              <InputField
                icon={
                  <User
                    size={18}
                    className="text-muted-foreground dark:text-gray-400"
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
                className="block text-sm font-medium mb-2 text-foreground dark:text-gray-100"
                htmlFor="email"
              >
                Email Address
              </label>
              <InputField
                icon={
                  <Mail
                    size={18}
                    className="text-muted-foreground dark:text-gray-400"
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
                className="block text-sm font-medium mb-2 text-foreground dark:text-gray-100"
                htmlFor="password"
              >
                Password
              </label>
              <InputField
                icon={
                  <Lock
                    size={18}
                    className="text-muted-foreground dark:text-gray-400"
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
                className="block text-sm font-medium mb-2 text-foreground dark:text-gray-100"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <InputField
                icon={
                  <Lock
                    size={18}
                    className="text-muted-foreground dark:text-gray-400"
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
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 dark:border-gray-700 rounded"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-muted-foreground dark:text-gray-300"
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
              className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-lg text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span className="bg-card dark:bg-gray-900 px-4 text-muted-foreground dark:text-gray-300">
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
              isLoading={isLoading}
            />
          </div>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-muted-foreground dark:text-gray-300">
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
