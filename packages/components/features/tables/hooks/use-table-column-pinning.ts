import { useCallback, useState } from 'react';

import type { ColumnPinningState } from '@tanstack/react-table';

type UseTableColumnPinningArgs = {
  leftPinnedColumns?: string[];
  rightPinnedColumns?: string[];
  onColumnPinning?: (columnPinning: ColumnPinningState) => void;
};

/**
 * Owns TanStack Table's `columnPinning` state — seeded from
 * `leftPinnedColumns`/`rightPinnedColumns` (the `select` column is always
 * left-pinned) — and bridges changes to the consumer-facing `onColumnPinning`
 * callback declared on `UITableProvider`.
 */
export function useTableColumnPinning({ leftPinnedColumns = [], rightPinnedColumns = [], onColumnPinning }: UseTableColumnPinningArgs) {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    right: rightPinnedColumns,
    left: ['select', ...leftPinnedColumns],
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
