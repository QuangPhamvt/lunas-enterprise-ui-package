import { useCallback, useState } from 'react';

import type { ColumnPinningState } from '@tanstack/react-table';

type UseTableColumnPinningArgs = {
  leftPinnedColumns?: string[];
  rightPinnedColumns?: string[];
  onColumnPinning?: (columnPinning: ColumnPinningState) => void;
};

/**
 * Owns TanStack Table's `columnPinning` state — seeded from
 * `leftPinnedColumns`/`rightPinnedColumns` (the `select` and `expand` columns are
 * always left-pinned, in that order, when present) — and bridges changes to the
 * consumer-facing `onColumnPinning` callback declared on `UITableProvider`.
 */
export function useTableColumnPinning({ leftPinnedColumns = [], rightPinnedColumns = [], onColumnPinning }: UseTableColumnPinningArgs) {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    right: rightPinnedColumns,
    left: ['select', 'expand', ...leftPinnedColumns.filter(id => id !== 'select' && id !== 'expand')],
  });

  const onColumnPinningChange = useCallback<React.Dispatch<React.SetStateAction<ColumnPinningState>>>(
    updater => {
      setColumnPinning(prev => {
        const next = updater instanceof Function ? updater(prev) : updater;
        onColumnPinning?.(next);
        return next;
      });
    },
    [onColumnPinning]
  );

  return { columnPinning, onColumnPinningChange };
}
