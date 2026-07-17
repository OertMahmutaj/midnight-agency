'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import ServiceCube from '@/src/components/ServiceCube';

export default function ServiceCubeCanvas() {
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.8], fov: 45 }}
    >
      <ServiceCube />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
