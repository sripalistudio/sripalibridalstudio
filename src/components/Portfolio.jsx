import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../supabaseClient";

const BUCKET = "gallery";
const WEBSITE_TYPE = "BRIDAL";

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    fetchGallery();
  }, []);

  // ================= FETCH ==================
  const fetchGallery = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("website_type", WEBSITE_TYPE)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gallery Error:", error);
    } else {
      const formatted = data.map((img) => ({
        ...img,
        src: supabase.storage.from(BUCKET).getPublicUrl(img.image_path).data
          .publicUrl,
      }));

      setImages(formatted);
    }

    setLoading(false);
  };

  // ================= LIGHTBOX ==================
  const openLightbox = (index) => {
    setSelectedId(index);
    setZoomLevel(1);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedId(null);
    setZoomLevel(1);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setSelectedId((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
  };

  const prevImage = () => {
    setSelectedId((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev === 1 ? 2 : 1));
  };

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedId === null) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedId, images]);

  const selectedImage = selectedId !== null ? images[selectedId] : null;

  // ================= UI ==================
  return (
    <section className="section-padding" style={{ background: "#12141a" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", color: "#fff" }}>Our Portfolio</h2>

          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1.2rem",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
            }}
          >
            Moments of grace, captured in time.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            Loading gallery...
          </p>
        )}

        {/* Empty */}
        {!loading && images.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa" }}>No images found.</p>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              layoutId={`img-${index}`}
              whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(index)}
              style={{
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: "8px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <img
                src={img.src}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Hover Text */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <p style={{ color: "#fff", fontWeight: 500 }}>{img.category}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedId !== null && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.95)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                color: "#fff",
                background: "transparent",
              }}
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "2rem",
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                padding: "1rem",
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "2rem",
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                padding: "1rem",
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              layoutId={`img-${selectedId}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90%",
                maxHeight: "85%",
              }}
            >
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.caption}
                animate={{ scale: zoomLevel }}
                drag
                dragElastic={0.2}
                onClick={toggleZoom}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  borderRadius: "4px",
                  cursor: zoomLevel > 1 ? "grab" : "zoom-in",
                }}
              />

              {/* Caption */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  color: "#fff",
                }}
              >
                <h3 style={{ color: "var(--color-gold)" }}>
                  {selectedImage.category}
                </h3>

                <p style={{ color: "#ccc" }}>{selectedImage.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
