'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
// import NavScramble from '@/src/components/NavScramble';
import WordScrambleText from '@/src/components/WordScrambleText';

const menuEase = [0.76, 0, 0.24, 1] as const;

const navLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'People', href: '/people' },
  { label: 'Contact', href: '/contact' },
];

const mobileNavLinks = [{ label: 'Home', href: '/' }, ...navLinks];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          href="/"
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
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
              aria-label="Close menu"
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
                      className="font-k2d flex min-h-[4.75rem] cursor-pointer items-center justify-between gap-5 py-4 text-5xl font-black uppercase leading-none tracking-normal transition-colors hover:text-[#E37D30] sm:min-h-[5.75rem] sm:text-6xl"
                      style={{
                        fontFamily:
                          '"K2D ExtraBold", Arial, Helvetica, sans-serif',
                      }}
                    >
                      <span>{label}</span>
                      <span className="font-mono text-[10px] font-black tracking-[0.18em] text-white/38">
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
                  className="flex items-center justify-between gap-5 pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-white/38"
                >
                  <span>Midnight Agency</span>
                  <span>Tirana, Albania</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
