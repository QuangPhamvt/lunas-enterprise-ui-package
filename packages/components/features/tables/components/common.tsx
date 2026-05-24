import { Activity, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { flexRender } from '@tanstack/react-table';

import { AlertTriangle, BoxIcon, ChevronDown, EllipsisVerticalIcon, MoveLeftIcon, MoveRightIcon, PinOffIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';

import type { AnyEntity } from '@/types';
import { ACTION_WIDTH, PINNED_COLUMN_Z_INDEX, SELECT_WIDTH, TABLE_HEADER_Z_INDEX } from '../constants';
import {
  useUITableBodyContext,
  useUITableHeadRowContext,
  useUITableInnerTableContext,
  useUITableInnerWrapperContext,
  useUITableRowContext,
} from '../hooks/use-context';
import type {
  TUITableBody,
  TUITableCell,
  TUITableCellActions,
  TUITableCellSelect,
  TUITableEmptyDisplay,
  TUITableFooter,
  TUITableHead,
  TUITableHeadCell,
  TUITableHeadCellOption,
  TUITableHeadCellSelect,
  TUITableHeadRow,
  TUITableInnerTable,
  TUITableInnerWrapper,
  TUITableLoadMore,
  TUITableRow,
  TUITableWrapper,
} from '../types';

export const UITableHeadCellOption = memo<TUITableHeadCellOption>(({ isPinned, onLeftPin, onRightPin, onUnpin, className }) => {
  const handleLeftPin = useCallback(() => {
    onLeftPin?.('left');
  }, [onLeftPin]);

  const handleRightPin = useCallback(() => {
    onRightPin?.('right');
  }, [onRightPin]);

  const handleUnpin = useCallback(() => {
    onUnpin?.(false);
  }, [onUnpin]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'absolute right-2 z-10 p-0.5 opacity-0 bg-card',
            'cursor-pointer rounded-full transition-all',
            'text-text-positive-weak',
            '[&>svg]:size-4',
            'group-hover:opacity-100',
            'hover:bg-muted-muted hover:text-text-positive',
            className
          )}
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
              {isPinned ? 'Unpin' : 'Pin to Left'}
              <DropdownMenuShortcut>
                <MoveLeftIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRightPin}>
              {isPinned ? 'Unpin' : 'Pin to Right'}
              <DropdownMenuShortcut>
                <MoveRightIcon className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Activity>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
UITableHeadCellOption.displayName = 'UITableHeadCellOption';

export const UITableHeadCellSelect = memo<TUITableHeadCellSelect>(({ isPinned, isAllRowsSelected, style, onToggleAllRowsSelected, ...props }) => {
  const handleToggleAllRowsSelected = useCallback(
    (value: boolean | 'indeterminate') => {
      onToggleAllRowsSelected?.(!!value);
    },
    [onToggleAllRowsSelected]
  );
  return (
    <th
      slot="table-header-cell"
      data-pinned={true}
      style={{ left: 0, zIndex: TABLE_HEADER_Z_INDEX, width: SELECT_WIDTH, maxWidth: SELECT_WIDTH }}
      className={cn(isPinned ? 'sticky' : 'relative')}
      {...props}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Checkbox aria-label="Select All Rows" checked={isAllRowsSelected} onCheckedChange={handleToggleAllRowsSelected} />
      </div>
    </th>
  );
});
UITableHeadCellSelect.displayName = 'UITableHeadCellSelect';

export const UITableEmptyDisplay = memo<TUITableEmptyDisplay>(({ isEmpty, isFetching }) => {
  if (!isEmpty && !isFetching) return null;
  return (
    <div className="sticky left-0 flex min-h-96 flex-1 items-center justify-center bg-transparent text-text-positive-weak opacity-100">
      {isFetching && (
        <div className="flex flex-col items-center gap-1">
          <Spinner className="size-12" />
          <p>Loading data...</p>
        </div>
      )}
      {isEmpty && !isFetching && (
        <div className="flex flex-col items-center gap-1">
          <BoxIcon strokeWidth={1} size={48} />
          <p>No data available</p>
        </div>
      )}
    </div>
  );
});
UITableEmptyDisplay.displayName = 'UITableEmptyDisplay';

export const UITableWrapper = memo<TUITableWrapper>(({ className, children, ...props }) => {
  return (
    <div slot="table-wrapper" className={cn('relative m-0 flex size-full flex-col flex-nowrap items-start justify-start gap-2', className)} {...props}>
      {children}
    </div>
  );
});
UITableWrapper.displayName = 'UITableWrapper';

export const UITableInnerWrapper = memo<TUITableInnerWrapper>(({ children, ...props }) => {
  const { innerWrapperId } = useUITableInnerWrapperContext();
  return (
    <div
      id={innerWrapperId}
      slot="table-inner-wrapper"
      className="relative size-full overflow-auto border-b border-b-border border-l border-l-border bg-card"
      {...props}
    >
      {children}
    </div>
  );
});
UITableInnerWrapper.displayName = 'UITableInnerWrapper';

export const UITableInnerTable = memo<TUITableInnerTable>(({ children, ...props }) => {
  const { table, innerTableId, totalSize } = useUITableInnerTableContext();
  const tableRef = useRef<HTMLTableElement>(null);

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: table element.
  useEffect(() => {
    if (!tableRef.current) return;

    const headers = table.getFlatHeaders();

    const observer = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        const tableElement = entries[0].target;
        if (tableElement instanceof HTMLTableElement) {
          const tableEntry = entries[0];
          if (!tableEntry) return;
          const tableContentRectWidth = tableEntry.contentRect.width;

          const { left: leftColumnPinning = [], right: rightColumnPinning = [] } = table.getState().columnPinning;

          // --- 1. DUYỆT 1 LẦN DUYẾT ĐỂ LẤY TẤT CẢ THÔNG SỐ ---
          let pinnedWidth: number = 0;
          let flexibleColumnsCount: number = 0;
          let fixedSizeTotal: number = 0;
          const columnSpecs = headers.map(header => {
            const { id } = header;
            const isSpecial = id === 'select' || id === 'actions';
            const isPinned = leftColumnPinning.includes(id) || rightColumnPinning.includes(id);
            const size = header.getSize();
            const maxSize = header.column.columnDef.maxSize;

            // Tính toán chiều rộng cố định (pinned hoặc special)
            if (isSpecial) {
              const width = id === 'select' ? SELECT_WIDTH : ACTION_WIDTH;
              pinnedWidth += width;
              return { id, isFlex: false, width };
            }

            if (isPinned) {
              pinnedWidth += size;
              return { id, isFlex: false, width: size };
            }

            // Kiểm tra nếu cột có size cụ thể (khác mặc định 150)
            if (header.column.columnDef.size || size !== 150) {
              fixedSizeTotal += size;
              return { id, isFlex: false, width: size };
            }

            // Cột có thể co giãn
            flexibleColumnsCount++;
            return { id, isFlex: true, maxSize };
          });

          // --- 2. TÍNH TOÁN CHIỀU RỘNG CHIA ĐỀU (AVENGER WIDTH) ---
          const remainingWidth = tableContentRectWidth - pinnedWidth - fixedSizeTotal;
          const rawFlexWidth = flexibleColumnsCount > 0 ? Math.max(0, Math.floor(remainingWidth / flexibleColumnsCount)) : 0;

          // --- 3. ÁP DỤNG STYLE TRONG MỘT LẦN DUYỆT ---
          columnSpecs.forEach(col => {
            if (col.isFlex) {
              // Nếu có maxSize, đảm bảo không vượt quá
              const finalWidth = col.maxSize ? Math.min(rawFlexWidth, col.maxSize) : rawFlexWidth;
              tableElement.style.setProperty(`--header-${col.id}-size`, `${finalWidth}`);
              tableElement.style.setProperty(`--col-${col.id}-size`, `${finalWidth}`);
              if (col.maxSize) {
                tableElement.style.setProperty(`--col-${col.id}-maxSize`, `${col.maxSize}`);
              }
            } else {
              tableElement.style.setProperty(`--header-${col.id}-size`, `${col.width}`);
              tableElement.style.setProperty(`--col-${col.id}-size`, `${col.width}`);
            }
          });
        }
      });
    });
    observer.observe(tableRef.current);
    return () => observer.disconnect();
  }, [table.getState().columnSizingInfo, table.getState().columnSizing, table.getState().columnPinning]);

  return (
    <table
      id={innerTableId}
      ref={tableRef}
      slot="table-inner-table"
      className="grid w-full table-fixed caption-bottom border-collapse border-spacing-0 flex-col content-start [&_tfoot_td]:border-t"
      style={{ minWidth: totalSize }}
      {...props}
    >
      {children}
    </table>
  );
});
UITableInnerTable.displayName = 'UITableInnerTable';

