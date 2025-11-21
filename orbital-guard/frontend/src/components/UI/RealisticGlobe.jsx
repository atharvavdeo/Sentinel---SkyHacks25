import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
    const meshRef = useRef();

    // Load only the main earth texture
    const colorMap = useTexture('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group>
            {/* Earth Sphere */}
            <mesh ref={meshRef} scale={2.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Atmosphere Glow */}
            <mesh scale={2.58}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial
                    color="#4db2ff"
                    transparent
                    opacity={0.15}
                    side={2} // DoubleSide
                />
            </mesh>
        </group>
    );
};

// Enhanced Stars with size variety and brightness
const EnhancedStars = ({ mousePos }) => {
    const starsRef = useRef();

    useFrame(() => {
        if (starsRef.current && mousePos) {
            // Subtle parallax effect based on mouse position
            starsRef.current.rotation.x = mousePos.y * 0.05;
            starsRef.current.rotation.y = mousePos.x * 0.05;
        }
    });

    // Create custom star geometry with size variety
    const starGeometry = React.useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const sizes = [];
        const colors = [];

        for (let i = 0; i < 8000; i++) {
            // Random position in sphere
            const radius = 250 + Math.random() * 100;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            vertices.push(x, y, z);

            // Size variety: 70% small, 20% medium, 10% large
            const rand = Math.random();
            let size;
            if (rand < 0.7) {
                size = 1.5 + Math.random() * 1.5; // Small stars
            } else if (rand < 0.9) {
                size = 3 + Math.random() * 2; // Medium stars
            } else {
                size = 5 + Math.random() * 3; // Large stars
            }
            sizes.push(size);

            // Brightness variety - warmer whites and blues
            const brightness = 0.7 + Math.random() * 0.3;
            const colorVariant = Math.random();
            if (colorVariant < 0.7) {
                // White stars
                colors.push(brightness, brightness, brightness);
            } else if (colorVariant < 0.85) {
                // Slightly blue stars
                colors.push(brightness * 0.9, brightness * 0.95, brightness);
            } else {
                // Slightly warm stars
                colors.push(brightness, brightness * 0.95, brightness * 0.9);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        return geometry;
    }, []);

    const starMaterial = React.useMemo(() => {
        return new THREE.PointsMaterial({
            size: 2,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    return <points ref={starsRef} geometry={starGeometry} material={starMaterial} />;
};

const RealisticGlobe = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePos({ x, y });
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
                position: 'relative'
            }}
            onMouseMove={handleMouseMove}
        >
            {/* Atmospheric Glow Container */}
            <div style={{
                position: 'absolute',
                inset: '-20%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(66, 133, 244, 0.15) 0%, rgba(66, 133, 244, 0.08) 40%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Canvas Container with Circular Mask */}
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'visible',
                position: 'relative',
                boxShadow: `
                    0 0 60px rgba(66, 133, 244, 0.3),
                    0 0 120px rgba(66, 133, 244, 0.2),
                    0 0 180px rgba(66, 133, 244, 0.1)
                `
            }}>
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    style={{ background: 'transparent', borderRadius: '50%' }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
                    <pointLight position={[-10, -5, -5]} intensity={1.2} color="#4db2ff" />
                    <directionalLight position={[-5, 3, 5]} intensity={1.0} />

                    <Suspense fallback={null}>
                        <Earth />
                    </Suspense>

                    <EnhancedStars mousePos={mousePos} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>

                {/* Soft Vignette Fade */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.3) 85%, rgba(0, 0, 0, 0.5) 100%)',
                    pointerEvents: 'none',
                    zIndex: 10
                }} />
            </div>
        </div>
    );
};

export default RealisticGlobe;
