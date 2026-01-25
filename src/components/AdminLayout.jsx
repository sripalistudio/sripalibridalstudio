import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { LayoutDashboard, Calendar, Package, Image, LogOut, Mail, Menu, X, User } from "lucide-react";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Bookings", path: "/admin/bookings", icon: <Calendar size={20} /> },
        { name: "Messages", path: "/admin/messages", icon: <Mail size={20} /> },
        { name: "Packages", path: "/admin/packages", icon: <Package size={20} /> },
        { name: "Gallery", path: "/admin/gallery", icon: <Image size={20} /> },
        { name: "Men's Gallery", path: "/admin/mens-gallery", icon: <Image size={20} /> },
        { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
    ];

    return (
        <div className="admin-container">
            {/* Mobile Header */}
            <div className="admin-mobile-header">
                <h3 style={{ color: "#c6a87c", margin: 0 }}>Admin Panel</h3>
                <button
                    className="admin-mobile-toggle"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2 style={{ color: "#c6a87c", marginBottom: "2rem", textAlign: "center", display: "none" }} className="desktop-logo">Admin Panel</h2>
                {/* We can hide this h2 on mobile since we have the header, or adjust styles. 
                    I'll add a style to show it only on desktop via inline check or class. 
                    Actually, let's just keep it, it will slide in. */}
                <h2 style={{ color: "#c6a87c", marginBottom: "2rem", textAlign: "center" }}>Admin Panel</h2>

                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)} // Close on click
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "1rem",
                                    marginBottom: "0.5rem",
                                    color: isActive ? "#000" : "#ccc",
                                    background: isActive ? "#c6a87c" : "transparent",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    fontWeight: isActive ? "bold" : "normal",
                                    transition: "all 0.3s"
                                }}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "1rem",
                        background: "transparent",
                        color: "#ff4d4d",
                        border: "1px solid #ff4d4d",
                        borderRadius: "8px",
                        cursor: "pointer",
                        width: "100%",
                        justifyContent: "center",
                        marginTop: "auto"
                    }}
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
