'use client';
import { memo } from 'react';

import { useUITableInnerWrapperContext } from '../../hooks/use-context';
import type { TUITableInnerWrapper } from '../../types';
import { tableInnerWrapperVariants } from '../table.variants';

export const UITableInnerWrapper = memo<TUITableInnerWrapper>(({ children, ...props }) => {
  const { innerWrapperId } = useUITableInnerWrapperContext();
  return (
    <div id={innerWrapperId} slot="table-inner-wrapper" className={tableInnerWrapperVariants()} {...props}>
      {children}
    </div>
  );
});
UITableInnerWrapper.displayName = 'UITableInnerWrapper';
