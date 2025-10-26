'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';
import { Flex } from '../layouts/flex';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { TableProvider } from './context';
import { DataTable, DataTableBody, DataTableHeader } from './data-table';
import { DataTableToolip } from './data-table-tooltip';

type Props<T> = {
  data: T[];
  totalCount?: number;
  isLoading?: boolean;
  isFetching?: boolean;
  allowLoadMore?: boolean;
  columns: ColumnDef<T>[];
  onAdd?: () => void;
  onRefresh?: () => void;
  onClickRow?: (id: string) => void;
  onFetchNextPage?: () => void;
};
export function Table<T extends Record<string, unknown>>({
  data,
  totalCount,
  isLoading,
  isFetching,
  allowLoadMore: isAllowFetchMore = false,
  columns,
  onAdd,
  onRefresh,
  onClickRow,
  onFetchNextPage,
}: Props<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const initialState = useMemo(
    () => ({
      columnPinning: { right: ['actions', 'update', 'delete'] },
    }),
    []
  );

  const state = useMemo(() => {
    return {
      rowSelection,
      sorting,
      columnVisibility,
      columnFilters,
    };
  }, [rowSelection, sorting, columnVisibility, columnFilters]);

  const handleGetRowId = useCallback((row: T) => {
    return (row.id as string) || (row.uuid as string);
  }, []);

  const table = useReactTable<T>({
    initialState,
    data,
    columns,
    rowCount: totalCount,
    columnResizeMode: 'onChange',
    enableColumnResizing: false,
    enableMultiRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: handleGetRowId,
    state: state,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
  });

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 37, // estimated row height
    measureElement: element => element?.getBoundingClientRect().height ?? undefined,
    overscan: 5, // Render additional rows beyond viewport for smoother scrolling
  });

  // Fetch more data when user approaches bottom of table
  const handleFetchMoreOnBottomReached = useCallback(
    (refEl: HTMLDivElement | null) => {
      if (!refEl) return;
      const { scrollHeight, scrollTop, clientHeight } = refEl;
      // Threshold of 120px from bottom to trigger load more
      if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && isAllowFetchMore) {
        onFetchNextPage?.();
      }
    },
    [isAllowFetchMore, isFetching, onFetchNextPage]
  );

  // Handle scroll events to check if more data should be loaded
  const handleScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      handleFetchMoreOnBottomReached(ev.currentTarget);
    },
    [handleFetchMoreOnBottomReached]
  );

  // Check for more data on mount and when dependencies change
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFetchMoreOnBottomReached(tableContainerRef.current);
    }, 100);
    return () => clearTimeout(timer);
  }, [handleFetchMoreOnBottomReached]);

  return (
    <Flex vertical wrap={false} gap="sm" align="start" className="size-full pt-1">
      <DataTableToolip onAdd={onAdd} onRefresh={onRefresh} />
      <Flex padding="none" vertical wrap={false} width="full" className="flex-1 overflow-auto pb-4">
        <ScrollArea ref={tableContainerRef} className="relative w-full overflow-auto border-border bg-background" onScroll={handleScroll}>
          <TableProvider measureElement={rowVirtualizer.measureElement} onClickRow={onClickRow}>
            <DataTable isFetching={isFetching}>
              <DataTableHeader headerGroups={table.getHeaderGroups()} />
              <DataTableBody
                isLoading={isLoading}
                rows={table.getRowModel().rows}
                totalBodyHeight={rowVirtualizer.getTotalSize()}
                virtualItems={rowVirtualizer.getVirtualItems()}
              />
            </DataTable>
          </TableProvider>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Flex>
    </Flex>
  );
}
