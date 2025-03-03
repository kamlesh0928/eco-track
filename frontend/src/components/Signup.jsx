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
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import validator from "validator";

const InputField = ({
  icon,
  type,
  value,
  onChange,
  placeholder,
  id,
  required,
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 font-normal"
      name={id}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailError, setEmailError] = useState("");

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

  const PasswordStrengthIndicator = ({ strength }) => (
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
    </div>
  );

  const handlePasswordChange = useCallback((e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    let strength = 0;
    if (newPassword.length > 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;

    setPasswordStrength(strength);
  }, []);

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
    console.log("Signup attempt with:", { name, email, password });
  };

  const handleGoogleSignup = async () => {
    alert("Google signup clicked! (Implement Firebase signup here)");
  };

  const handleFacebookSignup = async () => {
    alert("Facebook signup clicked! (Implement Firebase signup here)");
  };

  const SocialSignupButton = ({ icon, label, onClick, color }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-1/2 py-3 px-4 border font-normal rounded-lg text-gray-700 bg-white hover:bg-gray-100 shadow-sm`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

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

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <InputField
                icon={<User size={18} className="text-gray-400" />}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} // Ensure onChange is passed correctly
                placeholder="John Doe"
                id="name"
                required
              />
            </div>

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
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  id="password"
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

              {password && (
                <PasswordStrengthIndicator strength={passwordStrength} />
              )}

              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-xs font-medium">
                    {password.length > 8 ? (
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                    ) : (
                      <AlertCircle size={14} className="text-red-500 mr-2" />
                    )}
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center text-xs font-medium">
                    {/[A-Z]/.test(password) ? (
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                    ) : (
                      <AlertCircle size={14} className="text-red-500 mr-2" />
                    )}
                    <span>At least one uppercase letter</span>
                  </div>
                  <div className="flex items-center text-xs font-medium">
                    {/[0-9]/.test(password) ? (
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                    ) : (
                      <AlertCircle size={14} className="text-red-500 mr-2" />
                    )}
                    <span>At least one number</span>
                  </div>
                  <div className="flex items-center text-xs font-medium">
                    {/[^A-Za-z0-9]/.test(password) ? (
                      <CheckCircle size={14} className="text-green-500 mr-2" />
                    ) : (
                      <AlertCircle size={14} className="text-red-500 mr-2" />
                    )}
                    <span>At least one special character</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Signup Buttons */}
            <div className="relative my-6"> {/* Divider */}
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
              <SocialSignupButton
                icon={<FcGoogle size={20} className="mr-2" />}
                label="Google"
                onClick={handleGoogleSignup}
              />
              <SocialSignupButton
                icon={<Facebook size={20} className="mr-2 text-blue-600" />}
                label="Facebook"
                onClick={handleFacebookSignup}
              />
            </div>

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

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!agreeTerms || passwordStrength < 2}
              className={`w-full flex justify-center items-center font-medium py-3 px-4 border border-transparent rounded-lg shadow-sm text-white 
                ${
                  !agreeTerms || passwordStrength < 2
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              <UserPlus size={18} className="mr-2" />
              Create Account
            </motion.button>
          </form>

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
