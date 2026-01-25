import React, { useState, useRef, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

const ImageComparisonSlider = ({ beforeImage, afterImage, beforeLabel = "BEFORE", afterLabel = "AFTER" }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [sliderLocation, setSliderLocation] = useState(50);
    const containerRef = useRef(null);

    const handleTouchMove = (e) => {
        if (!isResizing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const width = rect.width;
        const percentage = Math.min(Math.max((x / width) * 100, 0), 100);
        setSliderLocation(percentage);
    };

    const handleMouseMove = (e) => {
        if (!isResizing || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.min(Math.max((x / width) * 100, 0), 100);
        setSliderLocation(percentage);
    };

    const handleEnd = () => setIsResizing(false);
    const handleStart = () => setIsResizing(true);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchend', handleEnd);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('touchmove', handleTouchMove);
        }

        return () => {
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isResizing]);

    return (
        <div
            ref={containerRef}
            className="comparison-slider-container"
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                overflow: 'hidden',
                borderRadius: '8px',
                cursor: 'col-resize',
                userSelect: 'none',
                touchAction: 'none' // Important for mobile scrolling
            }}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
        >
            {/* After Image (Full width/height, acts as background/base) */}
            <img
                src={afterImage}
                alt="After"
                loading="lazy"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                }}
            />
            {/* After Label - stays on the right */}
            <div className="transformation-label after" style={{ opacity: sliderLocation < 95 ? 1 : 0 }}>{afterLabel}</div>

            {/* Before Image (Clipped) */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    clipPath: `polygon(0 0, ${sliderLocation}% 0, ${sliderLocation}% 100%, 0 100%)`,
                    backgroundColor: '#fff' // Fallback
                }}
            >
                <img
                    src={beforeImage}
                    alt="Before"
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
                {/* Before Label - stays on the left */}
                <div className="transformation-label before" style={{ opacity: sliderLocation > 5 ? 1 : 0 }}>{beforeLabel}</div>
            </div>

            {/* Slider Handle */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${sliderLocation}%`,
                    width: '2px',
                    background: '#fff',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    pointerEvents: 'none' // Let container handle events
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}>
                    <ChevronsLeftRight size={20} color="var(--color-gold)" />
                </div>
            </div>
        </div>
    );
};

export default ImageComparisonSlider;
