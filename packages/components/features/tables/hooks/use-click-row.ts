import { createContext, use } from 'react';

import type { RowData } from '@tanstack/react-table';

import type { TTableClickRow } from '../types';

export const TableClickRowContext = createContext<TTableClickRow<RowData> | null>(null);

export const useUITableClickRowContext = () => {
  const context = use(TableClickRowContext);
  if (!context) {
    throw new Error('useUITableClickRowContext must be used within a TableClickRowProvider');
  }
  return context;
};
