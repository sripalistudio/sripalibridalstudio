import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isResetMode, setIsResetMode] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/admin/dashboard");
    }

    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetMessage("");

    // Ensure URL is absolute
    const redirectTo = window.location.origin + "/admin/reset-password";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setError(error.message);
    } else {
      setResetMessage("Password reset link has been sent to your email.");
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
        onSubmit={isResetMode ? handleResetPassword : handleLogin}
        style={{
          width: "350px",
          padding: "2rem",
          background: "#12141a",
          borderRadius: "8px",
          border: "1px solid #333",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#c6a87c", marginBottom: '1.5rem' }}>
          {isResetMode ? "Reset Password" : "Admin Login"}
        </h2>

        {error && <p style={{ color: "#ef4444", textAlign: "center", marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        {resetMessage && <p style={{ color: "#10b981", textAlign: "center", marginBottom: '1rem', fontSize: '0.9rem' }}>{resetMessage}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        {!isResetMode && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        )}

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Processing..." : (isResetMode ? "Send Reset Link" : "Login")}
        </button>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <button
            type="button"
            onClick={() => {
              setIsResetMode(!isResetMode);
              setError("");
              setResetMessage("");
            }}
            style={{
              background: "transparent",
              color: "#aaa",
              fontSize: "0.9rem",
              textDecoration: "underline",
              padding: 0
            }}
          >
            {isResetMode ? "Back to Login" : "Forgot Password?"}
          </button>
        </div>
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

export default AdminLogin;
