import { memo, useMemo } from 'react';

import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { TableVirtualizer } from '../hooks/use-table-virtualizer';

type Props = {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualItems: VirtualItem[];
};

export const TableVirtualizerProvider: React.FC<React.PropsWithChildren<Props>> = memo(({ rowVirtualizer, virtualItems, children }) => {
  const value = useMemo(
    () => ({
      rowVirtualizer,
      virtualItems,
    }),
    [rowVirtualizer, virtualItems]
  );
  return <TableVirtualizer.Provider value={value}>{children}</TableVirtualizer.Provider>;
});
TableVirtualizerProvider.displayName = 'TableVirtualizerProvider';
