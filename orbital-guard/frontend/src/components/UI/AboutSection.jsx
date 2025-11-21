import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
    const sections = [
        {
            title: "An Agent-First Experience",
            description: "Manage multiple agents at the same time, across any workspace, from one central mission control view.",
            image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop"
        },
        {
            title: "Real-Time Orbital Tracking",
            description: "Monitor thousands of satellites and debris objects in real-time with advanced collision detection and prediction algorithms.",
            image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop"
        },
        {
            title: "Advanced Analytics",
            description: "Get detailed insights into orbital mechanics, collision probabilities, and space traffic management with our comprehensive analytics dashboard.",
            image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop"
        }
    ];

    return (
        <div
            style={{
                background: '#000000',
                color: '#ffffff',
                padding: '80px 0',
                position: 'relative'
            }}
        >
            {sections.map((section, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true, margin: "-100px" });

                return (
                    <motion.section
                        key={index}
                        ref={ref}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            minHeight: '80vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px 8%',
                            gap: '80px',
                            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' // Alternating layout
                        }}
                    >
                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{
                                flex: 1,
                                maxWidth: '600px'
                            }}
                        >
                            <h2 style={{
                                fontSize: '3.5rem',
                                fontWeight: 400,
                                lineHeight: '1.2',
                                marginBottom: '24px',
                                background: 'linear-gradient(to right, #ffffff, #a0a0a0)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                {section.title}
                            </h2>
                            <p style={{
                                fontSize: '1.25rem',
                                color: '#9aa0a6',
                                lineHeight: '1.6',
                                marginBottom: '32px'
                            }}>
                                {section.description}
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '14px 32px',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    borderRadius: '30px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Explore Product
                            </motion.button>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{
                                flex: 1,
                                maxWidth: '600px',
                                height: '400px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                            }}
                        >
                            <img
                                src={section.image}
                                alt={section.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </motion.div>
                    </motion.section>
                );
            })}
        </div>
    );
};

export default AboutSection;

