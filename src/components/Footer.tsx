import Link from 'next/link';

const columns = [
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
];

export default function Footer() {
  return (
    <footer className="mt-24 flex min-h-screen flex-col border-t border-black/10 bg-[#eeeeee] text-[#111111]">
      <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-8 text-[11px] font-bold uppercase tracking-[0.45em] text-black/35">
                {column.title}
              </h3>

              {'intro' in column && column.intro ? (
                <p className="mb-5 max-w-[12rem] text-sm leading-6 text-black/45">
                  {column.intro}
                </p>
              ) : null}

              <ul className="space-y-4 text-sm text-black/85">
                {column.links.map((item) => {
                  const label = typeof item === 'string' ? item : item.label;
                  const href = typeof item === 'string' ? '#' : item.href;

                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#E37D30]"
                      >
                        <span className="text-black/45 transition-colors duration-300 group-hover:text-[#E37D30]">
                          ›
                        </span>
                        {label}
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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-16">
          <h2 className="max-w-4xl text-[clamp(3.2rem,8vw,7.8rem)] font-black uppercase leading-[0.82] text-[#E37D30]">
            Building
            <br />
            Bridges
            <br />
            Together.
          </h2>

          <p className="text-sm text-black/40">
            © {new Date().getFullYear()} Midnight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}