'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { useUITableBodyContext } from '../../hooks/use-context';
import type { TUITableBody } from '../../types';
import { tableBodyVariants } from '../table.variants';

export const UITableBody = memo<TUITableBody>(({ className, children, ...props }) => {
  const { isFetching, isRefetching, isEmpty } = useUITableBodyContext();
  if (isEmpty || isFetching || isRefetching) return null;
  return (
    <tbody slot="table-body" className={cn(tableBodyVariants(), className)} {...props}>
      {children}
    </tbody>
  );
});
UITableBody.displayName = 'UITableBody';
