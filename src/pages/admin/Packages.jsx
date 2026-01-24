import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPkg, setEditingPkg] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        features: "", // Comma separated string
        website_type: "BRIDAL",
        is_active: true,
    });

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("packages")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setPackages(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this package?")) {
            await supabase.from("packages").delete().eq("id", id);
            fetchPackages();
        }
    };

    const handleEdit = (pkg) => {
        setEditingPkg(pkg);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            features: Array.isArray(pkg.features) ? pkg.features.join(", ") : pkg.features || "",
            website_type: pkg.website_type,
            is_active: pkg.is_active,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert features string to array
        const featuresArray = formData.features.split(",").map((s) => s.trim()).filter(Boolean);

        const payload = {
            ...formData,
            features: featuresArray,
        };

        if (editingPkg) {
            // Update
            const { error } = await supabase
                .from("packages")
                .update(payload)
                .eq("id", editingPkg.id);

            if (error) alert("Error updating package: " + error.message);
        } else {
            // Create
            const { error } = await supabase.from("packages").insert([{ ...payload, created_at: new Date().toISOString() }]);
            if (error) alert("Error creating package: " + error.message);
        }

        setShowModal(false);
        setEditingPkg(null);
        setFormData({ title: "", description: "", price: "", features: "", website_type: "BRIDAL", is_active: true });
        fetchPackages();
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ color: "#c6a87c" }}>Package Manager</h1>
                <button
                    onClick={() => {
                        setEditingPkg(null);
                        setFormData({ title: "", description: "", price: "", features: "", website_type: "BRIDAL", is_active: true });
                        setShowModal(true);
                    }}
                    style={{
                        background: "#c6a87c",
                        color: "#000",
                        border: "none",
                        padding: "0.8rem 1.5rem",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Plus size={20} /> Add Package
                </button>
            </div>

            {loading ? (
                <p style={{ color: "#fff" }}>Loading packages...</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            style={{
                                background: "#12141a",
                                border: "1px solid #333",
                                borderRadius: "12px",
                                padding: "1.5rem",
                                position: "relative",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                                <div>
                                    <h3 style={{ color: "#c6a87c", fontSize: "1.2rem", marginBottom: "0.2rem" }}>{pkg.title}</h3>
                                    <div style={{ fontSize: "0.9rem", color: pkg.is_active ? "#2ecc71" : "#e74c3c" }}>
                                        {pkg.is_active ? "● Active" : "● Inactive"}
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <button onClick={() => handleEdit(pkg)} style={iconBtnStyle}>
                                        <Edit2 size={16} color="#3498db" />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} style={iconBtnStyle}>
                                        <Trash2 size={16} color="#e74c3c" />
                                    </button>
                                </div>
                            </div>

                            <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", marginBottom: "1rem" }}>{pkg.price}</p>

                            <p style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "1rem", whiteSpace: "pre-wrap" }}>
                                {pkg.description}
                            </p>

                            <div style={{ marginTop: "1rem" }}>
                                <strong style={{ color: "#ddd", display: "block", marginBottom: "0.5rem" }}>Services:</strong>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {Array.isArray(pkg.features) && pkg.features.map((f, i) => (
                                        <span key={i} style={{ background: "#1f2430", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem", color: "#ccc" }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ color: "#c6a87c" }}>{editingPkg ? "Edit Package" : "Add New Package"}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <input
                                type="text"
                                placeholder="Package Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                style={inputStyle}
                            />

                            <input
                                type="text"
                                placeholder="Price (e.g. ₹15,000)"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                                style={inputStyle}
                            />

                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                style={inputStyle}
                            />

                            <div>
                                <label style={{ display: "block", color: "#ccc", marginBottom: "0.5rem" }}>Features (Comma separated)</label>
                                <textarea
                                    placeholder="HD Makeup, Saree Draping, Hair Styling..."
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                    rows={3}
                                    style={inputStyle}
                                />
                            </div>

                            <label style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    style={{ width: "20px", height: "20px", accentColor: "#c6a87c" }}
                                />
                                Active on Website
                            </label>

                            <button type="submit" style={submitBtnStyle}>
                                {editingPkg ? "Update Package" : "Create Package"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

/* Styles */
const iconBtnStyle = {
    background: "#1f2430",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "1rem",
};

const modalContentStyle = {
    background: "#161a22",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #333",
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

const submitBtnStyle = {
    width: "100%",
    padding: "1rem",
    background: "#c6a87c",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem",
};

export default AdminPackages;
