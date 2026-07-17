import type { Locale } from '@/src/lib/i18n';

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

    return `/work/${slug}/${number}.webp`;
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
      'Trifold brochure',
      'Business cards',
      'Instagram feed templates',
    ],
    image: '/work/creative-cult/01.webp',
    gallery: numberedImages('creative-cult', 2, 9),
  },
  {
    slug: 'jc-detailing',
    title: 'JC Detailing',
    client: 'JC Detailing',
    year: '2026',
    industry: 'Automotive detailing',
    services: ['Brand identity', 'Full-stack development', 'Local SEO'],
    summary:
      'A premium automotive care and detailing studio focused on precision craftsmanship, elite surface protection, and high-end vehicle aesthetics.',
    challenge:
      'The business needed a complete and cohesive digital infrastructure built from the ground up. Beyond a powerful identity, it required a high-performance ecosystem capable of converting visitors into appointments, automating complex scheduling, and streamlining daily backend operations without compromising the visual experience.',
    solution:
      'We designed a precision-engineered identity and developed a fully responsive website with a custom administration panel. An automated reservation calendar and backend management suite let the owner track operating costs, manage appointments, and oversee bookings in real time, while targeted local SEO positions the brand prominently in relevant searches.',
    deliverables: [
      'Logo design and brand identity',
      'Full-stack website development',
      'Custom admin dashboard and booking system',
      'Local SEO strategy and optimization',
    ],
    image: '/work/jc-detailing/01.webp',
    gallery: numberedImages('jc-detailing', 2, 6),
  },
  {
    slug: 'nerguti',
    title: 'Nerguti',
    client: 'Nerguti Travel & Tours',
    year: '2026',
    industry: 'Travel and tourism',
    services: ['Brand identity', 'UI design', 'Campaign design'],
    summary:
      'A full-service travel agency providing bespoke holiday packages, flight bookings, and global tour management.',
    challenge:
      'Travel brands depend on visual inspiration and ease of access. Nerguti needed an identity that felt energetic, trustworthy, and organized across complex booking interfaces and physical marketing assets, while maintaining a high-energy holiday atmosphere.',
    solution:
      'We created a dynamic identity around a warm, sun-kissed orange palette that evokes excitement and discovery. The logo combines the letter N with path-finding symbols, while a highly legible typography system keeps complex itineraries and flight information clear and easy to navigate.',
    deliverables: [
      'Logo architecture',
      'Brand identity',
      'UI design concepts',
      'Corporate stationery',
      'Promotional collateral',
    ],
    image: '/work/nerguti/01.webp',
    gallery: numberedImages('nerguti', 2, 12),
  },
  {
    slug: 'optimus-pharma',
    title: 'Optimus Pharma',
    client: 'Optimus Pharma',
    year: '2026',
    industry: 'Pharmaceutical distribution',
    services: ['Brand strategy', 'Identity redesign', 'Packaging'],
    summary:
      'A leading pharmaceutical distributor in Tirana specializing in the wholesale and logistics of medical products.',
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
    image: '/work/optimus-pharma/01.webp',
    gallery: numberedImages('optimus-pharma', 2, 8),
  },
  {
    slug: 'skanderbeg',
    title: 'Skander beg',
    client: 'Skanderbeg Biofarm',
    year: '2026',
    industry: 'Organic agriculture',
    services: ['Brand identity', 'Packaging', 'Social media'],
    summary:
      'A premium organic producer blending traditional heritage with sustainable agriculture and modern ecological standards.',
    challenge:
      'The organic food market is often saturated with rustic, outdated identities. Skanderbeg needed a brand that honored its prestigious name while presenting a clean, sophisticated, and contemporary image to modern, health-conscious consumers.',
    solution:
      'We built a minimalist identity around an organic circular emblem that symbolizes growth and environmental harmony. Vibrant natural green and deep night-sky navy balance freshness with reliability, creating a versatile premium system for packaging, uniforms, stationery, and digital platforms.',
    deliverables: [
      'Brand identity',
      'Color strategy',
      'Corporate stationery',
      'Apparel design',
      'Social media assets',
    ],
    image: '/work/skanderbeg/01.webp',
    gallery: numberedImages('skanderbeg', 2, 11),
  },
  {
    slug: 'skonitech',
    title: 'Skonitech',
    client: 'Skonitech',
    year: '2026',
    industry: 'Technology and software',
    services: ['Visual identity', 'UI/UX strategy', 'Digital systems'],
    summary:
      'A high-growth technology firm specializing in bespoke software, cloud infrastructure, and innovative mobile applications.',
    challenge:
      'In a saturated technology market, Skonitech needed to move beyond a startup look and establish itself as a credible technology authority. The identity had to feel sophisticated and agile to appeal to investors and end users who value speed and security.',
    solution:
      'We engineered a digital-first system around glassmorphism, transparency, vibrant gradients, and deep shadows. Set against a dark minimalist environment, these elements emphasize clarity and innovation, while highly legible typography performs reliably across information-dense displays.',
    deliverables: [
      'Visual identity',
      'UI and UX strategy',
      'Digital design system',
      'Iconography',
      'Brand guidelines',
      'Social media system',
      'Logo update',
    ],
    image: '/work/skonitech/01.webp',
    gallery: numberedImages('skonitech', 2, 6),
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
    image: '/work/vp-consulting/01.webp',
    gallery: numberedImages('vp-consulting', 2, 10),
  },
];

