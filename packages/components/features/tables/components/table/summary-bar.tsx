'use client';
import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Statistic } from '@/components/data-display/statistic';
import { useUITableContext, useUITableSummaryContext } from '../../hooks/use-context';
import type { SummaryItem } from '../../types';

const trendAccent: Record<NonNullable<SummaryItem['trend']>, string> = {
  up: 'bg-success',
  down: 'bg-danger',
  neutral: 'bg-primary',
};

export const UITableSummaryBar = memo(() => {
  const { summary, onSummaryItemClick } = useUITableContext();
  const { isOpen } = useUITableSummaryContext();

  if (!isOpen || !summary || summary.length === 0) return null;

  return (
    <div data-slot="table-summary-bar" className="w-full overflow-x-auto px-2 pb-1">
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 240px))' }}>
        {summary.map(item => {
          const accent = trendAccent[item.trend ?? 'neutral'];
          const isClickable = !!onSummaryItemClick;

          return (
            <div
              key={item.label}
              className={cn(
                'flex flex-col overflow-hidden rounded border border-border bg-card shadow-card',
                isClickable && 'cursor-pointer transition-shadow hover:shadow-md'
              )}
              onClick={isClickable ? () => onSummaryItemClick(item) : undefined}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={
                isClickable
                  ? e => {
                      if (e.key === 'Enter' || e.key === ' ') onSummaryItemClick(item);
                    }
                  : undefined
              }
            >
              {/* Coloured accent strip */}
              <div className={cn('h-0.75 w-full shrink-0', accent)} />

              <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                {/* Label */}
                <span className="text-[11px] font-semibold uppercase tracking-widest text-text-positive-weak">{item.label}</span>

                {/* Value */}
                {item.value !== null && item.value !== undefined ? (
                  <Statistic
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    precision={item.precision}
                    trend={item.trend}
                    size="xl"
                    className="font-bold"
                  />
                ) : (
                  <span className="text-xl font-bold tabular-nums text-text-positive-strong">—</span>
                )}

                {/* Description */}
                {item.description && <span className="text-xs text-text-positive-weak">{item.description}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
UITableSummaryBar.displayName = 'UITableSummaryBar';
