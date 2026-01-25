import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we've already shown the loader this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');

    if (hasSeenLoader) {
      setIsVisible(false);
      if (onLoadingComplete) onLoadingComplete();
    } else {
      // Logic for first time load
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenLoader', 'true');
        if (onLoadingComplete) onLoadingComplete();
      }, 3500); // 3.5 seconds cinematic wait

      return () => clearTimeout(timer);
    }
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#0F1014',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '3rem',
                color: '#C6A87C',
                marginBottom: '1rem',
                fontWeight: 400
              }}
            >
              Sripali
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: '#94A3B8',
                letterSpacing: '0.3em',
                textTransform: 'uppercase'
              }}
            >
              Bridal Studio
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
              style={{
                marginTop: '2rem',
                height: '1px',
                width: '150px',
                background: 'linear-gradient(90deg, transparent, #C6A87C, transparent)',
                margin: '2rem auto 0'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
