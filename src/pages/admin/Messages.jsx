import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Trash2, Mail, Phone, Clock, CheckCircle, Circle } from "lucide-react";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setMessages(data);
        setLoading(false);
    };

    const toggleRead = async (id, currentStatus) => {
        const { error } = await supabase
            .from("messages")
            .update({ is_read: !currentStatus })
            .eq("id", id);

        if (!error) fetchMessages();
    };

    const deleteMessage = async (id) => {
        if (confirm("Are you sure you want to delete this message?")) {
            const { error } = await supabase.from("messages").delete().eq("id", id);
            if (!error) fetchMessages();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <h1 style={{ color: "#c6a87c" }}>Inbox - Messages</h1>
            </div>

            {loading ? (
                <div style={{ display: "grid", gap: "1rem" }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ background: "#1f2430", borderRadius: "8px", padding: "1.5rem", height: "150px", animation: "pulse 1.5s infinite" }}>
                            <div style={{ height: "20px", width: "30%", background: "rgba(255,255,255,0.05)", marginBottom: "1rem" }}></div>
                            <div style={{ height: "15px", width: "20%", background: "rgba(255,255,255,0.05)", marginBottom: "2rem" }}></div>
                            <div style={{ height: "15px", width: "80%", background: "rgba(255,255,255,0.05)" }}></div>
                        </div>
                    ))}
                    <style>{`
                        @keyframes pulse {
                            0% { opacity: 0.6; }
                            50% { opacity: 1; }
                            100% { opacity: 0.6; }
                        }
                    `}</style>
                </div>
            ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                    {messages.length === 0 && <p style={{ color: "#aaa" }}>No messages found.</p>}

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                background: msg.is_read ? "#161a22" : "#1f2430",
                                borderLeft: msg.is_read ? "4px solid #333" : "4px solid #c6a87c",
                                borderRadius: "8px",
                                padding: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                position: "relative"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                                <div>
                                    <h3 style={{ color: "#fff", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
                                        {msg.name}
                                        {/* Source Badge */}
                                        <span style={{
                                            fontSize: "0.7rem",
                                            background: msg.source === 'Saloon' ? "#3498db" : "#c6a87c",
                                            color: "#000",
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                            textTransform: "uppercase",
                                            fontWeight: "bold"
                                        }}>
                                            {msg.source || 'Bridal'}
                                        </span>
                                        {!msg.is_read && (
                                            <span style={{ fontSize: "0.7rem", background: "#e74c3c", color: "#fff", padding: "2px 6px", borderRadius: "4px" }}>NEW</span>
                                        )}
                                    </h3>
                                    <div style={{ display: "flex", gap: "1.5rem", color: "#aaa", fontSize: "0.9rem" }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <Phone size={14} /> {msg.phone}
                                        </span>
                                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <Clock size={14} /> {formatDate(msg.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => toggleRead(msg.id, msg.is_read)}
                                        title={msg.is_read ? "Mark as Unread" : "Mark as Read"}
                                        style={{
                                            background: "transparent",
                                            border: "1px solid #444",
                                            color: msg.is_read ? "#aaa" : "#2ecc71",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {msg.is_read ? <Circle size={18} /> : <CheckCircle size={18} />}
                                    </button>

                                    <button
                                        onClick={() => deleteMessage(msg.id)}
                                        title="Delete"
                                        style={{
                                            background: "transparent",
                                            border: "1px solid #444",
                                            color: "#e74c3c",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "6px", color: "#ddd", lineHeight: "1.5" }}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
