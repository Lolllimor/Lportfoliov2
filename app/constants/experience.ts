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
    projects: [
      {
        name: 'Balloon — Insurance Backoffice & Landing Page',
        highlights: [
          'Owned major parts of the Balloon frontend, including the wallet, policy, and admin modules, plus the public marketing landing page, both shipped to production.',
          'Shipped a multi-step underwriter payout flow — select pending transactions, preview settlement, choose destination account, confirm with PIN — with conflict and rejected-transaction handling from the API.',
          'Implemented role-based access (platform admin, underwriter admin, view-only) and transaction PIN setup/update/reset with PIN-lock handling, so payouts require more than a password.',
          'Wired wallet data with TanStack Query and Axios, with shared error parsing for 4xx and conflict responses.',
        ],
        tech: [
          'Next.js',
          'React',
          'TypeScript',
          'TanStack Query',
          'Zustand',
          'Formik',
          'Yup',
          'Tailwind CSS',
          'Axios',
        ],
      },
      {
        name: 'ETAP Insure — Public Site & Ops Backoffice',
        highlights: [
          'Shipped the public site at etapinsure.com, including the car insurance quote flow, plan selection, pay-monthly, and claims pages.',
          'Implemented core modules of the internal ops backoffice — customers, policies, claims, vehicle-lookup leads, and admin users — including a leads workspace with table views and CSV export.',
          'Contributed to claims and policy flows: claim documents, settlement notes, policy edit/renewal, proof uploads, and enterprise policy selection.',
          'Shipped via GitHub and Vercel across staging and production, including PR reviews and hotfixes.',
        ],
        tech: [
          'Next.js',
          'React',
          'TypeScript',
          'Chakra UI',
          'Redux Toolkit / RTK Query',
          'Formik',
          'Yup',
          'TanStack Table',
        ],
      },
    ],
  },
  {
    company: 'Jilcon',
    role: 'Frontend Developer',
    period: '2025 – 2026',
    employmentType: 'Contract',
    highlights: [
      'Contributing to BuildEstimate, a construction takeoff and cost-estimation platform, built with React, Redux, and Ant Design.',
      'Contributing to ProPulse, a client-update tool giving clients real-time visibility into project status without installing software.',
      'Implementing a headless vs. presentational component architecture and shared theming with Styled Components and Ant Design across both apps.',
    ],
  },
  {
    company: 'Fotolocker',
    location: 'Photo Proofing & Delivery Platform',
    role: 'Frontend Developer',
    period: '2025 – 2026',
    highlights: [
      'Solo-owned the frontend for Fotolocker, a photo proofing and delivery platform for photographers, including client galleries, picture selection, and invoicing, as the only frontend developer on the product.',
    ],
  },
  {
    company: 'Duduzili',
    location: 'Social Media App',
    role: 'Frontend Developer',
    period: '2024 – 2025',
    highlights: [
      'Contributed to core social features: content feed with posts, likes, comments, and sharing.',
      'Implemented groups/communities, events, in-app messaging, and live streaming/media playback, using React, Redux, and Mantine UI.',
    ],
  },
  {
    company: 'AFEX Nigeria',
    role: 'Frontend Developer',
    period: '2023 – 2024',
    highlights: [
      'Contributed to an internal budget management system covering spend tracking against budgets, approvals, and reporting.',
      'Contributed to an internal ticketing system for issue tracking, including issue creation, status tracking, assignment, and in-app chat.',
      'Contributed to an internal HR system covering employee records, leave/attendance, onboarding, payroll views, org chart, and performance reviews.',
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