export const UITableHead = memo<TUITableHead>(({ className, children, ...props }) => {
  return (
    <thead
      slot="table-head"
      className={cn(
        'sticky top-0 z-20 h-9 w-full',
        'grid select-none bg-muted-bg-subtle',
        'border-b border-b-border shadow',
        'font-medium text-[13px] text-text-positive-weak',

        '[&_tr:not(:last-child)_td]:border-b',

        '[&_th]:inline-flex',
        '[&_th]:items-center',
        '[&_th]:transition-all',
        '[&_th]:duration-300',
        '[&_th]:whitespace-nowrap',
        '[&_th]:border-border',
        '[&_th]:border-r',
        '[&_th]:last:border-r-0',
        '[&_th]:first:border-l-0',

        '[&_tr_th:not([data-pinned=false])]:bg-muted-bg-subtle',
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
});
UITableHead.displayName = 'UITableHead';

export const UITableHeadRow = memo<TUITableHeadRow>(({ headerGroup, className, ...props }) => {
  const { isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onToggleAllRowsSelected } = useUITableHeadRowContext();
  const firstRightPinnedHeaderId = rightPinnedHeaders[0]?.id;
  const lastLeftPinnedHeaderId = leftPinnedHeaders[leftPinnedHeaders.length - 1]?.id;
  return (
    <tr slot="table-head-row" className={cn('flex', className)} {...props}>
      {headerGroup.headers.map((header, index) => {
        const isVisible = header.column.getIsVisible();
        const isPinned = columnPinningState.left?.includes(header.id) ? 'left' : columnPinningState.right?.includes(header.id) ? 'right' : false;
        if (header.id === 'select') {
          return (
            <UITableHeadCellSelect
              key={header.id}
              isPinned={isPinned}
              isAllRowsSelected={isAllRowsSelected}
              onToggleAllRowsSelected={onToggleAllRowsSelected}
            />
          );
        }
        return (
          <UITableHeadCell
            key={`${header.id}-${index}`}
            isVisible={isVisible}
            isPinned={isPinned}
            isFirstCell={header.id === firstRightPinnedHeaderId}
            isLastCell={header.id === lastLeftPinnedHeaderId}
            isOptionsVisible={!['select', 'actions'].includes(header.id)}
            headerId={header.id}
            headerColumn={header.column}
            colSpan={header.colSpan}
            onColumnPin={header.column.pin}
            onToggleVisibility={header.column.toggleVisibility}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </UITableHeadCell>
        );
      })}
    </tr>
  );
});
UITableHeadRow.displayName = 'UITableHeadRow';

export const UITableHeadCell = memo<TUITableHeadCell>(
  ({
    isVisible = true,
    isPinned = false,
    isFirstCell = false,
    isLastCell = false,
    isOptionsVisible = true,
    headerId,
    headerColumn,
    className,
    children,
    onColumnPin,
    onToggleVisibility,
    ...props
  }) => {
    const zIndex = useMemo(() => {
      return isPinned ? PINNED_COLUMN_Z_INDEX : undefined;
    }, [isPinned]);

    const left = useMemo(() => {
      const axis = headerColumn?.getStart?.('left');
      return isPinned === 'left' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, headerColumn]);

    const right = useMemo(() => {
      const axis = headerColumn?.getAfter?.('right');
      return isPinned === 'right' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, headerColumn]);

    const width = useMemo(() => {
      return `calc(var(--header-${headerId}-size) * 1px)`;
    }, [headerId]);

    const minSize = useMemo(() => {
      return headerColumn?.columnDef.minSize ? `calc(var(--col-${headerId}-minSize) * 1px)` : undefined;
    }, [headerId, headerColumn]);

    const maxSize = useMemo(() => {
      return headerColumn?.columnDef.maxSize ? `calc(var(--col-${headerId}-maxSize) * 1px)` : undefined;
    }, [headerId, headerColumn]);
    return (
      <th
        slot="table-head-cell"
        data-pinned={isPinned}
        data-header={headerId}
        style={{
          zIndex,
          left,
          right,
          width: width,
          minWidth: minSize,
          maxWidth: maxSize,
        }}
        className={cn(
          'group flex',
          headerId === 'actions' && 'border-r-0!',
          isPinned ? 'sticky' : 'relative',
          isPinned === 'left' && isLastCell && 'border-r border-r-border',
          isPinned === 'right' && isFirstCell && 'border-l border-l-border',
          (headerColumn?.columnDef.meta as AnyEntity)?.position === 'center' && 'justify-center',
          (headerColumn?.columnDef.meta as AnyEntity)?.position === 'end' && 'justify-end',
          (headerColumn?.columnDef.meta as AnyEntity)?.position === 'start' && 'justify-start',
          className
        )}
        {...props}
      >
        <div className="truncate px-4">{children}</div>
        {isOptionsVisible && (
          <UITableHeadCellOption isPinned={isPinned} isVisible={isVisible} onLeftPin={onColumnPin} onRightPin={onColumnPin} onUnpin={onColumnPin} />
        )}
      </th>
    );
  }
);
UITableHeadCell.displayName = 'UITableHeadCell';

export const UITableBody = memo<TUITableBody>(({ height, className, children, ...props }) => {
  const { isFetching, isEmpty } = useUITableBodyContext();
  if (isEmpty || isFetching) return null;
  return (
    <tbody
      slot="table-body"
      style={{ height }}
      className={cn(
        'relative w-full',
        'grid',

        '[&_tr]:absolute',
        '[&_tr]:flex',
        '[&_tr]:flex-none',
        '[&_tr]:w-full',
        '[&_tr]:cursor-pointer [&_tr]:focus:outline-none',
        '[&_tr]:border-b [&_tr]:border-b-border',

        '[&_td]:z-10',
        '[&_td]:transition-all',
        '[&_td]:duration-300',
        '[&_td]:flex',
        '[&_td]:flex-none',
        '[&_td]:overflow-hidden',
        '[&_td]:whitespace-nowrap',
        '[&_td]:px-4',
        '[&_td]:py-2.5',
        '[&_td]:align-middle',
        '[&_td]:border-border',

        '[&_td]:data-[selected=true]:bg-muted-muted!',
        '[&_td]:data-[selected=true]:hover:bg-muted-muted!',

        '[&_td>div]:inline-flex',
        '[&_td>div]:items-center',
        '[&_td>div]:w-full',

        '[&_td:not([data-pinned=false])]:z-20',
        '[&_td:not([data-pinned=false])]:sticky',
        '[&_td:not([data-pinned=false])]:bg-card',

        // '**:data-lastcell:border-r',
        // '**:data-firstcell:border-l',
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
});
UITableBody.displayName = 'UITableBody';

export const UITableRow = memo<TUITableRow>(({ row, isSelected, virtualRowIndex, virtualRowStart, children, ...props }) => {
  const { keyOfClickRow, isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onClickRow } = useUITableRowContext();

  const pinnedLeftColumns = useMemo(() => columnPinningState.left ?? [], [columnPinningState]);
  const pinnedRightColumns = useMemo(() => columnPinningState.right ?? [], [columnPinningState]);
  const firstRightPinnedHeaderId = useMemo(() => rightPinnedHeaders?.[0]?.id, [rightPinnedHeaders]);
  const lastLeftPinnedHeaderId = useMemo(() => leftPinnedHeaders?.[leftPinnedHeaders.length - 1]?.id, [leftPinnedHeaders]);

  const handleClick = useCallback<React.MouseEventHandler<HTMLTableRowElement>>(
    e => {
      const value = keyOfClickRow ? row.original?.[keyOfClickRow] : undefined;
      onClickRow?.(virtualRowIndex, typeof value === 'string' || typeof value === 'number' ? value : undefined);
      e.preventDefault();
      e.stopPropagation();
    },
    [keyOfClickRow, onClickRow, row, virtualRowIndex]
  );
  return (
    <tr
      slot="table-row"
      data-index={virtualRowIndex}
      style={{
        transform: `translateY(${virtualRowStart}px)`,
      }}
      className="group [&_td]:border-r [&_td]:border-r-border [&_td]:last:border-r-0"
      onClick={handleClick}
      {...props}
    >
      {row.getVisibleCells().map((cell, index) => {
        const isPinnedLeft = pinnedLeftColumns.includes(cell.column.id);
        const isPinnedRight = pinnedRightColumns.includes(cell.column.id);
        const isPinned = isPinnedLeft ? 'left' : isPinnedRight ? 'right' : false;
        if (cell.column.id === 'actions') {
          return (
            <UITableCellActions
              key={`${cell.id}-${index}`}
              data-col={cell.column.id}
              data-cell={virtualRowIndex}
              data-selected={isSelected || undefined}
              virtualRowIndex={virtualRowIndex}
              column={cell.column}
              getContext={cell.getContext}
            />
          );
        }
        if (cell.column.id === 'select') {
          return (
            <UITableCellSelect
              key={`${cell.id}-${index}`}
              data-col={cell.column.id}
              data-cell={virtualRowIndex}
              data-selected={isSelected || undefined}
              isPinned={isPinned}
              isSelected={isAllRowsSelected || isSelected}
              onToggleRowSelected={cell.row.toggleSelected}
            />
          );
        }
        return (
          <UITableCell
            key={`${cell.id}-${index}`}
            data-col={cell.column.id}
            data-cell={virtualRowIndex}
            data-selected={isSelected || undefined}
            isPinned={isPinned}
            isFirstCell={cell.column.id === firstRightPinnedHeaderId}
            isLastCell={cell.column.id === lastLeftPinnedHeaderId}
            colId={cell.column.id}
            position={(cell.column.columnDef.meta as AnyEntity)?.position ?? 'start'}
            column={cell.column}
            getContext={cell.getContext}
          />
        );
      })}
    </tr>
  );
});
UITableRow.displayName = 'UITableRow';

export const UITableCellSelect = memo<TUITableCellSelect>(({ isPinned, isSelected = false, className, onToggleRowSelected, ...props }) => {
  const handleToggleRowSelected = useCallback(
    (value: boolean | 'indeterminate') => {
      onToggleRowSelected?.(!!value);
    },
    [onToggleRowSelected]
  );
  return (
    <td
      slot="table-body-cell"
      data-pinned={true}
      style={{ left: 0, zIndex: PINNED_COLUMN_Z_INDEX, width: SELECT_WIDTH, maxWidth: SELECT_WIDTH }}
      className={cn('group-hover:bg-muted-bg-subtle!', isPinned ? 'sticky' : 'relative', className)}
      {...props}
    >
      <div
        data-slot="table-cell-inner"
        className="flex! w-full! items-center justify-center bg-transparent text-center align-middle"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Checkbox aria-label="Select Row" checked={isSelected} onCheckedChange={handleToggleRowSelected} />
      </div>
    </td>
  );
});
UITableCellSelect.displayName = 'UITableCellSelect';

export const UITableCellActions = memo<TUITableCellActions>(({ virtualRowIndex, column, getContext, className, ...props }) => {
  const render = useMemo(() => {
    return flexRender(column?.columnDef.cell, getContext());
  }, [column, getContext]);
  return (
    <td
      data-col="actions"
      data-cell={virtualRowIndex}
      className="sticky border-r-0! inset-y-0 right-0 z-50 flex items-center pr-4 group-hover:bg-muted-bg-subtle!"
      {...props}
    >
      {render}
    </td>
  );
});
UITableCellActions.displayName = 'UITableCellActions';

export const UITableCell = memo<TUITableCell>(
  ({ isPinned = false, isFirstCell = false, isLastCell = false, colId, position = 'start', column, getContext, ...props }) => {
    const { innerTableId, table } = useUITableInnerTableContext();
    const tableRef = useRef<Element>(document.querySelector(`table[id="${innerTableId}"]`));
    const cellRef = useRef<HTMLDivElement>(null);

    const left = useMemo(() => {
      const axis = column?.getStart('left');
      return isPinned === 'left' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, column]);

    const right = useMemo(() => {
      const axis = column?.getAfter('right');
      return isPinned === 'right' && typeof axis === 'number' ? `${axis}px` : undefined;
    }, [isPinned, column]);

    const width = useMemo(() => {
      return `calc(var(--col-${colId}-size) * 1px)`;
    }, [colId]);

    const minSize = useMemo(() => {
      return column?.columnDef.minSize ? `calc(var(--col-${colId}-minSize) * 1px)` : undefined;
    }, [colId, column]);

    const maxSize = useMemo(() => {
      return column?.columnDef.maxSize ? `calc(var(--col-${colId}-maxSize) * 1px)` : undefined;
    }, [colId, column]);

    const render = useMemo(() => {
      return flexRender(column?.columnDef.cell, getContext());
    }, [column, getContext]);

    useEffect(() => {
      if (!cellRef.current) return;

      // Đo kích thước thực tế của nội dung bên trong
      const width = cellRef.current.scrollWidth;
      const currentSize = column?.getSize();

      // Nếu cell này dài hơn size hiện tại của cột, cập nhật lại size cho column
      if (!!currentSize && width > currentSize) {
        if (tableRef.current instanceof HTMLTableElement && typeof colId === 'string' && !!(column?.columnDef.meta as AnyEntity)?.['fitContent']) {
          table.setColumnSizing(old => ({
            ...old,
            [colId]: width + 32,
          }));
        }
      }
    }, [colId, column, table]); // Chạy lại khi data trong cell thay đổi

    return (
      <td
        slot="table-body-cell"
        data-pinned={isPinned}
        data-lastcell={isLastCell || undefined}
        data-firstcell={isFirstCell || undefined}
        style={{
          left,
          right,
          width: width,
          minWidth: minSize,
          maxWidth: maxSize,
        }}
        className={cn(
          'group-hover:bg-muted-bg-subtle!',
          isPinned === 'left' && isLastCell && 'border-r border-r-border',
          isPinned === 'right' && isFirstCell && 'border-l border-l-border'
        )}
        {...props}
      >
        <div
          ref={cellRef}
          slot="table-body-cell-inner"
          className={cn(
            'overflow-x-hidden',
            position === 'start' && 'justify-start',
            position === 'center' && 'justify-center',
            position === 'end' && 'justify-end'
          )}
        >
          {render}
        </div>
      </td>
    );
  }
);
UITableCell.displayName = 'UITableCell';

export const UITableFooter = memo<TUITableFooter>(({ className, children, ...props }) => {
  return (
    <tfoot
      slot="table-footer"
      className={cn('flex w-full justify-center border-border-weak border-t py-2 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    >
      {children}
    </tfoot>
  );
});
UITableFooter.displayName = 'UITableFooter';

export const UITableLoadMore = memo<TUITableLoadMore>(({ virtualRowIndex, virtualRowStart, fetchMoreData }) => {
  const { innerWrapperId } = useUITableInnerWrapperContext();

  const tableWrapperRef = useRef<Element | null>(document.querySelector(`div[id="${innerWrapperId}"]`));
  const rowRef = useRef<HTMLTableRowElement>(null);

  const [fetchingState, setFetchingState] = useState<'idle' | 'fetching' | 'error'>('idle');

  const [width, setWidth] = useState<number>(0);

  const handleFetchMoreData = useCallback(async () => {
    try {
      setFetchingState('fetching');
      await fetchMoreData?.();
      setFetchingState('idle');
    } catch (error) {
      console.error('Error fetching more data:', error);
      setFetchingState('error');
    } finally {
      // setFetchingState('idle');
    }
  }, [fetchMoreData]);

  useEffect(() => {
    if (!tableWrapperRef.current) return;

    const observer = new ResizeObserver(entries => {
      // Access width from contentRect
      setWidth(entries[0].contentRect.width);
    });

    observer.observe(tableWrapperRef.current);
    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  if (!fetchMoreData) return null;

  return (
    <tr
      ref={rowRef}
      data-index={virtualRowIndex}
      style={{
        transform: `translateY(${virtualRowStart}px)`,
        width,
      }}
      className="sticky! left-0 h-10"
    >
      <td className="absolute left-0 flex w-full items-center justify-center text-xs">
        <button
          type="button"
          disabled={fetchingState === 'fetching'}
          className={cn(
            'flex cursor-pointer gap-x-0.5',
            fetchingState === 'fetching' && 'cursor-not-allowed',
            fetchingState === 'idle' && 'text-text-positive-weak hover:text-text-positive',
            fetchingState === 'error' && 'text-danger hover:text-danger-strong'
          )}
          onClick={handleFetchMoreData}
        >
          {fetchingState === 'idle' && <ChevronDown className="size-4" />}
          {fetchingState === 'fetching' && <Spinner className="size-4 animate-spin" />}
          {fetchingState === 'error' && <AlertTriangle className="size-4 text-danger" />}
          {fetchingState === 'idle' && 'Load More'}
          {fetchingState === 'fetching' && 'Loading...'}
          {fetchingState === 'error' && 'Error! Retry?'}
        </button>
      </td>
    </tr>
  );
});
UITableLoadMore.displayName = 'UITableLoadMore';
