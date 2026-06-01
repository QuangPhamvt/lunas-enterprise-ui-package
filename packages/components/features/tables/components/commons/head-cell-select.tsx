'use client';
import { memo, useCallback } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import { SELECT_WIDTH, TABLE_HEADER_Z_INDEX } from '../../constants';
import type { TUITableHeadCellSelect } from '../../types';
import { tableCellSelectVariants } from '../table.variants';

export const UITableHeadCellSelect = memo<TUITableHeadCellSelect>(({ isPinned, isAllRowsSelected, style, onToggleAllRowsSelected, ...props }) => {
  const handleToggleAllRowsSelected = useCallback(
    (value: boolean | 'indeterminate') => {
      onToggleAllRowsSelected?.(!!value);
    },
    [onToggleAllRowsSelected]
  );
  return (
    <th
      slot="table-header-cell"
      data-pinned={true}
      style={{ left: 0, zIndex: TABLE_HEADER_Z_INDEX, width: SELECT_WIDTH, maxWidth: SELECT_WIDTH }}
      className={tableCellSelectVariants({ isPinned })}
      {...props}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Checkbox aria-label="Select All Rows" checked={isAllRowsSelected} onCheckedChange={handleToggleAllRowsSelected} />
      </div>
    </th>
  );
});
UITableHeadCellSelect.displayName = 'UITableHeadCellSelect';
