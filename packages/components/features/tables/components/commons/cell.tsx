'use client';
import { memo, useEffect, useMemo, useRef } from 'react';

import { flexRender } from '@tanstack/react-table';

import { cn } from '@customafk/react-toolkit/utils';

import type { AnyEntity } from '@/types';
import { useUITableInnerTableContext } from '../../hooks/use-context';
import type { TUITableCell } from '../../types';
import { tableCellInnerVariants, tableCellVariants } from '../table.variants';

export const UITableCell = memo<TUITableCell>(
  ({ isPinned = false, isFirstCell = false, isLastCell = false, colId, position = 'start', column, getContext, className, ...props }) => {
    const { table, tableRef } = useUITableInnerTableContext();
    const cellRef = useRef<HTMLDivElement>(null);

    const left = useMemo(() => {
      const axis = column?.getStart('left');
      return isPinned === 'left' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, column]);

    const right = useMemo(() => {
      const axis = column?.getAfter('right');
      return isPinned === 'right' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, column]);

    const width = useMemo(() => {
      return `calc(var(--col-${colId}-size) * 1px)`;
    }, [colId]);

    const minSize = useMemo(() => {
      return column?.columnDef.minSize ? `calc(var(--col-${colId}-minSize) * 1px)` : undefined;
    }, [colId, column]);

    const maxSize = useMemo(() => {
      return column?.columnDef.maxSize ? `calc(var(--col-${colId}-maxSize) * 1px)` : undefined;
    }, [colId, column]);

    const render = useMemo(() => {
      return flexRender(column?.columnDef.cell, getContext());
    }, [column, getContext]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: tableRef is a stable ref object; its `.current` is read for a one-off DOM check, not a reactive value
    useEffect(() => {
      if (!cellRef.current) return;

      const width = cellRef.current.scrollWidth;
      const currentSize = column?.getSize();

      if (currentSize != null && width > currentSize) {
        if (tableRef.current instanceof HTMLTableElement && typeof colId === 'string' && (column?.columnDef.meta as AnyEntity)?.['fitContent']) {
          table.setColumnSizing(old => ({
            ...old,
            [colId]: width + 32,
          }));
        }
      }
    }, [colId, column, table]);

    return (
      <td
        slot="table-body-cell"
        data-pinned={isPinned}
        data-lastcell={isLastCell || undefined}
        data-firstcell={isFirstCell || undefined}
        style={{ left, right, width, minWidth: minSize, maxWidth: maxSize }}
        className={cn(tableCellVariants({ isPinned: isPinned || undefined, isLastCell, isFirstCell }), className)}
        {...props}
      >
        <div ref={cellRef} slot="table-body-cell-inner" className={tableCellInnerVariants({ position })}>
          {render}
        </div>
      </td>
    );
  }
);
UITableCell.displayName = 'UITableCell';
