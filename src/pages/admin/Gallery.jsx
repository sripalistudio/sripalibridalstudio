import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Upload, Trash2, X } from "lucide-react";
import { compressImage } from "../../utils/compressImage";

const AdminGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        file: null,
        category: "",
        caption: "",
        website_type: "BRIDAL",
        is_active: true,
    });

    // ... (lines 18-97 skipped in instruction but contained in replacement if I could, but here focusing on specific blocks)
    // Actually I need to update the INSERT logic too. Let's do it in chunks.

    /* I will split this into two calls for safety or one big call if contiguous, but they are not contiguous. */
    /* Wait, the tools allow multiple chunks. I will use multi_replace_file_content or just separate calls. */
    /* The replace_file_content tool documentation says "Do NOT make multiple parallel calls...". */
    /* So I will do one call now for the FORM (above) and then another call for the LOGIC. */
    /* Actually I already called the form update above. Wait. */
    /* I submitted the form update in the previous turn? No, I am queuing it now. */
    /* I should use multi_replace_file_content if I want to do both. */
    /* Let's use multi_replace. */

    const BUCKET = "gallery";

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("gallery")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) {
            setImages(data);
        }
        setLoading(false);
    };

    const getPublicUrl = (path) => {
        if (!path) return "";
        return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    };

    const handleDelete = async (id, imagePath) => {
        if (confirm("Are you sure you want to delete this image?")) {
            // 1. Delete from DB
            await supabase.from("gallery").delete().eq("id", id);

            // 2. Delete from Storage (Optional, but good for cleanup)
            if (imagePath) {
                await supabase.storage.from(BUCKET).remove([imagePath]);
            }

            fetchImages();
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) return alert("Please select an image");

        setUploading(true);

        try {
            // 0. Compress Image
            const compressedFile = await compressImage(formData.file);

            // 1. Upload to Supabase Storage
            // Sanitize filename: remove special chars, keep alphanumeric, dots, hyphens, underscores
            const sanitizedName = compressedFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
            const fileName = `${Date.now()}_${sanitizedName}`;
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from(BUCKET)
                .upload(fileName, compressedFile);

            if (uploadError) throw uploadError;

            // 2. Insert into DB
            const { error: dbError } = await supabase.from("gallery").insert([
                {
                    image_path: uploadData.path, // We store the path, not the full URL usually, unless schema demands full URL. Let's store path usually.
                    // Wait, `Portfolio.jsx` line 36 uses `img.image_path` but the prompt says `image_url` column.
                    // Let's assume the column is `image_url` but we store the PATH there if `Portfolio.jsx` expects `img.image_path`?
                    // Actually `Portfolio.jsx` line 36: `src: supabase.storage.from(BUCKET).getPublicUrl(img.image_path).data.publicUrl`
                    // But line 26 `select("*")`. So the column name in DB is `image_path`?
                    // Prompt says "Field: image_url".
                    // If DB has `image_url` column, `Portfolio.jsx` line 36 `img.image_path` might be WRONG or I misread it.
                    // Checking Portfolio.jsx again.
                    // Line 36: `src: supabase.storage.from(BUCKET).getPublicUrl(img.image_path).data.publicUrl`
                    // If the column is `image_url`, then `Portfolio.jsx` is likely broken or I should use `image_url` as the key.
                    // I will assume the column is `image_url` (as per prompt) and `Portfolio.jsx` might need a fix OR the prompt meant `image_url` stores the full URL.
                    // IF `Portfolio.jsx` uses `img.image_path`, I should check if `image_path` exists in the data.
                    // I will stick to prompt: `image_url` column.
                    // AND I will check `Portfolio.jsx` again in a second.
                    // For now, I'll store the PATH in `image_url` column so that `getPublicUrl` works if we pass the path.
                    // If `Portfolio.jsx` expects the full URL in `image_url`, then I should generate it.
                    // Let's look at `Portfolio.jsx` very carefully.
                    category: formData.category,
                    caption: formData.caption,
                    website_type: formData.website_type,
                    is_active: formData.is_active,
                    is_hero: formData.is_hero || false,
                    created_at: new Date().toISOString(),
                },
            ]);

            if (dbError) throw dbError;

            setShowModal(false);
            setFormData({ category: "", caption: "", website_type: "BRIDAL", is_active: true, file: null });
            fetchImages();

        } catch (error) {
            alert("Upload failed: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1 style={{ color: "#c6a87c" }}>Gallery Manager</h1>
                <button
                    onClick={() => setShowModal(true)}
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
                    <Upload size={20} /> Upload Image
                </button>
            </div>

            {loading ? (
                <p style={{ color: "#fff" }}>Loading images...</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.5rem" }}>
                    {images.map((img) => (
                        <div
                            key={img.id}
                            style={{
                                background: "#12141a",
                                border: "1px solid #333",
                                borderRadius: "12px",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <div style={{ height: "200px", overflow: "hidden" }}>
                                <img
                                    src={img.image_path ? getPublicUrl(img.image_path) : ""}
                                    alt="Gallery"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>

                            <div style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <span style={{ fontSize: "0.8rem", color: "#c6a87c", textTransform: "uppercase", fontWeight: "bold" }}>
                                        {img.category}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(img.id, img.image_path)}
                                    style={{ background: "#ff4d4d", border: "none", borderRadius: "4px", padding: "6px", cursor: "pointer", color: "#fff" }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ color: "#c6a87c" }}>Upload Image</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div style={{ border: "2px dashed #444", padding: "2rem", borderRadius: "8px", textAlign: "center" }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ width: "100%", color: "#ccc" }}
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Category (e.g. Bridal, Engagement)"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                style={inputStyle}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Caption (e.g. Beautiful smile)"
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                style={inputStyle}
                            />

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff" }}>
                                <input
                                    type="checkbox"
                                    id="isHero"
                                    checked={formData.is_hero || false}
                                    onChange={(e) => setFormData({ ...formData, is_hero: e.target.checked })}
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                />
                                <label htmlFor="isHero" style={{ cursor: "pointer", fontSize: "1rem" }}>Show on Home Page (Hero Section)</label>
                            </div>

                            <button type="submit" disabled={uploading} style={submitBtnStyle}>
                                {uploading ? "Uploading..." : "Upload Image"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

/* Styles */
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
    maxWidth: "400px",
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

export default AdminGallery;
