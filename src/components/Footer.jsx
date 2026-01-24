import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: '#0a0a0a', padding: '4rem 0 2rem', borderTop: '1px solid rgba(198, 168, 124, 0.1)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <img src="/sripali-logo.webp" alt="Sripali Logo" style={{ height: '50px', width: 'auto', borderRadius: '50%' }} />
                        <h3 style={{ fontSize: '1.8rem', margin: 0 }}>Sripali</h3>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                        Elevating bridal elegance with bespoke artistry and timeless tradition.
                    </p>
                    <div>
                        <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.8rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Follow Us</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/sripalibridalstudio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}><Instagram size={20} /></a>
                            <a href="https://wa.me/917305397887" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M20.52 3.48A11.968 11.968 0 0012 0C5.373 0 0 5.373 0 12c0 2.128.552 4.135 1.505 5.91L0 24l6.23-1.616A11.931 11.931 0 0012 24c6.627 0 12-5.373 12-12 0-3.208-1.252-6.223-3.48-8.52zM12 21.821a9.8 9.8 0 01-5.006-1.378l-.358-.214-3.719.965.996-3.604-.233-.372A9.771 9.771 0 012.179 12 9.8 9.8 0 0112 2.179 9.8 9.8 0 0121.821 12 9.8 9.8 0 0112 21.821zm5.328-7.377c-.292-.146-1.734-.855-2.003-.951-.269-.098-.465-.146-.66.146-.196.293-.761.954-.932 1.157-.171.192-.34.223-.62.072-.258-.139-1.092-.403-2.079-1.282-.771-.689-1.291-1.54-1.442-1.801-.151-.261-.016-.402.119-.536.144-.143.292-.293.438-.464.146-.171.196-.293.293-.488.098-.195.049-.365-.024-.512-.073-.146-.66-1.585-.904-2.17-.238-.567-.481-.49-.66-.499-.171-.009-.366-.009-.561-.009-.195 0-.512.073-.78.366-.268.293-1.024 1.001-1.024 2.441 0 1.44 1.049 2.83 1.195 3.025.146.195 2.064 3.151 5.0 4.42 2.936 1.269 2.936.846 3.473.793.537-.053 1.734-.708 1.978-1.391.244-.683.244-1.268.171-1.391-.073-.122-.268-.195-.561-.341z"></path>
                                </svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-gold)' }}><Youtube size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Explore</h4>
                    <ul style={{ listStyle: 'none', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><NavLink to="/gallery">Gallery</NavLink></li>
                        <li><NavLink to="/packages">Services</NavLink></li>
                        <li><NavLink to="/founder">About Founder</NavLink></li>
                        <li><NavLink to="/faq">FAQ</NavLink></li>
                    </ul>
                </div>

                {/* Other Shops */}
                <div>
                    <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Other Shops</h4>
                    <ul style={{ listStyle: 'none', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li>
                            <a href="https://sripalibeautysaloon.in" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                                Sripali Beauty Saloon
                            </a>
                        </li>
                        <li>
                            <a href="https://magic7signaturesaloon.sripalibridalstudio.in" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                                MAGIC 7 Signature Salon
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Contact</h4>
                    <ul style={{ listStyle: 'none', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <li>146, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039</li>
                        <li><a href="mailto:reepthika@gmail.com" style={{ color: 'inherit' }}>reepthika@gmail.com</a></li>
                        <li><a href="tel:+917305397887" style={{ color: 'inherit' }}>+91 73053 97887</a></li>
                    </ul>

                </div>
            </div>

            <div className="container" style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '2rem',
                color: 'var(--color-text-muted)',
                fontSize: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <p>&copy; 2026 Sripali Bridal Studio. All rights reserved.</p>
                <p>
                    Designed by <a href="https://crevasolution.in" target="_blank" rel="noopener noreferrer nofollow" style={{ color: 'inherit', textDecoration: 'none' }}>CrevaSolution</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
