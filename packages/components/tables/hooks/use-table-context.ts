import { createContext, use } from 'react';

import type { RowData } from '@tanstack/react-table';

import type { TTableContext } from '../types';

export const TableContext = createContext<TTableContext<RowData> | null>(null);

export const useTableContext = <TData extends RowData>() => {
  const context = use(TableContext) as TTableContext<TData>;
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};
