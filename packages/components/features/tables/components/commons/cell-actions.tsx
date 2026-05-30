'use client';
import { memo, useMemo } from 'react';

import { flexRender } from '@tanstack/react-table';

import type { TUITableCellActions } from '../../types';
import { tableCellActionsVariants } from '../table.variants';

export const UITableCellActions = memo<TUITableCellActions>(({ virtualRowIndex, column, getContext, className, ...props }) => {
  const render = useMemo(() => {
    return flexRender(column?.columnDef.cell, getContext());
  }, [column, getContext]);
  return (
    <td data-col="actions" data-cell={virtualRowIndex} className={tableCellActionsVariants()} {...props}>
      {render}
    </td>
  );
});
UITableCellActions.displayName = 'UITableCellActions';
