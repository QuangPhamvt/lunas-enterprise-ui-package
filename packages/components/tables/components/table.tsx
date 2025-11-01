'use client';
import { Activity, memo, useCallback, useMemo, useRef } from 'react';

import { type Cell, type Column, type ColumnPinningPosition, flexRender, type Header, type Row } from '@tanstack/react-table';
import { useVirtualizer, type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';
import { BoxIcon, EllipsisVerticalIcon, EyeOffIcon, MoveLeftIcon, MoveRightIcon, PinOffIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AnyEntity } from '@/types';
import { useTableContext } from '../hooks/use-table-context';
import { useTableRowsContext } from '../hooks/use-table-rows-context';

const SELECT_WIDTH = 60;
const TABLE_HEADER_Z_INDEX = 10;
const PINNED_COLUMN_Z_INDEX = 20;

//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
//View the index.css file for more needed styles such as border-collapse: separate
const getCommonPinningStyles = (column: Column<unknown>): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    zIndex: isPinned ? PINNED_COLUMN_Z_INDEX : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
  };
};

export const TableWrapper: React.FC<React.PropsWithChildren<React.ComponentProps<'div'>>> = ({ className, children, ...props }) => {
  return (
    <div data-slot="table-wrapper" className="relative m-0 flex size-full flex-col flex-nowrap items-start justify-start gap-2 py-2.5 text-sm" {...props}>
      {children}
    </div>
  );
};

const TableHeader: React.FC<React.PropsWithChildren> = memo(({ children }) => {
  return (
    <thead
      data-slot="table-header"
      style={{ zIndex: TABLE_HEADER_Z_INDEX }}
      className={cn(
        'sticky top-0 grid bg-card text-sm text-text-positive',
        '[&_tr:not(:last-child)_td]:border-b',
        '[&_th]:flex',
        '[&_th]:h-10',
        '[&_th]:select-none',
        '[&_th]:items-center',
        '[&_th]:whitespace-nowrap',
        '[&_th]:border-border',
        '[&_th]:font-normal',
        '[&_th]:border-r',
        '[&_th]:border-b',
        '[&_th]:border-b-border',
        '[&_th]:text-left',
        '[&_th]:align-middle',
        '[&_th]:last:border-r-0',
        '[&_th]:first:border-l-0',
        '[&_th]:data-[pinned=right]:border-l',
        '[&_th]:data-[pinned=left]:border-r',
        '[&_tr_th:not([data-pinned=false])]:bg-card'
      )}
    >
      {children}
    </thead>
  );
});
TableHeader.displayName = 'TableHeader';

const TableHeaderRow: React.FC<React.PropsWithChildren> = memo(({ children }) => {
  return (
    <tr data-slot="table-header-row" className="flex w-full border-none">
      {children}
    </tr>
  );
});
TableHeaderRow.displayName = 'TableHeaderRow';

const TableHeaderCell: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<'th'> & {
      header: Header<unknown, unknown>;
      isPinned: ColumnPinningPosition;
      isResizing: boolean;
      isAllRowsSelected: boolean;
    }
  >
> = memo(({ header, isPinned, isResizing, isAllRowsSelected, children, ...props }) => {
  const style = getCommonPinningStyles(header.column);
  const width = `calc(var(--header-${header.id}-size) * 1px)`;

  if (header.id === 'select') {
    return (
      <th data-slot="table-header-cell" style={{ ...style, width: SELECT_WIDTH }} className="relative" {...props}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Checkbox
            aria-label="Select All Rows"
            checked={isAllRowsSelected}
            onCheckedChange={value => {
              header.getContext().table.toggleAllRowsSelected(!!value);
            }}
          />
        </div>
      </th>
    );
  }
  return (
    <th data-slot="table-header-cell" data-pinned={isPinned} style={{ ...style, width }} colSpan={header.colSpan} className="group relative" {...props}>
      <div className="absolute inset-0 gap-1 truncate">
        <div className="flex h-full flex-1 cursor-pointer select-none items-center justify-between">
          <div className="flex size-full flex-1 items-center truncate pl-4">{flexRender(header.column.columnDef.header, header.getContext())}</div>
        </div>
      </div>
      {header.id !== 'select' && (
        <TableHeaderCellOption
          isPinned={isPinned}
          className="invisible absolute right-2 z-10 group-hover:visible"
          onLeftPin={header.column.pin}
          onRightPin={header.column.pin}
          onUnpin={header.column.pin}
        />
      )}
      <Activity mode={isPinned ? 'hidden' : 'visible'}>
        <div
          onDoubleClick={header.column.resetSize}
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={cn('-right-0.5 absolute inset-y-0 w-1 cursor-e-resize bg-transparent hover:bg-border', isResizing && 'bg-border')}
        />
      </Activity>
    </th>
  );
});
TableHeaderCell.displayName = 'TableHeaderCell';

