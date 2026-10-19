'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Audio File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function AudioFileIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#6B4FC2" />
      <path d="M7 12H8V16H7V12Z" fill="white" />
      <path d="M9 10H10V18H9V10Z" fill="white" />
      <path d="M11 11H12V17H11V11Z" fill="white" />
      <path d="M15 11H16V17H15V11Z" fill="white" />
      <path d="M17 12H18V16H17V12Z" fill="white" />
      <path d="M19 12H20V16H19V12Z" fill="white" />
      <path d="M21 15H22V13H21V15Z" fill="white" />
      <path d="M13 8H14V20H13V8Z" fill="white" />
      <path d="M6 4H10V5H6C5.44772 5 5 5.44772 5 6V10H4V6C4 4.89543 4.89543 4 6 4Z" fill="white" />
      <path d="M4 18H5V22C5 22.5523 5.44772 23 6 23H10V24H6C4.89543 24 4 23.1046 4 22V18Z" fill="white" />
      <path d="M18 24H22C23.1046 24 24 23.1046 24 22V18H23V22C23 22.5523 22.5523 23 22 23H18V24Z" fill="white" />
      <path d="M23 10H24V9H23V10Z" fill="white" />
      <path d="M19 5H18V4H19V5Z" fill="white" />
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
