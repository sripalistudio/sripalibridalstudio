import React from 'react';
import { motion } from 'framer-motion';

const PageLayout = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="section-padding container"
        style={{ minHeight: '80vh', paddingTop: '150px' }}
    >
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{title}</h1>
        {children}
    </motion.div>
);

export const Gallery = () => <PageLayout title="Gallery"><p style={{ color: 'gray' }}>Beautiful bridal moments coming soon...</p></PageLayout>;
export const Packages = () => <PageLayout title="Packages/Services"><p style={{ color: 'gray' }}>Explore our premium offerings...</p></PageLayout>;
export const Founder = () => <PageLayout title="Founder Profile"><p style={{ color: 'gray' }}>Meet the artist behind the magic...</p></PageLayout>;
export const FAQ = () => <PageLayout title="Frequently Asked Questions"><p style={{ color: 'gray' }}>Answers to all your queries...</p></PageLayout>;
export const Booking = () => <PageLayout title="Book Appointment"><p style={{ color: 'gray' }}>Begin your journey here...</p></PageLayout>;
export const Payment = () => <PageLayout title="Payment Confirmation"><p style={{ color: 'gray' }}>Payment stub details...</p></PageLayout>;
