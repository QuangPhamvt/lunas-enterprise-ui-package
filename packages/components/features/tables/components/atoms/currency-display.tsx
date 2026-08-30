'use client';

import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { UITableEmptyValue } from './empty';

/** Props for the {@link UITableCurrencyDisplay} component. */
type Props = {
  /** The numeric value to format as currency; falsy / `NaN` renders an empty state. */
  value: number | string | null | undefined;
  /** ISO 4217 currency code (default: `'USD'`). */
  currency?: string;
  /**
   * BCP 47 locale used for number formatting (default: `'en-US'`).
   * Controls digit grouping and decimal separators.
   */
  locale?: string;
  /** How to display the currency symbol — `'symbol'` (default), `'code'`, or `'name'`. */
  display?: 'symbol' | 'code' | 'name';
  /** Font-size variant (default: `'md'`). */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** When `true` and `trend` is not set, auto-derives color from the value's sign (negative → red, positive → green, zero → neutral). */
  colorize?: boolean;
  /**
   * Explicit color override, independent of the value's numeric sign — e.g. a large
   * positive expense can still be marked `'down'` (red) to flag it as significant.
   * Takes precedence over `colorize`'s sign-based auto-detection.
   */
  trend?: 'up' | 'down' | 'neutral';
};

/**
 * Formats a numeric value as a locale-aware currency string in a table cell.
 * Always shows exactly two decimal places and uses the browser's `Intl` API for
 * symbol placement.  Renders {@link UITableEmptyValue} when the value is absent or
 * invalid.
 *
 * @example
 * import { UITableCurrencyDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableCurrencyDisplay value={1234.5} currency="USD" colorize />
 * <UITableCurrencyDisplay value={9800.5} currency="USD" trend="down" />
 */
export const UITableCurrencyDisplay = memo(({ value, currency = 'USD', locale = 'en-US', display = 'symbol', size = 'md', colorize = false, trend }: Props) => {
  const formatted = useMemo(() => {
    const num = typeof value === 'string' ? Number(value.trim()) : value;
    if (num === null || num === undefined || Number.isNaN(num) || !Number.isFinite(num)) return null;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: display,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }, [value, currency, locale, display]);

  const effectiveTrend = useMemo(() => {
    if (trend) return trend;
    if (!colorize) return undefined;

    const num = typeof value === 'string' ? Number(value.trim()) : value;
    if (typeof num !== 'number' || Number.isNaN(num)) return undefined;
    if (num < 0) return 'down';
    if (num > 0) return 'up';
    return 'neutral';
  }, [trend, colorize, value]);

  if (!formatted) return <UITableEmptyValue />;

  return (
    <p
      className={cn(
        'font-medium font-number tabular-nums',
        size === 'xs' && 'text-xs',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg',
        size === 'xl' && 'text-xl',
        !effectiveTrend && 'text-text-positive',
        effectiveTrend === 'down' && 'text-danger-strong',
        effectiveTrend === 'up' && 'text-success-strong',
        effectiveTrend === 'neutral' && 'text-text-positive'
      )}
    >
      {formatted}
    </p>
  );
});
UITableCurrencyDisplay.displayName = `UITableCurrencyDisplay`;
