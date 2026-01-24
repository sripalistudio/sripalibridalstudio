import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { LayoutDashboard, Calendar, Package, Image, LogOut, Mail } from "lucide-react";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
    ];

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#0F1014", color: "#fff" }}>
            {/* Sidebar */}
            <aside style={{ width: "250px", background: "#12141a", borderRight: "1px solid #333", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
                <h2 style={{ color: "#c6a87c", marginBottom: "2rem", textAlign: "center" }}>Admin Panel</h2>

                <nav style={{ flex: 1 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
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
            <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
