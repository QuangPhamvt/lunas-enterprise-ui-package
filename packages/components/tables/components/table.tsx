'use client';
import { memo, useCallback, useRef } from 'react';

import { type Column, flexRender, type Row } from '@tanstack/react-table';
import { BoxIcon, EllipsisVerticalIcon, PinIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AnyEntity } from '@/types';
import { useTableContext } from '../hooks/use-table-context';

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
//View the index.css file for more needed styles such as border-collapse: separate
const getCommonPinningStyles = (column: Column<unknown>): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    // boxShadow: isLastLeftPinnedColumn ? '-4px 0 4px -4px gray inset' : isFirstRightPinnedColumn ? '4px 0 4px -4px gray inset' : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
  };
};

export const TableWrapper: React.FC<React.PropsWithChildren<React.ComponentProps<'div'>>> = ({ className, children, ...props }) => {
  return (
    <div data-slot="table-wrapper" className={cn('relative m-0 flex size-full flex-col flex-nowrap items-start justify-start gap-2 py-2.5 text-sm')} {...props}>
      {children}
    </div>
  );
};

export const TableContainer: React.FC<React.PropsWithChildren> = () => {
  const { table, columnSizeVars, isEmpty } = useTableContext();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: table.getRowModel().rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40, // estimated row height
    measureElement: element => element?.getBoundingClientRect().height,
    overscan: 2, // Render additional rows beyond viewport for smoother scrolling
  });

  const handleRef = useCallback(
    (node: HTMLTableRowElement | null | undefined) => {
      rowVirtualizer.measureElement(node);
    },
    [rowVirtualizer]
  );

  return (
    <div
      data-slot="table-container"
      ref={tableContainerRef}
      style={{ direction: table.options.columnResizeDirection }}
      className="relative flex w-full flex-1 flex-col gap-1 overflow-auto border-t border-t-border p-0 text-sm"
    >
      <table
        data-slot="table"
        style={{
          ...columnSizeVars,
          width: table.getTotalSize(),
        }}
        className="grid w-full caption-bottom border-separate border-spacing-0 flex-col text-sm [&_tfoot_td]:border-t"
      >
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHeaderCell
                    key={header.id}
                    data-pinned={header.column.getIsPinned() ? header.column.getIsPinned() : 'false'}
                    width={`calc(var(--header-${header?.id}-size) * 1px)`}
                    style={{ ...getCommonPinningStyles(header.column) }}
                    colSpan={header.colSpan}
                  >
                    <div className="flex size-full items-center justify-between gap-1 truncate">
                      <div
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                        role={header.column.getCanSort() ? 'button' : undefined}
                        className="flex h-full flex-1 cursor-pointer select-none items-center justify-between"
                      >
                        <p className="truncate">{flexRender(header.column.columnDef.header, header.getContext())}</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="cursor-pointer rounded-full p-0.5 text-text-positive-weak hover:bg-muted-muted hover:text-text-positive [&>svg]:size-4">
                              <EllipsisVerticalIcon />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-42">
                            <DropdownMenuGroup>
                              <DropdownMenuItem className="px-2 py-1">
                                Pin Left
                                <DropdownMenuShortcut>
                                  <PinIcon className="size-4" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                        }}
                        className={cn('h-full w-0.5 cursor-grab bg-muted-muted hover:bg-muted-weak', header.column.getIsResizing() && 'bg-muted-weak')}
                      />
                    </div>
                  </TableHeaderCell>
                );
              })}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody data-slot="table-body" height={rowVirtualizer.getTotalSize()}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const rows: Row<AnyEntity>[] = table.getRowModel().rows;
            const row = rows[virtualRow.index];
            const rowId =
              row?.id ||
              (row?.original?.id ? String(row.original.id) : null) ||
              (row?.original?.uuid ? String(row.original.uuid) : null) ||
              virtualRow.index.toString();
            return <TableRow key={rowId.toString()} id={rowId} row={row} virtualRow={virtualRow} handleRef={handleRef} />;
          })}
        </TableBody>
      </table>
      {isEmpty && <EmptyDisplay />}
    </div>
  );
};

const TableHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        'sticky top-0 z-10 grid bg-muted-muted/80 font-medium text-text-positive-weak backdrop-blur-xs',
        '[&_tr:not(:last-child)_td]:border-b',
        '[&_th>.cursor-col-resize]:last:opacity-0',
        '[&_th]:flex',
        '[&_th]:h-10',
        '[&_th]:select-none',
        '[&_th]:items-center',
        '[&_th]:whitespace-nowrap',
        '[&_th]:border-border',
        '[&_th]:border-r',
        '[&_th]:border-b',
        '[&_th]:border-b-border',
        '[&_th]:text-left',
        '[&_th]:align-middle',
        '[&_th]:last:border-r-0',
        '[&_th]:data-[pinned=right]:border-l',
        '[&_th]:data-[pinned=left]:border-r',
        '[&_tr_th:not([data-pinned=false])]:bg-muted-muted'
      )}
    >
      {children}
    </thead>
  );
};

const TableHeaderRow: React.FC<React.PropsWithChildren> = memo(({ children }) => {
  return (
    <tr data-slot="table-header-row" className="flex w-full border-none">
      {children}
    </tr>
  );
});
TableHeaderRow.displayName = 'TableHeaderRow';

const TableHeaderCell: React.FC<React.PropsWithChildren<React.ComponentProps<'th'> & { width: number | string }>> = memo(
  ({ style, width, children, ...props }) => {
    return (
      <th data-slot="table-header-cell" style={{ ...style, width }} className="pl-4" {...props}>
        {children}
      </th>
    );
  }
);
TableHeaderCell.displayName = 'TableHeaderCell';

const TableBody: React.FC<React.PropsWithChildren<React.ComponentProps<'tbody'> & { height: number }>> = ({ height, children, ...props }) => {
  return (
    <tbody
      data-slot="table-body"
      style={{ height: `${height}px` }}
      className={cn(
        'relative grid w-full',
        '[&_td]:z-20',
        '[&_td]:flex',
        '[&_td]:overflow-hidden',
        '[&_td]:whitespace-nowrap',
        '[&_td]:px-4',
        '[&_td]:py-2.5',
        '[&_td]:align-middle',
        '[&_td]:border-border',
        '[&_td]:data-[pinned=right]:border-l',
        '[&_td]:data-[pinned=left]:border-r',
        '[&_td:not([data-pinned=false])]:bg-card',
        '[&_td:not([data-pinned=false])]:shadow-xs',
        '[&_tr]:absolute [&_tr]:flex [&_tr]:w-full [&_tr]:cursor-pointer [&_tr]:border-b [&_tr]:border-b-border [&_tr]:focus:outline-none'
      )}
      {...props}
    >
      {children}
    </tbody>
  );
};

type TableRowProps = {
  id: string;
  row: Row<AnyEntity>;
  virtualRow: VirtualItem;
  handleRef: (node: HTMLTableRowElement | null | undefined) => void;
};
const TableRow: React.FC<TableRowProps> = memo(({ row, virtualRow, handleRef }) => {
  return (
    <tr
      data-slot="table-row"
      ref={handleRef}
      data-index={virtualRow.index}
      style={{
        transform: `translateY(${virtualRow.start}px)`,
      }}
    >
      {row.getVisibleCells().map(({ id, column, getContext }) => {
        return (
          <TableCell
            data-pinned={column.getIsPinned() ? column.getIsPinned() : 'false'}
            key={id}
            width={`calc(var(--col-${column.id}-size) * 1px)`}
            style={{ ...getCommonPinningStyles(column) }}
          >
            {flexRender(column.columnDef.cell, getContext())}
          </TableCell>
        );
      })}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

const EmptyDisplay: React.FC = () => {
  return (
    <div className="sticky left-0 flex flex-1 items-center justify-center bg-transparent text-text-positive-weak opacity-100">
      <div className="flex flex-col items-center gap-1">
        <BoxIcon strokeWidth={1} size={48} />
        <p>No data available</p>
      </div>
    </div>
  );
};

const TableCell: React.FC<React.PropsWithChildren<React.ComponentProps<'td'> & { width: string }>> = memo(({ width, style, children, ...props }) => {
  return (
    <td data-slot="table-cell" style={{ width, ...style }} {...props}>
      {children}
    </td>
  );
});
TableCell.displayName = 'TableCell';

export const TableFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <tfoot data-slot="table-footer" className="flex w-full justify-center border-border-weak border-t py-2 font-medium [&>tr]:last:border-b-0">
      {children}
    </tfoot>
  );
};
