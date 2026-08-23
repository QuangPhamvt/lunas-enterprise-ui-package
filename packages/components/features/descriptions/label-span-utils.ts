import type { TUIGridItemSpan } from '@/components/layouts/ui-grid';
import type { TDescriptionLabelColSpan } from './context';

const DEFAULT_BASE_LABEL_SPAN = 5 as const;

/** Wider label column below 384px/448px (roomier inside a narrow SidePanel/Dialog), settling to today's 3/12 from 448px up. */
export const DEFAULT_LABEL_COL_SPAN: TDescriptionLabelColSpan = { base: DEFAULT_BASE_LABEL_SPAN, sm: 4, md: 3 };

/** Guarantees a `base` entry so no container width is left without a col-span class. */
export function normalizeLabelSpan(value: TDescriptionLabelColSpan): TUIGridItemSpan {
  return typeof value === 'number' ? value : { base: DEFAULT_BASE_LABEL_SPAN, ...value };
}

/** Complement of the label span at every breakpoint — always 1–11 since the label span type excludes 12. */
export function toValueSpan(value: TUIGridItemSpan): TUIGridItemSpan {
  if (typeof value === 'number') return (12 - value) as TUIGridItemSpan;
  return Object.fromEntries(Object.entries(value).map(([breakpoint, span]) => [breakpoint, 12 - (span as number)])) as TUIGridItemSpan;
}
