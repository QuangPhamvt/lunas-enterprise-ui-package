'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Google Docs file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GoogleDocsIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id={uid} style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
        <circle cx="14" cy="14" r="14" fill="white" />
      </mask>
      <g mask={`url(#${uid})`}>
        <rect width="28" height="28" fill="#788391" fillOpacity="0.1" />
        <path
          d="M6.875 5C5.83947 5 5 5.83947 5 6.875V27.125C5 28.1605 5.83947 29 6.875 29H21.125C22.1605 29 23 28.1605 23 27.125V11.75L16.25 5H6.875Z"
          fill="#5591F5"
        />
        <path d="M23 11.75L16.25 5V9.875C16.25 10.4887 16.5448 11.0335 17.0006 11.3756L23 17.375V11.75Z" fill="#4F80E0" />
        <path d="M16.25 5L23 11.75H18.125C17.0895 11.75 16.25 10.9105 16.25 9.875V5Z" fill="#AAC8FB" />
        <path d="M9.5 16.25H18.5V17.375H9.5V16.25Z" fill="white" />
        <path d="M9.5 18.5H18.5V19.625H9.5V18.5Z" fill="white" />
        <path d="M9.5 20.75H18.5V21.875H9.5V20.75Z" fill="white" />
        <path d="M9.5 23H16.25V24.125H9.5V23Z" fill="white" />
      </g>
    </svg>
  );
}
