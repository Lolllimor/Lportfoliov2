export const navItems = [
  {
    name: 'Home',
    link: '#home',
    subtitle: 'Start here',
  },
  {
    name: 'Projects',
    link: '#projects',
    subtitle: "Things I've built",
  },
  {
    name: 'About',
    link: '#about',
    subtitle: 'Get to know me',
  },
  {
    name: 'Experience',
    link: '#experience',
    subtitle: 'My quest log',
  },
  {
    name: 'Contact',
    link: '#contact',
    subtitle: "Let's connect",
  },
];

export const sectionIds = navItems.map((item) => item.link.slice(1));
