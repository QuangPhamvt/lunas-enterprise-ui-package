import type { ColumnAggregationType } from '../types';

/** Reduces `values` to a single number according to `type`, using `rowCount` for `'count'`. */
export function computeAggregation(rowCount: number, values: number[], type: ColumnAggregationType): number {
  switch (type) {
    case 'count':
      return rowCount;
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'avg':
      return values.length === 0 ? 0 : values.reduce((a, b) => a + b, 0) / values.length;
    case 'min':
      return values.length === 0 ? 0 : Math.min(...values);
    case 'max':
      return values.length === 0 ? 0 : Math.max(...values);
  }
}

/** Extracts the numeric value of column `colId` from each row, dropping non-numeric cells. */
export function extractNumericValues(rows: { getValue: (id: string) => unknown }[], colId: string): number[] {
  return rows
    .map(r => {
      const v = r.getValue(colId);
      const n = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : NaN;
      return n;
    })
    .filter(n => !Number.isNaN(n));
}
