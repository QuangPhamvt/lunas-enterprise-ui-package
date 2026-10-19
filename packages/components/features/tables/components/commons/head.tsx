'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { TUITableHead } from '../../types';
import { tableHeadVariants } from '../table.variants';

/**
 * `<thead>` holding the header row(s). Rendered by `UITableContainer`; use it directly only when
 * building a custom table layout.
 */
export const UITableHead = memo<TUITableHead>(({ className, children, ...props }) => {
  return (
    <thead slot="table-head" className={cn(tableHeadVariants(), className)} {...props}>
      {children}
    </thead>
  );
});
UITableHead.displayName = 'UITableHead';
