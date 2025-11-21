import React from 'react';
import { motion } from 'framer-motion';

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const HazardList = ({ hazards }) => {
    if (!hazards || hazards.length === 0) return null;

    // Sort hazards: SATELLITE first, then CRITICAL, then MODERATE
    const sortedHazards = [...hazards].sort((a, b) => {
        if (a.type === 'SATELLITE' && b.type !== 'SATELLITE') return -1;
        if (a.type !== 'SATELLITE' && b.type === 'SATELLITE') return 1;
        if (a.severity === 'CRITICAL' && b.severity !== 'CRITICAL') return -1;
        if (a.severity !== 'CRITICAL' && b.severity === 'CRITICAL') return 1;
        return a.distance - b.distance;
    });

    const satelliteCount = hazards.filter(h => h.type === 'SATELLITE').length;
    const criticalCount = hazards.filter(h => h.severity === 'CRITICAL' && h.type !== 'SATELLITE').length;
    const moderateCount = hazards.filter(h => h.severity === 'MODERATE').length;

    return (
        <div className="glass-panel" style={{
            padding: '16px',
            marginTop: '10px',
            maxHeight: '200px', // Scrollable!
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            <div style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'space-between'
            }}>
                <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    PROXIMITY ALERTS ({hazards.length})
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {satelliteCount > 0 && (
                        <span style={{ background: '#9333ea', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {satelliteCount} SAT
                        </span>
                    )}
                    {criticalCount > 0 && (
                        <span style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {criticalCount} CRIT
                        </span>
                    )}
                    {moderateCount > 0 && (
                        <span style={{ background: '#f59e0b', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>
                            {moderateCount} MOD
                        </span>
                    )}
                </div>
            </div>

            {sortedHazards.map((h, i) => {
                const isSatellite = h.type === 'SATELLITE';
                const isCritical = h.severity === 'CRITICAL';

                let bgColor, borderColor, icon;
                if (isSatellite) {
                    bgColor = 'rgba(147, 51, 234, 0.15)';
                    borderColor = '#9333ea';
                    icon = (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.43 8.35L19.65 10.13L18.23 8.71L20 6.93L19.07 6L17.3 7.78L15.88 6.36L17.65 4.58L16.72 3.65L14.94 5.43L13.52 4L15.3 2.22L13.16 0.08C12.59 0.65 12.26 1.38 12.26 2.15C12.26 2.91 12.59 3.64 13.16 4.22L14 5.06L12.22 6.84L13.64 8.26L15.42 6.48L16.84 7.9L15.06 9.68L16.5 11.1L18.28 9.32L19.7 10.74L17.92 12.52L18.97 13.57C19.55 14.15 20.28 14.48 21.05 14.48C21.81 14.48 22.54 14.15 23.12 13.57L21.43 8.35M9.36 8.16L6.84 5.64L5.64 6.84L8.16 9.36M4.22 14.58L9.17 9.64L14.35 14.82L9.4 19.76C8.03 21.13 5.59 21.13 4.22 19.76S2.85 15.95 4.22 14.58M13.77 15.06L12.62 13.91L10.84 15.69L11.99 16.84L10.57 18.26L9.42 17.11L7.64 18.89L8.79 20.04C9.37 20.62 10.1 20.95 10.86 20.95C11.63 20.95 12.36 20.62 12.94 20.04L13.77 19.21L15.55 20.99L16.96 19.58L15.18 17.8L16.34 16.64L18.12 18.42L19.53 17L17.75 15.22L18.92 14.05L20.7 15.83L21.85 14.68L13.77 15.06Z"/>
                        </svg>
                    );
                } else if (isCritical) {
                    bgColor = 'rgba(239, 68, 68, 0.15)';
                    borderColor = '#ef4444';
                    icon = (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                    );
                } else {
                    bgColor = 'rgba(245, 158, 11, 0.15)';
                    borderColor = '#f59e0b';
                    icon = (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                    );
                }

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                            background: isSatellite
                                ? 'linear-gradient(90deg, rgba(147, 51, 234, 0.2), rgba(239, 68, 68, 0.15))'
                                : bgColor,
                            borderLeft: `3px solid ${borderColor}`,
                            padding: '8px 12px',
                            borderRadius: '0 4px 4px 0',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1rem' }}>{icon}</span>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>
                                {h.debrisName}
                            </div>
                            <span style={{
                                marginLeft: 'auto',
                                fontSize: '0.65rem',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                background: borderColor,
                                color: 'white',
                                fontWeight: 700
                            }}>
                                {isSatellite ? 'SAT-COLLISION' : h.severity}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                            <span>Dist: <span style={{ color: borderColor, fontWeight: 600 }}>{(h.distance).toFixed(2)} km</span></span>
                            {h.distance < 1 && (
                                <span style={{ color: '#ff0000', fontWeight: 900, animation: 'blink 1s infinite', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                                    </svg>
                                    COLLISION
                                </span>
                            )}
                            <span>T-{h.timeToCollision ? formatTime(h.timeToCollision) : '??:??'}</span>
                            <style>{`@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default HazardList;
