import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Globe from '../Canvas/Globe';
import Atmosphere from '../Canvas/Atmosphere';

const LandingGlobe = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} />

                <Suspense fallback={null}>
                    <group position={[0, 0, 0]} rotation={[0, 0, 0.2]}>
                        <Globe />
                        <Atmosphere />
                    </group>
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    enablePan={false}
                    enableDamping
                />
            </Canvas>
        </div>
    );
};

export default LandingGlobe;
