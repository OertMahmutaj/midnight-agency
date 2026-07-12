'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const smoothEase = [0.76, 0, 0.24, 1] as const;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'pokopia';
  logoSrc?: string;
  logoAlt?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  title,
  description,
  className = '',
  variant = 'default',
  logoSrc,
  logoAlt = 'Logo',
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const modalContent = (
    <AnimatePresence>
      {open ? (
        <motion.div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[900] grid place-items-center overflow-hidden px-4 py-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.button
            aria-label="Close modal"
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-[1px] cursor-pointer"
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {variant === 'pokopia' ? (
            <motion.div
              className={`relative z-10 w-full max-w-xl overflow-hidden border-[3px] border-white bg-[#E37D30] p-2 shadow-2xl shadow-black/70 sm:p-3 ${className}`}
              initial={{ opacity: 0, scale: 0.12, rotate: -5, borderRadius: 999 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, borderRadius: 30 }}
              exit={{ opacity: 0, scale: 0.18, rotate: 4, borderRadius: 999 }}
              transition={{ duration: 0.75, ease: smoothEase }}
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-30 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[4px] border-white bg-black shadow-2xl shadow-black/40"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: [1, 1, 0], scale: [1, 1.12, 0.72] }}
                transition={{ duration: 0.78, times: [0, 0.55, 1], ease: smoothEase }}
              >
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt=""
                    width={160}
                    height={40}
                    className="h-auto w-20"
                    priority
                  />
                ) : (
                  <span className="text-xl font-black uppercase text-white">MDNT</span>
                )}
              </motion.div>

              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute right-4 top-4 z-40 grid h-9 w-9 place-items-center rounded-[99px] bg-black text-white transition-colors cursor-pointer hover:bg-[#E37D30]"
              >
                <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
                <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
              </button>

              <motion.div
                className="relative z-10 overflow-hidden rounded-[18px] bg-white text-black"
                initial={{ opacity: 0, scaleX: 0.26, scaleY: 0.18, borderRadius: 34 }}
                animate={{ opacity: 1, scaleX: 1, scaleY: 1, borderRadius: 22 }}
                exit={{ opacity: 0, scaleX: 0.35, scaleY: 0.2, borderRadius: 34 }}
                transition={{ delay: 0.34, duration: 0.58, ease: smoothEase }}
                style={{ transformOrigin: 'center' }}
              >
                <motion.div
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  // exit={{ opacity: 0 }}
                  transition={{ delay: 0.82, duration: 0.36, ease: smoothEase }}
                >
                  {(title || description) ? (
                    <header className="border-b border-black/10 px-5 pb-5 pt-6 sm:px-6">
                      {logoSrc ? (
                        <span className="mb-5 inline-flex rounded-[2px] bg-black px-3 py-2">
                          <Image
                            src={logoSrc}
                            alt={logoAlt}
                            width={220}
                            height={55}
                            className="h-auto w-20"
                            priority
                          />
                        </span>
                      ) : null}

                      {title ? (
                        <h2 className="max-w-[10ch] text-3xl font-black uppercase leading-[0.82] text-black sm:text-4xl">
                          {title}
                        </h2>
                      ) : null}

                      {description ? (
                        <p className="mt-5 max-w-xl text-sm leading-6 text-black/58">
                          {description}
                        </p>
                      ) : null}
                    </header>
                  ) : null}

                  <div className="px-5 py-5 sm:px-6 sm:py-6">
                    {children}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className={`relative z-10 w-full max-w-2xl overflow-hidden border border-white/12 bg-[#050505] shadow-2xl shadow-black/60 ${className}`}
              initial={{ opacity: 0, y: 56, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: 0.97 }}
              transition={{ duration: 0.5, ease: smoothEase }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-[0.11]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:20%_100%,100%_88px]" />
              </div>

              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center text-white/60 transition-colors hover:text-white"
              >
                <span className="absolute h-0.5 w-5 rotate-45 bg-current" />
                <span className="absolute h-0.5 w-5 -rotate-45 bg-current" />
              </button>

              {(title || description) ? (
                <header className="relative z-10 border-b border-white/10 px-6 pb-6 pt-8 sm:px-8">
                  {title ? (
                    <h2 className="max-w-[10ch] text-4xl font-black uppercase leading-[0.82] sm:text-5xl">
                      {title}
                    </h2>
                  ) : null}

                  {description ? (
                    <p className="mt-5 max-w-xl text-sm leading-6 text-white/58">
                      {description}
                    </p>
                  ) : null}
                </header>
              ) : null}

              <div className="relative z-10 px-6 py-7 sm:px-8 sm:py-8">
                {children}
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
}
