'use client';

import type { FileIconProps } from '../types';

/** Youtube File file icon — decorative (`aria-hidden`); pass `aria-hidden={false}` with an `aria-label` to expose it. */
export function YoutubeFileIcon({ size = 28, ...props }: FileIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M26.4563 7.74227C26.1568 6.62291 25.277 5.74326 24.1577 5.44362C22.1309 4.89999 14 4.89999 14 4.89999C14 4.89999 5.86911 4.89999 3.84227 5.44362C2.72292 5.74326 1.84327 6.62291 1.54363 7.74227C1 9.7691 1 14.0004 1 14.0004C1 14.0004 1 18.2317 1.54363 20.2586C1.84327 21.3779 2.72292 22.2576 3.84227 22.5572C5.86911 23.1008 14 23.1008 14 23.1008C14 23.1008 22.1309 23.1008 24.1577 22.5572C25.277 22.2576 26.1568 21.3779 26.4563 20.2586C27 18.2317 27 14.0004 27 14.0004C27 14.0004 26.9978 9.7691 26.4563 7.74227Z"
        fill="#FF0000"
      />
      <path d="M11.3975 17.9003L18.1522 14.0008L11.3975 10.1012V17.9003Z" fill="white" />
    </svg>
  );
}
