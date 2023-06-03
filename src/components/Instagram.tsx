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
        className="absolute bottom-6 left-6 z-10 h-9 w-9 fill-current mix-blend-difference hover:invert hover:filter"
      >
        <rect x="0.5" y="0.5" width="35" height="35" stroke="white" />
        <circle cx="18" cy="18" r="9" stroke="white" strokeWidth="2" />
        <circle cx="30" cy="6" r="2" fill="white" />
      </svg>
    </a>
  );
};
