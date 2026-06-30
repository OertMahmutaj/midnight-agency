'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import ServiceCube from '@/src/components/ServiceCube';

const smoothEase = [0.76, 0, 0.24, 1] as const;

const services = [
  {
    title: 'Branding',
    description: 'Positioning, identity systems, tone of voice, and visual direction for brands that need sharper presence.',
    items: ['Strategy', 'Identity', 'Messaging'],
  },
  {
    title: 'Web Dev',
    description: 'High-performance websites, dashboards, CMS builds, and interactive interfaces with motion baked in.',
    items: ['Next.js', 'CMS', 'Animation'],
  },
  {
    title: 'SEO',
    description: 'Technical structure, content architecture, speed, and discoverability without flattening the brand.',
    items: ['Structure', 'Performance', 'Content'],
  },
  {
    title: 'Design',
    description: 'Landing pages, UI systems, campaign visuals, and digital experiences shaped for clarity and conversion.',
    items: ['UI Systems', 'Art Direction', 'Launch Assets'],
  },
];

const process = [
  ['01', 'Discover'],
  ['02', 'Shape'],
  ['03', 'Build'],
  ['04', 'Launch'],
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.16,
    },
  },
};

const rise: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    clipPath: 'inset(18% 0 0 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

function PersonaButton() {
  return (
    <div className="mt-8 w-full max-w-[15rem] ml-3 lg:ml-8 lg:py-5 overflow-visible sm:px-0">
      <Link
        href="/contact"
        className="group relative isolate inline-flex h-14 w-full overflow-visible text-[10px] font-black uppercase tracking-[0.06em] text-white sm:h-16 sm:text-xs"
      >
        <span className="absolute inset-0 z-[1] translate-x-[5px] translate-y-[5px] bg-white transition-all duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:translate-x-[7px] group-hover:translate-y-[6px] group-hover:bg-black sm:translate-x-[10px] sm:translate-y-[8px] sm:group-hover:translate-x-[15px] sm:group-hover:translate-y-[10px] sm:group-hover:rotate-[1.5deg]" />
        <span className="absolute inset-0 z-[2] -translate-x-[4px] -translate-y-[4px] bg-[#E37D30] transition-transform duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:-translate-x-[6px] group-hover:-translate-y-[5px] sm:-translate-x-[8px] sm:-translate-y-[7px] sm:group-hover:-translate-x-[16px] sm:group-hover:-translate-y-[10px] sm:group-hover:-rotate-2" />
        <span className="absolute inset-0 z-[3] bg-black transition-all duration-300 [clip-path:polygon(5%_18%,92%_5%,88%_22%,100%_18%,94%_82%,12%_95%,15%_78%,0_84%)] group-hover:-translate-x-[4px] group-hover:-translate-y-[2px] group-hover:bg-white sm:group-hover:-translate-x-[7px] sm:group-hover:-translate-y-[3px] sm:group-hover:-rotate-[1.2deg]" />
        <span className="relative z-[4] flex h-full w-full items-center justify-center px-5 text-center text-white transition-all duration-300 group-hover:text-black sm:px-6 sm:group-hover:-translate-x-2">
          Start A Project
        </span>
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden px-5 pb-10 pt-28 text-white md:px-10 lg:px-16 lg:pt-32">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid min-h-[78vh] max-w-7xl gap-10 lg:grid-cols-[1fr_500px] lg:items-center"
      >
        <div className="min-w-0 w-full lg:max-w-[800px] px-5">
          <motion.p variants={rise} className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-[#E37D30]">
            Services
          </motion.p>

          <motion.h1
            variants={rise}
            className="w-full max-w-[100%] text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[0.78] tracking-normal"
          >
            WHAT WE BUILD AFTER MIDNIGHT
          </motion.h1>

          <motion.p variants={rise} className="mt-7 max-w-xl text-base leading-7 text-white/62 md:text-lg">
            Strategy, identity, websites, motion, and systems for brands that need to look sharper and move faster.
          </motion.p>

          <motion.div variants={rise}>
            <PersonaButton />
          </motion.div>
        </div>

        <motion.div variants={rise} className="relative min-h-[360px] overflow-hidden lg:min-h-[620px]">
          <div className="absolute left-1/2 top-10 h-[280px] w-[280px] -translate-x-1/2 rounded-[46%_54%_58%_42%/45%_42%_58%_55%] border border-white/14 sm:h-[380px] sm:w-[380px] lg:left-[12%] lg:h-[500px] lg:w-[500px] lg:translate-x-0" />

          <div className="relative z-10 mx-auto h-[360px] w-full max-w-[420px] sm:h-[460px] sm:max-w-[560px] lg:h-[620px] lg:max-w-none cursor-pointer">
            <Canvas camera={{ position: [0, 0, 7.8], fov: 45 }} >
              <ambientLight intensity={0.55} />
              <directionalLight position={[10, 10, 5]} intensity={1.15} />
              <Environment preset="city" />
              <ServiceCube />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        className="mx-auto grid max-w-7xl gap-4 border-t border-white/12 pt-8 lg:grid-cols-4"
      >
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            variants={rise}
            className="group border border-white/12 bg-white/[0.025] p-5 transition-colors duration-300 hover:border-[#E37D30]/70 hover:bg-white/[0.05] md:p-6"
          >
            <div className="mb-10 flex items-center justify-between text-xs font-black uppercase tracking-[0.28em] text-white/42">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="h-px w-10 bg-[#E37D30] transition-all duration-300 group-hover:w-16" />
            </div>

            <h2 className="text-3xl font-black uppercase leading-none text-white md:text-4xl">
              {service.title}
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/62">
              {service.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {service.items.map((item) => (
                <span
                  key={item}
                  className="border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/58"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-20%' }}
        className="mx-auto mt-20 max-w-7xl border-y border-white/12 py-8"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map(([number, label]) => (
            <motion.div
              key={label}
              variants={rise}
              className="min-w-0 border-b border-white/10 pb-5 lg:border-b-0 lg:pb-0"
            >
              <span className="text-sm font-black text-[#E37D30]">{number}</span>

              <h3 className="mt-4 max-w-full break-words text-[clamp(2.4rem,11vw,4rem)] font-black uppercase leading-[0.82] text-white/86">
                {label}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}