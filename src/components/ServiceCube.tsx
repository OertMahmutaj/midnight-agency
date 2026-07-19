'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, SRGBColorSpace, type Texture } from 'three';

const cubeFaces = [
  '/cube/01.webp?v=20260719',
  '/cube/02.webp?v=20260719',
  '/cube/03.webp?v=20260719',
  '/cube/04.webp?v=20260719',
  '/cube/05.webp?v=20260719',
  '/cube/06.webp?v=20260719',
];

const ROTATION_SPEED = 0.3;
const MAX_FRAME_DELTA = 0.1;

function prepareCubeTextures(textures: Texture[]) {
  textures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  });
}

useTexture.preload(cubeFaces);

export default function ServiceCube() {
  const meshRef = useRef<Mesh>(null!);
  const textures = useTexture(cubeFaces, prepareCubeTextures);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Keep normal late frames time-accurate while ignoring long tab/background pauses.
    meshRef.current.rotation.y += Math.min(delta, MAX_FRAME_DELTA) * ROTATION_SPEED;
  });

  return (
    <mesh ref={meshRef} rotation={[-0.5, 0, 0]} scale={0.9}>
      <boxGeometry args={[3.1, 3.1, 3.1]} />
      {textures.map((texture, index) => (
        <meshBasicMaterial
          key={cubeFaces[index]}
          attach={`material-${index}`}
          map={texture}
          toneMapped={false}
        />
      ))}
    </mesh>
  );
}
