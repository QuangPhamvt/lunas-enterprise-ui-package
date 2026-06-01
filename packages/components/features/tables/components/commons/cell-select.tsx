'use client';
import { memo, useCallback } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Checkbox } from '@/components/ui/checkbox';

import { PINNED_COLUMN_Z_INDEX, SELECT_WIDTH } from '../../constants';
import type { TUITableCellSelect } from '../../types';
import { tableCellSelectVariants } from '../table.variants';

export const UITableCellSelect = memo<TUITableCellSelect>(({ isPinned, isSelected = false, className, onToggleRowSelected, ...props }) => {
  const handleToggleRowSelected = useCallback(
    (value: boolean | 'indeterminate') => {
      onToggleRowSelected?.(!!value);
    },
    [onToggleRowSelected]
  );
  return (
    <td
      slot="table-body-cell"
      data-pinned={true}
      style={{ left: 0, zIndex: PINNED_COLUMN_Z_INDEX, width: SELECT_WIDTH, maxWidth: SELECT_WIDTH }}
      className={cn(tableCellSelectVariants({ isPinned }), className)}
      {...props}
    >
      <div
        data-slot="table-cell-inner"
        className="flex! w-full! items-center justify-center bg-transparent text-center align-middle"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Checkbox aria-label="Select Row" checked={isSelected} onCheckedChange={handleToggleRowSelected} />
      </div>
    </td>
  );
});
UITableCellSelect.displayName = 'UITableCellSelect';
