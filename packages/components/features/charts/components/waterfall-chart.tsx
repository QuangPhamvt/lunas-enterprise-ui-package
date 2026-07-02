'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, WaterfallPoint } from '../types';
import { getDirectionColor } from '../utils';

export type WaterfallChartProps = BaseChartProps & {
  data: WaterfallPoint[];
  /** Color for `isTotal` bars. Defaults to `'var(--chart-1)'`. */
  totalColor?: string;
  upColor?: string;
  downColor?: string;
  valueFormatter?: (value: number) => string;
  showGrid?: boolean;
};

/**
 * A waterfall/bridge chart — an incremental sequence of positive/negative steps between totals
 * (e.g. starting balance → revenue → costs → ending balance). Built as stacked bars: an
 * invisible "base" bar positions each floating step at its running total.
 *
 * @example
 * ```tsx
 * import { WaterfallChart } from '@customafk/lunas-ui/features/charts';
 *
 * <WaterfallChart
 *   data={[
 *     { label: 'Starting cash', value: 50000, isTotal: true },
 *     { label: 'Revenue', value: 32000 },
 *     { label: 'COGS', value: -18000 },
 *     { label: 'Opex', value: -9000 },
 *     { label: 'Ending cash', value: 55000, isTotal: true },
 *   ]}
 * />
 * ```
 */
export const WaterfallChart = ({
  data,
  totalColor = 'var(--chart-1)',
  upColor = 'var(--success)',
  downColor = 'var(--danger)',
  valueFormatter = value => value.toLocaleString('en-US'),
  showGrid = true,
  className,
  animate = true,
  height,
}: WaterfallChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ size: { label: 'Amount', color: totalColor } }), [totalColor]);

  const chartData = useMemo(() => {
    let cumulative = 0;
    return data.map(point => {
      if (point.isTotal) {
        const base = 0;
        cumulative = point.value;
        return { ...point, base, size: point.value, color: totalColor, runningTotal: cumulative };
      }
      const previous = cumulative;
      cumulative += point.value;
      const base = Math.min(previous, cumulative);
      return {
        ...point,
        base,
        size: Math.abs(point.value),
        color: getDirectionColor(point.value, 0, { up: upColor, down: downColor }),
        runningTotal: cumulative,
      };
    });
  }, [data, totalColor, upColor, downColor]);

  return (
    <ChartContainer
      data-slot="waterfall-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <BarChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={valueFormatter} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideIndicator
              formatter={(_value, _name, item) => {
                const point = item.payload as (typeof chartData)[number];
                return (
                  <div className="grid gap-0.5">
                    <span className="text-muted">
                      {point.isTotal ? 'Total' : point.value >= 0 ? 'Increase' : 'Decrease'}{' '}
                      <span className="font-medium font-number text-text-positive-strong">{valueFormatter(point.value)}</span>
                    </span>
                    <span className="text-[11px] text-muted">Running total {valueFormatter(point.runningTotal)}</span>
                  </div>
                );
              }}
            />
          }
        />
        <Bar dataKey="base" stackId="waterfall" fill="transparent" isAnimationActive={false} />
        <Bar
          dataKey="size"
          stackId="waterfall"
          isAnimationActive={animate}
          shape={props => <Rectangle {...props} fill={(props.payload as { color: string }).color} radius={2} />}
        />
      </BarChart>
    </ChartContainer>
  );
};
