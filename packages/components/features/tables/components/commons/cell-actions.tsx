'use client';
import { memo, useMemo } from 'react';

import { flexRender } from '@tanstack/react-table';

import type { TUITableCellActions } from '../../types';
import { tableCellActionsVariants } from '../table.variants';

/**
 * Pinned trailing `<td>` holding a row's action buttons. Rendered by `UITableContainer`; use it
 * directly only when building a custom table layout.
 */
export const UITableCellActions = memo<TUITableCellActions>(({ column, getContext, className, ...props }) => {
  const render = useMemo(() => {
    return flexRender(column?.columnDef.cell, getContext());
  }, [column, getContext]);
  return (
    <td data-col="actions" className={tableCellActionsVariants()} {...props}>
      {render}
    </td>
  );
});
UITableCellActions.displayName = 'UITableCellActions';
