import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { motion } from "framer-motion";
import { Users, Calendar, Package, Image, AlertCircle } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    todaysBookings: 0,
    activePackages: 0,
    totalGalleryImages: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Total Bookings
      const { count: totalBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

      // Today's Bookings
      const { count: todaysBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("booking_date", today);

      // Pending Bookings (NEW)
      const { count: pendingBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "NEW");

      // Active Packages
      const { count: activePackages } = await supabase
        .from("packages")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Total Gallery Images
      const { count: totalGalleryImages } = await supabase
        .from("gallery")
        .select("*", { count: "exact", head: true });

      setStats({
        totalBookings: totalBookings || 0,
        todaysBookings: todaysBookings || 0,
        pendingBookings: pendingBookings || 0,
        activePackages: activePackages || 0,
        totalGalleryImages: totalGalleryImages || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <Calendar size={24} color="#c6a87c" />,
      color: "border-l-4 border-yellow-600",
    },
    {
      title: "Today's Bookings",
      value: stats.todaysBookings,
      icon: <Users size={24} color="#c6a87c" />,
      color: "border-l-4 border-green-600",
    },
    {
      title: "Pending Requests",
      value: stats.pendingBookings,
      icon: <AlertCircle size={24} color="#ff4d4d" />,
      color: "border-l-4 border-red-600",
    },
    {
      title: "Active Packages",
      value: stats.activePackages,
      icon: <Package size={24} color="#c6a87c" />,
      color: "border-l-4 border-blue-600",
    },
    {
      title: "Gallery Images",
      value: stats.totalGalleryImages,
      icon: <Image size={24} color="#c6a87c" />,
      color: "border-l-4 border-purple-600",
    },
  ];

  if (loading) return <p style={{ color: "#fff" }}>Loading Dashboard...</p>;

  return (
    <div>
      <h1 style={{ color: "#c6a87c", marginBottom: "1.5rem" }}>Safe Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: "#12141a",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #333",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: "#ccc", fontSize: "0.9rem" }}>{card.title}</h3>
              {card.icon}
            </div>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
