import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-8 h-8' }) => {
  switch (name) {
    case 'React':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'JavaScript':
      return <img src="/javascript.png" alt="JavaScript" className={`${className} object-contain`} draggable={false} />;

    case 'Tailwind':
      return <img src="/tailwind.png" alt="Tailwind CSS" className={`${className} object-contain`} draggable={false} />;

    case 'HTML':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z" />
          <path fill="#EF652A" d="M256 472l149-41 35-391H256v432z" />
          <path fill="#EBEBEB" d="M256 208h-63l-4-49h67V109H130l13 148h113v-49zm0 150l-63-17-4-45h-50l8 91 109 30v-59z" />
          <path fill="#FFFFFF" d="M256 208v49h61l-6 66-55 15v50l101-28 14-152H256zm0-99v50h125l4-50H256z" />
        </svg>
      );

    case 'CSS':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z" />
          <path fill="#33A9DC" d="M256 472l149-41 35-391H256v432z" />
          <path fill="#EBEBEB" d="M256 208h-63l-4-49h67V109H130l13 148h113v-49zm0 150l-63-17-4-45h-50l8 91 109 30v-59z" />
          <path fill="#FFFFFF" d="M256 208v49h61l-6 66-55 15v50l101-28 14-152H256zm0-99v50h125l4-50H256z" />
        </svg>
      );

    case 'Redux':
      return <img src="/redux.png" alt="Redux" className={`${className} object-contain`} draggable={false} />;

    case 'React Hook Form':
      return <img src="/react-hook-form.png" alt="React Hook Form" className={`${className} object-contain`} draggable={false} />;

    case 'Zod':
      return <img src="/zod.png" alt="Zod" className={`${className} object-contain`} draggable={false} />;

    case 'Figma':
      return (
        <svg viewBox="0 0 38 57" className={className} fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      );

    case 'PostgreSQL':
      return <img src="/postgresql.png" alt="PostgreSQL" className={`${className} object-contain`} draggable={false} />;

    case 'Java':
      return <img src="/java.png" alt="Java" className={`${className} object-contain`} draggable={false} />;

    case 'VCS':
      return <img src="/vcs.png" alt="Git" className={`${className} object-contain`} draggable={false} />;

    case 'GitHub':
      return (
        <svg viewBox="0 0 98 96" className={className} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.215-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
        </svg>
      );

    case 'Vercel':
      return (
        <svg viewBox="0 0 116 100" className={className} fill="currentColor">
          <path d="M57.5 0L115 100H0L57.5 0z" />
        </svg>
      );

    default:
      return (
        <div className="w-8 h-8 rounded-full bg-text-secondary/20 flex items-center justify-center font-bold text-xs">
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};