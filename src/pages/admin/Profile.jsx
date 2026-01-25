import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { User, Lock, Mail, Save } from "lucide-react";

const AdminProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUser(user);
            setEmail(user.email);
        }
        setLoading(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (password && password !== confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match." });
            return;
        }

        setUpdating(true);
        const updates = {};
        if (password) updates.password = password;
        // Updating email triggers a confirmation email to the new address
        if (email && email !== user.email) updates.email = email;

        if (Object.keys(updates).length === 0) {
            setUpdating(false);
            return;
        }

        const { error } = await supabase.auth.updateUser(updates);

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            let msg = "Profile updated successfully.";
            if (updates.email) msg += " Please check your new email to confirm the change.";
            setMessage({ type: "success", text: msg });
            setPassword("");
            setConfirmPassword("");
            fetchUser();
        }
        setUpdating(false);
    };

    if (loading) return <div style={{ color: "#fff" }}>Loading profile...</div>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ color: "#c6a87c", marginBottom: "2rem" }}>Manage Profile</h1>

            <div style={{ background: "#12141a", padding: "2rem", borderRadius: "12px", border: "1px solid #333" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #333" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#1f2430", display: "flex", alignItems: "center", justifyContent: "center", color: "#c6a87c" }}>
                        <User size={30} />
                    </div>
                    <div>
                        <h3 style={{ color: "#fff", margin: 0 }}>Administrator</h3>
                        <p style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "0.2rem" }}>Secure Account Settings</p>
                    </div>
                </div>

                {message.text && (
                    <div style={{
                        padding: "1rem",
                        marginBottom: "1.5rem",
                        borderRadius: "8px",
                        background: message.type === "error" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                        color: message.type === "error" ? "#ef4444" : "#10b981",
                        border: `1px solid ${message.type === "error" ? "#ef4444" : "#10b981"}`
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        <label style={{ display: "block", color: "#ccc", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Email Address</label>
                        <div style={{ position: "relative" }}>
                            <Mail size={18} color="#666" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                            />
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.3rem" }}>Changing email requires confirmation.</p>
                    </div>

                    <div>
                        <label style={{ display: "block", color: "#ccc", marginBottom: "0.5rem", fontSize: "0.9rem" }}>New Password</label>
                        <div style={{ position: "relative" }}>
                            <Lock size={18} color="#666" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="password"
                                placeholder="Leave blank to keep current"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", color: "#ccc", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Confirm New Password</label>
                        <div style={{ position: "relative" }}>
                            <Lock size={18} color="#666" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={updating}
                        style={{
                            background: "#c6a87c",
                            color: "#000",
                            border: "none",
                            padding: "1rem",
                            borderRadius: "6px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            opacity: updating ? 0.7 : 1
                        }}
                    >
                        <Save size={18} /> {updating ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    background: "#0F1014",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "1rem",
    fontFamily: "inherit",
};

export default AdminProfile;
