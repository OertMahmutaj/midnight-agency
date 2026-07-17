'use client';

import { Suspense, useRef } from 'react';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

import type { Locale } from '@/src/lib/i18n';

function ContactCube({ locale }: { locale: Locale }) {
  const meshRef = useRef<Mesh>(null!);
  const grainTexture = useTexture('/images.jpg');

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.x = -0.35;
  });

  const textProps = {
    fontSize: 0.46,
    color: 'white',
    anchorX: 'center' as const,
    anchorY: 'middle' as const,
    font: '/fonts/GeistMono-Black.ttf',
  };
  const labels = locale === 'sq'
    ? ['NA', 'KON', 'TAKTO', 'TUNG']
    : ['GET', 'IN', 'TOUCH', 'HELLO'];

  return (
    <mesh ref={meshRef} rotation={[-0.35, 0.35, 0]}>
      <boxGeometry args={[2.65, 2.65, 2.65]} />
      <meshStandardMaterial
        color="#b94502"
        map={grainTexture}
        roughness={0.82}
        metalness={0.08}
      />
      <Text {...textProps} position={[0, 0, 1.34]}>{labels[0]}</Text>
      <Text {...textProps} position={[1.34, 0, 0]} rotation={[0, Math.PI / 2, 0]}>{labels[1]}</Text>
      <Text {...textProps} position={[0, 0, -1.34]} rotation={[0, Math.PI, 0]}>{labels[2]}</Text>
      <Text {...textProps} position={[-1.34, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>{labels[3]}</Text>
    </mesh>
  );
}

export default function ContactCubeCanvas({ locale }: { locale: Locale }) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.8], fov: 50 }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 6, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <ContactCube locale={locale} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  );
}
