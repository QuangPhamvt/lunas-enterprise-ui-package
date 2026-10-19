'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Google Slides file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GoogleSlidesIcon({ size = 28, ...props }: FileIconProps) {
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
          fill="#F5BB19"
        />
        <path d="M23 11.75L16.25 5V9.875C16.25 10.4887 16.5448 11.0335 17.0006 11.3756L23 17.375V11.75Z" fill="#EBA51C" />
        <path d="M16.25 5L23 11.75H18.125C17.0895 11.75 16.25 10.9105 16.25 9.875V5Z" fill="#FBDE8D" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.3438 15.875C9.87776 15.875 9.5 16.2528 9.5 16.7188V24.0312C9.5 24.4972 9.87776 24.875 10.3438 24.875H17.6562C18.1222 24.875 18.5 24.4972 18.5 24.0312V16.7188C18.5 16.2528 18.1222 15.875 17.6562 15.875H10.3438ZM17.375 18.4062H10.625V22.3438H17.375V18.4062Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
