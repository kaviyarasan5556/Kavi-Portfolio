/**
 * Everything personal lives here. Edit this file to change contact details,
 * the hero copy, the About section, or the availability badge.
 *
 * Keep this file plain data (no browser APIs, no imports): the build config
 * and the contact API read it too.
 */

/** Page title and description for search engines and link previews (filled into index.html). */
export const seo = {
  title: 'Kaviyarasan R | Full Stack Software Developer',
  description:
    'Kaviyarasan R is a full-stack software developer in Coimbatore, India. He builds ordering, CRM and cafe platforms with React, Next.js, Node.js and Express, including AI-assisted SMS workflows, payments and multi-location operations.',
  shareImageAlt:
    'Kaviyarasan R, Software Developer (Full Stack). I build the systems behind businesses.',
  keywords: [
    'Kaviyarasan R',
    'Full Stack Developer',
    'Software Developer',
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'BrewHub',
    'Coimbatore',
  ],
};

export const profile = {
  name: 'Kaviyarasan R',
  initials: 'KR',
  role: 'Software Developer (Full Stack)',
  currentTitle: 'Junior Software Developer',
  currentCompany: 'BrightUI Technologies',
  currentSince: 'June 2025',
  currentProduct: 'BrewHub',
  currentProductKind: 'Cafe & restaurant management platform',
  location: {
    city: 'Coimbatore',
    region: 'Tamil Nadu',
    country: 'India',
    full: 'Coimbatore, Tamil Nadu, India',
  },
  email: 'kavinkavin42255@gmail.com',
  phone: { display: '+91 9345417647', href: 'tel:+919345417647' },
  links: {
    github: { label: 'github.com/kaviyarasan5556', href: 'https://github.com/kaviyarasan5556' },
    linkedin: {
      label: 'linkedin.com/in/kaviyarasan16',
      href: 'https://www.linkedin.com/in/kaviyarasan16/',
    },
  },
  resume: {
    href: '/kaviyarasan-fullstack-developer.pdf',
    downloadName: 'Kaviyarasan-R-FullStack-Developer.pdf',
  },
  photo: {
    src: '/Professional Passport Portrait.png',
    alt: 'Kaviyarasan R, professional passport portrait',
  },
  summary:
    'Software developer with end-to-end product work across BrewHub, Coylejax and Alumni Portal: restaurant POS, AI SMS ordering, payments, loyalty and analytics, plus 10+ websites shipped.',
  /** Shown in the status widget. Set open to false to show the "closed" label instead. */
  availability: {
    open: true,
    openLabel: 'Available for opportunities',
    closedLabel: 'Not looking right now',
  },
  timeZone: { id: 'Asia/Kolkata', label: 'IST' },
};

export const hero = {
  eyebrow: 'Kaviyarasan R · Software Developer (Full Stack)',
  /** The headline is split into parts so one word can carry the accent colour. */
  headline: [
    { text: 'I build the', accent: false },
    { text: 'systems', accent: true },
    { text: 'behind businesses.', accent: false },
  ],
  rotating: ['Restaurant POS', 'Kitchen display', 'SMS-to-order', 'Sales reports'],
  lede: 'Software developer shipping end-to-end product modules: BrewHub, Coylejax and Alumni Portal, plus AI agents and restaurant payment workflows.',
  readouts: [
    { label: 'Based in', value: 'Coimbatore, Tamil Nadu' },
    { label: 'Currently', value: 'BrewHub at BrightUI Technologies' },
    { label: 'Products', value: 'BrewHub · Coylejax · Alumni Portal' },
    { label: 'Strongest at', value: 'POS · AI agents · Payments' },
  ],
};

export const about = {
  /** Section header under Overview. */
  lede: 'Software developer in Coimbatore. End-to-end product work across BrewHub, Coylejax and Alumni Portal, with AI agents and restaurant payments in the mix.',
  paragraphs: [
    'I work end to end on business-critical product modules: restaurant POS and online ordering, kitchen display, customer messaging, loyalty, promotions and the reports that keep operations honest.',
    'At BrightUI Technologies most of that time goes into BrewHub, with parallel work on Coylejax and Alumni Portal. On BrewHub that includes AI-powered SMS ordering, Stripe payments, gift cards and promotions, plus the customer-facing platform around them.',
    'Alongside product work I have designed, built and maintained 10+ websites, and wired AI agents into workflows where they remove real operational load.',
  ],
  problems: [
    {
      code: 'POS',
      title: 'Billing that keeps the floor moving',
      body: 'Restaurant POS and online ordering so walk-in and remote tickets land in the same order pipeline.',
    },
    {
      code: 'SMS',
      title: 'Orders that start as a text',
      body: 'AI-powered SMS ordering: the message is understood, the order is created, and nobody retypes it into a POS.',
    },
    {
      code: 'PAY',
      title: 'Payments that stay with the ticket',
      body: 'Stripe payment workflows so takeaway and delivery charges sit inside the same restaurant order pipeline.',
    },
  ],
  /** Only counts that follow directly from facts you provided. No invented metrics. */
  counters: [
    { value: 1.5, decimals: 1, suffix: ' yrs', label: 'building full-stack web apps' },
    {
      value: 3,
      decimals: 0,
      suffix: '',
      label: 'major products: BrewHub, Coylejax, Alumni Portal',
    },
    { value: 10, decimals: 0, suffix: '+', label: 'websites designed and developed' },
  ],
  practice: [
    'End-to-end features',
    'AI agent integration',
    'Third-party APIs',
    'Problem solving',
    'Debugging',
    'Agile (Scrum)',
  ],
};

export const navSections = [
  { id: 'overview', label: 'About', system: 'Overview' },
  { id: 'inventory', label: 'Skills', system: 'Inventory' },
  { id: 'pipeline', label: 'Experience', system: 'Pipeline' },
  { id: 'orders', label: 'Projects', system: 'Orders' },
  { id: 'records', label: 'Education', system: 'Records' },
  { id: 'lead', label: 'Contact', system: 'New lead' },
];
