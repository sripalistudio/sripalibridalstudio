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
        { year: '2001 - 2002', title: 'The Beginning', desc: 'Lalitha.S entered the beauty and makeup industry. Started the journey as a freelance makeup artist while balancing a career as an accountant.' },
        { year: '2013', title: 'First Salon (Mar 13)', desc: 'Opened the first "Sripali Beauty Salon" in Perambur, inspired by clients requesting a dedicated space for her services.' },
        { year: '2015', title: 'Expansion (May 15)', desc: 'Shifted and expanded the salon to Purasawakkam, growing the client base steadily.' },
        { year: '2025', title: 'Sripali Bridal Studio (Mar 13)', desc: 'Launched a new branch "Sripali Bridal Studio" in Sharma Nagar, marking a significant milestone after navigating the challenges of the pandemic.' },
        { year: '2025', title: 'Magic 7 Launch (Sep 01)', desc: 'Expanded the brand portfolio with the opening of "Magic 7 Signature Salon".' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="founder-page"
        >
            <SEO
                title="Meet Lalitha.S - Founder & Lead Artist"
                description="Lalitha.S is an experienced bridal makeup artist with a journey spanning over two decades. Learn about her story from freelance artist to studio owner."
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
                                alt="Lalitha.S - Founder"
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
                                <span style={{ background: 'rgba(198, 168, 124, 0.15)', color: 'var(--color-gold)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>20+ Years Experience</span>
                                <span style={{ background: 'rgba(198, 168, 124, 0.15)', color: 'var(--color-gold)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>300+ Brides</span>
                                <span style={{ background: 'rgba(198, 168, 124, 0.15)', color: 'var(--color-gold)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>Educator & Mentor</span>
                            </div>

                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                                "It started as a passion in 2001, balancing freelance makeup artistry alongside my career as an accountant. But the trust and compliments from my clients—who were willing to follow me wherever I went—inspired me to build something permanent."
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                                From humble freelance beginnings to establishing multiple salon branches in Chennai, my journey has been built on resilience and a relentless pursuit of excellence. Today, having transformed over 300 brides for their special moments—be it weddings, baby showers, or puberty ceremonies—I continue to upgrade my skills every single year to give nothing but the best.
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Beyond services, I am passionate about education. Through our academy, I share my knowledge with the next generation, training aspiring artists and creating job opportunities in the industry.
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
