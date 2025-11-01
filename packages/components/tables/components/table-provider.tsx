import { useMemo, useState } from 'react';

import type { ColumnPinningState, InitialTableState, RowData, RowSelectionState } from '@tanstack/react-table';
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

  const table = useReactTable<TData>({
    initialState: INITIAL_STATE,
    data: data,
    columns,
    state: {
      rowSelection,
      columnPinning,
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
  });

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: <table> element.
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number | undefined } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      colSizes[`--header-${header.id}-size`] = header.getSize() || 0;
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize() || 0;
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: rows
  const rows = useMemo(() => {
    return table.getRowModel().rows;
  }, [table.getState().columnPinning, table.getState().columnSizingInfo, table.getState().columnSizing]);

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

      columnSizeVars,
      columnPinning: table.getState().columnPinning,
    }),
    [
      table,
      title,

      columnSizeVars,

      isEmpty,
      isFetching,

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
    [rows, table.getState().rowSelection, table.getState().columnPinning]
  );

  return (
    <TableContext.Provider value={value as TTableContext<unknown>}>
      <TableRowsContext.Provider value={rowsValue as TTableRowsContext<unknown>}>{children}</TableRowsContext.Provider>
    </TableContext.Provider>
  );
};
