'use client';
import { memo, useMemo } from 'react';

import { flexRender } from '@tanstack/react-table';

import type { TUITableCellActions } from '../../types';
import { tableCellActionsVariants } from '../table.variants';

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
