'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  localeFromPathname,
  withLocale,
  type Locale,
} from '@/src/lib/i18n';

type FooterLink = string | { label: string; href: string };

type FooterColumn = {
  title: string;
  intro?: string;
  links: FooterLink[];
};

const columnsByLocale: Record<Locale, FooterColumn[]> = {
  en: [
    {
      title: 'Services',
      links: ['Brand Development', 'Still & Motion', 'Communication', 'All Services'],
    },
    {
      title: 'Company',
      links: [
        { label: 'Work', href: '/work' },
        { label: 'Services', href: '/services' },
        { label: 'People', href: '/people' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Contact',
      intro: 'Talk to us or ask us anything.',
      links: [
        { label: 'hello@midnight.studio', href: 'mailto:hello@midnight.studio' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Careers', href: '/contact' },
      ],
    },
    {
      title: 'Social',
      links: ['Instagram', 'Behance', 'LinkedIn', 'Facebook', 'Vimeo'],
    },
    {
      title: 'Legal',
      links: ['Privacy Notice', 'Cookie Policy'],
    },
  ],
  sq: [
    {
      title: 'Shërbimet',
      links: ['Zhvillim Marke', 'Imazh & Motion', 'Komunikim', 'Të Gjitha Shërbimet'],
    },
    {
      title: 'Kompania',
      links: [
        { label: 'Projektet', href: '/work' },
        { label: 'Shërbimet', href: '/services' },
        { label: 'Ekipi', href: '/people' },
        { label: 'Kontakt', href: '/contact' },
      ],
    },
    {
      title: 'Kontakt',
      intro: 'Flisni me ne ose na pyesni për çdo gjë.',
      links: [
        { label: 'hello@midnight.studio', href: 'mailto:hello@midnight.studio' },
        { label: 'Na Kontakto', href: '/contact' },
        { label: 'Karriera', href: '/contact' },
      ],
    },
    {
      title: 'Rrjetet Sociale',
      links: ['Instagram', 'Behance', 'LinkedIn', 'Facebook', 'Vimeo'],
    },
    {
      title: 'Ligjore',
      links: ['Njoftimi i Privatësisë', 'Politika e Cookies'],
    },
  ],
};

const footerCopy = {
  en: {
    heading: ['Building', 'Bridges', 'Together.'],
    rights: 'All rights reserved.',
  },
  sq: {
    heading: ['Ndërtojmë', 'Ura', 'Së Bashku.'],
    rights: 'Të gjitha të drejtat e rezervuara.',
  },
} satisfies Record<Locale, { heading: string[]; rights: string }>;

export default function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const columns = columnsByLocale[locale];
  const copy = footerCopy[locale];

  return (
    <footer className="relative z-20 flex flex-col border-t border-black/10 bg-[#eeeeee] text-[#111111]">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title} className="min-w-0">
              <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.36em] text-black/35 sm:mb-8 sm:text-[11px] sm:tracking-[0.45em]">
                {column.title}
              </h3>

              {column.intro ? (
                <p className="mb-5 max-w-[14rem] text-sm leading-6 text-black/45">{column.intro}</p>
              ) : null}

              <ul className="space-y-3 text-sm text-black/85 sm:space-y-4">
                {column.links.map((item) => {
                  const label = typeof item === 'string' ? item : item.label;
                  const baseHref = typeof item === 'string' ? '#' : item.href;
                  const href = baseHref.startsWith('/')
                    ? withLocale(baseHref, locale)
                    : baseHref;

                  return (
                    <li key={label} className="min-w-0">
                      <Link href={href} className="group inline-flex max-w-full items-start gap-2 break-words transition-colors duration-300 hover:text-[#E37D30]">
                        <span className="shrink-0 text-black/45 transition-colors duration-300 group-hover:text-[#E37D30]">&gt;</span>
                        <span className="min-w-0 break-all sm:break-words">{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-16">
          <h2 className="max-w-4xl break-words text-[clamp(2.65rem,11vw,7.8rem)] font-black uppercase leading-[0.82] tracking-[-0.04em] text-[#E37D30]">
            {copy.heading.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>

          <p className="text-xs text-black/40 sm:text-sm">
            © {new Date().getFullYear()} Midnight. {copy.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
