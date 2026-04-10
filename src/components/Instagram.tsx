'use client';

import { FC } from 'react';

export const Instagram: FC = () => {
  return (
    <a
      href="https://www.instagram.com/pavillonnaire.zone/"
      rel="noreferrer"
      target="_blank"
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-6 left-6 z-10 h-7 w-7 fill-current mix-blend-difference hover:invert hover:filter"
      >
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="2" />
        <circle cx="29" cy="8" r="2" fill="white" />
      </svg>
    </a>
  );
};
