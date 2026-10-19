'use client';

import { useId } from 'react';

import type { FileIconProps } from '../types';

/** Ppt File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function PptFileIcon({ size = 28, ...props }: FileIconProps) {
  const uid = useId();
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 4C1 2.34315 2.34315 1 4 1H19L27 9V24C27 25.6569 25.6569 27 24 27H4C2.34315 27 1 25.6569 1 24V4Z" fill="#CC5933" />
      <path
        d="M14.0904 14.626C14.6544 14.626 15.0664 14.49 15.3264 14.218C15.5904 13.946 15.7224 13.574 15.7224 13.102C15.7224 12.886 15.6884 12.69 15.6204 12.514C15.5564 12.334 15.4564 12.182 15.3204 12.058C15.1884 11.93 15.0204 11.832 14.8164 11.764C14.6124 11.696 14.3704 11.662 14.0904 11.662H12.9504V14.626H14.0904ZM14.0904 10.294C14.6864 10.294 15.2004 10.364 15.6324 10.504C16.0684 10.644 16.4264 10.84 16.7064 11.092C16.9864 11.34 17.1924 11.636 17.3244 11.98C17.4604 12.324 17.5284 12.698 17.5284 13.102C17.5284 13.53 17.4584 13.922 17.3184 14.278C17.1784 14.634 16.9664 14.94 16.6824 15.196C16.3984 15.452 16.0404 15.652 15.6084 15.796C15.1764 15.936 14.6704 16.006 14.0904 16.006H12.9504V19H11.1504V10.294H14.0904Z"
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
