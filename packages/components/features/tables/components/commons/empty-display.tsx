'use client';
import { memo } from 'react';

import { BoxIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { useUITableContext } from '../../hooks/use-context';
import type { TUITableEmptyDisplay } from '../../types';
import {
  tableBodyVariants,
  tableCellActionsVariants,
  tableCellInnerVariants,
  tableCellSelectVariants,
  tableCellVariants,
  tableEmptyDisplayVariants,
  tableRowVariants,
} from '../table.variants';
import { PINNED_COLUMN_Z_INDEX, SELECT_WIDTH } from '../../constants';
import type { AnyEntity } from '@/types';

export const UITableLoadingDisplay = memo<TUITableEmptyDisplay>(() => {
  const { table, isFetching, isRefetching, loadingDisplayRow = 3 } = useUITableContext();
  if (!isFetching && !isRefetching) return null;
  return (
    <tbody className={cn(tableBodyVariants(), 'pointer-events-none')}>
      {Array.from({ length: loadingDisplayRow }).map((_, index) => (
        <tr key={index} data-slot="table-row" data-index={index} className={cn(tableRowVariants(), 'animate-pulse relative!')}>
          {table.getAllColumns().map((column, _index) => {
            const isPinned = column.getIsPinned();
            const leftAxis = column.getStart('left');
            const rightAxis = column.getAfter('right');
            if (column.id === 'actions') {
              return (
                <td
                  key={`${column.id}-${_index}`}
                  data-slot="table-body-cell"
                  data-col={column.id}
                  data-cell={_index}
                  style={{
                    width: 60,
                  }}
                  className={tableCellActionsVariants()}
                >
                  <div className="w-full h-4 bg-muted-muted rounded-full" />
                </td>
              );
            }
            if (column.id === 'select') {
              return (
                <td
                  key={`${column.id}-${index}`}
                  data-slot="table-body-cell"
                  data-col={column.id}
                  data-cell={_index}
                  data-pinned={true}
                  style={{
                    left: 0,
                    zIndex: 20,
                    width: SELECT_WIDTH,
                    maxWidth: SELECT_WIDTH,
                  }}
                  className={tableCellSelectVariants({ isPinned: 'left' })}
                >
                  <div className="w-full flex justify-center">
                    <div className="size-4 bg-muted-muted rounded-full" />
                  </div>
                </td>
              );
            }
            return (
              <td
                key={`${column.id}-${_index}`}
                data-col={column.id}
                data-cell={_index}
                data-selected={undefined}
                data-lastcell={column.id === table.getAllColumns()[table.getAllColumns().length - 1].id || undefined}
                data-firstcell={column.id === table.getAllColumns()[0].id || undefined}
                style={{
                  zIndex: isPinned ? PINNED_COLUMN_Z_INDEX : 0,
                  left: isPinned === 'left' && typeof leftAxis === 'number' ? `${leftAxis}px` : undefined,
                  right: isPinned === 'right' && typeof rightAxis === 'number' ? `${rightAxis}px` : undefined,
                  width: `calc(var(--col-${column.id}-size) * 1px)`,
                  minWidth: column.columnDef.minSize ? `calc(var(--col-${column.id}-minSize) * 1px)` : undefined,
                  maxWidth: column.columnDef.maxSize ? `calc(var(--col-${column.id}-maxSize) * 1px)` : undefined,
                }}
                className={tableCellVariants({
                  isPinned: column.getIsPinned(),
                  isFirstCell: column.id === table.getRightHeaderGroups()[0]?.headers[0]?.id,
                  isLastCell: column.id === table.getLeftHeaderGroups()[0]?.headers[table.getLeftHeaderGroups()[0].headers.length - 1]?.id,
                })}
              >
                <div
                  className={tableCellInnerVariants({
                    position: (column.columnDef.meta as AnyEntity)?.position ?? 'start',
                  })}
                >
                  <div className="w-full h-4 bg-muted-muted rounded-full" />
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
});

export const UITableEmptyDisplay = memo<TUITableEmptyDisplay>(() => {
  const { isEmpty, emptyDisplayHeight } = useUITableContext();
  if (!isEmpty) return null;
  return (
    <>
      {isEmpty && (
        <div className={tableEmptyDisplayVariants()} style={{ minHeight: emptyDisplayHeight ?? '24rem' }}>
          <div className="flex flex-col items-center gap-1">
            <BoxIcon strokeWidth={1} size={48} />
            <p>No data available</p>
          </div>
        </div>
      )}
    </>
  );
});
UITableEmptyDisplay.displayName = 'UITableEmptyDisplay';
