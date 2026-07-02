'use client';

import { useId, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, TimeSeriesPoint } from '../types';
import { formatCurrency, toDateLabel } from '../utils';

export type RevenueAreaChartProps = BaseChartProps & {
  data: TimeSeriesPoint[];
  /** Series label. Defaults to `'Revenue'`. */
  label?: string;
  /** Comparison series label. Defaults to `'Previous period'`. */
  comparisonLabel?: string;
  /** Renders `previousValue` as a second, muted area series. */
  showComparison?: boolean;
  color?: string;
  comparisonColor?: string;
  /** Formats tooltip and Y-axis values. Defaults to compact currency. */
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string | Date) => string;
  /** Defaults to `showComparison`. */
  showLegend?: boolean;
  showGrid?: boolean;
};

/**
 * A gradient area chart for revenue (or any currency metric) over time, with an optional
 * previous-period comparison series.
 *
 * @example
 * ```tsx
 * import { RevenueAreaChart } from '@customafk/lunas-ui/features/charts';
 *
 * <RevenueAreaChart
 *   data={[
 *     { date: '2026-06-01', value: 4200, previousValue: 3800 },
 *     { date: '2026-06-02', value: 5100, previousValue: 4300 },
 *   ]}
 *   showComparison
 * />
 * ```
 */
export const RevenueAreaChart = ({
  data,
  label = 'Revenue',
  comparisonLabel = 'Previous period',
  showComparison = false,
  color = 'var(--chart-1)',
  comparisonColor = 'var(--chart-8)',
  valueFormatter = value => formatCurrency(value),
  dateFormatter = toDateLabel,
  showLegend = showComparison,
  showGrid = true,
  className,
  animate = true,
  height,
}: RevenueAreaChartProps) => {
  const gradientId = useId();

  const config = useMemo<ChartConfig>(
    () => ({
      value: { label, color },
      ...(showComparison ? { previousValue: { label: comparisonLabel, color: comparisonColor } } : {}),
    }),
    [label, color, showComparison, comparisonLabel, comparisonColor]
  );

  return (
    <ChartContainer
      data-slot="revenue-area-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        <defs>
          <linearGradient id={`${gradientId}-value`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.6} />
            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id={`${gradientId}-previous`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={comparisonColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={comparisonColor} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={valueFormatter} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? dateFormatter(date) : null;
              }}
              formatter={(value, name, item) => (
                <>
                  <div className="size-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
                  <span className="text-muted">{config[String(name)]?.label || name}</span>
                  <span className="text-text-positive-strong font-number ml-auto font-medium tabular-nums">{valueFormatter(Number(value))}</span>
                </>
              )}
            />
          }
        />
        {showComparison && (
          <Area
            type="natural"
            dataKey="previousValue"
            stroke={comparisonColor}
            strokeWidth={2}
            strokeDasharray="4 4"
            fill={`url(#${gradientId}-previous)`}
            isAnimationActive={animate}
          />
        )}
        <Area type="natural" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#${gradientId}-value)`} isAnimationActive={animate} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </AreaChart>
    </ChartContainer>
  );
};
