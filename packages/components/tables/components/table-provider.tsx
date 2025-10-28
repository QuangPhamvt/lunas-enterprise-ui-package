import { useMemo, useState } from 'react';

import type { ColumnPinningState, InitialTableState, RowData, RowSelectionState } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { TableContext } from '../hooks/use-table-context';
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
  console.log('TableProvider render', rowSelection);

  const table = useReactTable<TData>({
    initialState: INITIAL_STATE,
    data: data,
    columns,
    state: {
      rowSelection,
      columnPinning,
    },
    defaultColumn: {
      minSize: 60,
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

  const isEmpty = useMemo<boolean>(() => {
    return !isFetching && table.getRowModel().rows.length === 0;
  }, [table, isFetching]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: column pinning state
  const _columnPinning = useMemo(() => table.getState().columnPinning, [table.getState().columnPinning]);

  const value = useMemo<TTableContext<TData>>(
    () => ({
      table,
      title,
      isEmpty,
      isFetching,
      columnSizeVars,
      columnPinning: _columnPinning,
    }),
    [table, title, _columnPinning, columnSizeVars, isEmpty, isFetching]
  );

  return <TableContext.Provider value={value as TTableContext<unknown>}>{children}</TableContext.Provider>;
};
