const CHART_COLOR_COUNT = 8;

/** Cycles through the eight `--chart-N` theme palette variables. */
export const getChartColor = (index: number): string => `var(--chart-${(((index % CHART_COLOR_COUNT) + CHART_COLOR_COUNT) % CHART_COLOR_COUNT) + 1})`;

export const formatCompactNumber = (value: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);

export const formatCurrency = (value: number, currency = 'USD', locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: Math.abs(value) >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: Math.abs(value) >= 10_000 ? 1 : 0,
  }).format(value);

export const formatPercent = (value: number, locale = 'en-US'): string =>
  new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format(value);

export const toDateLabel = (date: string | Date, locale = 'en-US'): string => {
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return String(date);
  return parsed.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
};

/** Picks an up/down color by comparing `current` against `reference` (e.g. close vs. open, or vs. zero). */
export const getDirectionColor = (current: number, reference: number, colors?: { up?: string; down?: string }): string =>
  current >= reference ? (colors?.up ?? 'var(--success)') : (colors?.down ?? 'var(--danger)');

export const formatSignedPercent = (value: number, locale = 'en-US'): string => {
  const formatted = new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' }).format(value);
  return formatted;
};

/**
 * Normalizes each of `seriesKeys` in `data` to a common `base` value at its first defined point,
 * so relative performance across series with different price scales becomes directly comparable.
 */
export const computeIndexedSeries = <T extends { date: string | Date } & Record<string, unknown>>(
  data: readonly T[],
  seriesKeys: readonly string[],
  base = 100
): Array<Record<string, string | Date | number>> => {
  const baseValues: Record<string, number | undefined> = {};
  for (const key of seriesKeys) {
    const first = data.find(point => typeof point[key] === 'number')?.[key] as number | undefined;
    baseValues[key] = first;
  }

  return data.map(point => {
    const indexed: Record<string, number> = {};
    for (const key of seriesKeys) {
      const raw = point[key];
      const baseValue = baseValues[key];
      indexed[key] = typeof raw === 'number' && baseValue ? (raw / baseValue) * base : Number.NaN;
    }
    return { date: point.date, ...indexed };
  });
};
