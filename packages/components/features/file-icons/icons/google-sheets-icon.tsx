'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Google Sheets file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GoogleSheetsIcon({ size = 28, ...props }: FileIconProps) {
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
          fill="#27A769"
        />
        <path d="M23 11.75L16.25 5V9.875C16.25 10.4887 16.5448 11.0335 17.0006 11.3756L23 17.375V11.75Z" fill="#2C9363" />
        <path d="M16.25 5L23 11.75H18.125C17.0895 11.75 16.25 10.9105 16.25 9.875V5Z" fill="#93D3B4" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 16.25H18.5V24.4062H9.5V16.25ZM10.625 17.375H13.4375V18.7812H10.625V17.375ZM17.375 17.375H14.5625V18.7812H17.375V17.375ZM10.625 19.625H13.4375V21.0312H10.625V19.625ZM13.4375 21.875H10.625V23.2812H13.4375V21.875ZM14.5625 19.625H17.375V21.0312H14.5625V19.625ZM17.375 21.875H14.5625V23.2812H17.375V21.875Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
