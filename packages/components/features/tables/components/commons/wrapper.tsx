'use client';
import type { ReactNode } from 'react';
import { Children, isValidElement, memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { TABLE_WRAPPER_ROW_SLOT_NAMES, TABLE_WRAPPER_SLOT_DISPLAY_NAMES } from '../../constants';
import type { TUITableWrapper } from '../../types';
import { tableWrapperRowVariants, tableWrapperVariants } from '../table.variants';

type TSlotKey = keyof typeof TABLE_WRAPPER_SLOT_DISPLAY_NAMES;

/**
 * Fixed conceptual order of the wrapper's known regions. Only `container` gets the
 * growable `1fr` track — the others are optional and content-sized. Actual DOM
 * order/count of children is irrelevant; each recognized child is placed by this order.
 */
const SLOT_ORDER: TSlotKey[] = ['tooltip', 'summaryBar', 'container', 'analysisPanel'];

function getSlotKey(child: ReactNode): TSlotKey | undefined {
  if (!isValidElement(child)) return undefined;
  const displayName = (child.type as { displayName?: string })?.displayName;
  return SLOT_ORDER.find(slot => TABLE_WRAPPER_SLOT_DISPLAY_NAMES[slot] === displayName);
}

export const UITableWrapper = memo<TUITableWrapper>(({ className, children, style, ...props }) => {
  const slotted = new Map<TSlotKey, ReactNode>();
  const rest: ReactNode[] = [];

  Children.forEach(children, child => {
    const slot = getSlotKey(child);
    if (slot) {
      slotted.set(slot, child);
    } else {
      rest.push(child);
    }
  });

  const presentSlots = SLOT_ORDER.filter(slot => slotted.has(slot));
  const trackFor = (slot: TSlotKey) => (slot === 'container' ? 'minmax(10rem,1fr)' : 'auto');
  const gridTemplateRows = [...presentSlots.map(trackFor), ...(rest.length > 0 ? ['auto'] : [])].join(' ');

  return (
    <div slot="table-wrapper" className={cn(tableWrapperVariants(), className)} style={{ ...style, gridTemplateRows }} {...props}>
      {presentSlots.map((slot, index) => (
        <div key={slot} data-slot={TABLE_WRAPPER_ROW_SLOT_NAMES[slot]} className={tableWrapperRowVariants()} style={{ gridRow: index + 1 }}>
          {slotted.get(slot)}
        </div>
      ))}
      {rest.length > 0 && (
        <div data-slot={TABLE_WRAPPER_ROW_SLOT_NAMES.extra} className={tableWrapperRowVariants()} style={{ gridRow: presentSlots.length + 1 }}>
          {Children.toArray(rest)}
        </div>
      )}
    </div>
  );
});
UITableWrapper.displayName = 'UITableWrapper';
