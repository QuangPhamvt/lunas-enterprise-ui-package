'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Zip File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function ZipFileIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#40A313" />
      <path d="M7 2C7 1.44772 7.44772 1 8 1H9C9.55228 1 10 1.44772 10 2C10 2.55228 9.55228 3 9 3H8C7.44772 3 7 2.55228 7 2Z" fill="white" />
      <path d="M7 6C7 5.44772 7.44772 5 8 5H9C9.55228 5 10 5.44772 10 6C10 6.55228 9.55228 7 9 7H8C7.44772 7 7 6.55228 7 6Z" fill="white" />
      <path d="M8 9C7.44772 9 7 9.44771 7 10C7 10.5523 7.44772 11 8 11H9C9.55228 11 10 10.5523 10 10C10 9.44771 9.55228 9 9 9H8Z" fill="white" />
      <path d="M7 14C7 13.4477 7.44772 13 8 13H9C9.55228 13 10 13.4477 10 14C10 14.5523 9.55228 15 9 15H8C7.44772 15 7 14.5523 7 14Z" fill="white" />
      <path d="M10 3C9.44772 3 9 3.44772 9 4C9 4.55228 9.44772 5 10 5H11C11.5523 5 12 4.55228 12 4C12 3.44772 11.5523 3 11 3H10Z" fill="white" />
      <path d="M9 8C9 7.44772 9.44772 7 10 7H11C11.5523 7 12 7.44772 12 8C12 8.55228 11.5523 9 11 9H10C9.44772 9 9 8.55228 9 8Z" fill="white" />
      <path d="M10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13H11C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11H10Z" fill="white" />
      <path d="M9 16C9 15.4477 9.44772 15 10 15H11C11.5523 15 12 15.4477 12 16C12 16.5523 11.5523 17 11 17H10C9.44772 17 9 16.5523 9 16Z" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.63589 19.4552C7.84969 18.6 8.61813 18 9.49969 18C10.3812 18 11.1497 18.6 11.3635 19.4552L12.1508 22.6045C12.582 24.3292 11.2775 26 9.49969 26C7.72186 26 6.41738 24.3292 6.84856 22.6045L7.63589 19.4552ZM7.99969 23.5C7.99969 22.6716 8.67126 22 9.49969 22C10.3281 22 10.9997 22.6716 10.9997 23.5C10.9997 24.3284 10.3281 25 9.49969 25C8.67126 25 7.99969 24.3284 7.99969 23.5Z"
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
