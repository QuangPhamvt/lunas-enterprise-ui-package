'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Excel File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function ExcelFileIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#138643" />
      <path
        d="M18.0879 19H16.288C16.168 19 16.0699 18.97 15.9939 18.91C15.9219 18.85 15.8639 18.78 15.82 18.7L13.9359 15.496C13.9159 15.54 13.8959 15.584 13.8759 15.628C13.8599 15.668 13.8399 15.706 13.8159 15.742L12.0279 18.7C11.9759 18.776 11.9139 18.846 11.8419 18.91C11.7739 18.97 11.6859 19 11.5779 19H9.89795L12.7479 14.518L10.0059 10.294H11.8059C11.9259 10.294 12.0139 10.31 12.0699 10.342C12.1259 10.374 12.1759 10.426 12.2199 10.498L14.0919 13.576C14.1119 13.528 14.1339 13.48 14.1579 13.432C14.1819 13.38 14.2099 13.328 14.2419 13.276L15.9219 10.528C15.9699 10.448 16.0219 10.39 16.0779 10.354C16.1379 10.314 16.2099 10.294 16.2939 10.294H18.016L15.2499 14.44L18.0879 19Z"
        fill="white"
      />
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
