import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const bookingDetails = location.state?.bookingDetails || { name: 'Guest', service: 'Consultation', date: 'N/A' };

    const [paymentStatus, setPaymentStatus] = useState('stub'); // stub, processing, success

    const handlePayment = () => {
        setPaymentStatus('processing');
        setTimeout(() => {
            setPaymentStatus('success');
        }, 2000);
    };

    return (
        <div
            className="container section-padding"
            style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '150px'
            }}
        >
            <AnimatePresence mode="wait">

                {/* State 1: Payment Stub */}
                {paymentStatus === 'stub' && (
                    <motion.div
                        key="stub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            background: '#fff',
                            color: '#1A1A1A',
                            padding: '3rem',
                            maxWidth: '500px',
                            width: '100%',
                            borderRadius: '2px', // Ticket/Receipt style
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            position: 'relative'
                        }}
                    >
                        <div style={{ borderBottom: '2px dashed #ccc', paddingBottom: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1A1A1A' }}>Sripali Studio</h2>
                            <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.2em', color: '#666' }}>Payment Stub & Confirmation</p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 600 }}>Customer</span>
                                <span>{bookingDetails.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 600 }}>Service</span>
                                <span>{bookingDetails.service}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 600 }}>Date</span>
                                <span>{bookingDetails.date}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Total To Pay</span>
                                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>₹ 1,000.00</span>
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.5rem' }}>*Advance booking fee only. Non-refundable.</p>
                        </div>

                        <button
                            onClick={handlePayment}
                            style={{
                                background: '#1A1A1A',
                                color: '#fff',
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                borderRadius: '0'
                            }}
                        >
                            Confirm & Pay
                        </button>
                    </motion.div>
                )}

                {/* State 2: Processing */}
                {paymentStatus === 'processing' && (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: 'center' }}
                    >
                        <Loader2 className="spin" size={60} color="var(--color-gold)" style={{ animation: 'spin 1s linear infinite' }} />
                        <p style={{ marginTop: '1rem', color: 'var(--color-gold)' }}>Processing Securely...</p>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </motion.div>
                )}

                {/* State 3: Success */}
                {paymentStatus === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        style={{ textAlign: 'center', maxWidth: '600px' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            style={{ display: 'inline-block', marginBottom: '2rem' }}
                        >
                            <CheckCircle size={100} color="var(--color-success)" />
                        </motion.div>

                        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Booking Confirmed</h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                            Thank you, {bookingDetails.name}. A confirmation email has been sent to {bookingDetails.email}.
                        </p>

                        <Link to="/" className="btn-primary">Return Home</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Payment;
