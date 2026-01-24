import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Sparkles, Gem, Clock, Heart, Users, Star } from 'lucide-react';
import SEO from '../components/SEO';

const Founder = () => {
    const philosophyItems = [
        {
            icon: <ShieldCheck size={32} color="var(--color-gold)" />,
            title: "Skin-First Approach",
            desc: "We prioritize skin health with premium, breathable products that ensure a radiant glow without heaviness."
        },
        {
            icon: <Gem size={32} color="var(--color-gold)" />,
            title: "Luxury Experience",
            desc: "From the first consultation to the final touch-up, every interaction is curated to feel calm, exclusive, and royal."
        },
        {
            icon: <Sparkles size={32} color="var(--color-gold)" />,
            title: "Customized Artistry",
            desc: "No presets. We analyze your features, dress, and lighting to create a bespoke look that is uniquely yours."
        },
        {
            icon: <Heart size={32} color="var(--color-gold)" />,
            title: "Emotional Connection",
            desc: "We understand the magnitude of the day. We are there to support, calm, and uplift you as you prepare."
        }
    ];

    const timelineEvents = [
        { year: '2014', title: 'The Beginning', desc: 'Started journey as a freelance makeup artist, discovering a passion for bridal transformations.' },
        { year: '2016', title: 'Certification Excellence', desc: 'Advanced certification from top academies in Mumbai and Dubai, specializing in HD and Airbrush techniques.' },
        { year: '2018', title: 'Studio Launch', desc: 'Opened the first flagship Sripali Bridal Studio, creating a sanctuary for brides.' },
        { year: '2022', title: 'Industry Recognition', desc: 'Awarded "Best Bridal Makeup Artist" in the region. Reached the milestone of 500+ happy brides.' },
        { year: '2026', title: 'Innovation Continues', desc: 'Launching new masterclasses and expanding services to redefining luxury bridal care.' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="founder-page"
        >
            <SEO
                title="Meet Lalitha.S - Lead Artist"
                description="Lalitha.S is an award-winning bridal makeup artist with over 10 years of experience. Learn about her philosophy and journey."
            />
            {/* Hero Section */}
            <section className="section-padding" style={{ paddingTop: '150px', background: '#0F1014' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>

                        {/* Image */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '100%', height: '100%', border: '1px solid var(--color-gold)', borderRadius: '8px', zIndex: 0 }}></div>
                            <img
                                src="/assets/founder.webp"
                                alt="Sripali - Founder"
                                style={{ width: '100%', display: 'block', borderRadius: '8px', position: 'relative', zIndex: 1, filter: 'grayscale(10%) contrast(1.05)' }}
                            />
                        </motion.div>

                        {/* Text */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Founder & Creative Director</h2>
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff' }}>Lalitha.S</h1>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                <span style={{ background: 'rgba(198, 168, 124, 0.15)', color: 'var(--color-gold)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>10+ Years Experience</span>
                                <span style={{ background: 'rgba(198, 168, 124, 0.15)', color: 'var(--color-gold)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Award Winning Artist</span>
                                <span style={{ background: 'rgba(198, 168, 124, 0.15)', color: 'var(--color-gold)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Certified Expert</span>
                            </div>

                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                "Beauty is not about masking who you are; it's about revealing your most confident self. My journey began with a simple belief: every bride deserves to feel like a queen on her special day."
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Over the last decade, I have dedicated myself to mastering the art of bridal makeup, understanding diverse skin tones, and creating looks that are timeless. My mission is to provide an experience that is as memorable as the look itself.
                            </p>

                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding" style={{ background: '#15171e' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1rem' }}>My Philosophy</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>The core values that define our studio.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {philosophyItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ background: '#0F1014', padding: '2rem', borderRadius: '8px', borderTop: '2px solid var(--color-gold)' }}
                            >
                                <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding" style={{ background: '#0F1014' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>The Journey</h2>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {/* Vertical Line */}
                        <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'rgba(198, 168, 124, 0.3)' }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {timelineEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{ display: 'flex', gap: '2rem' }}
                                >
                                    {/* Dot */}
                                    <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', background: '#0F1014', border: '2px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-gold)' }}></div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <div style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{event.year}</div>
                                        <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.8rem' }}>{event.title}</h3>
                                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{event.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding" style={{ background: '#15171e', textAlign: 'center' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>See the Magic in Action</h2>
                        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                            Explore our portfolio to see how we bring these visions to life for real brides.
                        </p>
                        <Link to="/gallery" className="btn-primary">
                            Explore Bridal Work
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Founder;
