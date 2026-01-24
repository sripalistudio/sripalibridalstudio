import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 3-6 months in advance, especially for peak wedding seasons, to ensure availability."
    },
    {
        question: "Do you travel to venues?",
        answer: "Yes, we provide on-location services for weddings. Travel charges may apply depending on the distance from our studio in Chennai."
    },
    {
        question: "Is there a trial available?",
        answer: "Absolutely. We strongly recommend a trial session to finalize your look. This can be booked separately or as part of a package."
    },
    {
        question: "What brands of makeup do you use?",
        answer: "We use only premium, dermatologist-tested brands such as MAC, Bobbi Brown, Huda Beauty, NARS, and Chanel to ensure long-lasting results."
    },
    {
        question: "Can I customize a package?",
        answer: "Yes, we understand every bride's needs are unique. Contact us for a bespoke package tailored to your events."
    },
    {
        question: "What is your cancellation policy?",
        answer: "Cancellations made 30 days prior to the event are eligible for a partial refund. The booking advance is generally non-refundable."
    }
];

const AccordionItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div style={{ borderBottom: '1px solid rgba(198, 168, 124, 0.1)', marginBottom: '1rem' }}>
            <button
                onClick={toggle}
                style={{
                    width: '100%',
                    background: 'transparent',
                    color: 'var(--color-text-primary)',
                    padding: '1.5rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-serif)'
                }}
            >
                {question}
                {isOpen ? <Minus size={20} color="var(--color-gold)" /> : <Plus size={20} color="var(--color-gold)" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p style={{ paddingBottom: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container section-padding"
            style={{ paddingTop: '150px', maxWidth: '800px' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Everything you need to know.</p>
            </div>

            <div>
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default FAQ;
