import { createContext, use } from 'react';

import type { TTableVirtualizerContext } from '../types';

export const TableVirtualizer = createContext<TTableVirtualizerContext | null>(null);

export const useTableVirtualizer = () => {
  const ctx = use(TableVirtualizer);
  if (!ctx) {
    throw new Error('useTableVirtual must be used within a TableVirtualProvider');
  }
  return ctx;
};
