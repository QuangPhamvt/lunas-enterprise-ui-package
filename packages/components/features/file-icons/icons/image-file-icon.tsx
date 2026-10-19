'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Image File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function ImageFileIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#13A4C2" />
      <path d="M10 9.5C10 10.8807 8.88071 12 7.5 12C6.11929 12 5 10.8807 5 9.5C5 8.11929 6.11929 7 7.5 7C8.88071 7 10 8.11929 10 9.5Z" fill="white" />
      <path
        d="M15.2928 11.7071L11.707 15.2929L15 18.5858C15.7028 19.2886 15.7359 20.2698 15.3184 21H23.5857C24.4766 21 24.9228 19.9229 24.2928 19.2929L16.707 11.7071C16.3165 11.3166 15.6833 11.3166 15.2928 11.7071Z"
        fill="white"
      />
      <path
        d="M4.41411 21C3.52321 21 3.07704 19.9229 3.70701 19.2929L8.29279 14.7071C8.68332 14.3166 9.31648 14.3166 9.70701 14.7071L14.2928 19.2929C14.9225 19.9225 14.4771 20.9988 13.5872 21L13.5857 21H4.41411Z"
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
