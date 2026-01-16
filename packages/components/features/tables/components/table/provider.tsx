import { useMemo, useState } from 'react';

import type { ColumnPinningState, RowData, RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { TableClickRowContext } from '../../hooks/use-click-row';
import { TableContext } from '../../hooks/use-table-context';
import type { TableProviderProps, TTableClickRow, TTableContext } from '../../types';

export const UITableProvider = <TData extends RowData, TKey extends keyof TData>({
  title,
  isFetching = false,
  data,
  columns,
  totalRows,

  leftPinnedColumns,
  rightPinnedColumns,

  keyOfClickRow,
  onClickRow,

  fetchMoreData,
  children,
}: React.PropsWithChildren<TableProviderProps<TData, TKey>>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ right: rightPinnedColumns, left: leftPinnedColumns });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable<TData>({
    data: data,
    columns,
    state: {
      rowSelection,
      columnPinning,
      columnVisibility,
    },
    defaultColumn: {
      minSize: 40,
      size: 150,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',

    enableColumnPinning: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableMultiRowSelection: true,

    getCoreRowModel: getCoreRowModel(),

    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
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
      data,

      isEmpty,
      isFetching,

      totalRows,

      fetchMoreData,

      rowSelection: table.getState().rowSelection,
      columnPinning: table.getState().columnPinning,
    }),
    [
      title,
      table,
      data,

      isEmpty,
      isFetching,

      totalRows,

      fetchMoreData,

      table.getState().columnVisibility,

      table.getState().rowSelection,
      table.getState().columnPinning,
    ]
  );

  const clickRowValue = useMemo(
    () => ({
      keyOfClickRow,
      onClickRow,
    }),
    [keyOfClickRow, onClickRow]
  );

  return (
    <TableContext.Provider value={value as TTableContext<unknown>}>
      <TableClickRowContext.Provider value={clickRowValue as TTableClickRow<unknown>}>{children}</TableClickRowContext.Provider>
    </TableContext.Provider>
  );
};
