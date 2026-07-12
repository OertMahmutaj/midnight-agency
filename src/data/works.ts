export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  year: string;
  industry: string;
  services: string[];
  summary: string;
  image: string;
  imageFit?: string;
  stats: {
    label: string;
    value: string;
  }[];
};

export const works: WorkItem[] = [
  {
    slug: 'mern-cms',
    title: 'MERN CMS',
    client: 'Studio OS',
    year: '2026',
    industry: 'Content system',
    services: ['React', 'Node.js', 'MongoDB'],
    summary:
      'A modular publishing dashboard with role-based editing flows and fast collection management.',
    image: '/work/mern-cms.jpg',
    stats: [
      { label: 'Stack', value: 'MERN' },
      { label: 'Focus', value: 'CMS' },
    ],
  },
  {
    slug: 'signal-launch',
    title: 'Signal Launch',
    client: 'Signal',
    year: '2026',
    industry: 'Brand activation',
    services: ['Next.js', 'Motion', 'Identity'],
    summary:
      'A cinematic launch page with sharp campaign beats and high-contrast art direction.',
    image: '/work/signal-launch.png',
    stats: [
      { label: 'Format', value: 'Launch' },
      { label: 'Output', value: 'Web' },
    ],
  },
  {
    slug: 'nocturne-lab',
    title: 'Nocturne Lab',
    client: 'Nocturne',
    year: '2025',
    industry: 'Interactive studio',
    services: ['Three.js', 'UX', 'WebGL'],
    summary:
      'A tactile web experience built around motion, texture, and rich product storytelling.',
    image: '/work/nocturne-lab.jpg',
    imageFit: 'object-contain bg-black',
    stats: [
      { label: 'Medium', value: '3D' },
      { label: 'Mode', value: 'Lab' },
    ],
  },
  {
    slug: 'atlas-ops',
    title: 'Atlas Ops',
    client: 'Atlas',
    year: '2025',
    industry: 'Operations portal',
    services: ['Dashboard', 'Systems', 'Data'],
    summary:
      'A dense internal tool redesigned for speed, clarity, and repeatable daily workflows.',
    image: '/work/atlas-ops.jpg',
    stats: [
      { label: 'Product', value: 'Portal' },
      { label: 'Focus', value: 'Ops' },
    ],
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
