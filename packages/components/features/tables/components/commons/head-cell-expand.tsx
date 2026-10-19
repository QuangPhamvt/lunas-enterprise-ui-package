'use client';
import { memo, useCallback } from 'react';

import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { EXPAND_WIDTH, TABLE_HEADER_Z_INDEX } from '../../constants';
import type { TUITableHeadCellExpand } from '../../types';
import { tableCellSelectVariants } from '../table.variants';

/**
 * Header cell above the expand column. Renders an expand-all / collapse-all
 * toggle when `onToggleAllRowsExpanded` is provided; otherwise an empty,
 * width-matched sticky `<th>`.
 */
export const UITableHeadCellExpand = memo<TUITableHeadCellExpand>(
  ({ isPinned, isLastCell, isAllRowsExpanded = false, className, onToggleAllRowsExpanded, ...props }) => {
    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      e => {
        e.preventDefault();
        e.stopPropagation();
        onToggleAllRowsExpanded?.();
      },
      [onToggleAllRowsExpanded]
    );
    return (
      <th
        slot="table-header-cell"
        data-pinned={true}
        style={{ left: 'calc(var(--col-expand-left, 0) * 1px)', zIndex: TABLE_HEADER_Z_INDEX, width: EXPAND_WIDTH, maxWidth: EXPAND_WIDTH }}
        className={cn(tableCellSelectVariants({ isPinned, isLastCell }), className)}
        {...props}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {onToggleAllRowsExpanded ? (
            <button
              type="button"
              aria-label={isAllRowsExpanded ? 'Collapse all rows' : 'Expand all rows'}
              aria-expanded={isAllRowsExpanded}
              onClick={handleClick}
              className="flex size-5 cursor-pointer items-center justify-center rounded text-text-positive-weak transition-colors hover:bg-muted-muted hover:text-text-positive"
            >
              {isAllRowsExpanded ? <ChevronsDownUpIcon size={14} /> : <ChevronsUpDownIcon size={14} />}
            </button>
          ) : null}
        </div>
      </th>
    );
  }
);
UITableHeadCellExpand.displayName = 'UITableHeadCellExpand';
