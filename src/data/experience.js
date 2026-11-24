/** Stages are shown left to right in the pipeline, oldest first. */
export const stages = [
  {
    id: 'dotch',
    kind: 'past',
    stageLabel: 'Intern',
    role: 'Web Developer Intern',
    company: 'Dotch Endeavours',
    location: 'Delhi, India',
    period: 'July 2023 – March 2024',
    summary:
      'Designed the company website and worked alongside its marketing and development teams.',
    points: [
      'Designed the company website.',
      'Proposed and implemented UI and UX improvements.',
      'Created consistent icons and illustrations across sections.',
      'Collaborated with the marketing and development teams.',
    ],
    stack: ['Web design', 'UI/UX', 'Icons and illustration'],
  },
  {
    id: 'brightui',
    kind: 'current',
    stageLabel: 'Junior Developer',
    role: 'Junior Software Developer',
    company: 'BrightUI Technologies',
    location: 'Coimbatore, India',
    period: 'June 2025 – Present',
    summary:
      'End-to-end product work on CafeSphere and BuildSphere: cafe ops, construction project management, AI agents and payments.',
    points: [
      'Contributed to major products: CafeSphere and BuildSphere.',
      'On CafeSphere: POS, online ordering, kitchen display, AI SMS ordering, customer messaging, loyalty, promotions, gift cards and analytics.',
      'Integrated Stripe payment workflows so cafe charges stay in the same order pipeline.',
      'Integrated AI agents into product workflows to automate tasks and reduce manual operations.',
      'Designed, developed and maintained 10+ websites for different business needs.',
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
      'Docker',
    ],
  },
  {
    id: 'next',
    kind: 'next',
    stageLabel: 'Next',
    role: 'Open stage',
    company: 'Could be your team',
    location: '',
    period: 'To be scheduled',
    summary:
      'This stage is open. The work I want more of: cafe POS, AI-assisted workflows, payments and end-to-end product modules.',
    points: [],
    stack: [],
  },
];

export const education = [
  {
    id: 'be',
    title: 'B.E. Computer Science and Engineering',
    institution: 'KGiSL Institute of Technology',
    period: '2021 – 2025',
    result: 'CGPA 8.0',
  },
  {
    id: 'hsc',
    title: 'Higher Secondary Certificate (HSC)',
    institution: 'Bharath Hi-Tech Matriculation Higher Secondary School',
    period: '2021',
    result: '85%',
  },
  {
    id: 'sslc',
    title: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Himalayan Matriculation Higher Secondary School',
    period: '2019',
    result: '70%',
  },
];
