import { memo, useId, useMemo, useState } from 'react';

import type { ColumnPinningState, ExpandedState, RowSelectionState, VisibilityState } from '@tanstack/react-table';
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
} from '../../types';

const UITableInnerWrapperProvider = memo<React.PropsWithChildren<TTableInnerWrapperContext>>(({ innerWrapperId, children }) => {
  const value = useMemo<TTableInnerWrapperContext>(() => ({ innerWrapperId }), [innerWrapperId]);
  return <TableInnerWrapperContext.Provider value={value}>{children}</TableInnerWrapperContext.Provider>;
});
UITableInnerWrapperProvider.displayName = 'UITableInnerWrapperProvider';

const UITableInnerTableProvider = memo<React.PropsWithChildren<TTableInnerTableContext>>(({ table, innerTableId, totalSize, children }) => {
  const value = useMemo<TTableInnerTableContext>(() => ({ table, innerTableId, totalSize }), [table, innerTableId, totalSize]);
  return <TableInnerTableContext.Provider value={value}>{children}</TableInnerTableContext.Provider>;
});
UITableInnerTableProvider.displayName = 'UITableInnerTableProvider';

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

const UITableBodyProvider = memo<React.PropsWithChildren<TTableBodyContext>>(({ isFetching, isEmpty, rowSelectionState, children }) => {
  const value = useMemo<TTableBodyContext>(() => ({ isFetching, isEmpty, rowSelectionState }), [isFetching, isEmpty, rowSelectionState]);
  return <TableBodyContext.Provider value={value}>{children}</TableBodyContext.Provider>;
});
UITableBodyProvider.displayName = 'UITableBodyProvider';

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

export const UITableProvider = <TData extends RowData<TData>>({
  title,

  isFetching = false,
  isRefetching = false,

  data,
  columns,
  totalRows,

  leftPinnedColumns = [],
  rightPinnedColumns,

  keyOfClickRow,
  onClickRow,

  fetchMoreData,
  children,
}: React.PropsWithChildren<TableProviderProps<TData>>) => {
  const innerWrapperId = useId();
  const innerTableId = useId();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ right: rightPinnedColumns, left: ['select', ...leftPinnedColumns] });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable<TData>({
    data: data,
    columns,
    state: {
      rowSelection,
      columnPinning,
      columnVisibility,
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

    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
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
  console.log('rowSelectionState', rowSelectionState);

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
