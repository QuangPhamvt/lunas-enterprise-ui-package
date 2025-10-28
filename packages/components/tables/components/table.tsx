'use client';
import { Activity, Fragment, memo, useCallback, useRef } from 'react';

import { type Column, type ColumnPinningPosition, flexRender, type Row } from '@tanstack/react-table';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
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

const SELECT_WIDTH = 40;
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
      className="relative flex w-full max-w-full flex-1 flex-col gap-1 overflow-auto border-t border-t-border bg-slate-50 p-0 text-sm"
    >
      <table
        data-slot="table"
        style={{
          ...columnSizeVars,
          width: table.getTotalSize(),
        }}
        className="grid caption-bottom border-separate border-spacing-0 flex-col bg-card text-sm tabular-nums [&_tfoot_td]:border-t"
      >
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(({ id, column, colSpan, getContext, getResizeHandler }) => {
                const isPinned = column.getIsPinned();
                const isResizing = column.getIsResizing();
                const canSort = column.getCanSort();
                const style = getCommonPinningStyles(column);
                const width = `calc(var(--header-${id}-size) * 1px)`;
                return (
                  <>
                    <Activity mode={id === 'select' ? 'visible' : 'hidden'}>
                      <TableHeaderCell width={SELECT_WIDTH} className="border-r-0!">
                        <Checkbox />
                      </TableHeaderCell>
                    </Activity>
                    <Activity mode={id !== 'select' ? 'visible' : 'hidden'}>
                      <TableHeaderCell key={id} data-pinned={isPinned} style={style} colSpan={colSpan} width={width}>
                        <div
                          tabIndex={canSort ? 0 : undefined}
                          role={canSort ? 'button' : undefined}
                          className="flex h-full flex-1 cursor-pointer select-none items-center justify-between"
                        >
                          <div className="flex size-full flex-1 items-center truncate pl-4">{flexRender(column.columnDef.header, getContext())}</div>
                          <Activity mode={id !== 'select' ? 'visible' : 'hidden'}>
                            <TableHeaderCellOption isPinned={isPinned} onLeftPin={column.pin} onRightPin={column.pin} onUnpin={column.pin} />
                          </Activity>
                        </div>
                        <div
                          onDoubleClick={column.resetSize}
                          onMouseDown={getResizeHandler()}
                          onTouchStart={getResizeHandler()}
                          className={cn('h-full w-0.5 cursor-grab bg-transparent hover:bg-border', isResizing && 'bg-border')}
                        />
                      </TableHeaderCell>
                    </Activity>
                  </>
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
            return <TableRow key={rowId} id={rowId} row={row} virtualRow={virtualRow} handleRef={handleRef} />;
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
      style={{ zIndex: TABLE_HEADER_Z_INDEX }}
      className={cn(
        'sticky top-0 grid bg-card font-medium text-text-positive-weak text-xs',
        '[&_tr:not(:last-child)_td]:border-b',
        // '[&_th>.cursor-col-resize]:last:opacity-0',
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
        '[&_th]:first:border-l-0',
        '[&_th]:data-[pinned=right]:border-l',
        '[&_th]:data-[pinned=left]:border-r',
        '[&_tr_th:not([data-pinned=false])]:bg-card'
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
      <th data-slot="table-header-cell" style={{ ...style, width }} className="relative" {...props}>
        <div className="flex size-full items-center justify-center gap-1 truncate">{children}</div>
      </th>
    );
  }
);
TableHeaderCell.displayName = 'TableHeaderCell';

const TableHeaderCellOption: React.FC<{
  isPinned: ColumnPinningPosition;
  onLeftPin: (pos: 'left' | 'right' | false) => void;
  onRightPin: (pos: 'left' | 'right' | false) => void;
  onUnpin: (pos: 'left' | 'right' | false) => void;
}> = ({ isPinned, onLeftPin, onRightPin, onUnpin }) => {
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
        <button className="cursor-pointer rounded-full p-0.5 text-text-positive-weak hover:bg-muted-muted hover:text-text-positive [&>svg]:size-4">
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

type TableRowProps = {
  id: string;
  row: Row<AnyEntity>;
  virtualRow: VirtualItem;
  handleRef: (node: HTMLTableRowElement | null | undefined) => void;
};
const TableRow: React.FC<TableRowProps> = memo(({ row, virtualRow, handleRef }) => {
  const { columnPinning: _ } = useTableContext();
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
        const style = getCommonPinningStyles(column);
        const isSelected = row.getIsSelected();
        const isPinned = column.getIsPinned();
        const width = `calc(var(--col-${column.id}-size) * 1px)`;

        return (
          <Fragment key={id}>
            <Activity mode={column.id === 'select' ? 'visible' : 'hidden'}>
              <TableCell width={SELECT_WIDTH.toString()} className="border-r-0! shadow-none!">
                <Checkbox checked={isSelected} onCheckedChange={value => row.toggleSelected(!!value)} />
              </TableCell>
            </Activity>
            <Activity mode={column.id !== 'select' ? 'visible' : 'hidden'}>
              <TableCell key={id} data-pinned={isPinned} style={style} width={width}>
                {flexRender(column.columnDef.cell, getContext())}
              </TableCell>
            </Activity>
          </Fragment>
        );
      })}
    </tr>
  );
});
TableRow.displayName = 'TableRow';

const TableCell: React.FC<React.PropsWithChildren<React.ComponentProps<'td'> & { width: string }>> = memo(({ width, style, children, ...props }) => {
  return (
    <td data-slot="table-cell" style={{ ...style, width }} {...props}>
      {children}
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