export const worksSq: WorkItem[] = [
  {
    slug: 'creative-cult',
    title: 'Creativ Cult',
    client: 'Creativ Cult',
    year: '2026',
    industry: 'Agjenci kreative',
    services: ['Implementim marke', 'Sisteme vizuale', 'Dizajn digjital'],
    summary:
      'Një agjenci dinamike marketingu dhe kreative, e fokusuar te komunikimi i guximshëm dhe strategjitë jokonvencionale të markës.',
    challenge:
      'Agjencia kishte një logo bazë, por i mungonte një gjuhë vizuale e unifikuar që ta mbështeste. Sfida ishte ta kthenim shenjën ekzistuese në një ekosistem të plotë marke, duke përkthyer filozofinë Cult në një sistem vizual rigoroz, të shkallëzueshëm dhe me ndikim të lartë për mjedise korporative dhe digjitale.',
    solution:
      'Zhvilluam një sistem të plotë identiteti të bazuar në një rrjet të rreptë gjeometrik, duke nxjerrë motive grafike dhe struktura faqosjeje drejtpërdrejt nga këndet e logos. Hierarkia tipografike me kontrast të lartë dhe gjuha modulare e dizajnit e bëjnë çdo pikë kontakti të ndihet si vazhdim natyral i ADN-së së markës, duke balancuar energjinë kreative me autoritetin profesional.',
    deliverables: [
      'Dizajn faqeje web',
      'Broshurë trefishe',
      'Kartëvizita',
      'Modele për Instagram',
    ],
    image: '/work/creative-cult/01.webp',
    gallery: numberedImages('creative-cult', 2, 9),
  },
  {
    slug: 'jc-detailing',
    title: 'JC Detailing',
    client: 'JC Detailing',
    year: '2026',
    industry: 'Kujdes dhe detailing automobilistik',
    services: ['Identitet marke', 'Zhvillim full-stack', 'SEO lokale'],
    summary:
      'Një studio premium për kujdesin dhe detailing-un e automjeteve, e fokusuar te precizioni, mbrojtja elitare e sipërfaqeve dhe estetika e nivelit të lartë.',
    challenge:
      'Biznesit i nevojitej një infrastrukturë digjitale e plotë dhe koherente, e ndërtuar nga fillimi. Përtej një identiteti të fuqishëm, kërkohej një ekosistem me performancë të lartë që t’i kthente vizitorët në rezervime, të automatizonte planifikimin kompleks dhe të thjeshtonte operacionet e përditshme pa cenuar eksperiencën vizuale.',
    solution:
      'Projektuam një identitet të ndërtuar mbi precizionin dhe zhvilluam një faqe plotësisht responsive me panel administrimi të personalizuar. Kalendari automatik i rezervimeve dhe sistemi i menaxhimit i mundësojnë pronarit të ndjekë kostot, takimet dhe rezervimet në kohë reale, ndërsa SEO-ja lokale e pozicionon markën në kërkimet më të rëndësishme.',
    deliverables: [
      'Dizajn logoje dhe identitet marke',
      'Zhvillim full-stack i faqes web',
      'Panel administrimi dhe sistem rezervimesh',
      'Strategji dhe optimizim SEO lokal',
    ],
    image: '/work/jc-detailing/01.webp',
    gallery: numberedImages('jc-detailing', 2, 6),
  },
  {
    slug: 'nerguti',
    title: 'Nerguti',
    client: 'Nerguti Travel & Tours',
    year: '2026',
    industry: 'Udhëtime dhe turizëm',
    services: ['Identitet marke', 'Dizajn UI', 'Dizajn fushatash'],
    summary:
      'Një agjenci e plotë udhëtimesh që ofron paketa pushimesh të personalizuara, rezervime fluturimesh dhe menaxhim turesh globale.',
    challenge:
      'Markat e udhëtimit varen nga frymëzimi vizual dhe lehtësia e përdorimit. Nerguti kishte nevojë për një identitet energjik, të besueshëm dhe të organizuar, që të funksiononte në ndërfaqe komplekse rezervimi dhe materiale fizike marketingu pa humbur atmosferën dinamike të pushimeve.',
    solution:
      'Krijuam një identitet dinamik rreth një portokallie të ngrohtë që evokon emocion dhe zbulim. Logoja bashkon shkronjën N me simbole orientimi, ndërsa sistemi tipografik shumë i lexueshëm i mban itineraret dhe informacionet e fluturimeve të qarta dhe të lehta për t’u naviguar.',
    deliverables: [
      'Arkitekturë logoje',
      'Identitet marke',
      'Koncepte dizajni UI',
      'Materiale korporative',
      'Materiale promocionale',
    ],
    image: '/work/nerguti/01.webp',
    gallery: numberedImages('nerguti', 2, 12),
  },
  {
    slug: 'optimus-pharma',
    title: 'Optimus Pharma',
    client: 'Optimus Pharma',
    year: '2026',
    industry: 'Shpërndarje farmaceutike',
    services: ['Strategji marke', 'Ridizajnim identiteti', 'Paketim'],
    summary:
      'Një distributor farmaceutik lider në Tiranë, i specializuar në tregtinë me shumicë dhe logjistikën e produkteve mjekësore.',
    challenge:
      'Identiteti ekzistues ishte vjetruar dhe nuk komunikonte më rritjen apo evoluimin profesional të kompanisë. Objektivi ishte një ridizajnim i plotë i markës që të përcillte autoritet, besueshmëri dhe standarde moderne në çdo pikë kontakti, si në print ashtu edhe në digjital.',
    solution:
      'Zhvilluam një shenjë minimaliste që bashkon inicialin O me një ikonë të stilizuar kapsule, duke krijuar një simbol koherent dhe të dallueshëm të precizionit. Bluja e thellë dhe tonaliteti i freskët teal mbështesin identitetin, duke komunikuar besim, standard klinik dhe inovacion.',
    deliverables: [
      'Identitet dhe strategji marke',
      'Udhëzues i markës',
      'Materiale korporative',
      'Materiale promocionale',
      'Paketim',
      'Sistem dizajni për rrjetet sociale',
    ],
    image: '/work/optimus-pharma/01.webp',
    gallery: numberedImages('optimus-pharma', 2, 8),
  },
  {
    slug: 'skanderbeg',
    title: 'Skanderbeg',
    client: 'Skanderbeg Biofarm',
    year: '2026',
    industry: 'Bujqësi organike',
    services: ['Identitet marke', 'Paketim', 'Rrjete sociale'],
    summary:
      'Një prodhues premium organik që bashkon trashëgiminë tradicionale me bujqësinë e qëndrueshme dhe standardet moderne ekologjike.',
    challenge:
      'Tregu i ushqimeve organike shpesh dominohet nga identitete rustike dhe të vjetruara. Skanderbeg kishte nevojë për një markë që nderonte emrin prestigjioz, por njëkohësisht paraqiste një imazh të pastër, elegant dhe bashkëkohor për konsumatorët modernë të kujdesshëm ndaj shëndetit.',
    solution:
      'Ndërtuam një identitet minimalist rreth një embleme organike rrethore që simbolizon rritjen dhe harmoninë me mjedisin. E gjelbra natyrale dhe bluja e thellë e natës balancojnë freskinë me besueshmërinë, duke krijuar një sistem premium për paketim, uniforma, materiale korporative dhe platforma digjitale.',
    deliverables: [
      'Identitet marke',
      'Strategji ngjyrash',
      'Materiale korporative',
      'Dizajn veshjesh',
      'Materiale për rrjetet sociale',
    ],
    image: '/work/skanderbeg/01.webp',
    gallery: numberedImages('skanderbeg', 2, 11),
  },
  {
    slug: 'skonitech',
    title: 'Skonitech',
    client: 'Skonitech',
    year: '2026',
    industry: 'Teknologji dhe software',
    services: ['Identitet vizual', 'Strategji UI/UX', 'Sisteme digjitale'],
    summary:
      'Një kompani teknologjie me rritje të shpejtë, e specializuar në software të personalizuar, infrastrukturë cloud dhe aplikacione mobile inovative.',
    challenge:
      'Në një treg teknologjie të mbingarkuar, Skonitech duhej të dilte përtej pamjes së një startup-i dhe të pozicionohej si autoritet i besueshëm. Identiteti duhej të ndihej elegant dhe dinamik për investitorët dhe përdoruesit që vlerësojnë shpejtësinë dhe sigurinë.',
    solution:
      'Ndërtuam një sistem digital-first rreth glassmorphism-it, transparencës, gradientëve të gjallë dhe hijeve të thella. Në një mjedis të errët minimalist, këto elemente theksojnë qartësinë dhe inovacionin, ndërsa tipografia shumë e lexueshme funksionon mirë edhe në ekrane me densitet të lartë informacioni.',
    deliverables: [
      'Identitet vizual',
      'Strategji UI dhe UX',
      'Sistem dizajni digjital',
      'Ikonografi',
      'Udhëzues i markës',
      'Sistem për rrjetet sociale',
      'Përditësim logoje',
    ],
    image: '/work/skonitech/01.webp',
    gallery: numberedImages('skonitech', 2, 6),
  },
  {
    slug: 'vp-consulting',
    title: 'VP Consulting',
    client: 'VP Consulting',
    year: '2026',
    industry: 'Konsulencë biznesi',
    services: ['Dizajn logoje', 'Identitet marke', 'Dizajn korporativ'],
    summary:
      'Një firmë këshillimi strategjik që ofron zgjidhje biznesi, planifikim financiar dhe konsulencë menaxheriale për klientë korporativë.',
    challenge:
      'Identiteti i mëparshëm dukej i përgjithshëm dhe i mungonte karakteri ekzekutiv i nevojshëm për të ndërtuar besim me klientë me profil të lartë. Sfida ishte të krijonim një monogram që të ndihej i përjetshëm, autoritar dhe i qëndrueshëm, duke mbetur i përshtatshëm për një biznes me fokus digjital.',
    solution:
      'Projektuam një monogram elegant duke ndërthurur shkronjat V dhe P brenda një rrethi perfekt, si simbol i mbështetjes së plotë dhe konsulencës 360 gradë. Ndërtimi gjeometrik mbetet i qartë në çdo madhësi, ndërsa e verdha e gjallë mbi paletën e errët bashkon optimizmin strategjik me seriozitetin profesional.',
    deliverables: [
      'Identitet ekzekutiv i markës',
      'Dizajn monogrami',
      'Materiale korporative',
      'Udhëzues i stilit vizual',
    ],
    image: '/work/vp-consulting/01.webp',
    gallery: numberedImages('vp-consulting', 2, 10),
  },
];

