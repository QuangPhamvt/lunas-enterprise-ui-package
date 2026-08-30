'use client';
import { memo } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmptyValue } from './empty';

/** Props for the {@link UITableListDisplay} component. */
type Props = {
  /** Array of strings or numbers to render as inline pills. */
  items: (string | number)[] | null | undefined;
  /**
   * Maximum number of pills shown before a `+N more` overflow badge appears
   * (default: `3`).
   */
  maxVisible?: number;
};

/**
 * Renders an array of values as compact inline pills in a table cell.  When the
 * list exceeds `maxVisible`, a `+N more` badge is shown; hovering it reveals all
 * remaining items in a tooltip.  Renders {@link UITableEmptyValue} for empty or absent
 * arrays.
 *
 * @example
 * import { UITableListDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableListDisplay items={['React', 'TypeScript', 'TailwindCSS', 'Vite']} maxVisible={3} />
 */
export const UITableListDisplay: React.FC<Props> = memo(({ items, maxVisible = 3 }) => {
  if (!items || items.length === 0) return <UITableEmptyValue />;

  const visible = items.slice(0, maxVisible);
  const overflow = items.slice(maxVisible);

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((item, i) => (
        <span
          key={`item-${i.toString()}`}
          className="inline-flex min-w-15 items-center justify-center rounded border border-border bg-white px-2 py-0.5 text-text-positive text-xs shadow-xs"
        >
          {item}
        </span>
      ))}

      {overflow.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex cursor-default items-center rounded bg-primary-bg-subtle px-2 py-0.5 text-primary-strong text-xs">
                +{overflow.length} more
              </span>
            </TooltipTrigger>
            <TooltipContent align="start" className="flex max-w-64 flex-wrap gap-1 p-2">
              {overflow.map((item, i) => (
                <span
                  key={`item-${i.toString()}`}
                  className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-text-negative text-xs"
                >
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
