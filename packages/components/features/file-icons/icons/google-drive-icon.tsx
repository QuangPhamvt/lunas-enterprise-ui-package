'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Google Drive file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GoogleDriveIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id={uid} style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <circle cx="14" cy="14" r="14" fill="white" />
      </mask>
      <g mask={`url(#${uid})`}>
        <rect width="28" height="28" fill="#788391" fillOpacity="0.1" />
        <path
          d="M4.66323 20.141L5.63345 21.8462C5.83505 22.2051 6.12486 22.4872 6.46506 22.6923L9.93013 16.5898H3C3 16.9872 3.1008 17.3846 3.30241 17.7436L4.66323 20.141Z"
          fill="#0066DA"
        />
        <path
          d="M14 9.41024L10.5349 3.30768C10.1947 3.51281 9.90493 3.79486 9.70332 4.15383L3.30241 15.4359C3.10451 15.7871 3.00026 16.1849 3 16.5897H9.93013L14 9.41024Z"
          fill="#00AC47"
        />
        <path
          d="M21.5349 22.6923C21.8751 22.4872 22.1649 22.2051 22.3665 21.8462L22.7697 21.141L24.6976 17.7436C24.8992 17.3846 25 16.9872 25 16.5898H18.0693L19.5441 19.5385L21.5349 22.6923Z"
          fill="#EA4335"
        />
        <path d="M14 9.41026L17.465 3.30769C17.1248 3.10256 16.7342 3 16.331 3H11.6689C11.2657 3 10.8751 3.11538 10.5349 3.30769L14 9.41026Z" fill="#00832D" />
        <path
          d="M18.0699 16.5898H9.93015L6.46509 22.6923C6.80529 22.8974 7.1959 23 7.59911 23H20.4009C20.8041 23 21.1948 22.8846 21.535 22.6923L18.0699 16.5898Z"
          fill="#2684FC"
        />
        <path
          d="M21.4971 9.79486L18.2967 4.15383C18.0951 3.79486 17.8053 3.51281 17.4651 3.30768L14 9.41024L18.0699 16.5897H24.9874C24.9874 16.1923 24.8866 15.7949 24.685 15.4359L21.4971 9.79486Z"
          fill="#FFBA00"
        />
      </g>
    </svg>
  );
}
