'use client';
import { memo } from 'react';

import { flexRender } from '@tanstack/react-table';

import { cn } from '@customafk/react-toolkit/utils';

import { useUITableHeadRowContext } from '../../hooks/use-context';
import type { TUITableHeadRow } from '../../types';
import { tableHeadRowVariants } from '../table.variants';
import { UITableHeadCell } from './head-cell';
import { UITableHeadCellSelect } from './head-cell-select';

export const UITableHeadRow = memo<TUITableHeadRow>(({ headerGroup, className, ...props }) => {
  const { isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onToggleAllRowsSelected } = useUITableHeadRowContext();
  const firstRightPinnedHeaderId = rightPinnedHeaders[0]?.id;
  const lastLeftPinnedHeaderId = leftPinnedHeaders[leftPinnedHeaders.length - 1]?.id;
  return (
    <tr slot="table-head-row" className={cn(tableHeadRowVariants(), className)} {...props}>
      {headerGroup.headers.map((header, index) => {
        const isVisible = header.column.getIsVisible();
        const isPinned = columnPinningState.left?.includes(header.id) ? 'left' : columnPinningState.right?.includes(header.id) ? 'right' : false;
        if (header.id === 'select') {
          return (
            <UITableHeadCellSelect
              key={header.id}
              isPinned={isPinned}
              isLastCell={header.id === lastLeftPinnedHeaderId}
              isAllRowsSelected={isAllRowsSelected}
              onToggleAllRowsSelected={onToggleAllRowsSelected}
            />
          );
        }
        return (
          <UITableHeadCell
            key={`${header.id}-${index}`}
            isVisible={isVisible}
            isPinned={isPinned}
            isFirstCell={header.id === firstRightPinnedHeaderId}
            isLastCell={header.id === lastLeftPinnedHeaderId}
            isOptionsVisible={!['select', 'actions'].includes(header.id)}
            headerId={header.id}
            headerColumn={header.column}
            colSpan={header.colSpan}
            onColumnPin={header.column.pin}
            onToggleVisibility={header.column.toggleVisibility}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </UITableHeadCell>
        );
      })}
    </tr>
  );
});
UITableHeadRow.displayName = 'UITableHeadRow';
