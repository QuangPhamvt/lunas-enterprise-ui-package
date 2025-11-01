import { createContext, use } from 'react';

import type { Row, RowData } from '@tanstack/react-table';

export type TTableRowsContext<TData extends RowData> = {
  rowsLength: number;
  rows: Row<TData>[];
};

export const TableRowsContext = createContext<TTableRowsContext<RowData> | null>(null);
export const useTableRowsContext = <TData extends RowData>() => {
  const ctx = use(TableRowsContext) as TTableRowsContext<TData>;
  if (!ctx) {
    throw new Error('useTableRowContext must be used within a TableRowProvider');
  }
  return ctx;
};
