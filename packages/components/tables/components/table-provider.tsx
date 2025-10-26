import { useMemo, useState } from 'react';

import type { InitialTableState, RowData } from '@tanstack/react-table';
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
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({});

  const table = useReactTable<TData>({
    initialState: INITIAL_STATE,
    data: data,
    columns,
    state: {
      rowSelection,
    },
    defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
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

  const value = useMemo<TTableContext<TData>>(
    () => ({
      title,
      table,
      columnSizeVars,
      isEmpty,
      isFetching,
    }),
    [title, table, columnSizeVars, isEmpty, isFetching]
  );

  return <TableContext.Provider value={value as TTableContext<unknown>}>{children}</TableContext.Provider>;
};
