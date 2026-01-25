import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    { id: 1, q: "How do I book an appointment?", a: "You can book directly through our 'Book Now' page. Select your service, date, and time!" },
    { id: 2, q: "What is the starting price?", a: "Our packages start from ₹3,000. Check the Packages page for more details." },
    { id: 3, q: "Do you travel for weddings?", a: "Yes, we are available for destination weddings and venue visits. Travel fees apply." },
    { id: 4, q: "Can I get a trial?", a: "Yes, we offer paid trial sessions for brides to finalize their look." }
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Welcome to Sripali Bridal Studio. How can I assist you today?" }
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleQuestionClick = (faq) => {
        // Add user question
        setMessages(prev => [...prev, { type: 'user', text: faq.q }]);

        // Simulate thinking delay
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: faq.a }]);
        }, 600);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--color-gold)',
                    color: '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 90,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                aria-label="Open Chat"
            >
                {isOpen ? <X /> : <MessageCircle />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="chatbot-container"
                        style={{
                            position: 'fixed',
                            bottom: '5rem',
                            background: '#1A1C23',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            zIndex: 90,
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgba(198, 168, 124, 0.2)',
                            overflow: 'hidden'
                        }}
                    >
                        <style>{`
                            .chatbot-container {
                                width: 350px;
                                height: 500px;
                                right: 2rem;
                            }
                            @media (max-width: 480px) {
                                .chatbot-container {
                                    width: 90% !important;
                                    height: 70vh !important;
                                    right: 5% !important;
                                    bottom: 6rem !important;
                                }
                            }
                        `}</style>
                        {/* Header */}
                        <div style={{ padding: '1rem', background: '#0F1014', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%' }}></div>
                            <h4 style={{ color: 'var(--color-gold)', margin: 0 }}>Sripali Assistant</h4>
                        </div>

                        {/* Messages Area */}
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                        background: msg.type === 'user' ? 'var(--color-gold)' : '#2A2D35',
                                        color: msg.type === 'user' ? '#000' : '#fff',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '8px',
                                        maxWidth: '80%',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.4'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        <div style={{ padding: '1rem', background: '#0F1014', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Suggested Questions:</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {faqData.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleQuestionClick(item)}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid var(--color-gold-dark)',
                                            color: 'var(--color-gold)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseOver={e => e.target.style.background = 'rgba(198, 168, 124, 0.1)'}
                                        onMouseOut={e => e.target.style.background = 'transparent'}
                                    >
                                        {item.q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
};

export default Chatbot;
