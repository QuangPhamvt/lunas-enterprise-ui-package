'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { useUITableBodyContext } from '../../hooks/use-context';
import type { TUITableBody } from '../../types';
import { tableBodyVariants } from '../table.variants';

/**
 * `<tbody>` that renders the provider's rows (or the loading/empty state). Rendered by
 * `UITableContainer`; use it directly only when building a custom table layout.
 */
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
