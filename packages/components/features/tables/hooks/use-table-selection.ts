import { useCallback, useState } from 'react';

import type { RowSelectionState } from '@tanstack/react-table';

/**
 * Owns TanStack Table's `rowSelection` state and bridges it to the
 * consumer-facing `onRowSelection` callback declared on `UITableProvider`.
 */
export function useTableSelection(onRowSelection?: (rowSelection: RowSelectionState) => void) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const onRowSelectionChange = useCallback<React.Dispatch<React.SetStateAction<RowSelectionState>>>(
    updater => {
      setRowSelection(prev => {
        const next = updater instanceof Function ? updater(prev) : updater;
        onRowSelection?.(next);
        return next;
      });
    },
    [onRowSelection]
  );

  return { rowSelection, onRowSelectionChange };
}
