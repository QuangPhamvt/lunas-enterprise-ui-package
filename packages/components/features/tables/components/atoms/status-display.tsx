'use client';

import { memo } from 'react';

import { Badge } from '@/components/ui/badge';

import { UITableEmptyValue } from './empty';

type BadgeColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

/** Props for the {@link UITableStatusDisplay} component. */
type Props = {
  /** The status string to display; `null`/`undefined` renders an empty state. */
  value: string | null | undefined;
  /**
   * Maps each status string to a badge color.  Any key not present in the map
   * falls back to `defaultColor`.
   */
  colorMap?: Record<string, BadgeColor>;
  /** Color used when `value` is not found in `colorMap` (default: `'muted'`). */
  defaultColor?: BadgeColor;
  /** Badge variant forwarded to the underlying {@link Badge} (default: `'soft'`). */
  variant?: 'solid' | 'soft' | 'outline';
};

/**
 * Renders a color-coded status badge for a table cell.  The mapping from status
 * string to badge color is fully configurable via `colorMap`; unknown statuses
 * fall back to `defaultColor`.
 *
 * @example
 * import { UITableStatusDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableStatusDisplay
 *   value="active"
 *   colorMap={{ active: 'success', inactive: 'danger', pending: 'warning' }}
 * />
 */
export const UITableStatusDisplay: React.FC<Props> = memo(({ value, colorMap, defaultColor = 'muted', variant = 'soft' }) => {
  if (value === null || value === undefined || value === '') return <UITableEmptyValue />;

  const color: BadgeColor = colorMap?.[value] ?? defaultColor;
  const label = value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');

  return (
    <Badge pill={false} variant={variant} color={color} size="sm" className="min-w-20 justify-center capitalize">
      {label}
    </Badge>
  );
});
UITableStatusDisplay.displayName = 'UITableStatusDisplay';
