'use client';

import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

const smoothEase = [0.76, 0, 0.24, 1] as const;

const projects = [
  {
    title: 'MERN CMS',
    kicker: 'Content system',
    description: 'A modular publishing dashboard with role-based editing flows and fast collection management.',
    tags: ['React', 'Node.js', 'MongoDB'],
    year: '2026',
    image: '/work/mern-cms.jpg',
    span: 'lg:col-span-7',
    imageFit: 'object-cover',
    titleSize: 'text-[clamp(2.4rem,5.8vw,6.6rem)]',
  },
  {
    title: 'Signal Launch',
    kicker: 'Brand activation',
    description: 'A cinematic launch page with sharp campaign beats and high-contrast art direction.',
    tags: ['Next.js', 'Motion', 'Identity'],
    year: '2026',
    image: '/work/signal-launch.png',
    span: 'lg:col-span-5',
    imageFit: 'object-cover',
    titleSize: 'text-[clamp(2.4rem,5.8vw,6.6rem)]',
  },
  {
    title: 'Nocturne Lab',
    kicker: 'Interactive studio',
    description: 'A tactile web experience built around motion, texture, and rich product storytelling.',
    tags: ['Three.js', 'UX', 'WebGL'],
    year: '2025',
    image: '/work/nocturne-lab.jpg',
    span: 'lg:col-span-5',
    imageFit: 'object-contain bg-black',
    titleSize: 'text-[clamp(2rem,4.7vw,4.9rem)]',
  },
  {
    title: 'Atlas Ops',
    kicker: 'Operations portal',
    description: 'A dense internal tool redesigned for speed, clarity, and repeatable daily workflows.',
    tags: ['Dashboard', 'Systems', 'Data'],
    year: '2025',
    image: '/work/atlas-ops.jpg',
    span: 'lg:col-span-7',
    imageFit: 'object-cover',
    titleSize: 'text-[clamp(2.4rem,5.8vw,6.6rem)]',
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 96,
    scale: 0.96,
    clipPath: 'inset(18% 0 0 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
};

const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 140,
    scale: 0.94,
    clipPath: 'inset(28% 0 0 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 1.5,
      ease: smoothEase,
    },
  },
};

export default function WorkPage() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 180, damping: 28, mass: 0.35 });
  const smoothY = useSpring(cursorY, { stiffness: 180, damping: 28, mass: 0.35 });
  const rotate = useTransform(smoothX, [0, 1400], [-8, 8]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    cursorX.set(event.clientX - 120);
    cursorY.set(event.clientY - 90);
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-x-hidden px-5 pb-8 pt-28 text-white md:px-10 lg:px-16"
    >
      <motion.div
        aria-hidden
        style={{ x: smoothX, y: smoothY, rotate }}
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-40 w-56 overflow-hidden border border-white/15 bg-black shadow-2xl shadow-black/60 md:block"
      >
        <Image
          src={activeProject.image}
          alt=""
          fill
          sizes="224px"
          loading="eager"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 border-b border-white/15 pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div className="overflow-hidden">
            <motion.p
              variants={reveal}
              className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#E37D30]"
            >
              Selected Work
            </motion.p>

            <motion.h1
              variants={reveal}
              className="max-w-5xl text-[clamp(3.5rem,12vw,10rem)] font-black uppercase leading-[0.78]"
            >
              Case Index
            </motion.h1>
          </div>

          <motion.p
            variants={reveal}
            className="max-w-xl text-sm leading-relaxed text-white/60 md:ml-auto md:text-base"
          >
            A motion-led portfolio wall with sharp reveals, oversized type, and image panels that open as you move through the work.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:auto-rows-[clamp(320px,42vh,520px)]"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={cardReveal}
              onMouseEnter={() => setActiveProject(project)}
              onFocus={() => setActiveProject(project)}
              tabIndex={0}
              className={`${project.span} group relative isolate flex min-h-[380px] overflow-hidden border border-white/12 bg-[#080808] outline-none transition-colors duration-500 hover:border-white/35 focus-visible:border-[#E37D30] lg:min-h-0`}
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: smoothEase }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  loading="eager"
                  className={`${project.imageFit} object-center`}
                />
              </motion.div>

              <div className="absolute inset-0 bg-black/25 transition-colors duration-500 md:bg-black/0 md:group-hover:bg-black/62" />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/70 to-transparent opacity-100 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />

              <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden p-5 md:p-7">
                <div className="flex items-start justify-between gap-4 text-xs font-black uppercase tracking-[0.24em] text-white/75">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                </div>

                <div className="max-w-[min(100%,720px)] translate-y-0 opacity-100 transition-all duration-500 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-[#E37D30] md:text-xs">
                    {project.kicker}
                  </p>

                  <h2
                    className={`${project.titleSize} max-w-full break-words font-black uppercase leading-[0.82] text-white`}
                  >
                    {project.title}
                  </h2>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </main>
  );
}