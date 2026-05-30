'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { TUITableWrapper } from '../../types';
import { tableWrapperVariants } from '../table.variants';

export const UITableWrapper = memo<TUITableWrapper>(({ className, children, ...props }) => {
  return (
    <div slot="table-wrapper" className={cn(tableWrapperVariants(), className)} {...props}>
      {children}
    </div>
  );
});
UITableWrapper.displayName = 'UITableWrapper';
