import React, { useState, useCallback } from "react";
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
  Facebook,
  Loader,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import handleGoogleAuth from "../services/handleGoogleAuth";
import { toast } from "react-toastify";

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
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 font-normal ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      name={id}
      placeholder={placeholder}
      required={required}
    />
    {showPasswordToggle && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button
          type="button"
          onClick={onTogglePassword}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          {type === "password" ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Password Strength Indicator Component
const PasswordStrengthIndicator = ({ password }) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const strength =
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
    "red",
    "orange",
    "yellow",
    "green",
    "emerald",
  ];

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium">Password strength:</span>
        <span className="text-xs font-medium">
          {PASSWORD_STRENGTH_LABELS[strength]}
        </span>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-${PASSWORD_STRENGTH_COLORS[strength]}-500`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>
      <div className="mt-2 space-y-1">
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

function Signup() {
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

  const handlePasswordChange = useCallback((e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");
  }, []);

  const handleEmailChange = useCallback((e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validator.isEmail(newEmail) ? "" : "Invalid email address");
  }, []);

  const handleNameChange = useCallback((e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName.trim() ? "" : "Name is required");
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

    if (
      !hasLowercase ||
      !hasUppercase ||
      !hasNumber ||
      !hasSpecialChar ||
      password.length < 8
    ) {
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!validatePassword()) {
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions");
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      // Redirect to home page or login page
      window.location.href = "/home";
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
      });
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-3xl font-bold mb-2">Join EcoTrack</h1>
            <p className="text-gray-500">
              Start your journey towards a sustainable future
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <InputField
                icon={<User size={18} className="text-gray-400" />}
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
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <InputField
                icon={<Mail size={18} className="text-gray-400" />}
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
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <InputField
                icon={<Lock size={18} className="text-gray-400" />}
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
                className="block text-sm font-medium mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <InputField
                icon={<Lock size={18} className="text-gray-400" />}
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
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block font-medium text-sm">
                I agree to the{" "}
                <a href="#" className="text-green-500 hover:text-green-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-500 hover:text-green-600">
                  Privacy Policy
                </a>
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
              className={`w-full flex justify-center items-center font-medium py-3 px-4 border border-transparent rounded-lg shadow-sm text-white 
                ${
                  isLoading ||
                  !agreeTerms ||
                  passwordError ||
                  confirmPasswordError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {isLoading ? (
                <Loader size={18} className="animate-spin mr-2" />
              ) : (
                <UserPlus size={18} className="mr-2" />
              )}
              {isLoading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Social Signup Buttons */}
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
            <button
              onClick={handleGoogleAuth}
              className="flex items-center justify-center w-1/2 py-3 px-4 border font-normal rounded-lg text-gray-700 bg-white hover:bg-gray-100 shadow-sm"
            >
              <FcGoogle size={20} className="mr-2" />
              Google
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-center font-medium">
              Already have an account?{" "}
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

export default Signup;
