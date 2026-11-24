/**
 * Featured work, in display order.
 *
 * Client / office builds stay high-level (no screenshots, metrics, or internal
 * flows). Public builds can link to source and live demos.
 */
export const projects = [
  {
    slug: 'alumni-portal',
    orderNo: 'ORD-001',
    name: 'Alumni Portal',
    kind: 'College alumni network · Live',
    pitch:
      'A live MERN platform that connects alumni and students — profiles, career journeys, jobs, referrals and interview notes in one place.',
    status: { label: 'Live', tone: 'live' },
    role: 'Full-stack developer — React UI, Node.js / Express APIs, MongoDB, auth and deployment.',
    challenge:
      'College alumni and students had no shared home for careers, referrals and interview experience — everything lived in chats and scattered posts.',
    solution:
      'Built and shipped Alumni Portal end to end: role-based auth, profiles, directory, job and referral posts, interview notes and announcements, hosted as a public live app.',
    highlights: [
      'Live demo: alumni-hub.onrender.com',
      'Role-based alumni and student access',
      'Profiles and career journeys',
      'Jobs, internships and referrals',
      'Interview experience sharing',
      'Directory and announcements',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    outcome: 'In use by my college community — open live and on GitHub.',
    metrics: [],
    cover: '/projects/alumni-portal/cover-v2.jpg',
    links: [
      {
        label: 'Open live site',
        href: 'https://alumni-hub.onrender.com/',
        kind: 'live',
      },
      {
        label: 'Source on GitHub',
        href: 'https://github.com/kaviyarasan5556/Alumni_Hub',
        kind: 'github',
      },
    ],
    mockup: 'directory',
  },
  {
    slug: 'brewhub',
    orderNo: 'ORD-002',
    name: 'CafeSphere',
    kind: 'Multi-Location Cafe Management Platform · BrightUI Technologies',
    pitch:
      'Multi-location cafe management platform: POS, online ordering, kitchen display, AI SMS ordering, Stripe payments, loyalty, inventory and analytics.',
    status: { label: 'At BrightUI', tone: 'live' },
    role: 'Junior Software Developer — React, Next.js, Node.js, Express, PostgreSQL, Stripe, Twilio, Gemini.',
    challenge:
      'Cafe teams need one system for walk-in billing, online and mobile orders, kitchen tickets, customer messaging, payments, loyalty and the reports that prove the day — across multiple locations.',
    solution:
      'CafeSphere ties floor, kitchen and back office together — POS and ordering, real-time kitchen queues, AI-powered SMS-to-order, Stripe payments, multi-location roles, inventory, loyalty and sales analytics.',
    highlights: [
      'POS (Point of Sale) and online / mobile ordering systems',
      'Kitchen & order management with real-time queues and TV display',
      'AI-powered SMS-to-order — intelligent message processing and automated order creation',
      'AI integration — LLM intent recognition, message understanding and conversational workflows',
      'Automated SMS marketing and customer notifications',
      'Stripe payment integration and payment management',
      'Multi-location management and role-based access control',
      'Inventory & stock management',
      'Customer database and loyalty & rewards',
      'Staff shift & role management',
      'Events, scheduling and delivery tracking',
      'Real-time sales analytics and advanced business reporting',
      'Monthly revenue summaries, SMS usage & cost analytics, and report exports',
    ],
    stack: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Sequelize',
      'Stripe',
      'Twilio',
      'Google Gemini',
      'Tailwind CSS',
    ],
    outcome: 'Contributing continuously to CafeSphere, a multi-location cafe platform at BrightUI Technologies.',
    metrics: [],
    cover: '/projects/brewhub/cover-v2.jpg',
    links: [],
    mockup: 'dashboard',
  },
  {
    slug: 'coylejax',
    orderNo: 'ORD-003',
    name: 'BuildSphere',
    kind: 'Construction Project & Contract Management Platform · BrightUI Technologies',
    pitch:
      'Construction project and contract management platform — bidding, planning, material procurement, teams and SMS notifications in one system.',
    status: { label: 'At BrightUI', tone: 'neutral' },
    role: 'Full-stack developer across UI, APIs and data on a construction operations product.',
    challenge:
      'Construction teams need one place to manage projects, contracts, bids, materials and workflows, with notifications that still reach them off-dashboard.',
    solution:
      'Built and iterated on BuildSphere with secure REST APIs, TypeScript React screens, material procurement flows and SMS notification hooks as part of the full SDLC.',
    highlights: [
      'Construction project & contract management',
      'Contract bidding & bid management',
      'Project planning & workflow management',
      'React.js & TypeScript frontend development',
      'Secure Node.js & Express.js REST API development',
      'MongoDB database design & data modelling',
      'SMS notification integration',
      'Construction material ordering & procurement management',
      'Responsive user interface & application development',
      'Full software development life cycle (SDLC)',
    ],
    stack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Twilio SMS'],
    outcome: 'Shipped features on BuildSphere at BrightUI Technologies.',
    metrics: [],
    cover: '/projects/coylejax/cover-v2.jpg',
    links: [],
    mockup: 'board',
  },
  {
    slug: 'worxpay',
    orderNo: 'ORD-004',
    name: 'WorxPay',
    kind: 'Jobs for daily-wage workers',
    pitch: 'Connects daily-wage workers with nearby jobs using maps and real-time location.',
    status: { label: 'Source on GitHub', tone: 'shipped' },
    role: 'Developer.',
    challenge:
      'Workers in the unorganised labour sector have little visibility of which jobs are open near them.',
    solution:
      'A web app that shows job opportunities on an interactive map and uses real-time location to match workers with nearby openings.',
    highlights: [
      'Interactive maps of nearby job opportunities',
      'Real-time location tracking',
      'Built for the unorganised labour sector',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Maps', 'Geolocation'],
    outcome: 'Source published on GitHub.',
    metrics: [],
    cover: '/projects/worxpay/cover-v2.jpg',
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/kaviyarasan5556/WorxPay',
        kind: 'github',
      },
    ],
    mockup: 'map',
  },
  {
    slug: 'exploreticket',
    orderNo: 'ORD-005',
    name: 'ExploreTicket',
    kind: 'Museum ticketing system',
    pitch:
      'A museum ticketing system where a chatbot handles bookings, payments and multilingual support.',
    status: { label: 'Final year', tone: 'shipped' },
    role: 'Developer.',
    challenge:
      'Manual ticketing takes museum staff away from core services, and visitors need support in more than one language.',
    solution:
      'An automated ticketing flow with a chatbot for bookings, payments and multilingual answers so staff can focus on visitors.',
    highlights: [
      'Chatbot-driven ticket booking',
      'Integrated payments',
      'Multilingual support',
      'Automated ticketing for staff focus',
    ],
    stack: ['Chatbot', 'Payments', 'Multilingual support'],
    outcome: 'Delivered as my final-year build.',
    metrics: [],
    cover: '/projects/exploreticket/cover-v2.jpg',
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/Kathirvel-123/Final-Year-Project',
        kind: 'github',
      },
    ],
    mockup: 'chat',
  },
];

export const isPlaceholder = (value) => value.includes('{{');
