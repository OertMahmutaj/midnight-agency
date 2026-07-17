'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import MidnightButton from '@/src/components/MidnightButton';
import { smoothEase } from '@/src/lib/pageMotion';
import type { Locale } from '@/src/lib/i18n';

type ContactFormProps = {
  onSuccess?: () => void;
  tone?: 'dark' | 'light';
  locale?: Locale;
};

const formCopy = {
  en: {
    name: 'Your Name',
    email: 'Your Email',
    message: 'Share your thoughts',
    sending: 'Sending',
    submit: 'Contact Us',
    thanks: 'Thank you for contacting us, we will get back to you as soon as possible.',
  },
  sq: {
    name: 'Emri Juaj',
    email: 'Email-i Juaj',
    message: 'Ndani mendimin tuaj',
    sending: 'Po Dërgohet',
    submit: 'Na Kontakto',
    thanks: 'Faleminderit që na kontaktuat. Do t’ju përgjigjemi sa më shpejt të jetë e mundur.',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function ContactForm({ onSuccess, tone = 'dark', locale = 'en' }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = formCopy[locale];
  const fieldClass =
    tone === 'light'
      ? 'min-w-0 w-full border-0 border-b border-black/35 bg-transparent px-0 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/45 focus:border-[#E37D30]'
      : 'min-w-0 w-full border-0 border-b border-white/45 bg-transparent px-0 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/72 focus:border-[#E37D30] [color-scheme:dark]';
  const successClass =
    tone === 'light'
      ? 'flex min-h-[260px] w-full items-center justify-center border border-black/10 p-8 text-center text-black'
      : 'flex min-h-[260px] w-full items-center justify-center border border-white/10 p-8 text-center';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { 'Content-Type': 'application/json' },
    });

    setIsSubmitting(false);

    if (response.ok || response.status === 429) {
      setSubmitted(true);
      onSuccess?.();
    } else {
      console.error('Contact form submission failed');
    }
  }

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -20 }}
          onSubmit={handleSubmit}
          autoComplete="off"
          transition={{ duration: 0.5, ease: smoothEase }}
          className={`${tone === 'light' ? 'contact-form-light' : 'contact-form-dark'} w-full space-y-5`}
        >
          <input
            name="name"
            type="text"
            autoComplete="off"
            placeholder={copy.name}
            required
            className={fieldClass}
          />

          <input
            name="email"
            type="email"
            autoComplete="off"
            placeholder={copy.email}
            required
            className={fieldClass}
          />

          <textarea
            name="message"
            rows={3}
            autoComplete="off"
            placeholder={copy.message}
            required
            className={`${fieldClass} resize-none`}
          />

          <div className="mx-auto mt-6 w-full max-w-xs overflow-visible px-3 py-3 sm:px-0 sm:py-0">
            <MidnightButton
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? copy.sending : copy.submit}
            </MidnightButton>
          </div>
        </motion.form>
      ) : (
        <motion.div
          key="thanks"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className={successClass}
        >
          <h3 className="text-xl font-black uppercase tracking-widest">
            {copy.thanks}
          </h3>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
