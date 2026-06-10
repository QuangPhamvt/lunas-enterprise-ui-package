'use client';
import { memo, useMemo } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import type { AnyEntity } from '@/types';
import { Statistic } from '@/components/data-display/statistic';

import { useUITableAnalysisContext, useUITableBodyContext, useUITableContext } from '../../hooks/use-context';
import type { ColumnAggregation, ColumnAggregationType } from '../../types';

function computeAggregation(rowCount: number, values: number[], type: ColumnAggregationType): number {
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

function extractNumericValues(rows: { getValue: (id: string) => unknown }[], colId: string): number[] {
  return rows
    .map(r => {
      const v = r.getValue(colId);
      const n = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : NaN;
      return n;
    })
    .filter(n => !Number.isNaN(n));
}

type AggregationLabel = {
  colId: string;
  header: string;
  aggregation: ColumnAggregation;
  allValue: number;
  selectedValue: number | null;
};

const typeLabels: Record<ColumnAggregationType, string> = {
  sum: 'Tổng',
  avg: 'Trung bình',
  count: 'Đếm',
  min: 'Nhỏ nhất',
  max: 'Lớn nhất',
};

export const UITableAnalysisPanel = memo(() => {
  const { table, totalRows } = useUITableContext();
  const { rowSelectionState } = useUITableBodyContext();
  const { isOpen, toggle } = useUITableAnalysisContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: row model
  const allRows = useMemo(() => table.getRowModel().rows, [table]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: selected rows
  const selectedRows = useMemo(() => table.getSelectedRowModel().flatRows, [table, rowSelectionState]);

  const headers = useMemo(() => table.getHeaderGroups()[0]?.headers ?? [], [table]);

  const aggregationRows = useMemo<AggregationLabel[]>(() => {
    return headers
      .filter(h => !['select', 'actions'].includes(h.id))
      .flatMap(header => {
        const agg = (header.column.columnDef.meta as AnyEntity)?.aggregation as ColumnAggregation | undefined;
        if (!agg) return [];

        const headerText = agg.label ?? (typeof header.column.columnDef.header === 'string' ? header.column.columnDef.header : header.id);

        const allValues = extractNumericValues(allRows, header.id);
        const selectedValues = selectedRows.length > 0 ? extractNumericValues(selectedRows, header.id) : null;

        return [
          {
            colId: header.id,
            header: headerText,
            aggregation: agg,
            allValue: computeAggregation(allRows.length, allValues, agg.type),
            selectedValue: selectedValues !== null ? computeAggregation(selectedRows.length, selectedValues, agg.type) : null,
          },
        ];
      });
  }, [headers, allRows, selectedRows]);

  return (
    <div data-slot="table-analysis-panel" className="w-full border-t border-border">
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between px-4 py-2 text-sm font-medium text-text-positive',
          'hover:bg-muted-bg-subtle transition-colors outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary-weak'
        )}
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span>Tổng quan dữ liệu</span>
        {isOpen ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-2 space-y-4">
          {/* Row summary */}
          <div className="flex flex-wrap gap-4">
            <StatChip label="Tổng bản ghi" value={totalRows ?? allRows.length} />
            <StatChip label="Hàng hiển thị" value={allRows.length} />
            <StatChip label="Hàng đã chọn" value={selectedRows.length} highlight={selectedRows.length > 0} />
          </div>

          {/* Column aggregations */}
          {aggregationRows.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-positive-weak">Tóm tắt cột</p>
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted-bg-subtle text-xs text-text-positive-weak">
                      <th className="px-3 py-2 text-left font-medium">Cột</th>
                      <th className="px-3 py-2 text-left font-medium">Kiểu</th>
                      <th className="px-3 py-2 text-right font-medium">Tất cả hàng</th>
                      {selectedRows.length > 0 && <th className="px-3 py-2 text-right font-medium">Hàng đã chọn</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {aggregationRows.map((row, idx) => (
                      <tr key={row.colId} className={cn('border-b border-border last:border-b-0', idx % 2 === 1 && 'bg-muted-bg-subtle/50')}>
                        <td className="px-3 py-2 text-text-positive font-medium">{row.header}</td>
                        <td className="px-3 py-2 text-text-positive-weak">{typeLabels[row.aggregation.type]}</td>
                        <td className="px-3 py-2 text-right">
                          <Statistic
                            value={row.allValue}
                            prefix={row.aggregation.prefix}
                            suffix={row.aggregation.suffix}
                            precision={row.aggregation.precision}
                            size="sm"
                          />
                        </td>
                        {selectedRows.length > 0 && (
                          <td className="px-3 py-2 text-right">
                            {row.selectedValue !== null ? (
                              <Statistic
                                value={row.selectedValue}
                                prefix={row.aggregation.prefix}
                                suffix={row.aggregation.suffix}
                                precision={row.aggregation.precision}
                                size="sm"
                              />
                            ) : (
                              <span className="text-text-positive-weak">—</span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
UITableAnalysisPanel.displayName = 'UITableAnalysisPanel';

const StatChip = memo<{ label: string; value: number; highlight?: boolean }>(({ label, value, highlight }) => (
  <div
    className={cn(
      'flex flex-col gap-0.5 rounded border px-3 py-2 min-w-25 bg-white',
      highlight && value > 0 ? 'border-primary bg-primary-bg-subtle' : 'border-border bg-white'
    )}
  >
    <span className="text-[11px] text-text-positive-weak">{label}</span>
    <span className="text-base font-semibold tabular-nums text-text-positive-strong">{value.toLocaleString()}</span>
  </div>
));
StatChip.displayName = 'StatChip';
