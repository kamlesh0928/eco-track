import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ClientOnly from "./components/ClientOnly";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HeroSection from "./components/HeroSection";
import Apart from "./components/Apart";
import SmallActionsSection from "./components/SmallActionsSection";
import WhyEcoTrack from "./components/WhyEcoTrack";
import ContactSection from "./components/ContactSection";
import FAQSection from "./components/FAQSection";
import CarbonFootprintOverview from "./components/CarbonFootprintOverview";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import LocationPage from "./pages/LocationPage";
import CarbonFootprintCalculator from "./pages/CarbonFootprintCalculator";
import UserDashboard from "./pages/UserDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ActivityTracking from "./pages/ActivityTracking";
import GamifiedChallenges from "./pages/GamifiedChallenges";
import CommunityHub from "./pages/CommunityHub";
import NotFound from "./pages/NotFound";
import Earth from "./pages/Earth";

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-200"></div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <ThemeProvider
        attribute="class"
        defaultTheme="light" // Changed to light for default white theme
        enableSystem={false} // Disabled system theme to enforce white default
        storageKey="theme"
        disableTransitionOnChange
      >
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
                      <Apart />
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
                <Route path="/not-found" element={<NotFound />} />

                {/* Protected Routes */}
                <Route
                  path="/home"
                  element={
                    <PrivateRoute user={user}>
                      <>
                        <HeroSection />
                        <Apart />
                        <SmallActionsSection />
                        <WhyEcoTrack />
                        <CarbonFootprintOverview />
                        <ContactSection />
                        <FAQSection />
                      </>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PrivateRoute user={user}>
                      <Contact />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <PrivateRoute user={user}>
                      <Leaderboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/features"
                  element={
                    <PrivateRoute user={user}>
                      <Features />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/how-it-works"
                  element={
                    <PrivateRoute user={user}>
                      <HowItWorks />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/location"
                  element={
                    <PrivateRoute user={user}>
                      <LocationPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/carbon-footprint-calculator"
                  element={
                    <PrivateRoute user={user}>
                      <CarbonFootprintCalculator />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/activity-tracking"
                  element={
                    <PrivateRoute user={user}>
                      <ActivityTracking />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/gamified-challenges"
                  element={
                    <PrivateRoute user={user}>
                      <GamifiedChallenges />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/community-hub"
                  element={
                    <PrivateRoute user={user}>
                      <CommunityHub />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/earth"
                  element={
                    <PrivateRoute user={user}>
                      <Earth />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user-dashboard"
                  element={
                    <PrivateRoute user={user}>
                      <UserDashboard />
                    </PrivateRoute>
                  }
                />

                {/* Redirect unauthenticated users */}
                <Route path="*" element={<Navigate to="/not-found" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ClientOnly>
  );
}

export default App;
