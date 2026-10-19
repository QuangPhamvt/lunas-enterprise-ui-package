'use client';
import { memo } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmptyValue } from './empty';

/** Props for the {@link UITableListDisplay} component. */
type Props = {
  /** Array of strings or numbers to render as inline pills. */
  items: (string | number)[] | null | undefined;
  /**
   * Maximum number of pills shown before a `+N` overflow badge appears
   * (default: `3`).
   */
  maxVisible?: number;
  /**
   * Pill shape. `'pill'` (default) is a squared chip; `'tag'` is a rounded-full
   * bordered tag — use it for identifier-like values (shipment codes, SKUs).
   */
  variant?: 'pill' | 'tag';
  /**
   * What the overflow badge's tooltip lists: just the hidden `'overflow'` items
   * (default, keeps the badge focused) or the full `'all'` set.
   */
  tooltipItems?: 'overflow' | 'all';
  /**
   * Renders the overflow badge label. Defaults to `+N more`; pass e.g.
   * `n => `+${n}`` for a compact or localised label.
   */
  moreLabel?: (count: number) => React.ReactNode;
};

const pillClass = (variant: 'pill' | 'tag') =>
  variant === 'tag'
    ? 'inline-flex items-center rounded border border-border bg-white px-2 py-0.5 font-mono text-text-positive text-xs shadow-xs'
    : 'inline-flex min-w-15 items-center justify-center rounded border border-border bg-white px-2 py-0.5 text-text-positive text-xs shadow-xs';

/**
 * Renders an array of values as compact inline pills in a table cell.  When the
 * list exceeds `maxVisible`, a `+N` badge is shown; hovering it reveals the
 * remaining (or, with `tooltipItems="all"`, every) item in a tooltip.  Renders
 * {@link UITableEmptyValue} for empty or absent arrays.
 *
 * @example
 * import { UITableListDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableListDisplay items={['React', 'TypeScript', 'TailwindCSS', 'Vite']} maxVisible={3} />
 * <UITableListDisplay
 *   items={shipmentCodes}
 *   variant="tag"
 *   tooltipItems="all"
 *   moreLabel={n => `+${n}`}
 * />
 */
export const UITableListDisplay: React.FC<Props> = memo(({ items, maxVisible = 3, variant = 'pill', tooltipItems = 'overflow', moreLabel }) => {
  if (!items || items.length === 0) return <UITableEmptyValue />;

  const visible = items.slice(0, maxVisible);
  const overflow = items.slice(maxVisible);
  const tooltipList = tooltipItems === 'all' ? items : overflow;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((item, i) => (
        <span key={`item-${i.toString()}`} className={pillClass(variant)}>
          {item}
        </span>
      ))}

      {overflow.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex cursor-default items-center rounded bg-primary-bg-subtle px-2 py-0.5 text-primary-strong text-xs">
                {moreLabel ? moreLabel(overflow.length) : `+${overflow.length} more`}
              </span>
            </TooltipTrigger>
            {/* `TooltipContent` is `w-fit` by default — combined with `flex-wrap` that
                collapses to one item per row (fit-content sizing minimizes width before
                wrapping). A definite `w-*` gives the wrap enough room to actually pack
                multiple short items per row instead of stacking a tall single column. */}
            <TooltipContent align="start" className="flex w-72 max-w-[90vw] flex-wrap gap-1 p-2">
              {/* White chips on the tooltip's dark ground — a border-only chip
                  would blend into the tooltip background and be unreadable. */}
              {tooltipList.map((item, i) => (
                <span key={`item-${i.toString()}`} className={pillClass(variant)}>
                  {item}
                </span>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});
UITableListDisplay.displayName = 'UITableListDisplay';
