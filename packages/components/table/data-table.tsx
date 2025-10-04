import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { type Column, flexRender, type Header, type Table as ReactTable, type Row } from '@tanstack/react-table';
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, ChevronDown, ChevronUp, EllipsisIcon, LoaderIcon, PinOffIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
    zIndex: isPinned ? 1 : 0,
  };
};

const SortingIndicator = memo(({ column }: { column: Column<AnyEntity> }) => {
  const sortDirection = column.getIsSorted();

  const icons = useMemo(
    () => ({
      asc: <ChevronUp className="shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />,
      desc: <ChevronDown className="shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />,
    }),
    []
  );

  return sortDirection ? icons[sortDirection] : null;
});

SortingIndicator.displayName = 'SortingIndicator';

const PinControls = memo(({ column }: { column: Column<AnyEntity> }) => {
  const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : 'Column';

  const handleUnpin = useCallback(() => column.pin(false), [column]);
  const handlePinLeft = useCallback(() => column.pin('left'), [column]);
  const handlePinRight = useCallback(() => column.pin('right'), [column]);

  if (!column.getCanPin()) return null;

  if (column.getIsPinned()) {
    return (
      <Button
        size="icon"
        variant="ghost"
        color="secondary"
        className="hover:[&_svg]:text-secondary-foreground -mr-1 size-7 shadow-none"
        aria-label={`Unpin ${columnHeader} column`}
        title={`Unpin ${columnHeader} column`}
        onClick={handleUnpin}
      >
        <PinOffIcon className="opacity-60" size={16} aria-hidden="true" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          color="secondary"
          className="size-7 shadow-none"
          aria-label={`Pin options for ${columnHeader} column`}
          title={`Pin options for ${columnHeader} column`}
        >
          <EllipsisIcon className="opacity-60" size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePinLeft}>
          <ArrowLeftToLineIcon size={16} className="opacity-60" aria-hidden="true" />
          Stick to left
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePinRight}>
          <ArrowRightToLineIcon size={16} className="opacity-60" aria-hidden="true" />
          Stick to right
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

PinControls.displayName = 'PinControls';

const HeaderContent = memo(({ header }: { header: Header<AnyEntity, unknown> }) => {
  const { column } = header;

  const handleSort = useCallback(
    (e: React.KeyboardEvent) => {
      if (column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        column.getToggleSortingHandler()?.(e);
      }
    },
    [column]
  );

  const toggleSortHandler = column.getToggleSortingHandler();

  if (header.isPlaceholder) {
    return <div className="flex items-center justify-between gap-2 truncate" />;
  }

  return (
    <div className="flex items-center justify-between gap-2 truncate">
      <div
        onClick={toggleSortHandler}
        onKeyDown={handleSort}
        tabIndex={column.getCanSort() ? 0 : undefined}
        role={column.getCanSort() ? 'button' : undefined}
        className={cn(column.getCanSort() && 'flex h-full cursor-pointer items-center justify-between gap-2 select-none')}
      >
        <span className="truncate">{flexRender(column.columnDef.header, header.getContext())}</span>
        <SortingIndicator column={column} />
      </div>
      <PinControls column={column} />
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
    if (!onClickRow) return;
    onClickRow(row.id);
  }, [row.id, onClickRow]);
  return (
    <TableRow
      data-index={virtualRow.index}
      ref={node => measureElement(node)}
      className="absolute flex w-full cursor-pointer focus:outline-none"
      style={{
        transform: `translateY(${virtualRow.start}px)`,
      }}
      onClick={handleClick}
      tabIndex={onClickRow ? 0 : undefined}
      role={onClickRow ? 'button' : undefined}
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
            }}
            className={cn(
              'flex overflow-hidden py-2.5',
              'data-pinned:bg-background/90',
              '[&[data-pinned][data-last-col]]:border-border-weak',
              '[&[data-pinned=left][data-last-col=left]]:border-r',
              '[&[data-pinned=right][data-last-col=right]]:border-l'
            )}
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

export const DataTable = ({ table, isLoading, isFetching, allowFetchMore = true, onClickRow, onFetchNextPage }: DataTableProps) => {
  // 'use no memo'

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
    <ScrollArea ref={tableContainerRef} className="border-border-weak bg-background relative w-full overflow-auto rounded-lg border" onScroll={handleScroll}>
      <Table
        className={cn(
          '!w-full',
          'grid',
          'border-separate border-spacing-0',
          '[&_td]:border-border-weak',
          '[&_th]:border-border-weak',
          '[&_th]:border-b',
          '[&_th]:border-b-border-weak',
          '[&_tfoot_td]:border-t'
        )}
      >
        <TableHeader className="sticky top-0 z-10 backdrop-blur-xs">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="flex w-full border-none">
              {headerGroup.headers.map(header => {
                const { column } = header;
                const isPinned = column.getIsPinned();
                const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
                const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');
                const pinningState = isPinned || undefined;
                const lastColState = isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined;

                const headerStyles = {
                  width: header.getSize(),
                  ...getPinningStyles(header.column),
                };

                return (
                  <TableHead
                    key={header.id}
                    data-pinned={pinningState}
                    data-last-col={lastColState}
                    className={cn(
                      'relative flex h-9 font-semibold select-none',
                      'data-pinned:backdrop-blur-xs',
                      'data-pinned:bg-muted-weak',
                      '[&>.cursor-col-resize]:last:opacity-0',
                      '[&[data-pinned][data-last-col]]:border-border-weak',
                      '[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0',
                      '[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0',
                      '[&[data-pinned=left][data-last-col=left]]:border-r',
                      '[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0',
                      '[&[data-pinned=right][data-last-col=right]]:border-l'
                    )}
                    colSpan={header.colSpan}
                    style={headerStyles}
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
          {isLoading ? (
            <TableRow className="absolute top-9 flex h-36 w-full items-center justify-center">
              <TableCell>loading...</TableCell>
            </TableRow>
          ) : (
            <>
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
            </>
          )}
        </TableBody>
        {isFetching && (
          <TableFooter>
            <div className="flex w-full justify-center py-2">
              <LoaderIcon size={16} className="animate-spin" aria-label="Loading more data" />
            </div>
          </TableFooter>
        )}
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
