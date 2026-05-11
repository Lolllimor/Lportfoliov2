export type ExperienceItem = {
  company: string;
  location?: string;
  role: string;
  period: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Etap Insure',
    location: 'Victoria Island, Lagos',
    role: 'Frontend Developer',
    period: 'Jun 2025 – Present',
    highlights: [
      'Building scalable web applications with React and Chakra UI using clean, maintainable patterns.',
      'Developing responsive, accessible interfaces aligned with design systems and product requirements.',
      'Optimizing frontend performance through systematic debugging and troubleshooting.',
      'Collaborating with engineers, designers, PMs, and stakeholders to ship cohesive digital products.',
      'Applying headless and presentational component architecture for scalability and maintainability.',
    ],
  },
  {
    company: 'Jilcon',
    role: 'Frontend Developer',
    period: 'Aug 2025 – Mar 2026',
    highlights: [
      'Building a productivity platform with React, Redux, Ant Design, and Styled Components.',
      'Implementing reusable frontend architecture with headless and presentational component patterns.',
      'Delivering responsive UI with consistent theming across web and mobile surfaces.',
      'Collaborating with cross-functional teams on end-to-end product delivery.',
      'Keeping codebases modular, documented, and easy to extend.',
    ],
  },
  {
    company: 'Fotolocker',
    role: 'Frontend Developer',
    period: 'Aug 2025 – Jan 2026',
    highlights: [
      'Built responsive interfaces for a photo-sharing and digital marketplace (upload, organize, share, and sell) using React and Next.js.',
      'Implemented image upload and optimization flows with Cloudinary.',
      'Integrated Stripe for secure payments and photo purchases.',
      'Developed reusable UI with Mantine UI and Tailwind CSS.',
      'Tuned responsiveness and frontend performance across the product.',
    ],
  },
  {
    company: 'Duduzili',
    role: 'Frontend Developer',
    period: 'Sep 2024 – Feb 2025',
    highlights: [
      'Developed React-based media experiences using Redux and Mantine UI.',
      'Built responsive, maintainable interfaces grounded in modern frontend architecture.',
      'Improved UX through performance work, debugging, and responsive UI iteration.',
      'Partnered with designers, PMs, and clients to ship web and mobile experiences.',
      'Maintained and upgraded legacy apps and internal tooling.',
    ],
  },
  {
    company: 'AFEX Nigeria',
    location: 'Abuja, FCT',
    role: 'Frontend Developer',
    period: 'Oct 2023 – Jul 2024',
    highlights: [
      'Ran interface analysis and A/B tests to lift usability and conversion.',
      'Maintained and upgraded ticketing systems for reliability and speed.',
      'Improved load times, responsiveness, and overall frontend efficiency.',
      'Built responsive interfaces against established design systems and IA.',
      'Partnered with UX, engineering, analysts, and stakeholders across web and mobile.',
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
