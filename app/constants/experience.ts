export type ExperienceProject = {
  name: string;
  highlights: string[];
  tech?: string[];
};

export type ExperienceItem = {
  company: string;
  location?: string;
  role: string;
  period: string;
  employmentType?: string;
  projects?: ExperienceProject[];
  highlights?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Etap Insure',
    role: 'Frontend Developer',
    period: '2025 – Present',
    employmentType: 'Full-time',
    highlights: [
      'Build and ship insurance product features in React and Chakra UI, from spec to production, for 1,000+ internal and customer users.',
      'Applied a headless vs. presentational component pattern, separating business logic from UI so components are reused across 13 modules in 3 Etap products.',
      'Used Mixpanel and Hotjar to identify drop-off points in the payment flow, informing design iterations that reduced payment abandonment by 12%.',
      'Integrated REST APIs across all 3 Etap products, handling loading, error and validation states end to end.',
      'Cut landing page Largest Contentful Paint by about 50% (2.5s to 1.2s) by restructuring the hero so text, not images, became the LCP element.',
      'Build responsive, accessible interfaces to design specs, working with designers, PMs and backend engineers.',
    ],
  },
  {
    company: 'Jilcon',
    role: 'Frontend Developer',
    period: '2025 – 2026',
    employmentType: 'Contract',
    highlights: [
      'Building a profession-focused productivity app in React, Redux and Ant Design.',
      'Set up consistent theming with Styled Components on top of Ant Design, keeping screens visually consistent.',
      'Structured the codebase around headless and presentational components for reuse across features.',
      'Owned the project management module end to end.',
    ],
  },
  {
    company: 'Fotolocker',
    role: 'Frontend Developer',
    period: '2025 – 2026',
    employmentType: 'Contract',
    highlights: [
      'Built the frontend for an all-in-one photography platform combining AI-assisted booking, shoot management and image proofing in Next.js over 6 months, working in an Agile team through shifting requirements across sprints.',
      'Delivered three role-based interfaces: a client view for discovering, booking and approving final images; a photographer workspace for managing shoots and proofing; and an admin panel for platform oversight.',
      'Adapted features and UI as requirements changed, without derailing delivery timelines.',
    ],
  },
  {
    company: 'Duduzili',
    role: 'Frontend Developer',
    period: '2024 – 2025',
    employmentType: 'Contract',
    highlights: [
      'Built media application features in React and Redux.',
      'Implemented UI with Mantine following the product design system.',
      'Improved responsiveness and load performance across existing web apps through debugging and optimisation.',
      'Maintained and upgraded legacy web apps and websites alongside designers and PMs.',
    ],
  },
  {
    company: 'AFEX Nigeria',
    location: 'Abuja',
    role: 'Frontend Developer',
    period: '2023 – 2024',
    employmentType: 'Full-time',
    highlights: [
      'Maintained and upgraded the internal ticketing system used by 5000+ staff.',
      'Ran A/B tests on key interfaces and shipped UX changes based on the results.',
      'Diagnosed and fixed performance bottlenecks across frontend apps, improving load times and responsiveness.',
      'Translated product briefs into responsive interfaces with developers, UX designers and business analysts.',
    ],
  },
];

export const skillCategories: { title: string; items: string[] }[] = [
  {
    title: 'Tools & technologies',
    items: [
      'Git & GitHub',
      'Figma',
      'Postman',
      'Vercel',
      'REST APIs',
      'Cursor',
      'ChatGPT',
      'AI-assisted workflows',
    ],
  },
  {
    title: 'Architecture & backend',
    items: [
      'Solution design',
      'System design',
      'API design',
      'Node.js',
      'NestJS',
      'Role-based access control',
      'Modular / headless architecture',
    ],
  },
  {
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Redux',
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
    ],
  },
  {
    title: 'Styling & UI',
    items: [
      'Tailwind CSS',
      'Chakra UI',
      'Mantine UI',
      'Ant Design',
      'Styled Components',
    ],
  },
  {
    title: 'Practice',
    items: [
      'Responsive design',
      'Accessibility (a11y)',
      'API integration',
      'State management',
      'Performance optimization',
      'Animation & microinteractions',
      'SOLID principles',
      'CI/CD',
      'Agile methodologies',
      'Unit & integration testing',
      'WebSockets',
      'Docker',
      'UX collaboration',
    ],
  },
  {
    title: 'Currently exploring',
    items: [
      'React Three Fiber',
      'Three.js',
      'Advanced UI animation',
      'AI-assisted frontend workflows',
    ],
  },
];
