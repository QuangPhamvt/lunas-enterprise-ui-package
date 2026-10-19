'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Ebl3 file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function Ebl3Icon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#DA770B" />
      <rect x="4.75" y="7.75" width="18.5" height="12.5" rx="1.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7905 15.0811C10.913 15.326 10.8495 15.6232 10.6375 15.7966L5.6018 19.9167C5.53597 19.9706 5.45353 20 5.36847 20C5.16497 20 5 19.835 5 19.6315V18.5489C5 18.207 5.17468 17.8888 5.46313 17.7053L9.9519 14.8488C10.245 14.6623 10.6352 14.7703 10.7905 15.0811Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2095 15.0811C17.087 15.326 17.1505 15.6232 17.3625 15.7966L22.3982 19.9167C22.464 19.9706 22.5465 20 22.6315 20C22.835 20 23 19.835 23 19.6315V18.5489C23 18.207 22.8253 17.8888 22.5369 17.7053L18.0481 14.8488C17.755 14.6623 17.3648 14.7703 17.2095 15.0811Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.28597 8.5C5.42611 8.5 5.56369 8.53747 5.68448 8.60852L13.493 13.2018C13.8059 13.3858 14.1941 13.3858 14.507 13.2018L22.3155 8.60852C22.4363 8.53747 22.5739 8.5 22.714 8.5H22.8453C23.2069 8.5 23.5 8.79311 23.5 9.15468C23.5 9.37078 23.3934 9.57297 23.215 9.695L14.5647 15.6136C14.2243 15.8466 13.7757 15.8466 13.4353 15.6136L4.78499 9.695C4.60664 9.57297 4.5 9.37078 4.5 9.15468C4.5 8.79311 4.79311 8.5 5.15468 8.5H5.28597Z"
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
