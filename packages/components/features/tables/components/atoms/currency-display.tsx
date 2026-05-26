'use client';

import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { UITableEmpty } from './empty';

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
  /** When `true`, applies a green tint for positive and red tint for negative values. */
  colorize?: boolean;
};

/**
 * Formats a numeric value as a locale-aware currency string in a table cell.
 * Always shows exactly two decimal places and uses the browser's `Intl` API for
 * symbol placement.  Renders {@link UITableEmpty} when the value is absent or
 * invalid.
 *
 * @example
 * import { UITableCurrencyDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableCurrencyDisplay value={1234.5} currency="USD" colorize />
 */
export const UITableCurrencyDisplay = memo(({ value, currency = 'USD', locale = 'en-US', display = 'symbol', size = 'md', colorize = false }: Props) => {
  const formatted = useMemo(() => {
    const num = typeof value === 'string' ? Number(value.trim()) : value;
    if (num === null || num === undefined || Number.isNaN(num) || !Number.isFinite(num)) return null;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: display,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }, [value, currency, locale, display]);

  const isNegative = useMemo(() => {
    const num = typeof value === 'string' ? Number(value.trim()) : value;
    return typeof num === 'number' && num < 0;
  }, [value]);

  if (!formatted) return <UITableEmpty />;

  return (
    <p
      className={cn(
        'font-number tabular-nums',
        size === 'xs' && 'text-xs',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg',
        size === 'xl' && 'text-xl',
        !colorize && 'text-text-positive',
        colorize && isNegative && 'text-danger-strong',
        colorize && !isNegative && 'text-success-strong'
      )}
    >
      {formatted}
    </p>
  );
});
UITableCurrencyDisplay.displayName = 'UITableCurrencyDisplay';
