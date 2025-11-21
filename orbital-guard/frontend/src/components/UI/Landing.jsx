import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LandingGlobe3D from './LandingGlobe3D';
import RealisticGlobe from './RealisticGlobe';
import AboutSection from './AboutSection';
import Footer from './Footer';

const TypingText = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, index + 1));
                index++;
                if (index === text.length) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return <span>{displayedText}<span className="cursor">|</span></span>;
};

const Landing = ({ onInitialize }) => {
    return (
        <div style={{
            width: '100%',
            background: '#000000',
            color: '#ffffff',
            fontFamily: '"Google Sans", "Roboto", sans-serif',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: `
                radial-gradient(2px 2px at 20% 30%, white, transparent),
                radial-gradient(2px 2px at 60% 70%, white, transparent),
                radial-gradient(1px 1px at 50% 50%, white, transparent),
                radial-gradient(1px 1px at 80% 10%, white, transparent),
                radial-gradient(2px 2px at 90% 60%, white, transparent),
                radial-gradient(1px 1px at 33% 50%, white, transparent),
                radial-gradient(1px 1px at 66% 33%, white, transparent)
            `,
            backgroundSize: '200px 200px, 300px 300px, 250px 250px, 400px 400px, 350px 350px, 280px 280px, 320px 320px',
            backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px, 200px 50px, 150px 180px, 90px 220px'
        }}>
            {/* Navigation Bar - Centered Glassmorphic */}
            <nav style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '16px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '64px',
                zIndex: 10,
                background: 'rgba(30, 30, 30, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(66, 133, 244, 0.15)'
            }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#4285F4' }}>satellite_alt</span>
                    Sentinel
                </div>
                <div style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                    <span style={{ cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 16px', borderRadius: '20px' }} className="nav-item">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>info</span>
                        About Us
                    </span>
                    <a href="https://github.com/atharvavdeo/Sentinel---SkyHacks25" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'rgba(255,255,255,0.8)', padding: '8px 16px', borderRadius: '20px' }} className="nav-item">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>code</span>
                        GitHub
                    </a>
                    <span style={{ cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 16px', borderRadius: '20px' }} className="nav-item">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>group</span>
                        Community
                    </span>
                </div>
            </nav>

            {/* Hero Section */}
            <main style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '120px 8% 80px',
                position: 'relative',
                zIndex: 5,
                overflow: 'visible',
                gap: '40px'
            }}>
                {/* Blue Blurred Gradient Background - Enhanced for Globe Integration */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        linear-gradient(90deg, #021d43 0%, #001028 50%, #000814 100%),
                        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                        radial-gradient(circle at 80% 50%, rgba(10, 20, 40, 0.8) 0%, transparent 60%)
                    `,
                    filter: 'blur(100px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>

                {/* Left Content */}
                <div style={{ flex: '1', maxWidth: '600px', position: 'relative', zIndex: 1 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            fontSize: '5.5rem',
                            fontWeight: 400,
                            lineHeight: '1.1',
                            letterSpacing: '-2px',
                            marginBottom: '24px',
                            background: 'linear-gradient(to right, #ffffff, #a0a0a0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Track Every Object in Orbit
                    </motion.h1>

                    <div style={{
                        fontSize: '1.5rem',
                        color: '#9aa0a6',
                        marginBottom: '48px',
                        height: '3rem', // Fixed height to prevent layout shift
                        fontFamily: '"Roboto Mono", monospace'
                    }}>
                        <TypingText text="Real-time visualization of 200+ active satellites and debris." delay={800} />
                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onInitialize}
                        className="launch-button"
                        style={{
                            padding: '16px 40px',
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            borderRadius: '30px',
                            border: 'none',
                            background: '#4285F4',
                            color: 'white',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '40px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Launch Tracker
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </motion.button>

                    {/* Stats below button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        style={{
                            display: 'flex',
                            gap: '40px',
                            flexWrap: 'wrap'
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300 }}>200+</div>
                            <div style={{ color: '#9aa0a6', fontSize: '0.9rem', marginTop: '4px' }}>Active Satellites</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300 }}>15,000+</div>
                            <div style={{ color: '#9aa0a6', fontSize: '0.9rem', marginTop: '4px' }}>Debris Objects</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 300 }}>Real-time</div>
                            <div style={{ color: '#9aa0a6', fontSize: '0.9rem', marginTop: '4px' }}>Orbital Physics</div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - 3D Globe - Floating Beyond Boundaries */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    style={{
                        position: 'absolute',
                        right: '-10%',
                        top: '50%',
                        transform: 'translateY(-50%) scale(1.6)',
                        width: '70vw',
                        height: '70vw',
                        maxWidth: '1000px',
                        maxHeight: '1000px',
                        zIndex: 1,
                        pointerEvents: 'all',
                        overflow: 'visible'
                    }}
                >
                    <RealisticGlobe />
                </motion.div>
            </main>


            {/* About Section */}
            <AboutSection />

            {/* Footer */}
            <Footer />

            <style>{`
                .cursor {
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .nav-item:hover {
                    color: #ffffff !important;
                    background: rgba(66, 133, 244, 0.15);
                    box-shadow: 0 0 20px rgba(66, 133, 244, 0.3);
                }
                .launch-button:hover {
                    box-shadow: 0 4px 25px rgba(66, 133, 244, 0.5), 0 0 40px rgba(66, 133, 244, 0.4) !important;
                    filter: brightness(1.1);
                }
            `}</style>
        </div>
    );
};

export default Landing;