const carouselAssignments = [
  ['vp-consulting', '01'],
  ['creative-cult', '02'],
  ['optimus-pharma', '03'],
  ['skanderbeg', '04'],
  ['nerguti', '05'],
  ['creative-cult', '06'],
  ['nerguti', '07'],
  ['nerguti', '08'],
  ['vp-consulting', '09'],
  ['skanderbeg', '10'],
  ['skanderbeg', '11'],
  ['jc-detailing', '12'],
  ['vp-consulting', '13'],
  ['creative-cult', '14'],
  ['optimus-pharma', '15'],
  ['nerguti', '16'],
  ['skanderbeg', '17'],
  ['creative-cult', '18'],
  ['skanderbeg', '19'],
  ['nerguti', '20'],
] as const;

export function getWorks(locale: Locale = 'en') {
  return locale === 'sq' ? worksSq : works;
}

export function getWorkBySlug(slug: string, locale: Locale = 'en') {
  return getWorks(locale).find((work) => work.slug === slug);
}

export function getCarouselItems(locale: Locale = 'en') {
  const localizedWorks = getWorks(locale);

  return carouselAssignments.flatMap(([slug, imageNumber]) => {
    const work = localizedWorks.find((item) => item.slug === slug);

    return work
      ? [{ ...work, image: `/work/carousel/${imageNumber}.webp` }]
      : [];
  });
}
