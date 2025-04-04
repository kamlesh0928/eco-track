import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import Globe from "react-globe.gl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useCustomTheme } from "../hooks/useTheme";

const EarthLeftSection = () => {
  const { currentTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false); // Added mounted state
  const [carbonFootprints, setCarbonFootprints] = useState([]);
  const [globeSize, setGlobeSize] = useState(500); // Increased default size
  const globeRef = useRef();

  useEffect(() => {
    const fetchCarbonFootprints = async () => {
      const querySnapshot = await getDocs(collection(db, "carbonFootprints"));
      const footprints = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          lat: data.location.latitude,
          lng: data.location.longitude,
          weight: data.co2Emissions,
        };
      });
      setCarbonFootprints(footprints);
    };

    fetchCarbonFootprints();

    const handleResize = () => {
      const newSize = Math.min(
        window.innerWidth * 0.9,
        window.innerHeight * 0.7,
        600
      );
      setGlobeSize(newSize);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Set mounted to true after initial setup
    setMounted(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent rendering until mounted
  if (!mounted) return null;

  const handleAutoRotate = (shouldRotate) => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = shouldRotate;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`h-full flex flex-col p-6 ${
        currentTheme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-green-100 border-gray-200"
      } rounded-xl shadow-lg border backdrop-blur-lg`}
    >
      {/* Header Section */}
      <motion.div
        className="flex items-center mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FiGlobe className="text-4xl text-green-600 dark:text-green-500 mr-4 animate-pulse" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
          Global Carbon Emissions
        </h1>
      </motion.div>

      {/* Globe Container */}
      <motion.div
        className="flex-1 bg-green-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 flex items-center justify-center p-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Gradient Overlay for Style */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 dark:from-gray-800/20 to-transparent pointer-events-none" />

        <div className="w-full h-full flex items-center justify-center">
          <Globe
            ref={globeRef}
            width={globeSize}
            height={globeSize}
            globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(0,0,0,0)" // Transparent background for gradient
            heatmapsData={[carbonFootprints]}
            heatmapPointLat="lat"
            heatmapPointLng="lng"
            heatmapPointWeight="weight"
            heatmapBandwidth={1.5} // Increased for more visible heatmap
            heatmapResolution={64} // Higher resolution for smoothness
            heatmapBlur={0.8} // Reduced blur for sharper points
            heatmapColorSaturation={3} // More vibrant colors
            heatmapTopAltitude={0.01} // Slightly raised for 3D effect
            heatmapsTransitionDuration={1500} // Faster transition
            enablePointerInteraction={true}
            onGlobeReady={() => handleAutoRotate(true)}
            onPointHover={() => handleAutoRotate(false)}
            onPointUnhover={() => handleAutoRotate(true)}
            pointLabel={(d) => `
              <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transform transition-all hover:scale-105">
                <strong class="text-xl font-semibold">${
                  d.country || "Unknown"
                }, ${d.state || "Unknown"}</strong><br>
                <span class="text-gray-600 dark:text-gray-400 text-sm">Emissions: ${
                  d.weight
                } MT CO₂</span><br>
                ${
                  d.perCapita
                    ? `<span class="text-gray-600 dark:text-gray-400 text-sm">Per capita: ${d.perCapita} t</span>`
                    : ""
                }
              </div>
            `}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarthLeftSection;
