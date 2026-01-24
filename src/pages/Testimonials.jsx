import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import SEO from '../components/SEO';

const testimonials = [
    {
        name: "Shravani Suresh",
        event: "Wedding Day",
        quote: "Amazing bridal experience! The team was patient, professional, and nailed every detail — I felt beautiful and confident on my big day.",
        rating: 5
    },
    {
        name: "Rekha Franco",
        event: "Reception Look",
        quote: "Huge thanks to Lalitha and team! The makeup was natural, beautiful, and perfectly done on time. They were patient, friendly, and made us feel so comfortable. Loved it!",
        rating: 5
    },
    {
        name: "Maha Kannan",
        event: "Engagement",
        quote: "Amazing experience with Mrs. Lalitha! Flawless, long-lasting makeup, clean setup, and super comfortable service. Will book again for sure!",
        rating: 5
    },
    {
        name: "Meera S.",
        event: "Birthday",
        quote: "Had a great experience at Sripali Bridal Studio. I went with my daughter for a haircut and we are both very happy and satisfied with the service.",
        rating: 5
    },
    {
        name: "Priya K.",
        event: "Muhurtham",
        quote: "Traditional makeup done right. Classic, elegant, and timeless. Sripali is a true artist.",
        rating: 5
    },
    {
        name: "Divya T.",
        event: "Cocktail Party",
        quote: "Absolutely loved the glam look! It stayed put through hours of dancing.",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container section-padding"
            style={{ paddingTop: '150px' }}
        >
            <SEO
                title="Client Reviews & Testimonials"
                description="Read what our happy brides have to say about their experience with Sripali Bridal Studio."
            />
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff', fontFamily: 'var(--font-serif)' }}>Kind Words</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem' }}>Love notes from our beautiful brides.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {testimonials.map((t, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        style={{ background: '#1A1C23', padding: '2.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <Quote size={32} color="var(--color-gold)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />
                        <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            "{t.quote}"
                        </p>
                        <div>
                            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{t.name}</h4>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t.event}</div>
                            <div style={{ display: 'flex', gap: '0.2rem' }}>
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Testimonials;
