'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Progress } from '@/components/ui/progress';

import { Flex } from '@/components/layouts/flex';
import { DescriptionEmpty } from './empty';

type DescriptionProgressColor = 'primary' | 'success' | 'warning' | 'danger';

const INDICATOR_COLOR: Record<DescriptionProgressColor, string> = {
  primary: '[&_[data-slot=progress-indicator]]:bg-primary',
  success: '[&_[data-slot=progress-indicator]]:bg-success',
  warning: '[&_[data-slot=progress-indicator]]:bg-warning',
  danger: '[&_[data-slot=progress-indicator]]:bg-danger',
};

const BAR_HEIGHT: Record<'xs' | 'sm' | 'md', string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
};

type DescriptionProgressProps = {
  value: number | null | undefined;
  /** @default 100 */
  max?: number;
  /** @default true */
  showValue?: boolean;
  /** Bar thickness. @default 'sm' */
  size?: 'xs' | 'sm' | 'md';
  /** @default 'primary' */
  color?: DescriptionProgressColor;
};

/**
 * Thin-wraps `ui/progress` for use as a description value. `value={0}` renders a (visually empty) bar,
 * not `DescriptionEmpty` — 0% progress is real information, unlike `DescriptionStatistic`'s `0`-hides-by-default
 * behavior for currency-like values, where an unset field and a genuine zero amount are indistinguishable.
 */
export const DescriptionProgress: React.FC<DescriptionProgressProps> = ({ value, max = 100, showValue = true, size = 'sm', color = 'primary' }) => {
  if (value == null || Number.isNaN(value)) return <DescriptionEmpty />;

  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <Flex data-slot="description-progress" width="full" padding="none" gap="sm" wrap={false} align="center">
      <Progress value={pct} className={cn('min-w-24 flex-1', BAR_HEIGHT[size], INDICATOR_COLOR[color])} />
      {showValue && (
        <span data-slot="description-progress-value" className="shrink-0 font-number text-text-positive-weak text-xs tabular-nums">
          {Math.round(pct)}%
        </span>
      )}
    </Flex>
  );
};
