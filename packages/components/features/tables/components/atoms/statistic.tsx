'use client';
import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '@/components/layouts/flex';
import { formatNumber } from '@/libs/number';
import { UITableEmptyValue } from './empty';

/** Props for the {@link UITableStatisticDisplay} component. */
type Props = {
  /** Character used to separate the integer and fractional parts (default: `','`). */
  decimalSeparator?: string;
  /** Character used to separate thousands groups (default: `'.'`). */
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
 * separators, precision, rounding, and size; renders {@link UITableEmptyValue} when
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
    decimalSeparator = ',',
    groupSeparator = '.',
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
    const finalFormattedValue = useMemo(
      () => formatNumber(value, { precision, roundingMode, showTrailingZeros, decimalSeparator, groupSeparator }) ?? 'N/A',
      [value, precision, roundingMode, showTrailingZeros, decimalSeparator, groupSeparator]
    );

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
      return <UITableEmptyValue />;
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
