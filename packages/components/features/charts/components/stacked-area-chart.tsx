'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, ChartSeries } from '../types';
import { getChartColor, toDateLabel } from '../utils';

export type StackedAreaChartProps = BaseChartProps & {
  data: Array<{ date: string | Date } & Record<string, unknown>>;
  /** One entry per stacked category. */
  series: ChartSeries[];
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string | Date) => string;
  showLegend?: boolean;
  showGrid?: boolean;
};

/**
 * A stacked area chart for cumulative composition over time — e.g. revenue by channel, traffic
 * by source. Unlike `RevenueAreaChart` (a single series plus one comparison overlay), every
 * series here stacks to show the total alongside each category's contribution.
 *
 * @example
 * ```tsx
 * import { StackedAreaChart } from '@customafk/lunas-ui/features/charts';
 *
 * <StackedAreaChart
 *   data={[{ date: '2026-06-01', direct: 4200, organic: 3100, paid: 1800 }]}
 *   series={[
 *     { key: 'direct', label: 'Direct' },
 *     { key: 'organic', label: 'Organic' },
 *     { key: 'paid', label: 'Paid' },
 *   ]}
 * />
 * ```
 */
export const StackedAreaChart = ({
  data,
  series,
  valueFormatter = value => value.toLocaleString('en-US'),
  dateFormatter = toDateLabel,
  showLegend = true,
  showGrid = true,
  className,
  animate = true,
  height,
}: StackedAreaChartProps) => {
  const config = useMemo<ChartConfig>(
    () => Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: item.color || getChartColor(index) }])),
    [series]
  );

  return (
    <ChartContainer
      data-slot="stacked-area-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={valueFormatter} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? dateFormatter(date) : null;
              }}
              formatter={value => valueFormatter(Number(value))}
            />
          }
        />
        {series.map((item, index) => {
          const color = item.color || getChartColor(index);
          return (
            <Area key={item.key} type="natural" dataKey={item.key} stackId="stack" stroke={color} fill={color} fillOpacity={0.35} isAnimationActive={animate} />
          );
        })}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </AreaChart>
    </ChartContainer>
  );
};
