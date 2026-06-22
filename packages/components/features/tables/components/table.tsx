'use client';
import { useMemo, useRef } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { useUITableBodyContext, useUITableContext } from '../hooks/use-context';
import { UITableBody, UITableEmptyDisplay, UITableHead, UITableHeadRow, UITableInnerTable, UITableInnerWrapper, UITableLoadMore, UITableRow } from './common';
import { UITableLoadingDisplay } from './commons/empty-display';

export const UITableContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { table, fetchMoreData } = useUITableContext();
  const { rowSelectionState } = useUITableBodyContext();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const { rows } = table.getRowModel();

  // Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    // Only add the extra load-more slot when pagination is active; otherwise the
    // virtualizer allocates a phantom 40 px gap at the bottom of every table.
    count: rows.length + (fetchMoreData ? 1 : 0),
    estimateSize: () => 40,
    getScrollElement: () => tableContainerRef.current,
    // Measure dynamic row height, except in Firefox which measures table border height incorrectly.
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? element => element?.getBoundingClientRect().height : undefined,
    overscan: 2,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: rowVirtualizer getTotalSize
  const tableBodyHeight = useMemo(() => {
    return `${rowVirtualizer.getTotalSize()}px`;
  }, [rowVirtualizer.getTotalSize()]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ direction: table.options.columnResizeDirection }}
      className="relative flex w-full max-w-full flex-1 gap-1 overflow-auto border-t border-t-border border-r border-r-border p-0 text-sm"
    >
      <ResizablePanel data-slot="table-scroll-host" className="relative flex flex-col">
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

                // Load-more sentinel: row is undefined when index === rows.length.
                // Guard isSelected here to avoid matching rowSelectionState["undefined"].
                if (!row && fetchMoreData) {
                  return (
                    <UITableLoadMore key={virtualRow.key} virtualRowIndex={virtualRow.index} virtualRowStart={virtualRow.start} fetchMoreData={fetchMoreData} />
                  );
                }

                // O(1) lookup; TanStack row ids are already strings.
                const isSelected = rowSelectionState[row.id] === true;

                return (
                  <UITableRow
                    key={virtualRow.key}
                    ref={rowVirtualizer.measureElement}
                    row={row}
                    isSelected={isSelected}
                    virtualRowIndex={virtualRow.index}
                    virtualRowStart={virtualRow.start}
                  />
                );
              })}
            </UITableBody>
            <UITableLoadingDisplay />
          </UITableInnerTable>
          <UITableEmptyDisplay />
        </UITableInnerWrapper>
      </ResizablePanel>
      {children && (
        <>
          <ResizableHandle />
          {children}
        </>
      )}
    </ResizablePanelGroup>
  );
};
