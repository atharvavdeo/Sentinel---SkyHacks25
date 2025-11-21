import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SpiralAnimation from './SpiralAnimation';

export default function LoadingScreen({ onComplete }) {
    const [showButton, setShowButton] = useState(false);

    // Fade in the button after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            onClick={onComplete}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                background: 'black',
                zIndex: 9999,
                cursor: 'pointer'
            }}
        >
            {/* Spiral Animation */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <SpiralAnimation />
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `}</style>
        </div>
    );
}
