/**
 * @file provider.tsx
 * Context providers that wire TanStack Table state into the UITable component tree.
 *
 * Each sub-provider is a memoised wrapper around a single React context so that
 * only the subtree that consumes a particular slice of state re-renders when that
 * slice changes.
 */
import { memo, useCallback, useId, useMemo, useState } from 'react';

import type { ColumnDef, ColumnPinningState, ExpandedState, RowSelectionState } from '@tanstack/react-table';
import { getCoreRowModel, getExpandedRowModel, getGroupedRowModel, useReactTable } from '@tanstack/react-table';

import type { AnyEntity } from '@/types';
import {
  TableBodyContext,
  TableContext,
  TableHeadRowContext,
  TableInnerTableContext,
  TableInnerWrapperContext,
  TableRowContext,
} from '../../hooks/use-context';
import type {
  RowData,
  TableProviderProps,
  TTableBodyContext,
  TTableContext,
  TTableHeadRowContext,
  TTableInnerTableContext,
  TTableInnerWrapperContext,
  TTableRowContext,
  TUITableColumn,
} from '../../types';

/**
 * Provides the inner-wrapper DOM element id to all descendants via
 * `TableInnerWrapperContext`, enabling virtual-scroll sentinels to locate the
 * scrollable container without prop-drilling.
 */
const UITableInnerWrapperProvider = memo<React.PropsWithChildren<TTableInnerWrapperContext>>(({ innerWrapperId, children }) => {
  const value = useMemo<TTableInnerWrapperContext>(() => ({ innerWrapperId }), [innerWrapperId]);
  return <TableInnerWrapperContext.Provider value={value}>{children}</TableInnerWrapperContext.Provider>;
});
UITableInnerWrapperProvider.displayName = 'UITableInnerWrapperProvider';

/**
 * Provides the TanStack `table` instance, the inner `<table>` element id, and
 * the pre-computed `totalSize` (sum of all column widths) to descendants via
 * `TableInnerTableContext`.
 */
const UITableInnerTableProvider = memo<React.PropsWithChildren<TTableInnerTableContext>>(({ table, innerTableId, totalSize, children }) => {
  const value = useMemo<TTableInnerTableContext>(() => ({ table, innerTableId, totalSize }), [table, innerTableId, totalSize]);
  return <TableInnerTableContext.Provider value={value}>{children}</TableInnerTableContext.Provider>;
});
UITableInnerTableProvider.displayName = 'UITableInnerTableProvider';

/**
 * Provides column-pinning state and the "select all" toggle to the header-row
 * layer via `TableHeadRowContext`, preventing unnecessary re-renders in the body.
 */
const UITableHeadRowProvider = memo<React.PropsWithChildren<TTableHeadRowContext>>(
  ({ isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onToggleAllRowsSelected, children }) => {
    const value = useMemo<TTableHeadRowContext>(
      () => ({ isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onToggleAllRowsSelected }),
      [isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onToggleAllRowsSelected]
    );
    return <TableHeadRowContext.Provider value={value}>{children}</TableHeadRowContext.Provider>;
  }
);
UITableHeadRowProvider.displayName = 'UITableHeadRowProvider';

/**
 * Provides loading/empty state and the current row-selection map to the table
 * body layer via `TableBodyContext`.
 */
const UITableBodyProvider = memo<React.PropsWithChildren<TTableBodyContext>>(({ isFetching, isEmpty, rowSelectionState, children }) => {
  const value = useMemo<TTableBodyContext>(() => ({ isFetching, isEmpty, rowSelectionState }), [isFetching, isEmpty, rowSelectionState]);
  return <TableBodyContext.Provider value={value}>{children}</TableBodyContext.Provider>;
});
UITableBodyProvider.displayName = 'UITableBodyProvider';

/**
 * Provides per-row interaction state — click handler, pinning, and the
 * "select all" flag — to individual row renderers via `TableRowContext`.
 */
const UITableRowProvider = memo<React.PropsWithChildren<TTableRowContext<AnyEntity, AnyEntity>>>(
  ({ keyOfClickRow, isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onClickRow, children }) => {
    const value = useMemo<TTableRowContext<AnyEntity, AnyEntity>>(
      () => ({
        keyOfClickRow,
        isAllRowsSelected,
        columnPinningState,
        leftPinnedHeaders,
        rightPinnedHeaders,
        onClickRow,
      }),
      [keyOfClickRow, isAllRowsSelected, columnPinningState, leftPinnedHeaders, rightPinnedHeaders, onClickRow]
    );
    return <TableRowContext.Provider value={value}>{children}</TableRowContext.Provider>;
  }
);
UITableRowProvider.displayName = 'UITableRowProvider';

/**
 * Root context provider for the UITable component family.
 *
 * Instantiates a TanStack Table instance with virtualisation-friendly settings
 * (column pinning, row selection, row grouping, row expansion) and propagates
 * all derived state through a nested set of memoised context providers so that
 * each layer only re-renders when its own slice of state changes.
 *
 * @example
 * ```tsx
 * import { UITableProvider } from '@customafk/lunas-ui/features/tables';
 *
 * const columns = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ];
 *
 * function MyPage() {
 *   return (
 *     <UITableProvider
 *       title="Users"
 *       data={users}
 *       columns={columns}
 *       isFetching={isLoading}
 *       onClickRow={(index, id) => console.log(index, id)}
 *     >
 *       <UITable />
 *     </UITableProvider>
 *   );
 * }
 * ```
 */
