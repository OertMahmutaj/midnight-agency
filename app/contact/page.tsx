'use client';

import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, useTexture, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import ContactModal from '@/src/components/ContactModal';
import { pageContainer, pageRise } from '@/src/lib/pageMotion';

function ContactCube() {
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

  return (
    <mesh ref={meshRef} rotation={[-0.35, 0.35, 0]}>
      <boxGeometry args={[2.65, 2.65, 2.65]} />
      <meshStandardMaterial
        color="#b94502"
        map={grainTexture}
        roughness={0.82}
        metalness={0.08}
      />

      <Text {...textProps} position={[0, 0, 1.34]}>
        GET
      </Text>

      <Text {...textProps} position={[1.34, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        IN
      </Text>

      <Text {...textProps} position={[0, 0, -1.34]} rotation={[0, Math.PI, 0]}>
        TOUCH
      </Text>

      <Text {...textProps} position={[-1.34, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        HELLO
      </Text>
    </mesh>
  );
}

export default function ContactPage() {
  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="relative min-h-screen overflow-x-hidden px-5 pb-14 pt-28 text-white sm:px-8 md:px-12 lg:px-24 lg:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28vw_100%,100%_96px] md:bg-[size:10vw_100%,100%_120px]" />
        <div className="absolute inset-0 border-t border-white/20" />
      </div>

      <motion.section
        variants={pageContainer}
        className="relative z-10 mx-auto grid min-w-0 max-w-7xl gap-12 lg:min-h-[70vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16"
      >
        <motion.div
          variants={pageContainer}
          className="order-2 grid min-w-0 content-center justify-items-start lg:order-1"
        >
          <motion.p variants={pageRise} className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-[#E37D30]">
            Contact
          </motion.p>

          <motion.h1 variants={pageRise} className="max-w-[9ch] text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-[0.78]">
            Get In Touch
          </motion.h1>

          <motion.p variants={pageRise} className="mt-8 max-w-xl text-base leading-7 text-white/62 md:text-lg">
            Tell us what you are building, what needs to move faster, or what needs a sharper first impression.
          </motion.p>

          <motion.div variants={pageRise} className="mt-10 w-full max-w-[19rem] overflow-visible px-3 py-3 sm:px-0">
            <ContactModal triggerLabel="Contact Us" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={pageContainer}
          className="order-1 relative grid min-h-[420px] content-center lg:order-2 lg:min-h-[560px]"
        >
          <div className="absolute left-1/2 top-8 h-[280px] w-[280px] max-w-[78vw] -translate-x-1/2 sm:h-[360px] sm:w-[360px] lg:left-[8%] lg:top-[6%] lg:h-[430px] lg:w-[430px] lg:translate-x-0">
            <motion.div variants={pageRise} className="h-full w-full rounded-[46%_54%_58%_42%/45%_42%_58%_55%] border border-white/18" />
          </div>

          <motion.div variants={pageRise} className="relative z-10 mx-auto h-[300px] w-full max-w-[360px] sm:h-[380px] sm:max-w-[460px] lg:h-[520px] lg:max-w-none cursor-pointer">
            <Canvas
              camera={{
                position: [0, 0, 6.8],
                fov: 50,
              }}
            >
              <ambientLight intensity={0.55} />
              <directionalLight position={[6, 6, 5]} intensity={1.2} />

              <Suspense fallback={null}>
                <ContactCube />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Suspense>
            </Canvas>
          </motion.div>

          <motion.p variants={pageRise} className="relative z-10 mx-auto mt-4 w-full max-w-[min(22rem,calc(100vw-2.5rem))] text-center text-sm leading-7 text-white/72 lg:-mt-8 lg:ml-[22%] lg:mr-0 lg:text-left">
            It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot.
          </motion.p>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
