import { useCallback, useMemo, useState } from 'react';

import type { TTableAnalysisContext, TTableSummaryContext } from '../types';

function useToggleContext<TContext extends { isOpen: boolean; toggle: () => void }>(initialOpen: boolean): TContext {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  return useMemo(() => ({ isOpen, toggle }) as TContext, [isOpen, toggle]);
}

/** Owns the analysis-panel open/closed state consumed via `TableAnalysisContext`. */
export function useTableAnalysisPanel(initialOpen = false): TTableAnalysisContext {
  return useToggleContext<TTableAnalysisContext>(initialOpen);
}

/** Owns the summary-bar visibility state consumed via `TableSummaryContext`. */
export function useTableSummaryBar(initialOpen = true): TTableSummaryContext {
  return useToggleContext<TTableSummaryContext>(initialOpen);
}
