'use client';
import { memo, useCallback } from 'react';

import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { EXPAND_WIDTH, PINNED_COLUMN_Z_INDEX, ROW_INDENT_PER_DEPTH } from '../../constants';
import type { TUITableCellExpand } from '../../types';
import { tableCellSelectVariants } from '../table.variants';

/**
 * The per-row expand/collapse toggle `<td>`. Renders a chevron button only when
 * the row actually has child rows (`canExpand`); otherwise it renders an empty,
 * width-matched cell so every row stays column-aligned. Always sticky-pinned to
 * the left edge, mirroring `UITableCellSelect`.
 */
export const UITableCellExpand = memo<TUITableCellExpand>(
  ({ isPinned, isLastCell, canExpand = false, isExpanded = false, depth = 0, className, onToggleExpanded, ...props }) => {
    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
      e => {
        e.preventDefault();
        e.stopPropagation();
        onToggleExpanded?.();
      },
      [onToggleExpanded]
    );
    return (
      <td
        slot="table-body-cell"
        data-pinned={true}
        style={{ left: 'calc(var(--col-expand-left, 0) * 1px)', zIndex: PINNED_COLUMN_Z_INDEX, width: EXPAND_WIDTH, maxWidth: EXPAND_WIDTH }}
        className={cn(tableCellSelectVariants({ isPinned, isLastCell }), className)}
        {...props}
      >
        <div
          data-slot="table-cell-inner"
          className="flex! w-full! items-center justify-center bg-transparent text-center align-middle"
          style={{ paddingLeft: depth * ROW_INDENT_PER_DEPTH }}
        >
          {canExpand ? (
            <button
              type="button"
              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
              aria-expanded={isExpanded}
              onClick={handleClick}
              className="flex size-5 min-w-5 cursor-pointer items-center justify-center rounded text-text-positive-weak transition-colors hover:bg-muted-muted hover:text-text-positive"
            >
              <ChevronRightIcon size={14} className={cn('transition-transform duration-200', isExpanded && 'rotate-90')} />
            </button>
          ) : null}
        </div>
      </td>
    );
  }
);
UITableCellExpand.displayName = 'UITableCellExpand';
