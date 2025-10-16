import { Activity, memo, useCallback, useEffect, useRef } from 'react';

import { type Column, flexRender, type Header, type Table as ReactTable, type Row } from '@tanstack/react-table';
import { LoaderIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { AnyEntity } from '@/types';

/**
 * Computes styles for pinned columns
 * @param column Table column
 * @returns CSS styles for pinned columns
 */
const getPinningStyles = (column: Column<AnyEntity>): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    ...(!column.getSize() && { flex: 1 }),
    zIndex: isPinned ? 1 : 0,
  };
};

const HeaderContent = memo(({ header }: { header: Header<AnyEntity, unknown> }) => {
  const handleSort = useCallback(
    (e: React.KeyboardEvent) => {
      if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        header.column.getToggleSortingHandler()?.(e);
      }
    },
    [header.column]
  );

  if (header.isPlaceholder) {
    return <div className="flex items-center justify-between gap-2 truncate" />;
  }

  if (header.id === 'actions') return null;

  return (
    <div className="flex items-center justify-between gap-2 truncate">
      <div
        tabIndex={header.column.getCanSort() ? 0 : undefined}
        role={header.column.getCanSort() ? 'button' : undefined}
        className="flex h-full cursor-pointer items-center justify-between select-none"
        onKeyDown={handleSort}
      >
        <span className="truncate">{flexRender(header.column.columnDef.header, header.getContext())}</span>
      </div>
    </div>
  );
});
HeaderContent.displayName = 'HeaderContent';

type DataTableRowProps = {
  id: string;
  row: Row<AnyEntity>;
  measureElement: (element?: HTMLTableRowElement | null | undefined) => void;
  virtualRow: VirtualItem;
  onClickRow?: (id: string) => void;
};
const DataTableRow = memo(({ row, measureElement, virtualRow, onClickRow }: DataTableRowProps) => {
  const handleClick = useCallback(() => {
    onClickRow?.(row.id);
  }, [row.id, onClickRow]);
  return (
    <TableRow
      tabIndex={onClickRow ? 0 : undefined}
      data-index={virtualRow.index}
      role={onClickRow ? 'button' : undefined}
      ref={node => measureElement(node)}
      style={{
        transform: `translateY(${virtualRow.start}px)`,
      }}
      className="absolute flex w-full cursor-pointer focus:outline-none"
      onClick={handleClick}
    >
      {row.getVisibleCells().map(cell => {
        const isPinned = cell.column.getIsPinned();
        const isLastLeftPinned = isPinned === 'left' && cell.column.getIsLastColumn('left');
        const isFirstRightPinned = isPinned === 'right' && cell.column.getIsFirstColumn('right');

        return (
          <TableCell
            key={cell.id}
            data-pinned={isPinned || undefined}
            data-last-col={isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined}
            style={{
              ...getPinningStyles(cell.column),
              width: cell.column.getSize(),
              ...(cell.id.includes('actions') && { width: 60 }),
            }}
            className="flex overflow-hidden py-2.5 z-20 data-pinned:bg-background/90"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
});
DataTableRow.displayName = 'DataTableRow';

interface DataTableProps {
  table: ReactTable<AnyEntity>;
  columnsLength?: number;
  isLoading?: boolean;
  isFetching?: boolean;
  allowFetchMore?: boolean;
  onClickRow?: (id: string) => void;
  onFetchNextPage?: () => void;
}

export const DataTable = memo(({ table, isLoading, isFetching, allowFetchMore = true, onClickRow, onFetchNextPage }: DataTableProps) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();

  // Configure virtualization for performance with large datasets
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 37, // estimated row height
    measureElement: element => element?.getBoundingClientRect().height ?? undefined,
    overscan: 5, // Render additional rows beyond viewport for smoother scrolling
  });

  // Fetch more data when user approaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (refEl: HTMLDivElement | null) => {
      if (!refEl) return;
      const { scrollHeight, scrollTop, clientHeight } = refEl;
      // Threshold of 120px from bottom to trigger load more
      if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && allowFetchMore) {
        onFetchNextPage?.();
      }
    },
    [allowFetchMore, isFetching, onFetchNextPage]
  );

  // Handle scroll events to check if more data should be loaded
  const handleScroll = useCallback(
    (ev: React.UIEvent<HTMLDivElement>) => {
      fetchMoreOnBottomReached(ev.currentTarget);
    },
    [fetchMoreOnBottomReached]
  );

  // Check for more data on mount and when dependencies change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMoreOnBottomReached(tableContainerRef.current);
    }, 100);
    return () => clearTimeout(timer);
  }, [fetchMoreOnBottomReached]);

  return (
    <ScrollArea ref={tableContainerRef} className="border-border bg-background relative w-full overflow-auto" onScroll={handleScroll}>
      <Table
        className={cn(
          '!w-full',
          'grid',
          'border-separate border-spacing-0',
          '[&_td]:border-border',
          '[&_th]:border-border',
          '[&_th]:border-b',
          '[&_th]:border-b-border',
          '[&_tfoot_td]:border-t'
        )}
      >
        <TableHeader className="sticky top-0 z-10 backdrop-blur-xs bg-background/90">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="flex w-full border-none">
              {headerGroup.headers.map(header => {
                const isPinned = header.column.getIsPinned();
                const isLastLeftPinned = isPinned === 'left' && header.column.getIsLastColumn('left');
                const isFirstRightPinned = isPinned === 'right' && header.column.getIsFirstColumn('right');
                const lastColState = isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined;

                const headerStyles = {
                  // width: header.getSize() ?? "100%",
                  ...getPinningStyles(header.column),
                  ...(header.id === 'actions' && { width: 60 }),
                };

                return (
                  <TableHead
                    key={header.id}
                    data-pinned={!!isPinned}
                    data-last-col={lastColState}
                    colSpan={header.colSpan}
                    style={headerStyles}
                    className={cn(
                      'relative flex h-12 font-medium select-none [&>.cursor-col-resize]:last:opacity-0',
                      header.id === 'actions' && 'bg-background/90 z-20'
                    )}
                  >
                    <HeaderContent header={header} />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
          }}
          className={cn('relative grid w-full', isLoading && 'h-36', rows?.length === 0 && 'h-48')}
        >
          <Activity mode={isLoading ? 'visible' : 'hidden'}>
            <TableRow className="absolute top-9 flex h-36 w-full items-center justify-center">
              <TableCell>loading...</TableCell>
            </TableRow>
          </Activity>
          <Activity mode={isLoading ? 'hidden' : 'visible'}>
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index];
              const rowId =
                row?.id ||
                (row.original && 'id' in row.original ? String(row.original.id) : null) ||
                (row.original && 'uuid' in row.original ? String(row.original.uuid) : null);
              return (
                <DataTableRow
                  key={rowId ?? virtualRow.index}
                  id={rowId ?? String(virtualRow.index)}
                  row={row}
                  measureElement={rowVirtualizer.measureElement}
                  virtualRow={virtualRow}
                  onClickRow={onClickRow}
                />
              );
            })}
          </Activity>
        </TableBody>
        <Activity mode={isFetching ? 'visible' : 'hidden'}>
          <TableFooter className="flex w-full justify-center py-2">
            <LoaderIcon size={16} className="animate-spin" aria-label="Loading more data" />
          </TableFooter>
        </Activity>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});
DataTable.displayName = 'DataTable';
