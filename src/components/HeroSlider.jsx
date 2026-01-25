import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = ({ images = [], interval = 5000 }) => {
    const [index, setIndex] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    // Swipe support (keeping it as it's invisible UI)
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setIndex((prev) => (prev + 1) % images.length);
        }
        if (isRightSwipe) {
            setIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    if (!images || images.length === 0) return null;

    return (
        <div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <AnimatePresence initial={false}>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={`Slide ${index + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    // Performance optimizations
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </AnimatePresence>

            {/* Dark Overlay for Text Readability */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3))', zIndex: 1, pointerEvents: 'none' }}></div>
        </div>
    );
};

export default HeroSlider;
