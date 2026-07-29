'use client';
import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Statistic } from '@/components/data-display/statistic';
import type { AnyEntity } from '@/types';
import { SELECT_WIDTH } from '../../constants';
import { useUITableBodyContext, useUITableContext } from '../../hooks/use-context';
import type { ColumnAggregation } from '../../types';
import { computeAggregation, extractNumericValues } from '../../utils/aggregation';
import { tableFooterCellVariants, tableFooterRowVariants } from '../table.variants';

export const UITableFooterRow = memo(() => {
  const { table } = useUITableContext();
  const { rowSelectionState } = useUITableBodyContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: table header groups
  const headers = useMemo(() => table.getHeaderGroups()[0]?.headers ?? [], [table.getHeaderGroups()]);

  const hasAggregation = useMemo(() => headers.some(h => (h.column.columnDef.meta as AnyEntity)?.aggregation), [headers]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: selected rows
  const selectedRows = useMemo(() => table.getSelectedRowModel().flatRows, [table, rowSelectionState]);

  const allRows = useMemo(() => table.getRowModel().rows, [table]);

  const activeRows = selectedRows.length > 0 ? selectedRows : allRows;

  const aggregatedValues = useMemo(() => {
    const result: Record<string, number | null> = {};
    for (const header of headers) {
      const agg = (header.column.columnDef.meta as AnyEntity)?.aggregation as ColumnAggregation | undefined;
      if (!agg) continue;
      const values = extractNumericValues(activeRows, header.id);
      result[header.id] = computeAggregation(activeRows.length, values, agg.type);
    }
    return result;
  }, [headers, activeRows]);

  const columnPinningState = table.getState().columnPinning;
  const leftPinnedIds = columnPinningState.left ?? [];
  const rightPinnedIds = columnPinningState.right ?? [];
  const firstRightPinnedId = headers.find(h => rightPinnedIds.includes(h.id))?.id;
  const lastLeftPinnedId = [...headers].reverse().find(h => leftPinnedIds.includes(h.id))?.id;

  if (!hasAggregation) return null;

  const rowCountLabel = selectedRows.length > 0 ? `${selectedRows.length}` : `${allRows.length}`;

  return (
    <div slot="table-footer-row" className={tableFooterRowVariants()}>
      {headers.map(header => {
        const colId = header.id;
        const isPinned = leftPinnedIds.includes(colId) ? ('left' as const) : rightPinnedIds.includes(colId) ? ('right' as const) : (false as const);
        const isFirstCell = colId === firstRightPinnedId;
        const isLastCell = colId === lastLeftPinnedId;

        const left = isPinned === 'left' ? `${header.column.getStart('left')}px` : undefined;
        const right = isPinned === 'right' ? `${header.column.getAfter('right')}px` : undefined;

        if (colId === 'select') {
          return (
            <div
              key={colId}
              slot="table-footer-select"
              data-pinned="left"
              style={{ left: '0px', width: `${SELECT_WIDTH}px` }}
              className={cn(tableFooterCellVariants({ isPinned: 'left', isFirstCell: false, isLastCell: false }), 'justify-center')}
            >
              <span className="truncate text-[11px] items-center text-text-positive-weak">{rowCountLabel}</span>
            </div>
          );
        }

        if (colId === 'actions') {
          return (
            <div
              key={colId}
              slot="table-footer-actions"
              style={{ width: `calc(var(--col-${colId}-size) * 1px)`, right: '0px' }}
              className={tableFooterCellVariants({ isPinned: false, isFirstCell: false, isLastCell: false })}
            />
          );
        }

        const aggregation = (header.column.columnDef.meta as AnyEntity)?.aggregation as ColumnAggregation | undefined;
        const aggregatedValue = aggregatedValues[colId] ?? null;

        return (
          <div
            key={colId}
            slot="table-footer-cell"
            data-pinned={isPinned}
            style={{
              left,
              right,
              width: `calc(var(--col-${colId}-size) * 1px)`,
            }}
            className={tableFooterCellVariants({ isPinned: isPinned || 'left', isFirstCell, isLastCell })}
          >
            {aggregation && aggregatedValue !== null ? (
              <Statistic value={aggregatedValue} prefix={aggregation.prefix} suffix={aggregation.suffix} precision={aggregation.precision} size="sm" />
            ) : (
              <span className="text-text-positive-weak">—</span>
            )}
          </div>
        );
      })}
    </div>
  );
});
UITableFooterRow.displayName = 'UITableFooterRow';
