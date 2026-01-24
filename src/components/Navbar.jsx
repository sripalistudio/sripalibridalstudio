import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Packages', path: '/packages' },
        { name: 'Founder', path: '/founder' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                transition: 'background 0.3s ease, padding 0.3s ease',
                background: scrolled ? '#0F1014' : 'transparent',
                padding: scrolled ? '1rem 0' : '1.5rem 0',
                borderBottom: scrolled ? '1px solid rgba(198, 168, 124, 0.1)' : 'none'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontWeight: 600 }}>
                    <img src="/sripali-logo.webp" alt="Sripali Studio" style={{ height: '40px', width: 'auto', borderRadius: '50%' }} />
                    Sripali Studio
                </NavLink>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            style={({ isActive }) => ({
                                color: isActive ? 'var(--color-gold)' : 'var(--color-text-primary)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                position: 'relative'
                            })}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <NavLink to="/booking" className="btn-primary" onClick={() => window.scrollTo(0, 0)} style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
                        Book Now
                    </NavLink>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="mobile-toggle"
                    style={{ color: 'var(--color-gold)', background: 'transparent' }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            background: '#0F1014',
                            padding: '2rem 0',
                            borderBottom: '1px solid var(--color-gold-dark)'
                        }}
                    >
                        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    style={({ isActive }) => ({
                                        color: isActive ? 'var(--color-gold)' : 'var(--color-text-primary)',
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: '1.2rem',
                                    })}
                                    onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <NavLink to="/booking" className="btn-primary" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }}>
                                Book Appointment
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
