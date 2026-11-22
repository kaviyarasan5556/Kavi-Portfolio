/**
 * Featured projects, in display order.
 *
 * To add a real screenshot: drop the image into /public/projects/<slug>/ and set
 * `cover: '/projects/<slug>/cover.webp'` on that project.
 *
 * `metrics` entries that still contain "{{...}}" are placeholders for numbers
 * only you know. They show as to-do chips while developing and are hidden in
 * production, so nothing unfinished reaches visitors.
 */
export const projects = [
  {
    slug: 'brewhub',
    orderNo: 'ORD-001',
    name: 'BrewHub',
    kind: 'Cafe & restaurant management platform',
    pitch:
      'End-to-end restaurant ops: POS, online ordering, kitchen display, AI SMS ordering, Stripe payments, loyalty, promotions and analytics.',
    status: { label: 'Client build', tone: 'neutral' },
    role: 'Full-stack developer across BrewHub modules: React and Next.js, Node.js and Express, PostgreSQL, payments and AI messaging.',
    challenge:
      'A restaurant needs one system for walk-in billing, online orders, kitchen tickets, customer messaging, loyalty, promotions and the reports that prove the day. Orders also arrive as SMS, and payments have to stay inside the same order workflow.',
    solution:
      'BrewHub ties the floor, kitchen and back office together. Gemini-powered SMS workflows create orders from texts. Kitchen display keeps tickets moving. Stripe covers payment. Loyalty, gift cards, promotions and reporting sit in the same product.',
    highlights: [
      'Point of Sale for restaurant billing and order processing',
      'Online ordering workflows and order management',
      'Kitchen display and kitchen-facing order management',
      'AI-powered SMS ordering with automated order processing',
      'Customer messaging, customer platform, loyalty and rewards',
      'Promotions, gift cards, reports and analytics',
      'Stripe payment integration',
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
    outcome:
      'Ordering, kitchen, payments, messaging, loyalty and reporting in one platform a restaurant team can run all day.',
    metrics: [
      '{{ADD_REAL_METRIC: locations or outlets served}}',
      '{{ADD_REAL_METRIC: SMS orders processed per month}}',
      '{{ADD_REAL_METRIC: report load time before and after optimisation}}',
    ],
    links: [],
    mockup: 'dashboard',
  },
  {
    slug: 'coylejax',
    orderNo: 'ORD-002',
    name: 'Coylejax',
    kind: 'Project Management CRM',
    pitch:
      'Projects, clients, teams and tasks in one dashboard, with SMS reminders that reach people away from it.',
    status: { label: 'Client build', tone: 'neutral' },
    role: 'Full-stack developer across the full SDLC: React and TypeScript front end, Node.js and Express APIs, MongoDB.',
    challenge:
      'Give a team one place to see every project, client, person and task, and make sure deadlines and updates still reach them when they are not looking at the dashboard.',
    solution:
      'A single dashboard built on secure REST APIs, with Twilio SMS wired in for notifications and reminders.',
    highlights: [
      'Projects, clients, teams and tasks managed in one dashboard',
      'Secure REST APIs',
      'Twilio SMS for notifications and reminders',
      'Involved through the full software development life cycle',
    ],
    stack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Twilio SMS'],
    outcome: 'One dashboard for the work, and reminders that arrive by SMS.',
    metrics: [
      '{{ADD_REAL_METRIC: teams or users on the platform}}',
      '{{ADD_REAL_METRIC: SMS reminders sent per month}}',
    ],
    links: [],
    mockup: 'board',
  },
  {
    slug: 'alumni-portal',
    orderNo: 'ORD-003',
    name: 'Alumni Portal',
    kind: 'College Alumni Network Platform',
    pitch:
      'The alumni network my college uses: profiles, career journeys, referrals and interview experiences.',
    status: { label: 'In use by college', tone: 'live' },
    role: 'Full-stack developer: React front end, Node.js and Express APIs, MongoDB.',
    challenge:
      'Alumni and students of the college had no central place to communicate, collaborate and get career support.',
    solution:
      'A role-based platform where alumni keep profiles and career journeys, post jobs, internships and referrals, and share interview experiences, alongside a directory and announcements.',
    highlights: [
      'Alumni profiles and career journeys',
      'Role-based authentication',
      'Job, internship and referral posts',
      'Interview experiences',
      'Directory and announcements',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    outcome: 'Currently used by my college.',
    metrics: [
      '{{ADD_REAL_METRIC: registered alumni and students}}',
      '{{ADD_REAL_METRIC: jobs or referrals posted}}',
    ],
    links: [
      {
        label: 'Source on GitHub',
        href: 'https://github.com/kaviyarasan5556/Alumni_Hub',
        kind: 'github',
      },
    ],
    mockup: 'directory',
  },
  {
    slug: 'worxpay',
    orderNo: 'ORD-004',
    name: 'WorxPay',
    kind: 'Jobs for Daily-Wage Workers',
    pitch: 'Connects daily-wage workers with nearby jobs using maps and real-time location.',
    status: { label: 'Source on GitHub', tone: 'shipped' },
    role: 'Developer.',
    challenge:
      'Workers in the unorganised labour sector have little visibility of which jobs are open near them.',
    solution:
      'A web app that shows job opportunities on an interactive map and uses real-time location to match workers with the ones nearby.',
    highlights: [
      'Interactive maps of nearby job opportunities',
      'Real-time location tracking',
      'Built for the unorganised labour sector',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Maps', 'Geolocation'],
    outcome: 'Source published on GitHub.',
    metrics: [],
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
    kind: 'Museum Ticketing System',
    pitch:
      'A museum ticketing system where a chatbot handles bookings, payments and multilingual support.',
    status: { label: 'Final-year project', tone: 'shipped' },
    role: 'Developer (final-year project).',
    challenge:
      'Manual ticketing takes museum staff away from core services, and visitors need support in more than one language.',
    solution:
      'An automated ticketing system with a chatbot that takes bookings and payments and answers in multiple languages, so staff can focus on core services.',
    highlights: [
      'Chatbot-driven ticket booking',
      'Integrated payments',
      'Multilingual support',
      'Automated ticketing so staff can focus on visitors',
    ],
    // The brief did not list a stack for this project. Replace with the real one.
    stack: ['Chatbot', 'Payments', 'Multilingual support'],
    outcome: 'Delivered as my final-year project.',
    metrics: [],
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
