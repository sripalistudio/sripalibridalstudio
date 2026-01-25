import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { error } = await supabase.from('messages').insert([
            {
                name: formState.name,
                phone: formState.phone,
                message: formState.message,
                source: 'Bridal', // Identify this inquiry comes from the Bridal site
                created_at: new Date().toISOString(), // TIMESTAMP WITH TIMEZONE
            }
        ]);

        if (error) {
            console.error(error);
            alert("Failed to send message. Please try again.");
        } else {
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
            setFormState({ name: '', phone: '', message: '' });
        }
        setIsSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="contact-page"
        >
            <section className="section-padding" style={{ paddingTop: '150px', background: '#0F1014', minHeight: '100vh' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '1rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Get in Touch</h2>
                        <h1 style={{ fontSize: '3rem', color: '#fff' }}>Contact Us</h1>
                    </div>

                    <div className="contact-grid">

                        {/* Left Column: Contact Info & Map */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                        >
                            {/* Contact Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(198, 168, 124, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                        <Phone size={24} color="var(--color-gold)" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Call Us</h4>
                                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                            <a href="tel:+917305397887" style={{ color: 'inherit', textDecoration: 'none' }}>+91 73053 97887</a>
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                            <Clock size={14} />
                                            <span>Mon-Sat: 10am - 7pm</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(198, 168, 124, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                        <Mail size={24} color="var(--color-gold)" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Email Us</h4>
                                        <p style={{ color: 'var(--color-text-secondary)' }}>
                                            <a href="mailto:sripalistudio@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>sripalistudio@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ background: 'rgba(198, 168, 124, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                        <MapPin size={24} color="var(--color-gold)" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Visit Us</h4>
                                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                            123, Luxury Avenue, Anna Nagar,<br />
                                            Chennai, Tamil Nadu - 600040
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Follow */}
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>Follow Us</h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a href="https://www.facebook.com/share/1JjAazHEVD/" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(198, 168, 124, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                        <Facebook size={20} />
                                    </a>
                                    <a href="https://www.instagram.com/sripalibridalstudio" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(198, 168, 124, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                        <Instagram size={20} />
                                    </a>
                                    <a href="https://wa.me/917305397887" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(198, 168, 124, 0.1)', padding: '0.8rem', borderRadius: '50%', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                            <path d="M20.52 3.48A11.968 11.968 0 0012 0C5.373 0 0 5.373 0 12c0 2.128.552 4.135 1.505 5.91L0 24l6.23-1.616A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12 0-3.208-1.252-6.223-3.48-8.52zM12 21.821a9.8 9.8 0 01-5.006-1.378l-.358-.214-3.719.965.996-3.604-.233-.372A9.771 9.771 0 012.179 12 9.8 9.8 0 0112 2.179 9.8 9.8 0 0121.821 12 9.8 9.8 0 0112 21.821zm5.328-7.377c-.292-.146-1.734-.855-2.003-.951-.269-.098-.465-.146-.66.146-.196.293-.761.954-.932 1.157-.171.192-.34.223-.62.072-.258-.139-1.092-.403-2.079-1.282-.771-.689-1.291-1.54-1.442-1.801-.151-.261-.016-.402.119-.536.144-.143.292-.293.438-.464.146-.171.196-.293.293-.488.098-.195.049-.365-.024-.512-.073-.146-.66-1.585-.904-2.17-.238-.567-.481-.49-.66-.499-.171-.009-.366-.009-.561-.009-.195 0-.512.073-.78.366-.268.293-1.024 1.001-1.024 2.441 0 1.44 1.049 2.83 1.195 3.025.146.195 2.064 3.151 5.0 4.42 2.936 1.269 2.936.846 3.473.793.537-.053 1.734-.708 1.978-1.391.244-.683.244-1.268.171-1.391-.073-.122-.268-.195-.561-.341z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Embedded Map */}
                            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '300px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199.84766853985286!2d80.25314787019975!3d13.121610182873907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265158ee2171f%3A0xb4a4f436b0e8dee4!2sSripali%20Bridal%20Studio!5e1!3m2!1sen!2sin!4v1769259076000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="SripalibridalStudio"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Right Column: Inquiry Form */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{ background: '#15171e', padding: '3rem', borderRadius: '12px' }}
                        >
                            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '2rem' }}>Send a Message</h3>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Your Name</label>
                                    <input
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '1rem', background: '#0F1014', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '1rem' }}
                                        placeholder="Jane Doe"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formState.phone}
                                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '1rem', background: '#0F1014', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '1rem' }}
                                        placeholder="+91 90000 00000"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Message</label>
                                    <textarea
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        required
                                        rows="5"
                                        style={{ width: '100%', padding: '1rem', background: '#0F1014', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '1rem', resize: 'vertical' }}
                                        placeholder="Tell us about your event details..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isSubmitting}
                                    style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
                                >
                                    {isSubmitted ? 'Message Sent!' : isSubmitting ? 'Sending...' : (
                                        <>
                                            SEND INQUIRY <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </section>

            <style>{`
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 4rem;
                }
                @media (min-width: 900px) {
                    .contact-grid {
                        grid-template-columns: 1fr 1fr;
                        align-items: start;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default Contact;
