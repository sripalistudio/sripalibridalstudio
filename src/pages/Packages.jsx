import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { supabase } from "../supabaseClient";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Change this for mens site
  const WEBSITE_TYPE = "BRIDAL";

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("website_type", WEBSITE_TYPE)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Packages Fetch Error:", error);
    } else {
      setPackages(data || []);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container section-padding"
      style={{ paddingTop: "150px" }}
    >
      <SEO
        title="Bridal Makeup Packages & Prices"
        description="Affordable luxury bridal makeup packages in Chennai. Choose from HD, Airbrush, Reception, and Engagement packages tailored for you."
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Packages</h1>

        <p style={{ color: "var(--color-text-secondary)" }}>
          Curated experiences for every occasion.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center", color: "#aaa" }}>
          Loading packages...
        </p>
      )}

      {/* Empty */}
      {!loading && packages.length === 0 && (
        <p style={{ textAlign: "center", color: "#aaa" }}>
          No packages available.
        </p>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              background: "var(--color-bg-soft)",
              padding: "2.5rem",
              border: "1px solid rgba(198, 168, 124, 0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Title */}
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "0.5rem",
                color: "var(--color-gold)",
              }}
            >
              {pkg.title}
            </h3>

            {/* Price */}
            <h4
              style={{
                fontSize: "1.8rem",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              {pkg.price}
            </h4>

            {/* Description */}
            <p
              style={{
                color: "var(--color-text-secondary)",
                marginBottom: "2rem",
                flex: 1,
              }}
            >
              {pkg.description}
            </p>

            {/* Features */}
            {Array.isArray(pkg.features) && (
              <ul
                style={{
                  listStyle: "none",
                  marginBottom: "2rem",
                  color: "#ccc",
                }}
              >
                {pkg.features.map((feat, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.8rem",
                      gap: "0.8rem",
                    }}
                  >
                    <Check size={16} color="var(--color-gold)" />
                    {feat}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <Link
              to="/booking"
              state={{
                serviceName: pkg.title,
                packageServices: pkg.features,
              }}
              className="btn-primary"
              style={{ textAlign: "center" }}
            >
              Book This
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Packages;
