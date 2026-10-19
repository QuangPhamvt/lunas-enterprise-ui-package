'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Ebl2 file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function Ebl2Icon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#13A4C2" />
      <path d="M6 19L9 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 19L19 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9L14 15L22 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="5" y="8" width="18" height="12" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 9H27L20.9011 11.033C19.5328 11.4891 18.1463 10.3909 18.2769 8.95452L19 1V7C19 8.10457 19.8954 9 21 9Z" fill="black" fillOpacity="0.2" />
      <path d="M27 9L19 1V7C19 8.10457 19.8954 9 21 9H27Z" fill={`url(#${uid})`} />
      <defs>
        <linearGradient id={uid} x1="19" y1="9" x2="23" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
