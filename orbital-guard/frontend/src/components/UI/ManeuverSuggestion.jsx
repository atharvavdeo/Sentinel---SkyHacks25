import React from 'react';
import { motion } from 'framer-motion';

const ManeuverSuggestion = ({ hazards, selectedSat }) => {
    if (!hazards || hazards.length === 0) {
        // SAFE SIGNAL
        return (
            <motion.div
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    padding: '16px',
                    marginTop: '10px',
                    background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.15), rgba(27, 94, 32, 0.15))',
                    border: '1px solid #4caf50',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}
            >
                <div style={{ fontSize: '2rem', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#4caf50">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#4caf50', marginBottom: '4px' }}>
                    ALL CLEAR
                </div>
                <div style={{ fontSize: '0.75rem', color: '#81c784', fontFamily: 'var(--font-mono)' }}>
                    No collision threats detected. Orbit nominal.
                </div>
            </motion.div>
        );
    }

    // Calculate maneuver based on most critical threat
    const criticalThreat = hazards.sort((a, b) => a.distance - b.distance)[0];
    const isUrgent = criticalThreat.distance < 5; // Less than 5km

    // Determine maneuver type based on distance
    let maneuverType, deltaV, alertLevel, nearbySats;
    if (isUrgent) {
        maneuverType = "EMERGENCY EVASIVE";
        deltaV = (Math.random() * 5 + 15).toFixed(2); // 15-20 m/s
        alertLevel = "CRITICAL";
        nearbySats = ["AQUA", "TERRA", "NOAA-20"];
    } else {
        maneuverType = "PREVENTIVE ADJUSTMENT";
        deltaV = (Math.random() * 3 + 2).toFixed(2); // 2-5 m/s
        alertLevel = "ADVISORY";
        nearbySats = ["LANDSAT-9", "SENTINEL-6"];
    }

    return (
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                padding: '16px',
                marginTop: '10px',
                background: isUrgent
                    ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.15), rgba(183, 28, 28, 0.15))'
                    : 'linear-gradient(135deg, rgba(245, 124, 0, 0.15), rgba(230, 81, 0, 0.15))',
                border: `1px solid ${isUrgent ? '#ef4444' : '#f59e0b'}`,
                borderRadius: '8px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isUrgent ? '#ef4444' : '#f59e0b'}>
                    <path d="M2.81 14.12L5.64 11.29 8.17 10.79 11.53 14.15 5.45 20.23C5.06 20.62 4.44 20.62 4.05 20.23L2.81 18.99C2.42 18.6 2.42 17.98 2.81 17.59L3.47 16.93L2.81 14.12M21.19 14.12L18.36 11.29 15.83 10.79 12.47 14.15 18.55 20.23C18.94 20.62 19.56 20.62 19.95 20.23L21.19 18.99C21.58 18.6 21.58 17.98 21.19 17.59L20.53 16.93L21.19 14.12M15.24 10.79L13 8.55V5.5L14.5 4L15.5 5.5L14.5 7L15.24 7.74L16.74 6.24L19.24 8.74L15.24 10.79M8.76 10.79L11 8.55V5.5L9.5 4L8.5 5.5L9.5 7L8.76 7.74L7.26 6.24L4.76 8.74L8.76 10.79M12 14.97L10.95 16.03L12 17.08L13.05 16.03L12 14.97Z"/>
                </svg>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isUrgent ? '#ef4444' : '#f59e0b' }}>
                    MANEUVER RECOMMENDATION
                </div>
                <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    background: isUrgent ? '#ef4444' : '#f59e0b',
                    color: 'white',
                    fontWeight: 700
                }}>
                    {alertLevel}
                </span>
            </div>

            <div style={{
                fontSize: '0.75rem',
                color: 'var(--md-sys-color-on-surface-variant)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Type:</span>
                    <span style={{ fontWeight: 600 }}>{maneuverType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Delta-V Required:</span>
                    <span style={{ fontWeight: 600, color: isUrgent ? '#ef4444' : '#f59e0b' }}>{deltaV} m/s</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Burn Duration:</span>
                    <span style={{ fontWeight: 600 }}>{(parseFloat(deltaV) * 2.5).toFixed(1)} sec</span>
                </div>
            </div>

            <div style={{
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#888">
                        <path d="M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M18 12C18 8.7 15.3 6 12 6S6 8.7 6 12C6 14.4 7.4 16.5 9.3 17.5L10.5 15.8C9.3 15.2 8.5 13.7 8.5 12C8.5 10.1 10.1 8.5 12 8.5S15.5 10.1 15.5 12C15.5 13.7 14.7 15.2 13.5 15.8L14.7 17.5C16.6 16.5 18 14.4 18 12M12 2C6.5 2 2 6.5 2 12C2 15.8 4.1 19.1 7.1 20.9L8.3 19.2C6 17.9 4.5 15.1 4.5 12C4.5 7.9 7.9 4.5 12 4.5S19.5 7.9 19.5 12C19.5 15.1 18 17.9 15.7 19.2L16.9 20.9C19.9 19.1 22 15.8 22 12C22 6.5 17.5 2 12 2Z"/>
                    </svg>
                    Alert Broadcast to Nearby Assets:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {nearbySats.map((sat, i) => (
                        <span key={i} style={{
                            fontSize: '0.65rem',
                            padding: '3px 8px',
                            background: 'rgba(100, 100, 255, 0.2)',
                            border: '1px solid rgba(100, 100, 255, 0.4)',
                            borderRadius: '4px',
                            color: '#aaf'
                        }}>
                            {sat}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ManeuverSuggestion;
