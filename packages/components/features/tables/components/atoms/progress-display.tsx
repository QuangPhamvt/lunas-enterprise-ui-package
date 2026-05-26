'use client';

import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Progress } from '@/components/ui/progress';
import { UITableEmpty } from './empty';

/** Props for the {@link UITableProgressDisplay} component. */
type Props = {
  /** Percentage value between 0 and 100; `null`/`undefined` renders an empty state. */
  value: number | null | undefined;
  /** When `true`, shows the numeric percentage next to the bar (default: `true`). */
  showLabel?: boolean;
  /**
   * Color thresholds applied to the progress indicator.
   * - `≥ successThreshold` → green
   * - `≥ warningThreshold` → yellow
   * - otherwise → red
   *
   * Defaults: `successThreshold = 70`, `warningThreshold = 40`.
   */
  successThreshold?: number;
  warningThreshold?: number;
};

/**
 * Renders a horizontal progress bar with an optional percentage label for a
 * table cell.  The bar color shifts from red → yellow → green based on
 * configurable thresholds.  Renders {@link UITableEmpty} when `value` is absent.
 *
 * @example
 * import { UITableProgressDisplay } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableProgressDisplay value={75} />
 */
export const UITableProgressDisplay = memo(({ value, showLabel = true, successThreshold = 70, warningThreshold = 40 }: Props) => {
  if (value === null || value === undefined) return <UITableEmpty />;

  const clamped = Math.min(100, Math.max(0, value));

  const indicatorClass =
    clamped >= successThreshold
      ? '[&>[data-slot=progress-indicator]]:bg-success'
      : clamped >= warningThreshold
        ? '[&>[data-slot=progress-indicator]]:bg-warning'
        : '[&>[data-slot=progress-indicator]]:bg-danger';

  return (
    <div className="flex w-full min-w-24 items-center gap-x-2">
      <Progress value={clamped} className={cn('flex-1', indicatorClass)} />
      {showLabel && <span className="w-9 shrink-0 text-right font-number text-text-positive-weak text-xs tabular-nums">{clamped}%</span>}
    </div>
  );
});
UITableProgressDisplay.displayName = 'UITableProgressDisplay';
