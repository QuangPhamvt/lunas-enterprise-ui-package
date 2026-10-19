'use client';

import { memo, useCallback, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';
import { DescriptionEmpty } from './empty';

const applyRounding = (num: number, precisionValue: number, roundingMode?: 'round' | 'floor' | 'ceil') => {
  const multiplier = 10 ** precisionValue;
  switch (roundingMode) {
    case 'floor':
      return Math.floor(num * multiplier) / multiplier;
    case 'ceil':
      return Math.ceil(num * multiplier) / multiplier;
    default:
      return Math.round(num * multiplier) / multiplier;
  }
};

const descriptionStatisticVariants = cva('inline-flex items-center gap-1 font-medium font-number tabular-nums transition-colors', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    trend: {
      neutral: 'text-text-positive',
      up: 'text-success-strong',
      down: 'text-danger-strong',
    },
  },
  defaultVariants: {
    size: 'sm',
    trend: 'neutral',
  },
});

/** Props for `DescriptionStatistic`. */
export type DescriptionStatisticProps = {
  /**
   * Font size of the value.
   * @default 'sm'
   */
  size?: VariantProps<typeof descriptionStatisticVariants>['size'];
  /** Colors the value: `up` (success), `down` (danger) or `neutral`. */
  trend?: VariantProps<typeof descriptionStatisticVariants>['trend'];
  /** Character between the integer and decimal part. */
  decimalSeparator?: string;
  /** Character between thousands groups. */
  groupSeparator?: string;
  /** Node before the number (e.g. a currency symbol). */
  prefix?: React.ReactNode;
  /** Node after the number (e.g. a unit). */
  suffix?: React.ReactNode;
  /** Number of decimal digits to show. */
  precision?: number;
  /** How the value is rounded to `precision`. */
  roundingMode?: 'round' | 'floor' | 'ceil';
  /** Keep trailing zeros up to `precision` (`1.50` instead of `1.5`). */
  showTrailingZeros?: boolean;
  /** Number, or numeric string, to show; empty/invalid input renders `DescriptionEmpty`. */
  value: number | string | null | undefined;
  /** Class names for the value. */
  className?: string;
  /**
   * Renders `DescriptionEmpty` for a literal `0` value, same as any other unset/invalid input.
   * Set to `false` to display a genuine `0` amount instead.
   * @default true
   */
  emptyOnZero?: boolean;
};

/**
 * The value-cell to use for numbers inside a `DescriptionItem` — prefer this over the standalone
 * `Statistic` (`data-display/statistic`) so empty/invalid values consistently fall back to
 * `DescriptionEmpty`.
 *
 * @example
 * ```tsx
 * <DescriptionItem label="Tổng tiền">
 *   <DescriptionStatistic value={order.total} suffix="₫" />
 * </DescriptionItem>
 * ```
 */
export const DescriptionStatistic = memo(
  ({
    decimalSeparator = '.',
    groupSeparator = ',',
    prefix: Prefix,
    suffix: Suffix,
    precision,
    roundingMode = 'round',
    showTrailingZeros = false,
    size = 'sm',
    trend = 'neutral',
    value = 0,
    className,
    emptyOnZero = true,
  }: DescriptionStatisticProps) => {
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
          processedNum = applyRounding(num, precision, roundingMode);
        }
        return processedNum.toLocaleString('vi-VN', formatOptions);
      },
      [roundingMode, formatOptions, precision]
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

    if ((emptyOnZero && finalFormattedValue === '0') || finalFormattedValue === 'N/A' || !finalFormattedValue) {
      return <DescriptionEmpty />;
    }

    return (
      <div data-slot="description-statistic" className={cn(descriptionStatisticVariants({ size, trend }), className)}>
        {!!Prefix && <span data-slot="description-statistic-prefix">{Prefix}</span>}
        <p data-slot="description-statistic-value">{finalFormattedValue}</p>
        {!!Suffix && <span data-slot="description-statistic-suffix">{Suffix}</span>}
      </div>
    );
  }
);
DescriptionStatistic.displayName = 'DescriptionStatistic';
