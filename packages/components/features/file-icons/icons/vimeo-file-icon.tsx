'use client';

import type { FileIconProps } from '../types';

/** Vimeo File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function VimeoFileIcon({ size = 28, ...props }: FileIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="14" cy="14" r="14" fill="#63D2FA" />
      <path
        d="M6.6875 11.5625C7.90299 10.5923 9.63121 8.46196 10.9791 8.46196C12.3255 8.46196 12.6561 10.052 12.8398 11.4942C13.0259 12.9364 13.5548 16.0913 14.2665 16.0913C14.9799 16.0913 16.6041 13.3004 16.5115 12.2222C16.4205 11.144 15.244 11.3057 14.5973 11.6153C15.1921 9.45897 16.5652 8.31247 18.321 8.31247C20.0776 8.31247 20.5009 9.55312 20.5009 11.0766C20.5009 13.3955 15.8006 20.5 12.9608 20.5C11.2042 20.5 10.7687 17.9114 10.4129 16.6301C10.0561 15.3504 9.35578 11.9923 8.53683 11.7769C8.21911 11.7241 7.32215 12.4367 7.32215 12.4367L6.6875 11.5625Z"
        fill="white"
      />
    </svg>
  );
}
