import { HiOutlineExternalLink } from 'react-icons/hi';
import { FiGithub } from 'react-icons/fi';

function ProjectLink({
  sourceCode,
  live,
}: {
  sourceCode?: string;
  live?: string;
}) {
  return (
    <div className="flex justify-start w-full gap-[1.5rem] items-center flex-wrap">
      {sourceCode && (
        <a
          href={sourceCode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-light hover:text-green-bright transition-colors"
          aria-label="GitHub"
        >
          <FiGithub size={24} />
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-light hover:text-green-bright transition-colors"
          aria-label="External Link"
        >
          <HiOutlineExternalLink size={24} />
        </a>
      )}
    </div>
  );
}

export default ProjectLink;
