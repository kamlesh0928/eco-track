import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import SmallActionsSection from "./components/SmallActionsSection";
import WhyEcoTrack from "./components/WhyEcoTrack";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import CarbonFootprintOverview from "./components/CarbonFootprintOverview";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import LocationPage from "./pages/LocationPage";
import CarbonFootprintCalculator from "./pages/CarbonFootprintCalculator";
import UserDashboard from "./pages/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword";

import { auth } from "./services/firebase";

const PrivateRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider attribute="class">
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header user={user} />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturesSection />
                    <SmallActionsSection />
                    <WhyEcoTrack />
                    <CarbonFootprintOverview />
                    <ContactSection />
                    <FAQSection />
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              {user && (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/location" element={<LocationPage />} />
                  <Route path="/carbon-footprint-calculator" element={<CarbonFootprintCalculator />} />
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                </>
              )}

              {/* Redirect unauthenticated users */}
              {!user && (
                <>
                  {/* Redirect all other routes to login */}
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
