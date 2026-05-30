'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { TUITableFooter } from '../../types';
import { tableFooterVariants } from '../table.variants';

export const UITableFooter = memo<TUITableFooter>(({ className, children, ...props }) => {
  return (
    <tfoot slot="table-footer" className={cn(tableFooterVariants(), className)} {...props}>
      {children}
    </tfoot>
  );
});
UITableFooter.displayName = 'UITableFooter';
