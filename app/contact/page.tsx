'use client';

import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, useTexture, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import ContactModal from '@/src/components/ContactModal';
import PageNumber from '@/src/components/PageNumber';
import {
  pageContainer,
  pageRise,
  headingRise,
} from '@/src/lib/pageMotion';
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
      <meshStandardMaterial color="#b94502" map={grainTexture} roughness={0.82} metalness={0.08} />
      <Text {...textProps} position={[0, 0, 1.34]}>{labels[0]}</Text>
      <Text {...textProps} position={[1.34, 0, 0]} rotation={[0, Math.PI / 2, 0]}>{labels[1]}</Text>
      <Text {...textProps} position={[0, 0, -1.34]} rotation={[0, Math.PI, 0]}>{labels[2]}</Text>
      <Text {...textProps} position={[-1.34, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>{labels[3]}</Text>
    </mesh>
  );
}

const contactCopy = {
  en: {
    eyebrow: 'Contact',
    titleFirst: 'Get In',
    titleSecond: 'Touch',
    intro: 'Tell us what you are building, what needs to move faster, or what needs a sharper first impression.',
    cta: 'Contact Us',
    aside: 'It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot.',
  },
  sq: {
    eyebrow: 'Kontakt',
    titleFirst: 'Na',
    titleSecond: 'Kontakto',
    intro: 'Na tregoni çfarë po ndërtoni, çfarë duhet të ecë më shpejt ose çfarë ka nevojë për një përshtypje të parë më të fortë.',
    cta: 'Na Kontakto',
    aside: 'Për ne është shumë e rëndësishme të qëndrojmë në kontakt me ju, ndaj jemi gjithmonë gati t’i përgjigjemi çdo pyetjeje që ju intereson. Flisni me ne.',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function ContactPage({ locale = 'en' }: { locale?: Locale }) {
  const copy = contactCopy[locale];

  return (
    <motion.main
      variants={pageContainer}
      initial="hidden"
      animate="show"
      className="relative min-h-screen overflow-x-clip px-5 pb-14 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28vw_100%,100%_96px] md:bg-[size:10vw_100%,100%_120px]" />
        <div className="absolute inset-0 border-t border-white/20" />
      </div>

      <motion.section
        variants={pageContainer}
        className="relative z-10 mx-auto grid min-w-0 max-w-7xl gap-8 lg:min-h-[70vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 xl:gap-16"
      >
        <motion.div variants={pageContainer} className="grid min-w-0 content-center justify-items-start">
          <motion.p variants={pageRise} className="mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#E37D30] sm:text-xs">
            {copy.eyebrow}
          </motion.p>

          <motion.h1
            variants={headingRise}
            className="w-fit max-w-full pb-[0.12em] pr-[0.08em] text-[clamp(3rem,9vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.04em]"
          >
            <span className="block">{copy.titleFirst}</span>
            <span className="block">
              {copy.titleSecond}<PageNumber value="05" />
            </span>
          </motion.h1>

          <motion.p variants={pageRise} className="mt-7 max-w-xl text-sm leading-7 text-white/62 sm:mt-8 sm:text-base md:text-lg">
            {copy.intro}
          </motion.p>

          <motion.div variants={pageRise} className="mt-8 w-full max-w-[19rem] overflow-visible px-2 py-2 sm:mt-10 sm:px-0">
            <ContactModal triggerLabel={copy.cta} locale={locale} />
          </motion.div>
        </motion.div>

        <motion.div variants={pageContainer} className="relative grid min-h-[330px] min-w-0 content-center sm:min-h-[430px] lg:min-h-[560px]">
          <div className="absolute left-1/2 top-5 h-[250px] w-[250px] max-w-[78vw] -translate-x-1/2 sm:top-8 sm:h-[340px] sm:w-[340px] lg:left-[8%] lg:top-[6%] lg:h-[430px] lg:w-[430px] lg:translate-x-0">
            <motion.div variants={pageRise} className="h-full w-full rounded-[46%_54%_58%_42%/45%_42%_58%_55%] border border-white/18" />
          </div>

          <motion.div variants={pageRise} className="relative z-10 mx-auto h-[280px] w-full max-w-[320px] touch-pan-y sm:h-[370px] sm:max-w-[450px] lg:h-[520px] lg:max-w-none">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.8], fov: 50 }}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[6, 6, 5]} intensity={1.2} />
              <Suspense fallback={null}>
                <ContactCube locale={locale} />
                <Environment files="/hdr/potsdamer_platz_1k.hdr" />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Suspense>
            </Canvas>
          </motion.div>

          <motion.p variants={pageRise} className="relative z-10 mx-auto mt-3 w-full max-w-[22rem] text-center text-sm leading-7 text-white/72 lg:-mt-8 lg:ml-[22%] lg:mr-0 lg:text-left">
            {copy.aside}
          </motion.p>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
