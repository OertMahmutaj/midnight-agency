export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  year: string;
  industry: string;
  services: string[];
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  image: string;
  gallery: string[];
};

function numberedImages(slug: string, first: number, last: number) {
  return Array.from({ length: last - first + 1 }, (_, index) => {
    const number = String(first + index).padStart(2, '0');

    return `/work/${slug}/${number}.png`;
  });
}

export const works: WorkItem[] = [
  {
    slug: 'creative-cult',
    title: 'Creativ Cult',
    client: 'Creativ Cult',
    year: '2026',
    industry: 'Creative agency',
    services: ['Brand implementation', 'Visual systems', 'Digital design'],
    summary:
      'A dynamic marketing and creative agency focused on bold communication and unconventional brand strategies.',
    challenge:
      'The agency had a core logo but lacked a unified visual language to support it. The challenge was to take the existing mark and architect a complete brand ecosystem, translating the Cult philosophy into a rigorous, scalable, and high-impact visual system for corporate and digital environments.',
    solution:
      "We developed a comprehensive identity system based on a strict geometric grid, deriving graphic patterns and layout structures directly from the logo's angles. A high-contrast typographic hierarchy and modular design language make every touchpoint feel like a natural extension of the brand's core DNA, balancing creative edge with professional authority.",
    deliverables: [
      'Website design',
      'Brochure trifold',
      'Business cards',
      'Instagram feed templates',
    ],
    image: '/work/creative-cult/01.png',
    gallery: numberedImages('creative-cult', 2, 6),
  },
  {
    slug: 'optimus-pharma',
    title: 'Optimus Pharma',
    client: 'Optimus Pharma',
    year: '2026',
    industry: 'Pharmaceutical distribution',
    services: ['Brand strategy', 'Identity redesign', 'Packaging'],
    summary:
      'A leading pharmaceutical distributor in Tirana, specializing in the wholesale and logistics of medical products.',
    challenge:
      "The existing identity was outdated and no longer communicated the company's growth or professional evolution. The objective was a complete brand overhaul that could project authority, reliability, and modern standards across print and digital touchpoints.",
    solution:
      "We developed a minimalist mark that fuses the brand's initial O with a stylized capsule icon, creating a cohesive and recognizable symbol of precision. Deep navy and fresh teal support the identity, communicating trust, clinical excellence, and innovation.",
    deliverables: [
      'Brand identity and strategy',
      'Brand guidelines',
      'Corporate stationery',
      'Promotional merchandise',
      'Packaging',
      'Social media design system',
    ],
    image: '/work/optimus-pharma/01.png',
    gallery: numberedImages('optimus-pharma', 2, 8),
  },
  {
    slug: 'vp-consulting',
    title: 'VP Consulting',
    client: 'VP Consulting',
    year: '2026',
    industry: 'Business consulting',
    services: ['Logo design', 'Brand identity', 'Corporate design'],
    summary:
      'A strategic advisory firm providing business solutions, financial planning, and management consulting for corporate clients.',
    challenge:
      'The previous identity felt generic and lacked the executive character needed to build trust with high-net-worth clients. The challenge was to create a monogram that felt timeless, authoritative, and stable while remaining suitable for a digital-first business environment.',
    solution:
      'We designed a sophisticated monogram by intersecting the letters V and P within a perfect circle, symbolizing holistic support and 360-degree consulting. Its geometric construction stays clear at every scale, while a vibrant yellow accent against a dark palette combines strategic optimism with professional gravity.',
    deliverables: [
      'Executive brand identity',
      'Monogram design',
      'Corporate stationery',
      'Visual style guide',
    ],
    image: '/work/vp-consulting/01.png',
    gallery: numberedImages('vp-consulting', 2, 6),
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
