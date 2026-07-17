'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, SRGBColorSpace, type Texture } from 'three';

const cubeFaces = [
  '/cube/01.webp',
  '/cube/02.webp',
  '/cube/03.webp',
  '/cube/04.webp',
  '/cube/05.webp',
  '/cube/06.webp',
];

function prepareCubeTextures(textures: Texture[]) {
  textures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
  });
}

useTexture.preload(cubeFaces);

export default function ServiceCube() {
  const meshRef = useRef<Mesh>(null!);
  const textures = useTexture(cubeFaces, prepareCubeTextures);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += Math.min(delta, 1 / 30) * 0.3;
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
