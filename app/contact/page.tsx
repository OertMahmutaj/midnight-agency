'use client';

import MidnightButton from '@/src/components/MidnightButton';
import PageNumber from '@/src/components/PageNumber';
import { openContactModal } from '@/src/lib/contactModal';
import type { Locale } from '@/src/lib/i18n';

const contactCopy = {
  en: {
    eyebrow: 'Contact',
    titleFirst: 'Get In',
    titleSecond: 'Touch',
    intro: 'Tell us what you are building, what needs to move faster, or what needs a sharper first impression.',
    cta: 'Contact Us',
  },
  sq: {
    eyebrow: 'Kontakt',
    titleFirst: 'Na',
    titleSecond: 'Kontakto',
    intro: 'Na tregoni çfarë po ndërtoni, çfarë duhet të ecë më shpejt ose çfarë ka nevojë për një përshtypje të parë më të fortë.',
    cta: 'Na Kontakto',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function ContactPage({ locale = 'en' }: { locale?: Locale }) {
  const copy = contactCopy[locale];

  return (
    <main
      className="relative min-h-screen overflow-x-clip px-5 pb-14 pt-28 text-white sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28vw_100%,100%_96px] md:bg-[size:10vw_100%,100%_120px]" />
        <div className="absolute inset-0 border-t border-white/20" />
      </div>

      <section className="relative z-10 mx-auto grid min-w-0 max-w-7xl gap-8 lg:min-h-[70vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div className="grid min-w-0 content-center justify-items-start">
          <p className="page-rise-entry mb-5 text-[10px] font-black uppercase tracking-[0.35em] text-[#E37D30] sm:text-xs [animation-delay:160ms]">
            {copy.eyebrow}
          </p>

          <h1 className="page-rise-entry w-fit max-w-full pb-[0.12em] pr-[0.08em] text-[clamp(3rem,9vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.04em] [animation-delay:260ms]">
            <span className="block">{copy.titleFirst}</span>
            <span className="block">
              {copy.titleSecond}<PageNumber value="05" />
            </span>
          </h1>

          <p className="page-rise-entry mt-7 max-w-xl text-sm leading-7 text-white/62 sm:mt-8 sm:text-base md:text-lg [animation-delay:360ms]">
            {copy.intro}
          </p>

          <div className="page-rise-entry mt-8 w-full max-w-[19rem] overflow-visible px-2 py-2 sm:mt-10 sm:px-0 [animation-delay:460ms]">
            <MidnightButton type="button" onClick={openContactModal} className="max-w-[18rem]">
              {copy.cta}
            </MidnightButton>
          </div>
        </div>

      </section>
    </main>
  );
}
