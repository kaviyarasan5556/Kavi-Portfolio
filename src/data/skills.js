/**
 * Proficiency tiers, not percentages or years.
 *   core        = what you reach for first and know deeply
 *   daily       = used every working day
 *   comfortable = shipped with it, can pick it back up quickly
 *
 * NOTE: the tier on each skill below is a first draft based on your project
 * stacks. Change any of them to match how you would describe yourself.
 */
export const tiers = {
  core: { label: 'Core', level: 3, description: 'What I reach for first' },
  daily: { label: 'Daily', level: 2, description: 'In use every working day' },
  comfortable: {
    label: 'Comfortable',
    level: 1,
    description: 'Shipped with it, quick to pick back up',
  },
};

export const skillGroups = [
  {
    id: 'product',
    code: 'PD',
    title: 'Product domains',
    note: 'Restaurant and customer modules shipped end to end',
    skills: [
      { name: 'POS systems', tier: 'core' },
      { name: 'Online ordering', tier: 'core' },
      { name: 'Kitchen management', tier: 'daily' },
      { name: 'Customer platforms', tier: 'daily' },
      { name: 'Loyalty & rewards', tier: 'daily' },
      { name: 'Promotions & gift cards', tier: 'daily' },
      { name: 'Reporting & analytics', tier: 'core' },
    ],
  },
  {
    id: 'frontend',
    code: 'FE',
    title: 'Frontend',
    note: 'Interfaces and the components behind them',
    skills: [
      { name: 'React.js', tier: 'core' },
      { name: 'Next.js', tier: 'core' },
      { name: 'JavaScript (ES6+)', tier: 'core' },
      { name: 'TypeScript', tier: 'daily' },
      { name: 'Tailwind CSS', tier: 'core' },
    ],
  },
  {
    id: 'backend',
    code: 'BE',
    title: 'Backend',
    note: 'APIs and the services they talk to',
    skills: [
      { name: 'Node.js', tier: 'core' },
      { name: 'Express.js', tier: 'core' },
      { name: 'REST APIs', tier: 'core' },
      { name: 'Full-stack feature delivery', tier: 'core' },
    ],
  },
  {
    id: 'databases',
    code: 'DB',
    title: 'Databases',
    note: 'Schema design and query tuning',
    skills: [
      { name: 'MongoDB', tier: 'core' },
      { name: 'PostgreSQL', tier: 'daily' },
      { name: 'Sequelize', tier: 'daily' },
      { name: 'MySQL', tier: 'daily' },
    ],
  },
  {
    id: 'ai',
    code: 'AI',
    title: 'AI integration',
    note: 'Agents and LLM workflows in live products',
    skills: [
      { name: 'AI agent integration', tier: 'daily' },
      { name: 'AI-powered automation', tier: 'daily' },
      { name: 'SMS-based AI ordering', tier: 'daily' },
      { name: 'LLM integration', tier: 'daily' },
      { name: 'Google Gemini API', tier: 'daily' },
    ],
  },
  {
    id: 'payments',
    code: 'PY',
    title: 'Payments',
    note: 'In-person and online payment workflows',
    skills: [
      { name: 'Stripe', tier: 'daily' },
      { name: 'Payment workflows', tier: 'daily' },
    ],
  },
  {
    id: 'tools',
    code: 'TL',
    title: 'Tools & practices',
    note: 'From debugging a feature to shipping it',
    skills: [
      { name: 'Git', tier: 'core' },
      { name: 'GitHub', tier: 'core' },
      { name: 'Docker', tier: 'daily' },
      { name: 'Postman', tier: 'daily' },
      { name: 'Third-party API integration', tier: 'core' },
      { name: 'Debugging', tier: 'core' },
      { name: 'Agile (Scrum)', tier: 'daily' },
    ],
  },
];
