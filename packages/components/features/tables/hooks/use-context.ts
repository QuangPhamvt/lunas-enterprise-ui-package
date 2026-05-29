import { createContext, use } from 'react';

import type { AnyEntity } from '@/types';
import type {
  TTableBodyContext,
  TTableContext,
  TTableFilterContext,
  TTableHeadRowContext,
  TTableInnerTableContext,
  TTableInnerWrapperContext,
  TTableRowContext,
} from '../types';

export const TableInnerWrapperContext = createContext<TTableInnerWrapperContext | null>(null);

export const useUITableInnerWrapperContext = () => {
  const ctx = use(TableInnerWrapperContext);
  if (!ctx) {
    throw new Error('useTableInnerWrapperContext must be used within a TableInnerWrapperProvider');
  }
  return ctx;
};

export const TableInnerTableContext = createContext<TTableInnerTableContext | null>(null);

export const useUITableInnerTableContext = () => {
  const ctx = use(TableInnerTableContext);
  if (!ctx) {
    throw new Error('useTableInnerTableContext must be used within a TableInnerTableProvider');
  }
  return ctx;
};

export const TableHeadRowContext = createContext<TTableHeadRowContext | null>(null);

export const useUITableHeadRowContext = () => {
  const ctx = use(TableHeadRowContext);
  if (!ctx) {
    throw new Error('useTableHeaderRowContext must be used within a TableHeaderRowProvider');
  }
  return ctx;
};

export const TableBodyContext = createContext<TTableBodyContext | null>(null);

export const useUITableBodyContext = () => {
  const ctx = use(TableBodyContext);
  if (!ctx) {
    throw new Error('useTableBodyContext must be used within a TableBodyProvider');
  }
  return ctx;
};

export const TableRowContext = createContext<TTableRowContext<AnyEntity, AnyEntity> | null>(null);

export const useUITableRowContext = () => {
  const ctx = use(TableRowContext);
  if (!ctx) {
    throw new Error('useTableRowContext must be used within a TableRowProvider');
  }
  return ctx;
};

export const TableContext = createContext<TTableContext<AnyEntity> | null>(null);

export const useUITableContext = () => {
  const context = use(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

export const TableFilterContext = createContext<TTableFilterContext | null>(null);

export const useUITableFilterContext = () => {
  const ctx = use(TableFilterContext);
  if (!ctx) {
    throw new Error('useUITableFilterContext must be used within a UITableProvider');
  }
  return ctx;
};
