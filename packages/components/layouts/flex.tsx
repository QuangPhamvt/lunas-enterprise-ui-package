'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';

const flexVariants = cva(['relative flex', 'text-sm'], {
  variants: {
    vertical: {
      true: 'flex-col',
      false: 'flex-row',
    },
    width: {
      full: 'w-full',
      auto: 'w-auto',
      fit: 'w-fit',
      screen: 'w-screen',
      min: 'w-min',
      max: 'w-max',
      null: '',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
    margin: {
      sm: 'm-2',
      md: 'm-4',
      lg: 'm-6',
      xl: 'm-8',
      none: 'm-0',
    },
    padding: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
      none: 'p-0',
    },
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      none: 'gap-0',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
      stretch: 'justify-stretch',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    vertical: false,
    wrap: true,
    width: 'fit',
    margin: 'none',
    padding: 'sm',
    gap: 'xs',
    justify: 'start',
    align: 'center',
  },
});

type Props = {
  /** Additional Tailwind classes merged on top of the variant-generated classes. */
  className?: string;
  /**
   * Stacks children vertically (`flex-col`) when `true`, horizontally (`flex-row`) when `false`.
   * @default false
   */
  vertical?: boolean;
  /**
   * Controls the width of the flex container.
   * - `'full'` — `w-full`
   * - `'auto'` — `w-auto`
   * - `'fit'`  — `w-fit` (default)
   * - `'screen'` — `w-screen`
   * - `'min'` — `w-min`
   * - `'max'` — `w-max`
   * - `'null'` — no width utility applied
   * @default 'fit'
   */
  width?: 'full' | 'auto' | 'fit' | 'screen' | 'min' | 'max' | 'null';
  /**
   * Allows children to wrap onto multiple lines when `true`.
   * @default true
   */
  wrap?: boolean;
  /**
   * Uniform margin applied to the container.
   * - `'none'` — `m-0` (default)
   * - `'sm'` — `m-2`
   * - `'md'` — `m-4`
   * - `'lg'` — `m-6`
   * - `'xl'` — `m-8`
   * @default 'none'
   */
  margin?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /**
   * Uniform padding applied to the container.
   * - `'none'` — `p-0`
   * - `'sm'`  — `p-2` (default)
   * - `'md'`  — `p-4`
   * - `'lg'`  — `p-6`
   * - `'xl'`  — `p-8`
   * @default 'sm'
   */
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /**
   * Gap between child elements.
   * - `'none'` — `gap-0`
   * - `'xs'`  — `gap-1` (default)
   * - `'sm'`  — `gap-2`
   * - `'md'`  — `gap-4`
   * - `'lg'`  — `gap-6`
   * - `'xl'`  — `gap-8`
   * @default 'xs'
   */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  /**
   * Justification of children along the main axis (`justify-content`).
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
  /**
   * Alignment of children along the cross axis (`align-items`).
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
} & VariantProps<typeof flexVariants>;

/**
 * A flexible, variant-driven flex container built on CVA and TailwindCSS.
 *
 * @example
 * ```tsx
 * import { Flex } from '@customafk/lunas-ui/layouts/flex';
 *
 * // Horizontal row with centered children and a medium gap
 * <Flex gap="md" justify="between" align="center">
 *   <span>Left</span>
 *   <span>Right</span>
 * </Flex>
 *
 * // Vertical stack that fills parent width
 * <Flex vertical width="full" gap="sm" padding="md">
 *   <p>First item</p>
 *   <p>Second item</p>
 * </Flex>
 * ```
 */
export const Flex = memo(({ vertical, wrap, width, margin, padding, gap, justify, align, className, children }: React.PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        flexVariants({
          vertical,
          width,
          wrap,
          margin,
          padding,
          gap,
          justify,
          align,
          className,
        })
      )}
    >
      {children}
    </div>
  );
});
Flex.displayName = 'Flex';
