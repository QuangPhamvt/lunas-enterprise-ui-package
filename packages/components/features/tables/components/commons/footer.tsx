'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { TUITableFooter } from '../../types';
import { tableFooterVariants } from '../table.variants';

/**
 * Footer slot under the scrollable table; renders its `children`. Rendered by `UITableContainer`;
 * use it directly only when building a custom table layout.
 */
export const UITableFooter = memo<TUITableFooter>(({ className, children, ...props }) => {
  return (
    <div slot="table-footer" className={cn(tableFooterVariants(), className)} {...props}>
      {children}
    </div>
  );
});
UITableFooter.displayName = 'UITableFooter';
