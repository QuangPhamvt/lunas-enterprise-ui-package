'use client';

import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { UITableEmptyValue } from './empty';

type BadgeColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

/** A single distinct status value, optionally with how many rows carry it. */
export type UITableStatusListItem = {
  /** The raw status string. */
  value: string;
  /** How many sub-rows have this status (rendered as `× N` in the tooltip). */
  count?: number;
};

/** Props for the {@link UITableStatusListDisplay} component. */
type Props = {
  /** Distinct status values to summarise; empty/absent renders an empty state. */
  items: UITableStatusListItem[] | null | undefined;
  /** Maps each status string to a badge color (shared with {@link UITableStatusDisplay}). */
  colorMap?: Record<string, BadgeColor>;
  /** Color used when a value is not in `colorMap` (default: `'muted'`). */
  defaultColor?: BadgeColor;
  /** Badge variant forwarded to the underlying {@link Badge} (default: `'soft'`). */
  variant?: 'solid' | 'soft' | 'outline';
  /** Maximum badges shown before a `+N` overflow badge appears (default: `1`). */
  maxVisible?: number;
  /** Maps a raw status string to a human label (e.g. an i18n lookup). */
  formatLabel?: (value: string) => string;
};

const humanize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ').toLowerCase();

/**
 * Summarises the **set of distinct statuses** across a group of rows as a row of
 * color-coded badges with a `+N` overflow badge. Hovering the overflow badge
 * reveals **every** status (with its `count`) in a tooltip. Use it on an
 * aggregate/parent row where a single-value {@link UITableStatusDisplay} cannot
 * represent the mix — also fits order-type / order-status columns.
 *
 * @example
 * import { UITableStatusListDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableStatusListDisplay
 *   items={[{ value: 'PURCHASED', count: 4 }, { value: 'PURCHASING', count: 1 }]}
 *   colorMap={{ PURCHASED: 'success', PURCHASING: 'warning' }}
 *   formatLabel={t}
 * />
 */
export const UITableStatusListDisplay: React.FC<Props> = memo(({ items, colorMap, defaultColor = 'muted', variant = 'soft', maxVisible = 1, formatLabel }) => {
  if (!items || items.length === 0) return <UITableEmptyValue />;

  const label = (value: string) => formatLabel?.(value) ?? humanize(value);
  const visible = items.slice(0, maxVisible);
  const overflow = items.slice(maxVisible);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {visible.map(item => (
        <Badge
          key={item.value}
          pill={false}
          variant={variant}
          color={colorMap?.[item.value] ?? defaultColor}
          size="sm"
          className="min-w-20 justify-center capitalize"
        >
          {label(item.value)}
        </Badge>
      ))}

      {overflow.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex cursor-default items-center rounded bg-primary-bg-subtle px-2 py-0.5 text-primary-strong text-xs">
                +{overflow.length}
              </span>
            </TooltipTrigger>
            <TooltipContent align="start" className="flex max-w-72 flex-col gap-1 p-2">
              {items.map(item => (
                <div key={item.value} className="flex items-center justify-between gap-3">
                  <Badge pill={false} variant={variant} color={colorMap?.[item.value] ?? defaultColor} size="sm" className="justify-center capitalize">
                    {label(item.value)}
                  </Badge>
                  {item.count != null && <span className="text-text-negative text-xs">× {item.count}</span>}
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
});
UITableStatusListDisplay.displayName = 'UITableStatusListDisplay';