export const UITableProvider = <
  TData extends RowData<TData> = RowData<AnyEntity>,
  TKey extends keyof TData = keyof TData,
  TColumns extends ReadonlyArray<TUITableColumn<TData>> = TUITableColumn<TData>[],
>({
  title,

  isFetching = false,
  isRefetching = false,

  data,
  columns,
  totalRows,

  leftPinnedColumns = [],
  rightPinnedColumns = [],

  keyOfClickRow,
  onClickRow,
  onRowSelection,
  onColumnPinning,

  fetchMoreData,
  children,
}: React.PropsWithChildren<TableProviderProps<TData, TKey, TColumns>>) => {
  const innerWrapperId = useId();
  const innerTableId = useId();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    right: rightPinnedColumns as unknown as string[],
    left: ['select', ...leftPinnedColumns] as unknown as string[],
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const handleRowSelectionChange = useCallback<React.Dispatch<React.SetStateAction<RowSelectionState>>>(
    newRowSelection => {
      setRowSelection(newRowSelection);
      onRowSelection?.(newRowSelection instanceof Function ? newRowSelection(rowSelection) : newRowSelection);
      return newRowSelection;
    },
    [rowSelection, onRowSelection]
  );

  const handleColumnPinningChange = useCallback<React.Dispatch<React.SetStateAction<ColumnPinningState>>>(
    newColumnPinning => {
      setColumnPinning(newColumnPinning);
      onColumnPinning?.(newColumnPinning instanceof Function ? newColumnPinning(columnPinning) : newColumnPinning);
    },
    [columnPinning, onColumnPinning]
  );

  const table = useReactTable<TData>({
    data: data,
    columns: columns as unknown as ColumnDef<AnyEntity, unknown>[],
    state: {
      rowSelection,
      columnPinning,
      expanded,
    },
    defaultColumn: {
      enableResizing: false,
      size: undefined,
      minSize: undefined,
      maxSize: undefined,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',

    enableColumnPinning: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableMultiRowSelection: true,

    autoResetAll: false,
    autoResetExpanded: false,
    autoResetPageIndex: false,

    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    onRowSelectionChange: handleRowSelectionChange,
    onColumnPinningChange: handleColumnPinningChange,
    onExpandedChange: setExpanded,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: rows
  const rows = useMemo(() => {
    const { rows } = table.getRowModel();
    return rows;
  }, [table.getRowModel().rows, table.getState().columnPinning]);

  const isEmpty = useMemo<boolean>(() => {
    return !isFetching && rows.length === 0;
  }, [rows, isFetching]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const value = useMemo<TTableContext<TData>>(
    () => ({
      title,
      table,

      isEmpty,
      isFetching,
      isRefetching,

      totalRows,

      fetchMoreData,
    }),
    [
      title,
      table,

      isEmpty,
      isRefetching,
      isFetching,

      totalRows,

      fetchMoreData,
      table.getState().columnPinning,
      table.getState().expanded,
    ]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const tableState = useMemo(() => {
    return table.getState();
  }, [table.getState()]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const isAllRowsSelected = useMemo(() => {
    return table.getIsAllRowsSelected();
  }, [table.getIsAllRowsSelected()]);

  const rowSelectionState = useMemo(() => {
    return tableState.rowSelection;
  }, [tableState.rowSelection]);

  const columnPinningState = useMemo(() => {
    return tableState.columnPinning;
  }, [tableState.columnPinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const leftPinnedHeaders = useMemo(() => {
    return table.getLeftHeaderGroups()[0]?.headers || [];
  }, [table.getState().columnPinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const rightPinnedHeaders = useMemo(() => {
    return table.getRightHeaderGroups()[0]?.headers || [];
  }, [table.getState().columnPinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get total size
  const totalSize = useMemo(() => {
    return table.getTotalSize();
  }, [table.getTotalSize()]);

  return (
    <TableContext.Provider value={value as TTableContext<TData>}>
      <UITableInnerWrapperProvider innerWrapperId={innerWrapperId}>
        <UITableInnerTableProvider table={table} innerTableId={innerTableId} totalSize={totalSize}>
          <UITableHeadRowProvider
            isAllRowsSelected={isAllRowsSelected}
            columnPinningState={columnPinningState}
            leftPinnedHeaders={leftPinnedHeaders}
            rightPinnedHeaders={rightPinnedHeaders}
            onToggleAllRowsSelected={table.toggleAllRowsSelected}
          >
            <UITableBodyProvider isFetching={isFetching} isEmpty={isEmpty} rowSelectionState={rowSelectionState}>
              <UITableRowProvider
                keyOfClickRow={keyOfClickRow}
                isAllRowsSelected={isAllRowsSelected}
                columnPinningState={columnPinningState}
                leftPinnedHeaders={leftPinnedHeaders}
                rightPinnedHeaders={rightPinnedHeaders}
                onClickRow={onClickRow}
              >
                {children}
              </UITableRowProvider>
            </UITableBodyProvider>
          </UITableHeadRowProvider>
        </UITableInnerTableProvider>
      </UITableInnerWrapperProvider>
    </TableContext.Provider>
  );
};
