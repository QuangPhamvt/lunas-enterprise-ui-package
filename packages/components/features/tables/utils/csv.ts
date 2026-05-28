'use client';

import type { CsvCell } from '../types';

function formatCell(value: CsvCell['value']): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildCsvContent(rows: CsvCell[][]): string {
  if (rows.length === 0) return '';
  const headers = rows[0].map(cell => formatCell(cell.label));
  const dataRows = rows.map(row => row.map(cell => formatCell(cell.value)).join(','));
  return [headers.join(','), ...dataRows].join('\n');
}

export function downloadCsv(rows: CsvCell[][], fileName: string): void {
  const content = buildCsvContent(rows);
  if (!content) return;
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
