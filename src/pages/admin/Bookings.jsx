import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Trash2, Check, X, CheckCircle, Hourglass } from "lucide-react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    setLoading(true);
    let query = supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "ALL") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;

    if (!error) {
      setBookings(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    if (confirm(`Are you sure you want to mark this booking as ${status}?`)) {
      await supabase.from("bookings").update({ status }).eq("id", id);
      fetchBookings();
    }
  };

  const deleteBooking = async (id) => {
    if (confirm("Are you sure you want to DELETE this booking? This cannot be undone.")) {
      await supabase.from("bookings").delete().eq("id", id);
      fetchBookings();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#c6a87c" }}>Booking Manager</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            background: "#12141a",
            color: "#fff",
            border: "1px solid #333",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <option value="ALL">All Bookings</option>
          <option value="NEW">New</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div style={{ overflowX: "auto", background: "#12141a", borderRadius: "12px", border: "1px solid #333", padding: "1rem" }}>
          <div style={{ animation: "pulse 1.5s infinite" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "1rem" }}>
                <div style={{ height: "20px", width: "20%", background: "rgba(255,255,255,0.05)" }}></div>
                <div style={{ height: "20px", width: "20%", background: "rgba(255,255,255,0.05)" }}></div>
                <div style={{ height: "20px", width: "20%", background: "rgba(255,255,255,0.05)" }}></div>
                <div style={{ height: "20px", width: "20%", background: "rgba(255,255,255,0.05)" }}></div>
                <div style={{ height: "20px", width: "10%", background: "rgba(255,255,255,0.05)" }}></div>
              </div>
            ))}
          </div>
          <style>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
              `}</style>
        </div>
      ) : (
        <div style={{ overflowX: "auto", background: "#12141a", borderRadius: "12px", border: "1px solid #333" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#ddd" }}>
            <thead>
              <tr style={{ background: "#1f2430", textAlign: "left" }}>
                <th style={{ padding: "1rem" }}>Customer</th>
                <th style={{ padding: "1rem" }}>Service</th>
                <th style={{ padding: "1rem" }}>Date/Time</th>
                <th style={{ padding: "1rem" }}>Status</th>
                <th style={{ padding: "1rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid #2c2f36" }}>
                  <td style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: "bold", color: "#fff" }}>{b.customer_name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#aaa" }}>{b.phone}</div>
                    <div style={{ fontSize: "0.85rem", color: "#aaa" }}>{b.email}</div>
                  </td>
                  <td style={{ padding: "1rem" }}>{b.item_name}</td>
                  <td style={{ padding: "1rem" }}>
                    <div>{b.booking_date}</div>
                    <div style={{ fontSize: "0.85rem", color: "#aaa" }}>{b.booking_time}</div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        background:
                          b.status === "CONFIRMED"
                            ? "rgba(46, 204, 113, 0.2)"
                            : b.status === "COMPLETED"
                              ? "rgba(52, 152, 219, 0.2)"
                              : b.status === "CANCELLED"
                                ? "rgba(231, 76, 60, 0.2)"
                                : "rgba(241, 196, 15, 0.2)",
                        color:
                          b.status === "CONFIRMED"
                            ? "#2ecc71"
                            : b.status === "COMPLETED"
                              ? "#3498db"
                              : b.status === "CANCELLED"
                                ? "#e74c3c"
                                : "#f1c40f",
                      }}
                    >
                      {b.status || "NEW"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", display: "flex", gap: "0.5rem" }}>
                    {b.status !== "CONFIRMED" && b.status !== "COMPLETED" && (
                      <button
                        title="Confirm"
                        onClick={() => updateStatus(b.id, "CONFIRMED")}
                        style={{ ...actionBtnStyle, color: "#2ecc71", border: "1px solid #2ecc71" }}
                      >
                        <Check size={16} />
                      </button>
                    )}

                    {b.status === "CONFIRMED" && (
                      <button
                        title="Complete"
                        onClick={() => updateStatus(b.id, "COMPLETED")}
                        style={{ ...actionBtnStyle, color: "#3498db", border: "1px solid #3498db" }}
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}

                    {b.status !== "CANCELLED" && b.status !== "COMPLETED" && (
                      <button
                        title="Cancel"
                        onClick={() => updateStatus(b.id, "CANCELLED")}
                        style={{ ...actionBtnStyle, color: "#e74c3c", border: "1px solid #e74c3c" }}
                      >
                        <X size={16} />
                      </button>
                    )}

                    <button
                      title="Delete"
                      onClick={() => deleteBooking(b.id)}
                      style={{ ...actionBtnStyle, color: "#888", border: "1px solid #555" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div style={{ padding: "2rem", textAlign: "center", color: "#888" }}>
              No bookings found for this filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const actionBtnStyle = {
  background: "transparent",
  padding: "6px",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s"
};

export default AdminBookings;
