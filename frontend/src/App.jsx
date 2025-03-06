import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to={"/home"} /> : <LandingPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to={"/home"} /> : <Signup />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to={"/home"} /> : <Login />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
