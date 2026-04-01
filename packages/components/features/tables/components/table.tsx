'use client';
import { useMemo, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@customafk/react-toolkit/utils';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { useUITableBodyContext, useUITableContext } from '../hooks/use-context';
import { UITableBody, UITableEmptyDisplay, UITableHead, UITableHeadRow, UITableInnerTable, UITableInnerWrapper, UITableLoadMore, UITableRow } from './common';

export const UITableContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { table, isEmpty, isFetching, fetchMoreData } = useUITableContext();
  const { rowSelectionState } = useUITableBodyContext();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const { rows } = table.getRowModel();

  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length + 1,
    estimateSize: () => 40, // estimated row height
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? element => element?.getBoundingClientRect().height : undefined,
    overscan: 2, // Render additional rows beyond viewport for smoother scrolling
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: rowVirtualizer getTotalSize
  const tableBodyHeight = useMemo(() => {
    const totalSize = rowVirtualizer.getTotalSize();
    const containerHeight = tableContainerRef.current?.clientHeight || 0;
    return totalSize < containerHeight ? `${containerHeight}px` : `${totalSize}px`;
  }, [rowVirtualizer.getTotalSize()]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ direction: table.options.columnResizeDirection }}
      className={cn(
        'relative flex w-full max-w-full flex-1 gap-1 overflow-auto border-t border-t-border bg-slate-50 p-0 text-sm',
        !children && 'border-r border-r-border'
      )}
    >
      <ResizablePanel className="relative">
        <UITableInnerWrapper ref={tableContainerRef}>
          <UITableInnerTable>
            <UITableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <UITableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
              ))}
            </UITableHead>
            <UITableBody height={tableBodyHeight}>
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = rows[virtualRow.index];
                console.log('virtualRow', virtualRow, 'row', row);
                const isSelected = Object.entries(rowSelectionState).some(([k, v]) => k === `${row.id}` && v);
                if (!row) {
                  return (
                    <UITableLoadMore
                      key={virtualRow.index}
                      virtualRowIndex={virtualRow.index}
                      virtualRowStart={virtualRow.start}
                      fetchMoreData={fetchMoreData}
                    />
                  );
                }
                return (
                  <UITableRow
                    key={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    row={row}
                    isSelected={isSelected}
                    virtualRowIndex={virtualRow.index}
                    virtualRowStart={virtualRow.start}
                  />
                );
              })}
            </UITableBody>
          </UITableInnerTable>
          <UITableEmptyDisplay isEmpty={isEmpty} isFetching={isFetching} />
        </UITableInnerWrapper>
      </ResizablePanel>
      {!!children && (
        <>
          <ResizableHandle />
          {children}
        </>
      )}
    </ResizablePanelGroup>
  );
};
