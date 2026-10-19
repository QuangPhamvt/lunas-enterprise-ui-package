'use client';

import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';
import { formatNumber } from '@/libs/number';

const statisticVariants = cva('inline-flex items-center gap-1 font-number tabular-nums transition-colors', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    trend: {
      neutral: 'text-text-positive-strong',
      up: 'text-success',
      down: 'text-danger',
    },
  },
  defaultVariants: {
    size: 'lg',
    trend: 'neutral',
  },
});

/** Props for `Statistic`. */
export type StatisticProps = {
  /**
   * Font size, `xs` through `xl`.
   * @default 'lg'
   */
  size?: VariantProps<typeof statisticVariants>['size'];

  /**
   * Character between the integer and the decimal part.
   * @default ','
   */
  decimalSeparator?: string;
  /**
   * Character between thousands groups.
   * @default '.'
   */
  groupSeparator?: string;
  /** Optional node rendered before the numeric value (e.g. a currency symbol). */
  prefix?: React.ReactNode;
  /** Optional node rendered after the numeric value (e.g. a unit label). */
  suffix?: React.ReactNode;
  /** Number of decimal digits to display; omit to show all significant digits. */
  precision?: number;
  /** Rounding strategy applied before formatting. Defaults to `'round'`. */
  roundingMode?: 'round' | 'floor' | 'ceil';
  /** When `true`, pads the decimal part with trailing zeros up to `precision`. Defaults to `false`. */
  showTrailingZeros?: boolean;
  /** The numeric (or numeric-string) value to format and display. */
  value: number | string;
  /** Additional CSS classes applied to the wrapper element. */
  className?: string;
  /** Colour trend indicator: `'neutral'` (default), `'up'` (green), or `'down'` (red). */
  trend?: 'neutral' | 'up' | 'down';
};

/**
 * A memoised numeric display component with locale-aware formatting, optional prefix/suffix, trend colouring, and configurable rounding.
 *
 * @example
 * ```tsx
 * import { Statistic } from '@customafk/lunas-ui/data-display/statistic';
 *
 * <Statistic value={1234567.89} precision={2} prefix="$" trend="up" size="lg" />
 * ```
 */
export const Statistic = memo(
  ({
    decimalSeparator = ',',
    groupSeparator = '.',
    prefix: Prefix,
    suffix: Suffix,
    precision,
    roundingMode = 'round',
    showTrailingZeros = false,
    size = 'lg',
    trend = 'neutral',
    value,
    className,
  }: StatisticProps) => {
    const finalFormattedValue = useMemo(
      () => formatNumber(value, { precision, roundingMode, showTrailingZeros, decimalSeparator, groupSeparator }) ?? 'N/A',
      [value, precision, roundingMode, showTrailingZeros, decimalSeparator, groupSeparator]
    );

    return (
      <div data-slot="statistic" className={cn(statisticVariants({ size, trend }), className)}>
        {Prefix && <span data-slot="statistic-prefix">{Prefix}</span>}
        <p data-slot="statistic-value">{finalFormattedValue}</p>
        {Suffix && <span data-slot="statistic-suffix">{Suffix}</span>}
      </div>
    );
  }
);
Statistic.displayName = 'Statistic';
