import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ImageComparisonSlider from '../components/ImageComparisonSlider';
import SEO from '../components/SEO';

import { Frown, Droplets, Palette, Award, ShieldCheck, Camera, Quote, Star } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';

// ... (other imports)

const Home = () => {
    const [heroImages, setHeroImages] = useState([
        "/assets/hero.webp",
        "/assets/gallery1.webp",
        "/assets/gallery3.webp"
    ]);

    // Fetches images marked as 'is_hero' from the gallery
    const fetchHeroImages = async () => {
        const { data, error } = await supabase
            .from("gallery")
            .select("image_path")
            .eq("website_type", "BRIDAL")
            .eq("is_active", true)
            .eq("is_hero", true) // Only fetch images marked for hero section
            .order("created_at", { ascending: false })
            .limit(5); // Increased limit slightly

        if (!error && data && data.length > 0) {
            const urls = data.map(img =>
                supabase.storage.from("gallery").getPublicUrl(img.image_path).data.publicUrl
            );
            if (urls.length > 0) setHeroImages(urls);
        }
    };

    useEffect(() => {
        fetchHeroImages();
    }, []);

    // ...

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="home-page"
        >
            <SEO
                title="Sripali Bridal Studio | Luxury Bridal Makeup Artist in Chennai"
                description="Sripali Bridal Studio offers premium bridal makeup, hair styling, and saree draping services in Chennai. Book your consultation for a flawless wedding look."
            />
            {/* Hero Section */}
            <section
                style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    background: 'transparent',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <HeroSlider images={heroImages} />

                <div className="container">
                    <motion.h2
                        variants={fadeInUp}
                        style={{
                            color: 'var(--color-gold-light)',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em',
                            marginBottom: '1rem'
                        }}
                    >
                        Luxury Bridal Experience
                    </motion.h2>
                    <motion.h1
                        variants={fadeInUp}
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            marginBottom: '2rem',
                            color: '#fff',
                            lineHeight: 1.1
                        }}
                    >
                        Sripali Studio
                    </motion.h1>
                    <motion.div variants={fadeInUp}>
                        <Link to="/booking" className="btn-primary">
                            Begin Your Journey
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stage 2: Fear / Problem */}
            <section className="section-padding" style={{ background: '#0F1014' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Wrong makeup can ruin your photos...</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>
                            Don't let bad lighting or wrong products steal your spotlight.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Card 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            style={{ background: '#1A1C23', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                        >
                            <div style={{ background: 'rgba(198, 168, 124, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Camera size={28} color="var(--color-gold)" />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#fff' }}>Flashback Issues</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>Ensure no embarrassing white cast in your wedding photos.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            style={{ background: '#1A1C23', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                        >
                            <div style={{ background: 'rgba(198, 168, 124, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Droplets size={28} color="var(--color-gold)" />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#fff' }}>Sweat & Tears</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>Waterproof makeup that resists emotions and humidity.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            style={{ background: '#1A1C23', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                        >
                            <div style={{ background: 'rgba(198, 168, 124, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Palette size={28} color="var(--color-gold)" />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: '#fff' }}>Cakey Texture</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>HD blending techniques that look flawless and natural.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stage 3: Guide / Role */}
            <section className="section-padding" style={{ background: '#15171e' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                        {/* Left: Artist Photo */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100%', height: '100%', border: '2px solid var(--color-gold)', borderRadius: '8px', zIndex: 0 }}></div>
                            <img
                                src="/assets/founder.webp"
                                alt="Lead Artist"
                                style={{ width: '100%', borderRadius: '8px', position: 'relative', zIndex: 1, filter: 'grayscale(10%) contrast(1.1)' }}
                            />
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2', color: '#fff' }}>
                                We help brides feel <span style={{ color: 'var(--color-gold)' }}>confident</span> & <span style={{ color: 'var(--color-gold)' }}>photo-ready</span>.
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                Our approach combines premium, skin-safe products with personalized techniques to ensure you look breathtaking in person and on camera. No heavy layers—just you, perfected.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                                    <Award size={18} color="var(--color-gold)" /> Certified
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                                    <ShieldCheck size={18} color="var(--color-gold)" /> Skin Safe
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                                    <Camera size={18} color="var(--color-gold)" /> Premium Products
                                </div>
                            </div>

                            <Link to="/founder" className="btn-primary">
                                Meet the Artist
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stage 4: Real Brides / Social Proof */}
            <section className="section-padding" style={{ background: '#0F1014' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#fff' }}>Real Brides, Real Confidence</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>See the transformations.</p>
                    </motion.div>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {/* Transformation Preview Area */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <ImageComparisonSlider
                                beforeImage="/assets/before.webp"
                                afterImage="/assets/after.webp"
                            />
                        </div>

                        {/* Bride Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>The Real Bride look</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2.5rem' }}>
                                "I felt like a princess! The makeup stayed fresh all night despite the dance floor humidity."
                            </p>

                            <Link
                                to="/gallery"
                                className="btn-outline"
                                style={{ color: '#fff', borderColor: 'var(--color-gold)' }}
                            >
                                View Full Gallery
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>




            {/* Stage 5: Testimonials */}
            <section className="section-padding" style={{ background: '#1A1C23' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#fff', fontFamily: 'var(--font-serif)' }}>Kind Words</h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        {/* Testimonial 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            style={{ background: '#0F1014', padding: '2.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <Quote size={32} color="var(--color-gold)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                                "I have never felt more beautiful. Sripali understood exactly what I wanted—natural yet glamorous. The makeup felt so light!"
                            </p>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Anjali P.</h4>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Wedding Day</div>
                                <div style={{ display: 'flex', gap: '0.2rem' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            style={{ background: '#0F1014', padding: '2.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <Quote size={32} color="var(--color-gold)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                                "From the trial to the big day, the experience was flawless. The team is so professional and calming. Highly recommended!"
                            </p>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Sneha R.</h4>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Reception Look</div>
                                <div style={{ display: 'flex', gap: '0.2rem' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Testimonial 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            style={{ background: '#0F1014', padding: '2.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <Quote size={32} color="var(--color-gold)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                                "The best decision I made for my engagement. The look was exactly like the reference I showed, but even better suited for me."
                            </p>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Kavya M.</h4>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Engagement</div>
                                <div style={{ display: 'flex', gap: '0.2rem' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link
                            to="/testimonials"
                            className="btn-outline"
                            style={{ color: '#fff', borderColor: 'var(--color-gold)' }}
                        >
                            View Full Testimonials
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Teaser */}
            <section className="section-padding" style={{ background: '#0F1014' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}
                    >
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Curated for the Modern Bride</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                            We believe every bride deserves a look that reflects her true essence. From traditional elegance to contemporary chic, our experts craft perfection.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* Service Card 1 - Bridal Makeup */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{ background: '#15171e', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', paddingBottom: '2rem' }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <img src="/assets/service_makeup.webp" alt="Bridal Makeup" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                            </div>
                            <div style={{ padding: '0 1.5rem' }}>
                                <h3 style={{ marginBottom: '0.8rem', color: '#fff', fontSize: '1.4rem' }}>Bridal Makeup</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    Flawless HD & Airbrush finish tailored to your skin tone. Long-lasting and photo-ready.
                                </p>
                                <Link to="/packages" className="btn-outline" style={{ color: '#fff', borderColor: 'var(--color-gold)', fontSize: '0.8rem', padding: '0.8rem 1.5rem' }}>
                                    VIEW PACKAGES
                                </Link>
                            </div>
                        </motion.div>

                        {/* Service Card 2 - Hair Styling */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{ background: '#15171e', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', paddingBottom: '2rem' }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <img src="/assets/service_hair.webp" alt="Hair Styling" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                            </div>
                            <div style={{ padding: '0 1.5rem' }}>
                                <h3 style={{ marginBottom: '0.8rem', color: '#fff', fontSize: '1.4rem' }}>Hair Styling</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    Intricate traditional braids to modern messy buns. complete with flower accessories.
                                </p>
                                <Link to="/packages" className="btn-outline" style={{ color: '#fff', borderColor: 'var(--color-gold)', fontSize: '0.8rem', padding: '0.8rem 1.5rem' }}>
                                    VIEW PACKAGES
                                </Link>
                            </div>
                        </motion.div>

                        {/* Service Card 3 - Saree Draping */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            style={{ background: '#15171e', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', paddingBottom: '2rem' }}
                        >
                            <div style={{ height: '220px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                <img src="/assets/service_saree.webp" alt="Saree Draping" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                            </div>
                            <div style={{ padding: '0 1.5rem' }}>
                                <h3 style={{ marginBottom: '0.8rem', color: '#fff', fontSize: '1.4rem' }}>Saree Draping</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    Perfect pleats and silhouettes. We specialize in Kanjeevaram, Silk, and Designer drapes.
                                </p>
                                <Link to="/packages" className="btn-outline" style={{ color: '#fff', borderColor: 'var(--color-gold)', fontSize: '0.8rem', padding: '0.8rem 1.5rem' }}>
                                    VIEW PACKAGES
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding" style={{ background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/assets/hero.webp") center/cover fixed', textAlign: 'center', padding: '8rem 1rem' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem', color: '#fff', fontFamily: 'var(--font-serif)' }}>Ready to Shine?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.2rem' }}>
                            Book your consultation today and let us bring your dream look to life. Slots fill up fast for the wedding season.
                        </p>
                        <Link to="/booking" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                            Book Appointment
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
