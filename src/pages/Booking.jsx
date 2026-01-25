import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Heart,
  CheckCircle,
} from "lucide-react";
import { supabase } from "../supabaseClient";

const Booking = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [availableServices, setAvailableServices] = useState([]);

  const [packageName, setPackageName] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (location.state?.packageServices) {
      setAvailableServices(location.state.packageServices);
      if (location.state.serviceName) {
        setPackageName(location.state.serviceName);
        // Auto-select the package as the service
        setFormData((prev) => ({
          ...prev,
          service: location.state.serviceName,
        }));
      } else {
        setFormData((prev) => ({ ...prev, service: "" }));
      }
    }
  }, [location.state]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    if (!formData.service) tempErrors.service = "Please select a service";
    if (!formData.date) tempErrors.date = "Date is required";
    if (!formData.time) tempErrors.time = "Time is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from("packages")
      .select("title")
      .eq("website_type", WEBSITE_TYPE)
      .eq("is_active", true);

    if (error) {
      console.error("Package Fetch Error:", error);
    } else {
      const services = data.map((pkg) => pkg.title);
      setAvailableServices(services);
    }
  };

  const WEBSITE_TYPE = "BRIDAL"; // Change to "MENS" in mens site

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const bookingPayload = {
      customer_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      item_name: formData.service, // DB column
      booking_date: formData.date,
      booking_time: formData.time,
      website_type: WEBSITE_TYPE,
      status: "NEW",
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("bookings").insert([bookingPayload]);

    if (error) {
      console.error("Booking Error:", error);
      alert("Something went wrong. Please try again.");
    } else {
      // ✅ For receipt UI
      setSubmittedData({
        name: formData.name,
        service: formData.service, // 👈 MATCH UI
        date: formData.date,
      });

      setIsSubmitted(true);
      window.scrollTo(0, 0);

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="section-padding container"
        style={{
          paddingTop: "150px",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="receipt-card">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                background: "#f0fdf4",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CheckCircle size={40} color="#15803d" />
            </div>
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "0.5rem",
                color: "#111",
                fontFamily: '"Playfair Display", serif',
                fontWeight: 400,
              }}
            >
              Sripali Studio
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#15803d",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "1.5rem",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.3)",
                padding: "0.5rem",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              SUCCESSFULLY BOOKED!
            </p>
            <div
              style={{ borderBottom: "1px dashed #ccc", margin: "0 0 2rem 0" }}
            ></div>
          </div>

          <div style={{ marginBottom: "2rem", textAlign: "left" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.2rem",
                fontFamily: "sans-serif",
              }}
            >
              <span
                style={{ color: "#000", fontWeight: 600, fontSize: "1rem" }}
              >
                Customer
              </span>
              <span style={{ color: "#000", fontSize: "1rem" }}>
                {submittedData?.name}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.2rem",
                fontFamily: "sans-serif",
              }}
            >
              <span
                style={{ color: "#000", fontWeight: 600, fontSize: "1rem" }}
              >
                Service
              </span>
              <span
                style={{
                  color: "#000",
                  fontSize: "1rem",
                  textAlign: "right",
                  maxWidth: "60%",
                }}
              >
                {submittedData?.service}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.2rem",
                fontFamily: "sans-serif",
              }}
            >
              <span
                style={{ color: "#000", fontWeight: 600, fontSize: "1rem" }}
              >
                Date
              </span>
              <span style={{ color: "#000", fontSize: "1rem" }}>
                {submittedData?.date}
              </span>
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1rem", color: "#000", margin: 0 }}>
                Our telecalling team will contact you shortly.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <Link
              to="/"
              style={{
                display: "block",
                width: "100%",
                padding: "1rem",
                background: "#1a1a1a",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "1px",
                textAlign: "center",
                fontSize: "0.9rem",
                fontWeight: 600,
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              RETURN TO HOME
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section-padding container"
      style={{ paddingTop: "150px" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Book Your Appointment
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--color-text-secondary)",
            marginBottom: "3rem",
          }}
        >
          Reserve your consultation or service.
          {packageName && (
            <span
              style={{
                display: "block",
                marginTop: "1rem",
                color: "var(--color-gold)",
                background: "rgba(198, 168, 124, 0.1)",
                padding: "0.5rem",
                borderRadius: "4px",
                maxWidth: "fit-content",
                margin: "1rem auto",
              }}
            >
              Package: {packageName}
            </span>
          )}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "var(--color-bg-soft)",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid rgba(198, 168, 124, 0.1)",
          }}
        >
          {/* Personal Details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--color-gold)",
                }}
              >
                <User
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#0F1014",
                  border: errors.name
                    ? "1px solid var(--color-error)"
                    : "1px solid #333",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              />
              {errors.name && (
                <span
                  style={{ color: "var(--color-error)", fontSize: "0.8rem" }}
                >
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--color-gold)",
                }}
              >
                <Mail
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#0F1014",
                  border: errors.email
                    ? "1px solid var(--color-error)"
                    : "1px solid #333",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              />
              {errors.email && (
                <span
                  style={{ color: "var(--color-error)", fontSize: "0.8rem" }}
                >
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--color-gold)",
                }}
              >
                <Phone
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#0F1014",
                  border: errors.phone
                    ? "1px solid var(--color-error)"
                    : "1px solid #333",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              />
              {errors.phone && (
                <span
                  style={{ color: "var(--color-error)", fontSize: "0.8rem" }}
                >
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          {/* Service Selection or Package Display */}
          <div style={{ marginBottom: "1.5rem" }}>
            {packageName ? (
              <>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--color-gold)",
                  }}
                >
                  <CheckCircle
                    size={16}
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Selected Package
                </label>
                <input
                  type="text"
                  value={packageName}
                  disabled
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    background: "rgba(198, 168, 124, 0.1)",
                    border: "1px solid var(--color-gold)",
                    color: "var(--color-gold)",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    cursor: "not-allowed",
                  }}
                />
              </>
            ) : (
              <>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "var(--color-gold)",
                  }}
                >
                  <Heart
                    size={16}
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    background: "#0F1014",
                    border: errors.service
                      ? "1px solid var(--color-error)"
                      : "1px solid #333",
                    color: "#fff",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select a Service</option>
                  {availableServices.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span
                    style={{ color: "var(--color-error)", fontSize: "0.8rem" }}
                  >
                    {errors.service}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Date & Time */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--color-gold)",
                }}
              >
                <Calendar
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#0F1014",
                  border: errors.date
                    ? "1px solid var(--color-error)"
                    : "1px solid #333",
                  color: "#fff",
                  borderRadius: "4px",
                  colorScheme: "dark",
                }}
              />
              {errors.date && (
                <span
                  style={{ color: "var(--color-error)", fontSize: "0.8rem" }}
                >
                  {errors.date}
                </span>
              )}
            </div>

            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  color: "var(--color-gold)",
                }}
              >
                <Clock
                  size={16}
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                Preferred Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#0F1014",
                  border: errors.time
                    ? "1px solid var(--color-error)"
                    : "1px solid #333",
                  color: "#fff",
                  borderRadius: "4px",
                  colorScheme: "dark",
                }}
              />
              {errors.time && (
                <span
                  style={{ color: "var(--color-error)", fontSize: "0.8rem" }}
                >
                  {errors.time}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1.1rem",
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Booking;
