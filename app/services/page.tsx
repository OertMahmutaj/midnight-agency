'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import MidnightButton from '@/src/components/MidnightButton';
import PageNumber from '@/src/components/PageNumber';
import ServiceCube from '@/src/components/ServiceCube';
import { pageContainer as container, pageRise as rise } from '@/src/lib/pageMotion';

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

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip px-5 pb-14 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-7xl gap-8 lg:min-h-[72vh] lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] lg:items-center lg:gap-6 xl:grid-cols-[minmax(0,1fr)_500px] xl:gap-10"
      >
        <div className="min-w-0 w-full lg:max-w-[800px]">
          <motion.p
            variants={rise}
            className="mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#E37D30] sm:text-xs"
          >
            Services
          </motion.p>

          <motion.h1
            variants={rise}
            className="max-w-[11ch] text-[clamp(2.8rem,11vw,7rem)] font-black uppercase leading-[0.8] tracking-[-0.04em] sm:max-w-[12ch] lg:max-w-none"
          >
            What We Build After{' '}
            <span className="whitespace-nowrap">
              Midnight<PageNumber value="03" />
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-sm leading-7 text-white/62 sm:mt-7 sm:text-base md:text-lg"
          >
            Strategy, identity, websites, motion, and systems for brands that need to look sharper and move faster.
          </motion.p>

          <motion.div variants={rise} className="mt-8 w-full max-w-[16rem] overflow-visible px-2 py-2 sm:px-0 lg:mt-10">
            <MidnightButton href="/contact">Start A Project</MidnightButton>
          </motion.div>
        </div>

        <motion.div
          variants={rise}
          className="relative min-h-[300px] overflow-hidden sm:min-h-[410px] lg:min-h-[560px] xl:min-h-[620px]"
        >
          <div className="absolute left-1/2 top-6 h-[250px] w-[250px] -translate-x-1/2 rounded-[46%_54%_58%_42%/45%_42%_58%_55%] border border-white/14 sm:top-8 sm:h-[340px] sm:w-[340px] lg:left-[8%] lg:h-[460px] lg:w-[460px] lg:translate-x-0 xl:left-[12%] xl:h-[500px] xl:w-[500px]" />

          <div className="relative z-10 mx-auto h-[300px] w-full max-w-[340px] touch-pan-y sm:h-[410px] sm:max-w-[500px] lg:h-[560px] lg:max-w-none xl:h-[620px]">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.8], fov: 45 }}>
              <ambientLight intensity={0.55} />
              <directionalLight position={[10, 10, 5]} intensity={1.15} />
              <Environment files="/hdr/potsdamer_platz_1k.hdr" />
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
        className="mx-auto grid max-w-7xl gap-4 border-t border-white/12 pt-8 sm:grid-cols-2 xl:grid-cols-4"
      >
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            variants={rise}
            className="group min-w-0 border border-white/12 bg-white/[0.025] p-5 transition-colors duration-300 hover:border-[#E37D30]/70 hover:bg-white/[0.05] md:p-6"
          >
            <div className="mb-8 flex items-center justify-between text-xs font-black uppercase tracking-[0.28em] text-white/42 sm:mb-10">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span className="h-px w-10 bg-[#E37D30] transition-all duration-300 group-hover:w-16" />
            </div>

            <h2 className="break-words text-3xl font-black uppercase leading-none text-white md:text-4xl">
              {service.title}
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/62">{service.description}</p>

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
        className="mx-auto mt-14 max-w-7xl border-y border-white/12 py-8 sm:mt-20"
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {process.map(([number, label]) => (
            <motion.div
              key={label}
              variants={rise}
              className="min-w-0 border-b border-white/10 pb-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:pb-0"
            >
              <span className="text-sm font-black text-[#E37D30]">{number}</span>
              <h3 className="mt-4 max-w-full whitespace-nowrap text-4xl font-black uppercase leading-[0.82] text-white/86 sm:text-5xl xl:text-[3.25rem]">
                {label}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
