'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, useTexture } from '@react-three/drei';
import { Mesh } from 'three';

const smoothEase = [0.76, 0, 0.24, 1] as const;

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

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' },
    });

    setIsSubmitting(false);

    if (response.ok || response.status === 429) {
      setSubmitted(true);
    } else {
      console.error('Contact form submission failed');
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 pb-14 pt-28 text-white sm:px-8 md:px-12 lg:px-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28vw_100%,100%_96px] md:bg-[size:10vw_100%,100%_120px]" />
        <div className="absolute inset-0 border-t border-white/20" />
      </div>

      <section className="relative z-10 mx-auto grid min-w-0 max-w-7xl gap-12 lg:min-h-[70vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="order-2 min-w-0 w-full max-w-[calc(100vw-2.5rem)] space-y-7 justify-self-center overflow-hidden px-0 sm:max-w-lg lg:order-1 lg:justify-self-start lg:space-y-9"
            >
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="min-w-0 w-full border-0 border-b border-white/45 bg-transparent px-0 py-4 text-base text-white outline-none transition-colors placeholder:text-white/85 focus:border-[#E37D30] [color-scheme:dark]"
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="min-w-0 w-full border-0 border-b border-white/45 bg-transparent px-0 py-4 text-base text-white outline-none transition-colors placeholder:text-white/85 focus:border-[#E37D30] [color-scheme:dark]"
              />

              <textarea
                name="message"
                rows={3}
                placeholder="Share your thoughts"
                required
                className="min-w-0 w-full resize-none border-0 border-b border-white/45 bg-transparent px-0 py-4 text-base text-white outline-none transition-colors placeholder:text-white/85 focus:border-[#E37D30] [color-scheme:dark]"
              />

              <div className="mx-auto mt-8 w-full max-w-[calc(100vw-2rem)] overflow-hidden px-3 py-4 sm:max-w-md sm:overflow-visible sm:px-0 sm:py-0">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="group relative isolate h-14 w-full overflow-visible text-[10px] font-black uppercase tracking-[0.06em] cursor-pointer text-white sm:h-16 sm:text-xs md:h-20 md:text-sm"
                >
                  <span className="absolute inset-0 z-[1] translate-x-[5px] translate-y-[5px] bg-white transition-all duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:translate-x-[7px] group-hover:translate-y-[6px] group-hover:bg-black sm:translate-x-[10px] sm:translate-y-[8px] sm:group-hover:translate-x-[15px] sm:group-hover:translate-y-[10px] sm:group-hover:rotate-[1.5deg]" />

                  {/* <span className="absolute inset-0 z-[2] -translate-x-[4px] -translate-y-[4px] bg-[#E37D30] transition-transform duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:-translate-x-[6px] group-hover:-translate-y-[5px] sm:-translate-x-[8px] sm:-translate-y-[7px] sm:group-hover:-translate-x-[16px] sm:group-hover:-translate-y-[10px] sm:group-hover:-rotate-2" /> */}

                  <span className="absolute inset-0 z-[3] bg-black transition-all duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:-translate-x-[4px] group-hover:-translate-y-[2px] group-hover:bg-white sm:group-hover:-translate-x-[7px] sm:group-hover:-translate-y-[3px] sm:group-hover:-rotate-[1.2deg]" />

                  <span className="relative z-[4] flex h-full w-full items-center justify-center px-4 text-center text-white transition-all duration-300 group-hover:text-black sm:px-6 sm:group-hover:-translate-x-2">
                    CONTACT US
                  </span>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-[300px] w-full items-center justify-center border border-white/10 p-10 text-center"
            >
              <h2 className="text-xl font-black uppercase tracking-widest">
                Thank you for contacting us, we will get back to you as soon as possible.
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: smoothEase }}
          className="order-1 relative grid min-h-[420px] content-center lg:order-2 lg:min-h-[560px]"
        >
          <div className="absolute left-1/2 top-8 h-[280px] w-[280px] max-w-[78vw] -translate-x-1/2 rounded-[46%_54%_58%_42%/45%_42%_58%_55%] border border-white/18 sm:h-[360px] sm:w-[360px] lg:left-[8%] lg:top-[6%] lg:h-[430px] lg:w-[430px] lg:translate-x-0" />

          <div className="relative z-10 mx-auto h-[300px] w-full max-w-[360px] sm:h-[380px] sm:max-w-[460px] lg:h-[520px] lg:max-w-none">
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
              </Suspense>
            </Canvas>
          </div>

          <p className="relative z-10 mx-auto mt-4 w-full max-w-[min(22rem,calc(100vw-2.5rem))] text-center text-sm leading-7 text-white/72 lg:-mt-8 lg:ml-[22%] lg:mr-0 lg:text-left">
            It is very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot.
          </p>
        </motion.div>
      </section>
    </main>
  );
}