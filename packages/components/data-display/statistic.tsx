'use client';

import { memo, useCallback, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@customafk/react-toolkit/utils';

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

export type StatisticProps = VariantProps<typeof statisticVariants> & {
  /** Character used to separate the decimal part. Defaults to `'.'`. */
  decimalSeparator?: string;
  /** Character used to separate thousands groups. Defaults to `','`. */
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
    decimalSeparator = '.',
    groupSeparator = ',',
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
    const applyRounding = useCallback(
      (num: number, precisionValue: number): number => {
        const multiplier = 10 ** precisionValue;
        switch (roundingMode) {
          case 'floor':
            return Math.floor(num * multiplier) / multiplier;
          case 'ceil':
            return Math.ceil(num * multiplier) / multiplier;
          default:
            return Math.round(num * multiplier) / multiplier;
        }
      },
      [roundingMode]
    );

    const formatOptions = useMemo((): Intl.NumberFormatOptions => {
      const options: Intl.NumberFormatOptions = {};
      if (typeof precision === 'number' && precision >= 0) {
        if (showTrailingZeros) {
          options.minimumFractionDigits = precision;
          options.maximumFractionDigits = precision;
        } else {
          options.maximumFractionDigits = precision;
        }
      }
      return options;
    }, [precision, showTrailingZeros]);

    const formatNumber = useCallback(
      (num: number): string => {
        let processedNum = num;
        if (typeof precision === 'number' && precision >= 0) {
          processedNum = applyRounding(num, precision);
        }
        return processedNum.toLocaleString('en-US', formatOptions);
      },
      [applyRounding, formatOptions, precision]
    );

    const processedValue = useMemo((): string => {
      if (typeof value === 'number') {
        if (Number.isNaN(value) || !Number.isFinite(value)) return 'N/A';
        return formatNumber(value);
      }
      if (typeof value === 'string') {
        const trimmedValue = value.trim();
        if (!trimmedValue) return 'N/A';
        const numValue = Number(trimmedValue);
        if (Number.isNaN(numValue) || !Number.isFinite(numValue)) return 'N/A';
        return formatNumber(numValue);
      }
      return 'N/A';
    }, [value, formatNumber]);

    const finalFormattedValue = useMemo((): string => {
      if (decimalSeparator === '.' && groupSeparator === ',') return processedValue;
      return processedValue.replace(/,/g, groupSeparator).replace(/\./g, decimalSeparator);
    }, [processedValue, decimalSeparator, groupSeparator]);

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
