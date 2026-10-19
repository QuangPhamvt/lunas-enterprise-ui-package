'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Generic File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GenericFileIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#DA770B" />
      <path d="M8 5C7.44772 5 7 5.44772 7 6V10C7 10.5523 7.44772 11 8 11H14C14.5523 11 15 10.5523 15 10V6C15 5.44772 14.5523 5 14 5H8Z" fill="white" />
      <path d="M8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15H20C20.5523 15 21 14.5523 21 14C21 13.4477 20.5523 13 20 13H8Z" fill="white" />
      <path d="M7 18C7 17.4477 7.44772 17 8 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H8C7.44772 19 7 18.5523 7 18Z" fill="white" />
      <path d="M8 21C7.44772 21 7 21.4477 7 22C7 22.5523 7.44772 23 8 23H20C20.5523 23 21 22.5523 21 22C21 21.4477 20.5523 21 20 21H8Z" fill="white" />
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
