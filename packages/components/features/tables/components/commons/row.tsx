'use client';
import { memo, useCallback, useMemo } from 'react';

import type { AnyEntity } from '@/types';
import { useUITableRowContext } from '../../hooks/use-context';
import type { TUITableRow } from '../../types';
import { tableRowVariants } from '../table.variants';
import { UITableCell } from './cell';
import { UITableCellActions } from './cell-actions';
import { UITableCellSelect } from './cell-select';

export const UITableRow = memo<TUITableRow>(({ row, isSelected, rowIndex, children, ...props }) => {
  const { keyOfClickRow, isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onClickRow } = useUITableRowContext();

  const pinnedLeftColumns = useMemo(() => columnPinningState.left ?? [], [columnPinningState]);
  const pinnedRightColumns = useMemo(() => columnPinningState.right ?? [], [columnPinningState]);
  const firstRightPinnedHeaderId = useMemo(() => rightPinnedHeaders?.[0]?.id, [rightPinnedHeaders]);
  const lastLeftPinnedHeaderId = useMemo(() => leftPinnedHeaders?.[leftPinnedHeaders.length - 1]?.id, [leftPinnedHeaders]);

  const hasSelectColumn = useMemo(() => row.getVisibleCells().some(c => c.column.id === 'select'), [row]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLTableRowElement>>(
    e => {
      if (onClickRow) {
        const value = keyOfClickRow ? row.original?.[keyOfClickRow] : undefined;
        onClickRow(rowIndex, typeof value === 'string' || typeof value === 'number' ? value : undefined);
      } else if (hasSelectColumn) {
        row.toggleSelected();
      }
      e.preventDefault();
      e.stopPropagation();
    },
    [keyOfClickRow, onClickRow, row, rowIndex, hasSelectColumn]
  );

  return (
    <tr slot="table-row" data-index={rowIndex} className={tableRowVariants()} onClick={handleClick} {...props}>
      {row.getVisibleCells().map((cell, index) => {
        const isPinnedLeft = pinnedLeftColumns.includes(cell.column.id);
        const isPinnedRight = pinnedRightColumns.includes(cell.column.id);
        const isPinned = isPinnedLeft ? 'left' : isPinnedRight ? 'right' : false;
        if (cell.column.id === 'actions') {
          return (
            <UITableCellActions
              key={`${cell.id}-${index}`}
              data-col={cell.column.id}
              data-cell={rowIndex}
              data-selected={isSelected || undefined}
              column={cell.column}
              getContext={cell.getContext}
            />
          );
        }
        if (cell.column.id === 'select') {
          return (
            <UITableCellSelect
              key={`${cell.id}-${index}`}
              data-col={cell.column.id}
              data-cell={rowIndex}
              data-selected={isSelected || undefined}
              isPinned={isPinned}
              isLastCell={cell.column.id === lastLeftPinnedHeaderId}
              isSelected={isAllRowsSelected || isSelected}
              onToggleRowSelected={cell.row.toggleSelected}
            />
          );
        }
        return (
          <UITableCell
            key={`${cell.id}-${index}`}
            data-col={cell.column.id}
            data-cell={rowIndex}
            data-selected={isSelected || undefined}
            isPinned={isPinned}
            isFirstCell={cell.column.id === firstRightPinnedHeaderId}
            isLastCell={cell.column.id === lastLeftPinnedHeaderId}
            colId={cell.column.id}
            position={(cell.column.columnDef.meta as AnyEntity)?.position ?? 'start'}
            column={cell.column}
            getContext={cell.getContext}
          />
        );
      })}
    </tr>
  );
});
UITableRow.displayName = 'UITableRow';
