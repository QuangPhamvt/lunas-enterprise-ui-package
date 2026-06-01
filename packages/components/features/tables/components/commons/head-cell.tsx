'use client';
import { memo, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { AnyEntity } from '@/types';

import { PINNED_COLUMN_Z_INDEX } from '../../constants';
import type { TUITableHeadCell } from '../../types';
import { tableHeadCellVariants } from '../table.variants';
import { UITableHeadCellOption } from './head-cell-option';

export const UITableHeadCell = memo<TUITableHeadCell>(
  ({
    isVisible = true,
    isPinned = false,
    isFirstCell = false,
    isLastCell = false,
    isOptionsVisible = true,
    headerId,
    headerColumn,
    className,
    children,
    onColumnPin,
    onToggleVisibility,
    ...props
  }) => {
    const position = (headerColumn?.columnDef.meta as AnyEntity)?.position as 'start' | 'center' | 'end' | undefined;

    const zIndex = useMemo(() => {
      return isPinned ? PINNED_COLUMN_Z_INDEX : undefined;
    }, [isPinned]);

    const left = useMemo(() => {
      const axis = headerColumn?.getStart?.('left');
      return isPinned === 'left' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, headerColumn]);

    const right = useMemo(() => {
      const axis = headerColumn?.getAfter?.('right');
      return isPinned === 'right' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, headerColumn]);

    const width = useMemo(() => {
      return `calc(var(--header-${headerId}-size) * 1px)`;
    }, [headerId]);

    const minSize = useMemo(() => {
      return headerColumn?.columnDef.minSize ? `calc(var(--col-${headerId}-minSize) * 1px)` : undefined;
    }, [headerId, headerColumn]);

    const maxSize = useMemo(() => {
      return headerColumn?.columnDef.maxSize ? `calc(var(--col-${headerId}-maxSize) * 1px)` : undefined;
    }, [headerId, headerColumn]);

    return (
      <th
        slot="table-head-cell"
        data-pinned={isPinned}
        data-header={headerId}
        style={{ zIndex, left, right, width, minWidth: minSize, maxWidth: maxSize }}
        className={cn(
          tableHeadCellVariants({
            isPinned: isPinned || 'false',
            isActions: headerId === 'actions',
            isLastCell,
            isFirstCell,
            position,
          }),
          className
        )}
        {...props}
      >
        <div className="truncate px-4">{children}</div>
        {isOptionsVisible && (
          <UITableHeadCellOption isPinned={isPinned} isVisible={isVisible} onLeftPin={onColumnPin} onRightPin={onColumnPin} onUnpin={onColumnPin} />
        )}
      </th>
    );
  }
);
UITableHeadCell.displayName = 'UITableHeadCell';
