/** How a value is rounded to `precision` decimal digits. */
export type RoundingMode = 'round' | 'floor' | 'ceil';

/** Options shared by every numeric display (`Statistic`, `DescriptionStatistic`, `UITableStatisticDisplay`). */
export type NumberFormatOptions = {
  /** Decimal digits to keep; omit to keep every significant digit. */
  precision?: number;
  /** How the value is rounded to `precision`. */
  roundingMode?: RoundingMode;
  /** Pad with zeros up to `precision` (`1.50` instead of `1.5`). */
  showTrailingZeros?: boolean;
  /** Character between the integer and decimal part. Vietnamese convention by default. */
  decimalSeparator?: string;
  /** Character between thousands groups. Vietnamese convention by default. */
  groupSeparator?: string;
};

/** Rounds `value` to `precision` decimal digits with the given mode. */
export function roundTo(value: number, precision: number, mode: RoundingMode = 'round'): number {
  const multiplier = 10 ** precision;
  if (mode === 'floor') return Math.floor(value * multiplier) / multiplier;
  if (mode === 'ceil') return Math.ceil(value * multiplier) / multiplier;
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Formats a number (or numeric string) with grouped thousands — `1.234.567,89` by default.
 * Returns `null` for empty, non-numeric or non-finite input so each caller can render its own
 * empty state.
 */
export function formatNumber(
  value: number | string | null | undefined,
  { precision, roundingMode = 'round', showTrailingZeros = false, decimalSeparator = ',', groupSeparator = '.' }: NumberFormatOptions = {}
): string | null {
  const num = typeof value === 'string' ? (value.trim() ? Number(value.trim()) : Number.NaN) : value;
  if (typeof num !== 'number' || !Number.isFinite(num)) return null;

  const hasPrecision = typeof precision === 'number' && precision >= 0;
  // Format with fixed en-US separators (`,` groups, `.` decimals), then map to the requested ones
  // in a single pass so a `.` <-> `,` swap can't clobber itself.
  const formatted = (hasPrecision ? roundTo(num, precision, roundingMode) : num).toLocaleString('en-US', {
    minimumFractionDigits: hasPrecision && showTrailingZeros ? precision : undefined,
    maximumFractionDigits: hasPrecision ? precision : undefined,
  });
  if (decimalSeparator === '.' && groupSeparator === ',') return formatted;
  return formatted.replace(/[,.]/g, char => (char === ',' ? groupSeparator : decimalSeparator));
}
