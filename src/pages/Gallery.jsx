import React from 'react';
import { motion } from 'framer-motion';
import Portfolio from '../components/Portfolio';
import SEO from '../components/SEO';

const Gallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gallery-page"
    >
      <SEO
        title="Bridal Makeup Portfolio"
        description="Explore our gallery of real brides. See transformations, HD makeup, and hair styling by Sripali Bridal Studio."
      />
      {/* Add a specific wrapper or styling if needed to match the previous gallery header feel, 
                but Portfolio component already has a header "Our Portfolio". 
                We can just render it directly or wrap it effectively. 
                Given the Portfolio component has padding and background, likely we can just render it, 
                or we might want to add a spacer for the fixed navbar.
             */}
      <div style={{ paddingTop: '100px', background: '#12141a', minHeight: '100vh' }}>
        <Portfolio />
      </div>
    </motion.div>
  );
};

export default Gallery;
