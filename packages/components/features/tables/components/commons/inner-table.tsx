'use client';
import { memo, useEffect } from 'react';

import { ACTION_WIDTH, SELECT_WIDTH } from '../../constants';
import { useUITableInnerTableContext } from '../../hooks/use-context';
import type { TUITableInnerTable } from '../../types';
import { tableInnerTableVariants } from '../table.variants';

export const UITableInnerTable = memo<TUITableInnerTable>(({ children, ...props }) => {
  const { table, innerTableId, totalSize, tableRef, columnPinningState } = useUITableInnerTableContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: table element.
  useEffect(() => {
    if (!tableRef.current) return;

    const headers = table.getFlatHeaders();

    let rafId: number | undefined;
    const observer = new ResizeObserver(entries => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const tableElement = entry.target;
        if (!(tableElement instanceof HTMLTableElement)) return;
        const tableContentRectWidth = entry.contentRect.width;

        const { left: leftColumnPinning = [], right: rightColumnPinning = [] } = table.getState().columnPinning;

        let pinnedWidth: number = 0;
        let flexibleColumnsCount: number = 0;
        let fixedSizeTotal: number = 0;
        const columnSpecs = headers.map(header => {
          const { id } = header;
          const isSpecial = id === 'select' || id === 'actions';
          const isPinned = leftColumnPinning.includes(id) || rightColumnPinning.includes(id);
          const size = header.getSize();
          const maxSize = header.column.columnDef.maxSize;

          if (isSpecial) {
            const width = id === 'select' ? SELECT_WIDTH : ACTION_WIDTH;
            pinnedWidth += width;
            return { id, isFlex: false, width };
          }

          if (isPinned) {
            pinnedWidth += size;
            return { id, isFlex: false, width: size };
          }

          if (header.column.columnDef.size || size !== 150) {
            fixedSizeTotal += size;
            return { id, isFlex: false, width: size };
          }

          flexibleColumnsCount++;
          return { id, isFlex: true, maxSize };
        });

        const remainingWidth = tableContentRectWidth - pinnedWidth - fixedSizeTotal;
        const rawFlexWidth = flexibleColumnsCount > 0 ? Math.max(0, Math.floor(remainingWidth / flexibleColumnsCount)) : 0;

        const scrollHost = tableElement.closest<HTMLElement>('[data-slot="table-scroll-host"]');

        columnSpecs.forEach(col => {
          if (col.isFlex) {
            const finalWidth = col.maxSize ? Math.min(rawFlexWidth, col.maxSize) : rawFlexWidth;
            tableElement.style.setProperty(`--header-${col.id}-size`, `${finalWidth}`);
            tableElement.style.setProperty(`--col-${col.id}-size`, `${finalWidth}`);
            scrollHost?.style.setProperty(`--col-${col.id}-size`, `${finalWidth}`);
            if (col.maxSize) {
              tableElement.style.setProperty(`--col-${col.id}-maxSize`, `${col.maxSize}`);
            }
          } else {
            tableElement.style.setProperty(`--header-${col.id}-size`, `${col.width}`);
            tableElement.style.setProperty(`--col-${col.id}-size`, `${col.width}`);
            scrollHost?.style.setProperty(`--col-${col.id}-size`, `${col.width}`);
          }
        });

        // Pinned columns are always non-flex, so their real width is already known here.
        // Compute sticky offsets from these actual widths rather than TanStack's own
        // `getStart`/`getAfter`, which use `column.getSize()` (defaults to 150px) and drift
        // from what's actually on screen.
        const widthById = new Map(columnSpecs.map(col => [col.id, col.isFlex ? Math.min(rawFlexWidth, col.maxSize ?? rawFlexWidth) : col.width]));

        let cumulativeLeft = 0;
        for (const id of leftColumnPinning) {
          tableElement.style.setProperty(`--col-${id}-left`, `${cumulativeLeft}`);
          scrollHost?.style.setProperty(`--col-${id}-left`, `${cumulativeLeft}`);
          cumulativeLeft += widthById.get(id) ?? 0;
        }

        let cumulativeRight = 0;
        for (let i = rightColumnPinning.length - 1; i >= 0; i--) {
          const id = rightColumnPinning[i];
          tableElement.style.setProperty(`--col-${id}-right`, `${cumulativeRight}`);
          scrollHost?.style.setProperty(`--col-${id}-right`, `${cumulativeRight}`);
          cumulativeRight += widthById.get(id) ?? 0;
        }
      });
    });
    observer.observe(tableRef.current);
    return () => {
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [table.getState().columnSizingInfo, table.getState().columnSizing, columnPinningState]);

  return (
    <table id={innerTableId} ref={tableRef} slot="table-inner-table" className={tableInnerTableVariants()} style={{ minWidth: totalSize }} {...props}>
      {children}
    </table>
  );
});
UITableInnerTable.displayName = 'UITableInnerTable';
