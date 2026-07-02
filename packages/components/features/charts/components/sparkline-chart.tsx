'use client';

import { useId, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from 'recharts';
import type { ChartTrend } from '../types';

const TREND_COLORS: Record<ChartTrend, string> = {
  up: 'var(--success)',
  down: 'var(--danger)',
  neutral: 'var(--chart-1)',
};

export type SparklineChartProps = {
  data: number[] | Array<{ value: number }>;
  /** Render style. Defaults to `'area'`. */
  type?: 'line' | 'area';
  /** Colors the series like the `Statistic` trend prop. Defaults to `'neutral'`. */
  trend?: ChartTrend;
  /** Explicit series color; overrides `trend`. */
  color?: string;
  /** Fixed height in px. Defaults to `40`. */
  height?: number;
  animate?: boolean;
  className?: string;
};

/**
 * A tiny, axis-less trend chart for KPI cards; pairs with the `Statistic` display component.
 *
 * @example
 * ```tsx
 * import { SparklineChart } from '@customafk/lunas-ui/features/charts';
 *
 * <SparklineChart data={[12, 18, 14, 26, 22, 31]} trend="up" />
 * ```
 */
export const SparklineChart = ({ data, type = 'area', trend = 'neutral', color, height = 40, animate = true, className }: SparklineChartProps) => {
  const gradientId = useId();
  const seriesColor = color || TREND_COLORS[trend];

  const chartData = useMemo(() => data.map(point => (typeof point === 'number' ? { value: point } : point)), [data]);

  const margin = { top: 2, right: 0, bottom: 2, left: 0 };

  return (
    <div data-slot="sparkline-chart" className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer>
        {type === 'line' ? (
          <LineChart data={chartData} margin={margin}>
            <Line type="natural" dataKey="value" stroke={seriesColor} strokeWidth={2} dot={false} isAnimationActive={animate} />
          </LineChart>
        ) : (
          <AreaChart data={chartData} margin={margin}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={seriesColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={seriesColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area type="natural" dataKey="value" stroke={seriesColor} strokeWidth={2} fill={`url(#${gradientId})`} isAnimationActive={animate} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
