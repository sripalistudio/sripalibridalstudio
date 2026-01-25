import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../supabaseClient";
import { Upload, Trash2, X, Scissors } from "lucide-react";
import { compressImage } from "../../utils/compressImage";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

const MenGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        file: null,
        category: "",
        caption: "",
        website_type: "MENS",
        is_active: true,
        is_hero: false,
    });

    // Cropper State
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const BUCKET = "gallery";

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("gallery")
            .select("*")
            .eq("website_type", "MENS")
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
            await supabase.from("gallery").delete().eq("id", id);
            if (imagePath) {
                await supabase.storage.from(BUCKET).remove([imagePath]);
            }
            fetchImages();
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result);
                setShowCropper(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropSave = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            // Convert blob to File object to keep it consistent
            const file = new File([croppedImage], "cropped_image.jpg", { type: "image/jpeg" });

            setFormData({ ...formData, file: file });
            setShowCropper(false);
        } catch (e) {
            console.error(e);
            alert("Failed to crop image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file) return alert("Please select an image");

        setUploading(true);

        try {
            // 0. Compress Image (Optional, since we crop it? But good for safety)
            const compressedFile = await compressImage(formData.file);

            // 1. Upload to Supabase Storage
            const sanitizedName = `mens_cropped_${Date.now()}.webp`;
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from(BUCKET)
                .upload(sanitizedName, compressedFile);

            if (uploadError) throw uploadError;

            // 2. Insert into DB
            const { error: dbError } = await supabase.from("gallery").insert([
                {
                    image_path: uploadData.path,
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
            setFormData({ category: "", caption: "", website_type: "MENS", is_active: true, is_hero: false, file: null });
            setImageSrc(null);
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
                <h1 style={{ color: "#c6a87c" }}>Men's Gallery Manager</h1>
                <button
                    onClick={() => {
                        setShowModal(true);
                        setImageSrc(null);
                        setShowCropper(false);
                        setFormData({ category: "", caption: "", website_type: "MENS", is_active: true, is_hero: false, file: null });
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
                    <Upload size={20} /> Upload Image
                </button>
            </div>

            {loading ? (
                <div style={{ color: "#fff" }}>Loading images...</div>
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
                            <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                                <img
                                    src={img.image_path ? getPublicUrl(img.image_path) : ""}
                                    alt="Gallery"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                {img.is_hero && (
                                    <div style={{ position: "absolute", top: "5px", right: "5px", background: "gold", color: "#000", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold" }}>Hero</div>
                                )}
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
                            <h2 style={{ color: "#c6a87c" }}>
                                {showCropper ? "Crop Image" : "Upload Details"}
                            </h2>
                            <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}>
                                <X size={24} />
                            </button>
                        </div>

                        {showCropper ? (
                            <div style={{ height: "400px", position: "relative", background: "#333", marginBottom: "1rem" }}>
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                                <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: "translateX(-50%)", width: '90%', display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={handleCropSave}
                                        style={{ ...submitBtnStyle, marginTop: 0 }}
                                    >
                                        <Scissors size={18} style={{ marginRight: '5px' }} /> Crop & Continue
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {!formData.file ? (
                                    <div style={{ border: "2px dashed #444", padding: "2rem", borderRadius: "8px", textAlign: "center" }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            style={{ width: "100%", color: "#ccc" }}
                                        />
                                        <p style={{ marginTop: "1rem", color: "#aaa", fontSize: "0.9rem" }}>Select an image to crop</p>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ width: "150px", height: "150px", margin: "0 auto 1rem", borderRadius: "8px", overflow: "hidden", border: "1px solid #c6a87c" }}>
                                            <img src={URL.createObjectURL(formData.file)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => { setFormData({ ...formData, file: null }); setImageSrc(null); }}
                                            style={{ background: "#333", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
                                        >
                                            Change Image
                                        </button>
                                    </div>
                                )}

                                <input
                                    type="text"
                                    placeholder="Category (e.g. Mens, Haircut)"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={inputStyle}
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Caption (e.g. Fresh Fade)"
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

                                <button type="submit" disabled={uploading || !formData.file} style={{ ...submitBtnStyle, opacity: (!formData.file || uploading) ? 0.5 : 1 }}>
                                    {uploading ? "Uploading..." : "Upload Final Image"}
                                </button>
                            </form>
                        )}
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
    maxWidth: "500px",
    border: "1px solid #333",
    maxHeight: "90vh",
    overflowY: "auto"
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

export default MenGallery;
