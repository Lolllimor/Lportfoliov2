import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const socialLinks = [
  {
    Icon: FaGithub,
    link: 'https://github.com/Lolllimor',
  },
  {
    Icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/rodiat-m-537093198/',
  },
  {
    Icon: Mail,
    link: 'mailto:rodiat.morin@gmail.com',
  },
];

export const socialLabel = (link: string) =>
  link.includes('github')
    ? 'GitHub'
    : link.includes('linkedin')
      ? 'LinkedIn'
      : 'Email';
