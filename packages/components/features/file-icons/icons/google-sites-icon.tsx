'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Google Sites file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GoogleSitesIcon({ size = 28, ...props }: FileIconProps) {
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
          fill="#4758B5"
        />
        <path
          d="M23 11.75L16.25 5V9.875C16.25 10.4887 16.5448 11.0335 17.0006 11.3756L23 17.375V11.75Z"
          fill="black"
          fillOpacity="0.2"
          style={{ mixBlendMode: 'hard-light' }}
        />
        <path d="M16.25 5L23 11.75H18.125C17.0895 11.75 16.25 10.9105 16.25 9.875V5Z" fill="#A3ABDA" />
        <path d="M9.5 17H18.5V18.2656H9.5V17Z" fill="white" />
        <path d="M9.5 19.5312H15.9688V23.75H9.5V19.5312Z" fill="white" />
        <path d="M17.2344 19.5312H18.5V23.75H17.2344V19.5312Z" fill="white" />
      </g>
    </svg>
  );
}
