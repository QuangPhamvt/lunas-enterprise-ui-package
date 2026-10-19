import type { SVGProps } from 'react';

/** Props shared by every file icon — any SVG attribute plus a square `size`. */
export type FileIconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & {
  /**
   * Width and height of the icon.
   * @default 28
   */
  size?: number | string;
};
