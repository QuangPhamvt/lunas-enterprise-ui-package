import { useMemo, useState } from 'react';

import type { ColumnPinningState, InitialTableState, RowData, RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { TableContext } from '../hooks/use-table-context';
import { TableRowsContext, type TTableRowsContext } from '../hooks/use-table-rows-context';
import type { TableProviderProps, TTableContext } from '../types';

const INITIAL_STATE: InitialTableState = {
  columnPinning: { right: ['actions'] },
};

export const TableProvider = <TData extends RowData>({
  title,
  data,
  columns,
  isFetching = false,
  children,
}: React.PropsWithChildren<TableProviderProps<TData>>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({ right: ['actions'] });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable<TData>({
    initialState: INITIAL_STATE,
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
    return table.getRowModel().rows;
  }, [table.getState().columnPinning]);

  const isEmpty = useMemo<boolean>(() => {
    return !isFetching && table.getRowModel().rows.length === 0;
  }, [table, isFetching]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const value = useMemo<TTableContext<TData>>(
    () => ({
      table,
      title,
      isEmpty,
      isFetching,

      rows,

      rowSelection: table.getState().rowSelection,

      columnPinning: table.getState().columnPinning,
    }),
    [
      table,
      title,

      isEmpty,
      isFetching,

      table.getState().columnVisibility,

      table.getState().rowSelection,
      table.getState().columnPinning,
    ]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: rows
  const rowsValue = useMemo<TTableRowsContext<TData>>(
    () => ({
      rowsLength: rows.length,
      rows,
    }),
    [rows, table.getState().rowSelection, table.getState().columnPinning, table.getState().columnSizing]
  );

  return (
    <TableContext.Provider value={value as TTableContext<unknown>}>
      <TableRowsContext.Provider value={rowsValue as TTableRowsContext<unknown>}>{children}</TableRowsContext.Provider>
    </TableContext.Provider>
  );
};
