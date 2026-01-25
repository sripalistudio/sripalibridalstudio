import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        // Check if we are in a recovery session
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                // User is in recovery mode, safe to reset
            }
        });
    }, []);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage({ type: "error", text: error.message });
        } else {
            setMessage({ type: "success", text: "Password reset successfully! Redirecting to login..." });
            setTimeout(() => {
                navigate("/admin/login");
            }, 3000);
        }
        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0F1014",
            }}
        >
            <form
                onSubmit={handleReset}
                style={{
                    width: "350px",
                    padding: "2rem",
                    background: "#12141a",
                    borderRadius: "8px",
                    border: "1px solid #333",
                }}
            >
                <h2 style={{ textAlign: "center", color: "#c6a87c", marginBottom: '1.5rem' }}>Set New Password</h2>

                {message.text && (
                    <p style={{
                        color: message.type === "error" ? "#ef4444" : "#10b981",
                        textAlign: "center",
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {message.text}
                    </p>
                )}

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />

                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "1rem",
    background: "#0F1014",
    border: "1px solid #333",
    color: "#fff",
    borderRadius: "4px",
};

const buttonStyle = {
    width: "100%",
    padding: "0.8rem",
    background: "#c6a87c",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
};

export default ResetPassword;
