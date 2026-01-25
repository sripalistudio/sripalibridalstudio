import React, { useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";

// Lazy Load Pages
const Home = React.lazy(() => import("./pages/Home"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Packages = React.lazy(() => import("./pages/Packages"));
const Founder = React.lazy(() => import("./pages/Founder"));
const Testimonials = React.lazy(() => import("./pages/Testimonials"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Booking = React.lazy(() => import("./pages/Booking"));
const BridalStudioVyasarpadi = React.lazy(() => import("./pages/BridalStudioVyasarpadi"));

// Admin Pages Lazy Load
const AdminLogin = React.lazy(() => import("./pages/admin/Login"));
const AdminResetPassword = React.lazy(() => import("./pages/admin/ResetPassword"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AdminBookings = React.lazy(() => import("./pages/admin/Bookings"));
const AdminPackages = React.lazy(() => import("./pages/admin/Packages"));
const AdminGallery = React.lazy(() => import("./pages/admin/Gallery"));
const AdminMessages = React.lazy(() => import("./pages/admin/Messages"));
const AdminProfile = React.lazy(() => import("./pages/admin/Profile"));

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
            <Suspense fallback={<Loader />}>
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
                  <Route path="/admin/reset-password" element={<AdminResetPassword />} />

                  {/* Protected Admin Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<AdminLayout />}>
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/bookings" element={<AdminBookings />} />
                      <Route path="/admin/messages" element={<AdminMessages />} />
                      <Route path="/admin/profile" element={<AdminProfile />} />
                      {/* Placeholder routes for now, will implement files next */}
                      <Route path="/admin/packages" element={<AdminPackages />} />
                      <Route path="/admin/gallery" element={<AdminGallery />} />
                    </Route>
                  </Route>

                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>

          {/* ✅ Hide Footer & Chatbot in Admin */}
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <Chatbot />}
        </div >
      )
      }
    </>
  );
}

export default App;
