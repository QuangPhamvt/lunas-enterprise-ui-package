'use client';
import type { ReactNode } from 'react';
import { Fragment, isValidElement, memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { TABLE_WRAPPER_ROW_SLOT_NAMES } from '../../constants';
import type { TUITableWrapper } from '../../types';
import { tableWrapperRowVariants, tableWrapperVariants } from '../table.variants';

/**
 * Fixed conceptual order of the wrapper's known regions. Only `container` gets the
 * growable `1fr` track — the others are optional and content-sized. Actual DOM
 * order/count of children is irrelevant; each recognized child is placed by this order.
 *
 * Each slot component (`UITableToolbar`, `UITableSummaryBar`, `UITableContainer`,
 * `UITableAnalysisPanel`) sets its own `tableWrapperSlot` static property to the matching
 * key — see `TSlotTaggable` in `index.tsx` and `UITableContainer` in `table/container.tsx`.
 */
export type TSlotKey = 'toolbar' | 'summaryBar' | 'container' | 'analysisPanel';
const SLOT_ORDER: TSlotKey[] = ['toolbar', 'summaryBar', 'container', 'analysisPanel'];

function getSlotKey(child: ReactNode): TSlotKey | undefined {
  if (!isValidElement(child)) return undefined;
  return (child.type as { tableWrapperSlot?: TSlotKey })?.tableWrapperSlot;
}

export const UITableWrapper = memo<TUITableWrapper>(({ className, children, style, ...props }) => {
  const slotted = new Map<TSlotKey, ReactNode>();
  const rest: ReactNode[] = [];

  const childList: ReactNode[] = Array.isArray(children) ? children : children == null ? [] : [children];

  for (const child of childList) {
    const slot = getSlotKey(child);
    if (slot) {
      slotted.set(slot, child);
    } else {
      rest.push(child);
    }
  }

  const presentSlots = SLOT_ORDER.filter(slot => slotted.has(slot));
  const trackFor = (slot: TSlotKey) => (slot === 'container' ? 'minmax(10rem,1fr)' : 'auto');
  const gridTemplateRows = [...presentSlots.map(trackFor), ...(rest.length > 0 ? ['auto'] : [])].join(' ');

  return (
    <div slot="table-wrapper" className={cn(tableWrapperVariants(), className)} style={{ ...style, gridTemplateRows }} {...props}>
      {presentSlots.map((slot, index) => (
        <div
          key={slot}
          data-slot={TABLE_WRAPPER_ROW_SLOT_NAMES[slot]}
          className={tableWrapperRowVariants({ shrinkable: slot === 'container' })}
          style={{ gridRow: index + 1 }}
        >
          {slotted.get(slot)}
        </div>
      ))}
      {rest.length > 0 && (
        <div data-slot={TABLE_WRAPPER_ROW_SLOT_NAMES.extra} className={tableWrapperRowVariants()} style={{ gridRow: presentSlots.length + 1 }}>
          {rest.map((child, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: `rest` is a static passthrough list re-derived from `children` every render, not a reorderable collection
            <Fragment key={index}>{child}</Fragment>
          ))}
        </div>
      )}
    </div>
  );
});
UITableWrapper.displayName = 'UITableWrapper';
