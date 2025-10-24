import { memo, useCallback } from 'react';

import { type Column, flexRender, type Header, type HeaderGroup, type Row } from '@tanstack/react-table';
import { LoaderIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import type { VirtualItem } from '@tanstack/react-virtual';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { AnyEntity } from '@/types';
import { useTableContext } from './context';

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
  virtualRow: VirtualItem;
};
const DataTableRow = memo(({ row, virtualRow }: DataTableRowProps) => {
  const { measureElement, onClickRow } = useTableContext();

  const handleRef = useCallback(
    (node: HTMLTableRowElement | null | undefined) => {
      measureElement(node);
    },
    [measureElement]
  );

  const handleClick = useCallback(() => {
    onClickRow?.(row.id);
  }, [row.id, onClickRow]);

  return (
    <TableRow
      tabIndex={onClickRow ? 0 : undefined}
      data-index={virtualRow.index}
      role={onClickRow ? 'button' : undefined}
      ref={handleRef}
      style={{
        transform: `translateY(${virtualRow.start}px)`,
      }}
      onClick={handleClick}
    >
      {row.getVisibleCells().map(cell => {
        const isPinned = cell.column.getIsPinned();
        const isFirstRightPinned = isPinned === 'right' && cell.column.getIsFirstColumn('right');

        return (
          <TableCell
            key={cell.id}
            data-pinned={isPinned || undefined}
            data-last-col={isFirstRightPinned ? 'right' : undefined}
            style={{
              width: cell.id.includes('actions') ? 60 : cell.column.getSize(),
              right: isPinned === 'right' ? `${cell.column.getAfter('right')}px` : undefined,
              position: isPinned ? 'sticky' : 'relative',
              zIndex: isPinned ? 10 : 0,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
});
DataTableRow.displayName = 'DataTableRow';

export const DataTableHeader = memo(({ headerGroups }: { headerGroups: HeaderGroup<AnyEntity>[] }) => {
  return (
    <TableHeader className="sticky top-0 z-10 backdrop-blur-xs bg-background/90">
      {headerGroups.map(headerGroup => (
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
  );
});
DataTableHeader.displayName = 'DataTableHeader';

type DataTableBodyProps = {
  isLoading?: boolean;
  totalBodyHeight?: number;
  rows: Row<AnyEntity>[];
  virtualItems: VirtualItem[];
};
export const DataTableBody = memo(({ isLoading, totalBodyHeight, rows, virtualItems }: DataTableBodyProps) => {
  return (
    <TableBody
      style={{
        height: `${totalBodyHeight}px`, //tells scrollbar how big the table is
      }}
      className={cn(
        isLoading && 'h-36',
        rows?.length === 0 && 'h-48',
        'relative',
        'grid',
        'w-full',
        '[&_tr]:absolute',
        '[&_tr]:flex',
        '[&_tr]:w-full',
        '[&_tr]:cursor-pointer',
        '[&_tr]:focus:outline-none',
        '[&_td]:p-2',
        '[&_td]:py-2.5',
        '[&_td]:align-middle',
        '[&_td]:whitespace-nowrap',
        '[&_td]:flex',
        '[&_td]:overflow-hidden',
        '[&_td]:z-20',
        '[&_td]:data-pinned:bg-background/90'
      )}
    >
      {isLoading && (
        <TableRow className="absolute top-9 flex h-36 w-full items-center justify-center">
          <TableCell>loading...</TableCell>
        </TableRow>
      )}
      {!isLoading && (
        <>
          {virtualItems.map(virtualRow => {
            const row = rows[virtualRow.index];
            const rowId =
              row?.id ||
              (row.original && 'id' in row.original ? String(row.original.id) : null) ||
              (row.original && 'uuid' in row.original ? String(row.original.uuid) : null) ||
              virtualRow.index.toString();
            const key = rowId ?? String(virtualRow.index);
            return <DataTableRow key={key} id={rowId} row={row} virtualRow={virtualRow} />;
          })}
        </>
      )}
    </TableBody>
  );
});
DataTableBody.displayName = 'DataTableBody';

export const DataTable = memo(
  ({
    isFetching,
    children,
  }: React.PropsWithChildren<{
    isFetching?: boolean;
  }>) => {
    return (
      <Table className="w-full! grid border-separate border-spacing-0 [&_td]:border-border [&_th]:border-border [&_th]:border-b [&_th]:border-b-border [&_tfoot_td]:border-t">
        {children}
        {isFetching && (
          <TableFooter className="flex w-full justify-center py-2">
            <LoaderIcon size={16} className="animate-spin" aria-label="Loading more data" />
          </TableFooter>
        )}
      </Table>
    );
  }
);
DataTable.displayName = 'DataTable';