const TableHeaderCellOption: React.FC<{
  isPinned: ColumnPinningPosition;
  className?: string;
  onLeftPin: (pos: 'left' | 'right' | false) => void;
  onRightPin: (pos: 'left' | 'right' | false) => void;
  onUnpin: (pos: 'left' | 'right' | false) => void;
}> = ({ isPinned, className, onLeftPin, onRightPin, onUnpin }) => {
  const handleLeftPin = useCallback(() => {
    onLeftPin('left');
  }, [onLeftPin]);

  const handleRightPin = useCallback(() => {
    onRightPin('right');
  }, [onRightPin]);

  const handleUnpin = useCallback(() => {
    onUnpin(false);
  }, [onUnpin]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn('cursor-pointer rounded-full p-0.5 text-text-positive-weak hover:bg-muted-muted hover:text-text-positive [&>svg]:size-4', className)}
        >
          <EllipsisVerticalIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4">
        <DropdownMenuGroup className="*:data-[slot=dropdown-menu-item]:rounded-xs *:data-[slot=dropdown-menu-item]:p-2">
          <Activity mode={isPinned ? 'visible' : 'hidden'}>
            <DropdownMenuItem onClick={handleUnpin}>
              {!!isPinned && 'Unpin'}
              <DropdownMenuShortcut>
                <PinOffIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Activity>
          <Activity mode={!isPinned ? 'visible' : 'hidden'}>
            <DropdownMenuItem onClick={handleLeftPin}>
              {!!isPinned && 'Unpin'}
              {!isPinned && 'Pin to Left'}
              <DropdownMenuShortcut>
                <MoveLeftIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRightPin}>
              {!!isPinned && 'Unpin'}
              {!isPinned && 'Pin to Right'}
              <DropdownMenuShortcut>
                <MoveRightIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Activity>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="*:data-[slot=dropdown-menu-item]:rounded-xs *:data-[slot=dropdown-menu-item]:p-2">
          <DropdownMenuItem>
            Hide Field
            <DropdownMenuShortcut>
              <EyeOffIcon className="size-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TableBody: React.FC<React.PropsWithChildren<React.ComponentProps<'tbody'> & { height: number }>> = ({ height, children, ...props }) => {
  return (
    <tbody
      data-slot="table-body"
      style={{ height: `${height}px` }}
      className={cn(
        'relative grid w-full',
        '[&_tr]:absolute [&_tr]:flex [&_tr]:w-full [&_tr]:cursor-pointer [&_tr]:border-b [&_tr]:border-b-border [&_tr]:focus:outline-none',
        '[&_td]:z-10',
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
        '[&_td:not([data-pinned=false])]:shadow-xs'
      )}
      {...props}
    >
      {children}
    </tbody>
  );
};

const TableRow: React.FC<
  React.ComponentProps<'tr'> & {
    row: Row<unknown>;
    virtualRow: VirtualItem;
    rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  }
> = memo(({ children, row, virtualRow, rowVirtualizer, ...props }) => {
  const { columnPinning: _ } = useTableContext();
  return (
    <tr
      data-slot="table-row"
      data-index={virtualRow.index}
      ref={node => rowVirtualizer.measureElement(node)}
      style={{
        transform: `translateY(${virtualRow.start}px)`,
      }}
      {...props}
    >
      {row.getVisibleCells().map(cell => {
        return <TableCell key={cell.id} cell={cell} />;
      })}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

const TableCell: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<'td'> & {
      cell: Cell<unknown, unknown>;
    }
  >
> = memo(({ cell, children, ...props }) => {
  const { rowSelection: _ } = useTableContext();
  const isPinned = cell.column.getIsPinned();
  const style = getCommonPinningStyles(cell.column);
  const width = `calc(var(--col-${cell.column.id}-size) * 1px)`;

  if (cell.column.id === 'select') {
    return (
      <td data-slot="table-cell" style={{ ...style, width: SELECT_WIDTH }} className="border-none! shadow-none!" {...props}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Checkbox
            aria-label="Select Row"
            checked={cell.row.getIsSelected()}
            onCheckedChange={value => {
              cell.row.toggleSelected(!!value);
            }}
          />
        </div>
      </td>
    );
  }

  return (
    <td data-slot="table-cell" data-pinned={isPinned} style={{ ...style, width }} {...props}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
});
TableCell.displayName = 'TableCell';

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

export const TableFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <tfoot data-slot="table-footer" className="flex w-full justify-center border-border-weak border-t py-2 font-medium [&>tr]:last:border-b-0">
      {children}
    </tfoot>
  );
};

export const TableContainer: React.FC<React.PropsWithChildren> = () => {
  const { table, columnSizeVars, isEmpty } = useTableContext();
  const { rows, rowsLength } = useTableRowsContext();

  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rowsLength,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40, // estimated row height
    measureElement: element => element?.getBoundingClientRect().height,
    overscan: 2, // Render additional rows beyond viewport for smoother scrolling
  });

  return (
    <div
      data-slot="table-container"
      ref={tableContainerRef}
      style={{ direction: table.options.columnResizeDirection }}
      className="relative flex w-full max-w-full flex-1 flex-col gap-1 overflow-auto border-t border-t-border bg-slate-50 p-0 text-sm"
    >
      <table
        data-slot="table"
        style={{
          ...columnSizeVars,
          width: table.getTotalSize(),
        }}
        className="grid caption-bottom border-collapse border-spacing-0 flex-col bg-card text-sm tabular-nums [&_tfoot_td]:border-t"
      >
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeaderCell
                  key={header.id}
                  header={header}
                  isPinned={header.column.getIsPinned()}
                  isResizing={header.column.getIsResizing()}
                  isAllRowsSelected={table.getIsAllRowsSelected()}
                />
              ))}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody data-slot="table-body" height={rowVirtualizer.getTotalSize()}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index] as Row<AnyEntity>;
            return <TableRow key={row.id} data-index={virtualRow.index} row={row} virtualRow={virtualRow} rowVirtualizer={rowVirtualizer} />;
          })}
        </TableBody>
      </table>
      {isEmpty && <EmptyDisplay />}
    </div>
  );
};
