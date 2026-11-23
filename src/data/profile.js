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
    'Kaviyarasan R is a full-stack software developer in Coimbatore, India. MERN stack, REST APIs, AI agents and production features at BrightUI Technologies — plus public work like Alumni Portal.',
  shareImageAlt:
    'Kaviyarasan R, Full Stack Developer. I build the systems behind businesses.',
  keywords: [
    'Kaviyarasan R',
    'Full Stack Developer',
    'Software Developer',
    'React',
    'Next.js',
    'Node.js',
    'Express',
    'MongoDB',
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
  currentProductKind: 'a cafe and restaurant management platform',
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
    'Full-stack developer focused on React, Node.js and modern APIs — delivering production features at BrightUI Technologies and public platforms such as Alumni Portal.',
  availability: {
    open: true,
    openLabel: 'Available for opportunities',
    closedLabel: 'Not looking right now',
  },
  timeZone: { id: 'Asia/Kolkata', label: 'IST' },
};

export const hero = {
  eyebrow: 'Kaviyarasan R · Full Stack Developer',
  headline: [
    { text: 'I build the', accent: false },
    { text: 'systems', accent: true },
    { text: 'behind businesses.', accent: false },
  ],
  rotating: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'PostgreSQL',
    'AI Agents',
  ],
  lede: 'Junior Software Developer at BrightUI Technologies. Production features on the MERN stack, plus Alumni Portal and public builds you can open on GitHub.',
  readouts: [
    { label: 'Based in', value: 'Coimbatore, Tamil Nadu' },
    { label: 'Currently', value: 'BrightUI Technologies' },
    { label: 'Live build', value: 'alumni-hub.onrender.com' },
    { label: 'Strongest at', value: 'MERN · AI agents · APIs' },
  ],
};

export const about = {
  lede: 'Full-stack software developer based in Coimbatore, building production web applications with the MERN stack, REST APIs and AI-assisted workflows.',
  paragraphs: [
    'I design and develop end-to-end web applications — React and Next.js on the frontend, Node.js and Express APIs on the backend, with MongoDB or PostgreSQL for data.',
    'At BrightUI Technologies I contribute to live products including BrewHub and Coylejax, owning features across the UI, API and data layers, along with payments, messaging and AI integrations.',
    'Alongside company work I have shipped public platforms such as Alumni Portal, delivered 10+ websites, and integrated AI agents into practical product workflows.',
  ],
  problems: [
    {
      code: 'API',
      title: 'Reliable full-stack delivery',
      body: 'Production-ready React and Next.js interfaces connected to secure REST APIs and well-structured data models.',
    },
    {
      code: 'AI',
      title: 'Practical AI integration',
      body: 'LLM-assisted messaging and conversational workflows that reduce manual work and fit cleanly into existing product flows.',
    },
    {
      code: 'PAY',
      title: 'Trusted third-party systems',
      body: 'Payments, SMS and external services integrated with clear ownership across frontend, backend and operations.',
    },
  ],
  counters: [
    { value: 1.5, decimals: 1, suffix: ' yrs', label: 'building full-stack web applications' },
    {
      value: 3,
      decimals: 0,
      suffix: '',
      label: 'major platforms in active focus',
    },
    { value: 10, decimals: 0, suffix: '+', label: 'websites designed and developed' },
  ],
  practice: [
    'End-to-end feature delivery',
    'AI agent integration',
    'Third-party API integration',
    'Problem solving',
    'Debugging & code review',
    'Agile (Scrum)',
  ],
};

export const navSections = [
  { id: 'overview', label: 'About', system: 'Overview' },
  { id: 'method', label: 'Method', system: 'Process' },
  { id: 'inventory', label: 'Skills', system: 'Inventory' },
  { id: 'pipeline', label: 'Experience', system: 'Pipeline' },
  { id: 'orders', label: 'Work', system: 'Orders' },
  { id: 'records', label: 'Education', system: 'Records' },
  { id: 'lead', label: 'Contact', system: 'New lead' },
];
