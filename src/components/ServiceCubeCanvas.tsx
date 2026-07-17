'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import ServiceCube from '@/src/components/ServiceCube';

export default function ServiceCubeCanvas() {
  return (
    <Canvas
      dpr={[1, 1.15]}
      frameloop="always"
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      camera={{ position: [0, 0, 7.8], fov: 45 }}
    >
      <ServiceCube />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
