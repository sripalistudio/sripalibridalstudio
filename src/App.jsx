import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Packages from "./pages/Packages";
import Founder from "./pages/Founder";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import BridalStudioVyasarpadi from "./pages/BridalStudioVyasarpadi";
import AdminBookings from "./pages/admin/Bookings";
import AdminPackages from "./pages/admin/Packages";
import AdminGallery from "./pages/admin/Gallery";
import AdminMessages from "./pages/admin/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Detect Admin Pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Loader onLoadingComplete={() => setLoading(false)} />
      <ScrollToTop />

      {!loading && (
        <div className="app-container">
          {/* ✅ Hide Navbar in Admin */}
          {!isAdminRoute && <Navbar />}

          {/* Main Content */}
          <main style={{ minHeight: "100vh", position: "relative" }}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* ================= PUBLIC ROUTES ================= */}
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/founder" element={<Founder />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />

                <Route
                  path="/bridal-studio-vyasarpadi"
                  element={<BridalStudioVyasarpadi />}
                />

                {/* ================= ADMIN ROUTES ================= */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/bookings" element={<AdminBookings />} />
                    <Route path="/admin/messages" element={<AdminMessages />} />
                    {/* Placeholder routes for now, will implement files next */}
                    <Route path="/admin/packages" element={<AdminPackages />} />
                    <Route path="/admin/gallery" element={<AdminGallery />} />
                  </Route>
                </Route>

              </Routes>
            </AnimatePresence>
          </main>

          {/* ✅ Hide Footer & Chatbot in Admin */}
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <Chatbot />}
        </div>
      )}
    </>
  );
}

export default App;
