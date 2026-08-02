'use client';
import { memo, useCallback, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { UITableEmpty } from './empty';

/**
 * Applies the specified rounding mode to `num` at the given decimal precision.
 *
 * @param num - The number to round.
 * @param precisionValue - Number of decimal places to keep.
 * @param roundingMode - Rounding strategy: `'round'` (default), `'floor'`, or `'ceil'`.
 * @returns The rounded number.
 */
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

/** Props for the {@link UITableStatisticDisplay} component. */
type Props = {
  /** Character used to separate the integer and fractional parts (default: `'.'`). */
  decimalSeparator?: string;
  /** Character used to separate thousands groups (default: `','`). */
  groupSeparator?: string;
  /** Optional node rendered before the formatted number (e.g. a currency symbol). */
  prefix?: React.ReactNode;
  /** Optional node rendered after the formatted number (e.g. a unit label). */
  suffix?: React.ReactNode;
  /** Number of decimal digits to display. */
  precision?: number;
  /** Rounding strategy applied before formatting (default: `'round'`). */
  roundingMode?: 'round' | 'floor' | 'ceil';
  /** When `true`, pads the fractional part with trailing zeros up to `precision` digits. */
  showTrailingZeros?: boolean;
  /** Font-size variant for the displayed number (default: `'lg'`). */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** The numeric or string value to format; falsy / invalid values render an empty state. */
  value: number | string | null | undefined;
  /** When `true` and `trend` is not set, auto-derives color from the value's sign (negative → red, positive → green, zero → neutral). */
  colorize?: boolean;
  /**
   * Explicit color override, independent of the value's numeric sign — e.g. a large
   * positive figure can still be marked `'down'` (red) to flag it as significant.
   * Takes precedence over `colorize`'s sign-based auto-detection.
   */
  trend?: 'up' | 'down' | 'neutral';
};

/**
 * A memoized table-cell component that formats a numeric value with configurable
 * separators, precision, rounding, and size; renders {@link UITableEmpty} when
 * the value is zero, invalid, or absent.
 *
 * @example
 * import { UITableStatisticDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableStatisticDisplay value={1234567.89} precision={2} prefix="$" size="md" />
 * <UITableStatisticDisplay value={1234567.89} precision={2} prefix="$" trend="down" />
 */
export const UITableStatisticDisplay = memo(
  ({
    decimalSeparator = '.',
    groupSeparator = ',',
    prefix: Prefix,
    suffix: Suffix,
    precision,
    roundingMode = 'round',
    showTrailingZeros = false,
    size = 'lg',
    value = 0,
    colorize = false,
    trend,
  }: Props) => {
    // Memoize number formatting options
    const formatOptions = useMemo((): Intl.NumberFormatOptions => {
      const options: Intl.NumberFormatOptions = {};

      if (typeof precision === 'number' && precision >= 0 && showTrailingZeros) {
        options.minimumFractionDigits = precision;
        options.maximumFractionDigits = precision;
      } else {
        options.maximumFractionDigits = precision;
      }

      return options;
    }, [precision, showTrailingZeros]);

    const formatNumber = useCallback(
      (num: number): string => {
        let processedNum = num;

        // Áp dụng làm tròn nếu có precision
        if (typeof precision === 'number' && precision >= 0) {
          processedNum = applyRounding(num, precision, roundingMode);
        }

        return processedNum.toLocaleString('vi-VN', formatOptions);
      },
      [roundingMode, formatOptions, precision]
    );

    // Memoize value processing
    const processedValue = useMemo((): string => {
      // Xử lý giá trị number
      if (typeof value === 'number') {
        if (Number.isNaN(value) || !Number.isFinite(value)) {
          return 'N/A';
        }
        return formatNumber(value);
      }

      // Xử lý giá trị string
      if (typeof value === 'string') {
        const trimmedValue = value.trim();

        // Nếu là chuỗi rỗng
        if (!trimmedValue) {
          return 'N/A';
        }

        // Thử convert sang number
        const numValue = Number(trimmedValue);

        if (Number.isNaN(numValue) || !Number.isFinite(numValue)) {
          // Nếu không phải số, trả về string gốc
          return 'N/A';
        }

        return formatNumber(numValue);
      }

      return 'N/A';
    }, [value, formatNumber]);

    // Memoize separator replacement
    const finalFormattedValue = useMemo((): string => {
      // Chỉ thay thế separators nếu khác mặc định
      if (decimalSeparator === '.' && groupSeparator === ',') {
        return processedValue;
      }
      return processedValue.replace(/,/g, groupSeparator).replace(/\./g, decimalSeparator);
    }, [processedValue, decimalSeparator, groupSeparator]);

    const effectiveTrend = useMemo(() => {
      if (trend) return trend;
      if (!colorize) return undefined;

      const num = typeof value === 'string' ? Number(value.trim()) : value;
      if (typeof num !== 'number' || Number.isNaN(num)) return undefined;
      if (num < 0) return 'down';
      if (num > 0) return 'up';
      return 'neutral';
    }, [trend, colorize, value]);

    if (finalFormattedValue === '0' || finalFormattedValue === 'N/A' || !finalFormattedValue) {
      return <UITableEmpty />;
    }

    return (
      <Flex
        padding="none"
        className={cn(
          'font-number tabular-nums',
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
          size === 'xl' && 'text-xl',
          !effectiveTrend && 'text-text-positive',
          effectiveTrend === 'down' && 'text-danger',
          effectiveTrend === 'up' && 'text-success',
          effectiveTrend === 'neutral' && 'text-text-positive-strong'
        )}
      >
        {Prefix}
        <p>{finalFormattedValue}</p>
        {Suffix}
      </Flex>
    );
  }
);
UITableStatisticDisplay.displayName = 'UITableStatisticDisplay';
