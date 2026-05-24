'use client';

import type { JSX, ReactNode } from 'react';
import { cn } from '@customafk/react-toolkit/utils';
import { cva } from 'class-variance-authority';

const titleVariants = cva('scroll-m-20 text-start text-balance text-text-positive-strong tracking-tight transition-colors', {
  variants: {
    level: {
      1: 'text-3xl leading-tight font-bold md:text-4xl',
      2: 'text-2xl leading-tight font-semibold md:text-3xl',
      3: 'text-xl leading-snug font-semibold md:text-2xl',
      4: 'text-lg leading-snug font-semibold md:text-xl',
      5: 'text-base leading-normal font-semibold md:text-lg',
      6: 'text-sm leading-normal font-semibold md:text-base',
    },
  },
  defaultVariants: {
    level: 1,
  },
});

export type TitleProps = {
  /**
   * Heading level that maps to the rendered HTML tag (`h1`–`h6`) and the corresponding
   * typographic scale variant.
   * - `1` — `text-3xl / md:text-4xl`, bold (default)
   * - `2` — `text-2xl / md:text-3xl`, semibold
   * - `3` — `text-xl / md:text-2xl`, semibold
   * - `4` — `text-lg / md:text-xl`, semibold
   * - `5` — `text-base / md:text-lg`, semibold
   * - `6` — `text-sm / md:text-base`, semibold
   * @default 1
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Additional Tailwind classes merged with the variant classes. */
  className?: string;
  /** Content rendered inside the heading element. */
  children?: ReactNode;
};

/**
 * A semantic heading component that renders the correct `h1`–`h6` element and applies a matched typographic scale.
 *
 * @example
 * ```tsx
 * import { Title } from '@customafk/lunas-ui/typography/title';
 *
 * // Page-level heading (renders <h1>)
 * <Title level={1}>Welcome to Lunas</Title>
 *
 * // Section sub-heading (renders <h3>)
 * <Title level={3}>Account Settings</Title>
 * ```
 */
export const Title = ({ level = 1, className, children }: TitleProps) => {
  const Comp = ('h' + level) as keyof JSX.IntrinsicElements;
  return (
    <Comp data-slot="title" className={cn(titleVariants({ level }), className)}>
      {children}
    </Comp>
  );
};
