'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Google Forms file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function GoogleFormsIcon({ size = 28, ...props }: FileIconProps) {
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
          fill="#764EBE"
        />
        <path d="M23 11.75L16.25 5V9.875C16.25 10.4887 16.5448 11.0335 17.0006 11.3756L23 17.375V11.75Z" fill="#5E3E98" />
        <path d="M16.25 5L23 11.75H18.125C17.0895 11.75 16.25 10.9105 16.25 9.875V5Z" fill="#BBA7DF" />
        <path
          d="M10.8125 17.4688C10.8125 17.9347 10.4347 18.3125 9.96875 18.3125C9.50276 18.3125 9.125 17.9347 9.125 17.4688C9.125 17.0028 9.50276 16.625 9.96875 16.625C10.4347 16.625 10.8125 17.0028 10.8125 17.4688Z"
          fill="white"
        />
        <path
          d="M10.8125 20.2812C10.8125 20.7472 10.4347 21.125 9.96875 21.125C9.50276 21.125 9.125 20.7472 9.125 20.2812C9.125 19.8153 9.50276 19.4375 9.96875 19.4375C10.4347 19.4375 10.8125 19.8153 10.8125 20.2812Z"
          fill="white"
        />
        <path
          d="M10.8125 23.0938C10.8125 23.5597 10.4347 23.9375 9.96875 23.9375C9.50276 23.9375 9.125 23.5597 9.125 23.0938C9.125 22.6278 9.50276 22.25 9.96875 22.25C10.4347 22.25 10.8125 22.6278 10.8125 23.0938Z"
          fill="white"
        />
        <path d="M12.0781 16.9062H18.125V18.0312H12.0781V16.9062Z" fill="white" />
        <path d="M12.0781 19.7188H18.125V20.8438H12.0781V19.7188Z" fill="white" />
        <path d="M12.0781 22.5312H18.125V23.6562H12.0781V22.5312Z" fill="white" />
      </g>
    </svg>
  );
}
