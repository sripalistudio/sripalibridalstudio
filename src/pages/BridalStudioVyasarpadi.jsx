import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Calendar, MapPin, Star, Clock, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const BridalStudioVyasarpadi = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            variants={fadeIn}
            className="service-page-vyasarpadi"
            style={{ paddingTop: '120px', minHeight: '100vh', background: '#0F1014', color: '#fff' }}
        >
            <SEO
                title="Best Bridal Studio Vyasarpadi | Top Rated Bridal Makeup Chennai"
                description="Looking for a bridal studio vyasarpadi? Sripali Studio offers HD & Airbrush makeup. Top rated bridal studio chennai widely known for affordable prices."
                keywords="bridal studio vyasarpadi, bridal studio chennai, best bridal studio chennai, posh bridal studio sowcarpet"
            />

            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 60px' }}>
                {/* 1. Header Section */}
                <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--color-gold)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                        Best Bridal Studio in Vyasarpadi, Chennai – Sripali Bridal Studio
                    </h1>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--color-text-secondary)' }}>
                        Are you looking for the <strong>best bridal studio in Vyasarpadi</strong> to transform your look for your big day?
                        Sripali Bridal Studio offers premium, skin-safe, and long-lasting bridal makeup services right in your neighborhood.
                        Whether you are a classic South Indian bride or looking for a modern North Indian reception look, our expert team ensures you look breathtaking.
                    </p>
                    <p style={{ fontSize: '1.1rem', marginTop: '1rem', color: '#ccc' }}>
                        We are a <strong>top rated bridal studio in Chennai</strong>, known for our personalized approach, HD makeup techniques, and affordable packages.
                        No need to travel far; get elite bridal care at <strong>Bridal Studio Vyasarpadi</strong>.
                    </p>
                </header>

                {/* 2. Services Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Our Bridal Makeup Services in Vyasarpadi</h2>
                    <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>We offer a complete range of grooming and makeover services to ensure you are photo-ready:</p>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        {[
                            "HD Bridal Makeup: Flawless finish that looks great in person and on camera.",
                            "Airbrush Makeup: Lightweight, waterproof, and sweat-resistant—perfect for Chennai humidity.",
                            "Saree Draping: Expert draping for Kanjeevaram, Silk, and Designer sarees.",
                            "Hair Styling: Traditional braids with flowers, messy buns, and open hair variations.",
                            "Party & Guest Makeup: For bridesmaids, sisters, and family members."
                        ].map((item, index) => (
                            <li key={index} style={{ background: '#1A1C23', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--color-gold)' }}>
                                <CheckCircle size={20} color="var(--color-gold)" style={{ marginBottom: '0.5rem' }} />
                                <span style={{ display: 'block' }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 3. Pricing Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Bridal Studio Vyasarpadi Price & Packages</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                        We believe luxury should be accessible. Check out our <strong>Bridal Studio Chennai Price List</strong>:
                    </p>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', background: '#1A1C23', borderRadius: '8px', overflow: 'hidden' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-gold)', color: '#000' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Package Name</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Service Inclusions</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Price (Approx)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td style={{ padding: '1rem' }}><strong>Silver Package</strong></td>
                                    <td style={{ padding: '1rem' }}>HD Makeup, Basic Hairdo, Saree Draping</td>
                                    <td style={{ padding: '1rem' }}>₹10,000 - ₹12,000</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td style={{ padding: '1rem' }}><strong>Gold Package</strong></td>
                                    <td style={{ padding: '1rem' }}>HD Makeup, Premium Hair styling, Jewellery Fixing, Draping</td>
                                    <td style={{ padding: '1rem' }}>₹15,000 - ₹18,000</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <td style={{ padding: '1rem' }}><strong>Diamond Airbrush</strong></td>
                                    <td style={{ padding: '1rem' }}>Airbrush Makeup, Adv. Hairstyle, Lashes, Lenses, Extensions</td>
                                    <td style={{ padding: '1rem' }}>₹20,000 - ₹25,000</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '1rem' }}><strong>Guest Makeup</strong></td>
                                    <td style={{ padding: '1rem' }}>Party Makeup & Simple Hairdo</td>
                                    <td style={{ padding: '1rem' }}>₹3,000 - ₹5,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p style={{ fontStyle: 'italic', marginBottom: '2rem', color: '#aaa' }}>
                        *Looking for a specific <strong>bridal studio chennai price</strong>? Call us for a custom quote!*
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:917305397887" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-gold)', color: '#000', padding: '1rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                            <Phone size={18} /> Call Now for Pricing
                        </a>
                        <Link to="/booking" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#333', color: '#fff', padding: '1rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <Calendar size={18} /> Book Appointment
                        </Link>
                    </div>
                </section>

                {/* 4. Why Choose Us */}
                <section style={{ marginBottom: '4rem', background: '#15171e', padding: '3rem', borderRadius: '12px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Why Choose Sripali as Your Bridal Studio?</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <Star color="var(--color-gold)" size={24} />
                            <div>
                                <strong>Top Rated Bridal Studio Vyasarpadi:</strong> Hundreds of happy brides have trusted us.
                            </div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <CheckCircle color="var(--color-gold)" size={24} />
                            <div>
                                <strong>Experience:</strong> Over 10+ years in the industry.
                            </div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <Star color="var(--color-gold)" size={24} />
                            <div>
                                <strong>Premium Products:</strong> We use MAC, Huda Beauty, Bobbi Brown, and NARS.
                            </div>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <MapPin color="var(--color-gold)" size={24} />
                            <div>
                                <strong>Zero Travel Stress:</strong> Located conveniently in Vyasarpadi, we also serve <strong>Sowcarpet</strong> and <strong>Chennai-wide</strong>.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* 5. Reviews */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Customer Reviews</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                        Don't just take our word for it. Search for "<strong>Bridal Studio Vyasarpadi Reviews</strong>" and see what our clients say:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: '#1A1C23', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(198, 168, 124, 0.2)' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#ddd' }}>
                                "I was searching for a <strong>bridal studio near me</strong> in Vyasarpadi and found Sripali. The best decision ever! My makeup stayed fresh for 8 hours."
                            </p>
                            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>– Priya R.</span>
                        </div>
                        <div style={{ background: '#1A1C23', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(198, 168, 124, 0.2)' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#ddd' }}>
                                "Affordable <strong>bridal studio vyasarpadi price</strong> without compromising on quality. Lalitha ma'am is a magician with brushes."
                            </p>
                            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold' }}>– Swetha K.</span>
                        </div>
                    </div>
                </section>

                {/* 6. Other Locations */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Posh Bridal Studio Sowcarpet & Chennai Wide</h2>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
                        While our heart is in Vyasarpadi, we are also a preferred choice for brides searching for a <strong>Posh Bridal Studio Sowcarpet</strong>.
                        We understand the North Indian wedding aesthetic—bold eyes, glitter cut-crease, and heavy lehenga styling.
                    </p>
                    <p style={{ marginBottom: '1.5rem', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
                        We are a <strong>Bridal Studio Chennai Open Now</strong> for bookings. Whether your venue is in Anna Nagar, T Nagar, or Parry's Corner, our team travels to your venue!
                    </p>
                </section>

                {/* 7. Gallery Placeholder */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Gallery: Bridal Studio Vyasarpadi Photos</h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>See our real brides. Confidence is the best makeup, but our touch adds the sparkle.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div style={{ height: '250px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px dashed #444' }}>
                            <img src="/assets/gallery1.webp" alt="Bridal Studio Vyasarpadi Photos - South Indian Bride" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', opacity: 0.8 }} />
                        </div>
                        <div style={{ height: '250px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px dashed #444' }}>
                            <img src="/assets/gallery3.webp" alt="Bridal Studio Chennai Reception Look" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', opacity: 0.8 }} />
                        </div>
                        <div style={{ height: '250px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px dashed #444' }}>
                            <img src="/assets/hero.webp" alt="Best Bridal Studio Chennai Makeover" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', opacity: 0.8 }} />
                        </div>
                    </div>
                </section>

                {/* 8. Contact Section & Working Hours */}
                <section style={{ marginBottom: '4rem', background: 'rgba(198, 168, 124, 0.1)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-gold)' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-gold)' }}>Contact Us</h2>
                    <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Ready to be a Sripali Bride? Contact the <strong>Best Bridal Studio Chennai</strong> today.</p>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Phone color="#fff" size={20} />
                            <span><strong>Bridal Studio Vyasarpadi Contact Number:</strong> +91 73053 97887</span>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <MapPin color="#fff" size={20} />
                            <span><strong>Address:</strong> Sripali Bridal Studio, Vyasarpadi, Chennai, Tamil Nadu.</span>
                        </li>
                        <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Clock color="#fff" size={20} />
                            <span><strong>Working Hours:</strong> Open 10:00 AM – 8:00 PM (Monday – Sunday)</span>
                        </li>
                    </ul>
                </section>

                {/* 9. FAQ Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#fff' }}>Frequently Asked Questions (FAQ)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { q: "Is there a bridal studio in Vyasarpadi open now?", a: "Yes! Sripali Bridal Studio works from 10 AM to 8 PM. We are the top rated bridal studio Vyasarpadi open for consultations and trials." },
                            { q: "What is the starting price for bridal makeup?", a: "Our basic packages start from ₹10,000. For a detailed Bridal Studio Chennai price list, please call our contact number." },
                            { q: "Do you provide services in Sowcarpet?", a: "Absolutely. We are a popular choice for brides looking for a posh bridal studio Sowcarpet style makeover. We travel to your venue." },
                            { q: "Can I get a trial before booking?", a: "Yes, we recommend paid trials so you can trust us as the best bridal studio Chennai for your big day." },
                            { q: "How do I book an appointment?", a: "Simply call our Bridal Studio Vyasarpadi contact number or use the booking form on our website." },
                            { q: "Do you use waterproof makeup?", a: "Yes, we use high-end waterproof products (HD & Airbrush) perfect for Chennai's humid weather." }
                        ].map((faq, i) => (
                            <details key={i} style={{ background: '#1A1C23', padding: '1rem', borderRadius: '8px' }}>
                                <summary style={{ fontWeight: 'bold', color: 'var(--color-gold)', cursor: 'pointer', marginBottom: '0.5rem' }}>{faq.q}</summary>
                                <p style={{ margin: 0, paddingLeft: '1rem', color: '#ccc', lineHeight: '1.6' }}>{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* 10. Conclusion */}
                <footer style={{ textAlign: 'center', padding: '3rem 0', borderTop: '1px solid #333' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Conclusion</h3>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Your wedding day is once in a lifetime. Choose the Expert. Choose Sripali Bridal Studio—the <strong>Best Bridal Studio Vyasarpadi</strong> has to offer.
                    </p>
                    <Link to="/booking" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Book Your Slot Now
                    </Link>
                </footer>

            </div>
        </motion.div>
    );
};

export default BridalStudioVyasarpadi;
