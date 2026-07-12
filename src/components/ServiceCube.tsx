'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';
import { useTexture } from '@react-three/drei';

export default function ServiceCube() {
    const meshRef = useRef<Mesh>(null!);
    const grainTexture = useTexture('/images.jpg');

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.3;
    });

    const textProps = {
        fontSize: 0.4,
        color: "white",
        anchorX: "center" as const,
        anchorY: "middle" as const,
        font: "/fonts/GeistMono-Black.ttf"
    };
    return (
        <mesh
            ref={meshRef}
            rotation={[-0.5, 0, 0]} // Initial Tilt: x, y, z
            scale={0.9}
        >
            <boxGeometry args={[3.1, 3.1, 3.1]} />
            <meshStandardMaterial 
                color="#b94502" 
                side={0} 
                map={grainTexture}
                roughness={0.8} />
            <Text {...textProps} position={[0, 0, 1.56]} >SEO</Text>

            {/* Face 2: Right */}
            <Text {...textProps} position={[1.56, 0, 0]} rotation={[0, Math.PI / 2, 0]}>WEB DEV</Text>

            {/* Face 3: Back */}
            <Text {...textProps} position={[0, 0, -1.56]} rotation={[0, Math.PI, 0]}>BRANDING</Text>

            {/* Face 4: Left */}
            <Text {...textProps} position={[-1.56, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>DESIGN</Text>
        </mesh>
    );
}
