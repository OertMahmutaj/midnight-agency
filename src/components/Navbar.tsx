'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import NavScramble from '@/src/components/NavScramble';
import WordScrambleText from '@/src/components/WordScrambleText';
import {
  alternateLocalePath,
  localeFromPathname,
  withLocale,
  type Locale,
} from '@/src/lib/i18n';

const menuEase = [0.76, 0, 0.24, 1] as const;

const navCopy = {
  en: {
    home: 'Home',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Services', href: '/services' },
      { label: 'People', href: '/people' },
      { label: 'Contact', href: '/contact' },
    ],
    open: 'Open menu',
    close: 'Close menu',
    location: 'Tirana, Albania',
    language: 'Switch to Albanian',
    languageShort: 'AL',
  },
  sq: {
    home: 'Kreu',
    links: [
      { label: 'Projektet', href: '/work' },
      { label: 'Shërbimet', href: '/services' },
      { label: 'Ekipi', href: '/people' },
      { label: 'Kontakt', href: '/contact' },
    ],
    open: 'Hap menunë',
    close: 'Mbyll menunë',
    location: 'Tiranë, Shqipëri',
    language: 'Kalo në anglisht',
    languageShort: 'EN',
  },
} satisfies Record<Locale, {
  home: string;
  links: { label: string; href: string }[];
  open: string;
  close: string;
  location: string;
  language: string;
  languageShort: string;
}>;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const copy = navCopy[locale];
  const navLinks = copy.links.map((link) => ({
    ...link,
    href: withLocale(link.href, locale),
  }));
  const mobileNavLinks = [
    { label: copy.home, href: withLocale('/', locale) },
    ...navLinks,
  ];

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', closeOnEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <nav
      className="
    fixed
    left-0
    top-0
    z-[150]
    font-k2d
    h-24
    w-full
    shrink-0
    border-b
    border-white/10
    bg-black/60
    px-5
    shadow-lg
    backdrop-blur-md

    sm:h-28
    sm:px-8

    md:h-24

    lg:px-10
  "
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <Link
          href={withLocale('/', locale)}
          aria-label="Midnight home"
          onClick={() => setIsOpen(false)}
          className="relative z-[201] inline-flex shrink-0 items-center"
        >
          <Image
            src="/logo/MDNT-ICON-WHITE.png"
            alt="Midnight"
            width={5010}
            height={1240}
            priority
            className="h-auto w-[clamp(7.25rem,34vw,11rem)] sm:w-[clamp(8rem,22vw,11rem)]"
          />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? copy.close : copy.open}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="
    relative
    z-[202]
    -mr-2
    grid
    h-16
    w-16
    cursor-pointer
    place-items-center
    md:hidden
  "
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className={`
      h-12
      w-12
      transition-transform
      duration-300
      ${isOpen ? 'hamburger-open' : ''}
    `}
          >
            <path
              className="hamburger-line hamburger-line-top"
              d="
        M 20,29
        H 80
        C 80,29 94.5,28.8 94.5,66.7
        C 94.5,78.8 90.5,81.7 85.5,81.7
        C 79.5,81.7 75,75 75,75
        L 25,25
      "
            />

            <path
              className="hamburger-line hamburger-line-middle"
              d="M 20,50 H 80"
            />

            <path
              className="hamburger-line hamburger-line-bottom"
              d="
        M 20,71
        H 80
        C 80,71 94.5,71.2 94.5,33.3
        C 94.5,21.2 90.5,18.3 85.5,18.3
        C 79.5,18.3 75,25 75,25
        L 25,75
      "
            />
          </svg>
        </button>

        <div className="hidden items-center gap-6 text-sm font-bold uppercase tracking-widest md:flex lg:gap-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="inline-flex cursor-pointer transition-colors hover:text-[#E37D30]"
            >
              <WordScrambleText
                value={label}
                hoverValue={label.toUpperCase()}
                // frames={30}
                className="inline-grid whitespace-nowrap"
              />
            </Link>
          ))}
          <Link
            href={alternateLocalePath(pathname)}
            aria-label={copy.language}
            className="border-l border-white/20 pl-6 text-[11px] transition-colors hover:text-[#E37D30] lg:pl-8"
          >
            {copy.languageShort}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[180] min-h-dvh overflow-y-auto bg-black text-white md:hidden"
          >
            <button
              type="button"
              aria-label={copy.close}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 cursor-default"
            />

            <div className="relative z-10 min-h-dvh px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
              <div className="mx-auto w-full max-w-2xl border-t border-white/35">
                {mobileNavLinks.map(({ label, href }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{
                      delay: 0.08 + index * 0.055,
                      duration: 0.4,
                      ease: menuEase,
                    }}
                    className="border-b border-white/35"
                  >
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="font-k2d flex min-h-[4.75rem] cursor-pointer items-center justify-between gap-5 py-4 text-[clamp(2.35rem,11vw,3rem)] font-black uppercase leading-none tracking-normal transition-colors hover:text-[#E37D30] sm:min-h-[5.75rem] sm:text-6xl"
                    >
                      <span>{label}</span>
                      <span className="text-[10px] font-black tracking-[0.18em] text-white/38">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.08 + mobileNavLinks.length * 0.055,
                    duration: 0.4,
                    ease: menuEase,
                  }}
                  className="flex items-center justify-between gap-5 pt-6 text-[9px] uppercase tracking-[0.18em] text-white/38"
                >
                  <span>Midnight Agency</span>
                  <span>{copy.location}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.12 + mobileNavLinks.length * 0.055,
                    duration: 0.4,
                    ease: menuEase,
                  }}
                  className="mt-6 border-t border-white/35 pt-5"
                >
                  <Link
                    href={alternateLocalePath(pathname)}
                    aria-label={copy.language}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em] transition-colors hover:text-[#E37D30]"
                  >
                    <span>{locale === 'en' ? 'English' : 'Shqip'}</span>
                    <span className="text-[#E37D30]">/</span>
                    <span>{copy.languageShort}</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
