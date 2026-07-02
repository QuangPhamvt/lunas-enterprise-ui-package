'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';
import type { BaseChartProps } from '../types';

export type MirroredBarRow = {
  category: string;
  left: number;
  right: number;
};

export type MirroredBarChartProps = BaseChartProps & {
  data: MirroredBarRow[];
  leftLabel?: string;
  rightLabel?: string;
  leftColor?: string;
  rightColor?: string;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showGrid?: boolean;
};

/**
 * A two-sided horizontal bar comparison (population-pyramid style) — this period vs. last
 * period, male vs. female, before vs. after — mirrored around a shared zero baseline.
 *
 * @example
 * ```tsx
 * import { MirroredBarChart } from '@customafk/lunas-ui/features/charts';
 *
 * <MirroredBarChart
 *   data={[
 *     { category: '18-24', left: 1200, right: 1400 },
 *     { category: '25-34', left: 2600, right: 2100 },
 *   ]}
 *   leftLabel="Male"
 *   rightLabel="Female"
 * />
 * ```
 */
export const MirroredBarChart = ({
  data,
  leftLabel = 'Left',
  rightLabel = 'Right',
  leftColor = 'var(--chart-1)',
  rightColor = 'var(--chart-4)',
  valueFormatter = value => value.toLocaleString('en-US'),
  showLegend = true,
  showGrid = true,
  className,
  animate = true,
  height,
}: MirroredBarChartProps) => {
  const config = useMemo<ChartConfig>(
    () => ({ left: { label: leftLabel, color: leftColor }, right: { label: rightLabel, color: rightColor } }),
    [leftLabel, leftColor, rightLabel, rightColor]
  );

  const chartData = useMemo(() => data.map(row => ({ category: row.category, left: -row.left, right: row.right, originalLeft: row.left })), [data]);

  const axisFormatter = (value: number) => valueFormatter(Math.abs(value));

  return (
    <ChartContainer
      data-slot="mirrored-bar-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid horizontal={false} />}
        <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={axisFormatter} />
        <YAxis type="category" dataKey="category" tickLine={false} axisLine={false} tickMargin={8} width={64} />
        <ReferenceLine x={0} stroke="var(--border)" />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name, item) => {
                const isLeft = name === 'left';
                const rawValue = isLeft ? item.payload.originalLeft : Number(value);
                return (
                  <>
                    <div className="size-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
                    <span className="text-muted">{isLeft ? leftLabel : rightLabel}</span>
                    <span className="ml-auto font-medium font-number text-text-positive-strong tabular-nums">{valueFormatter(rawValue)}</span>
                  </>
                );
              }}
            />
          }
        />
        <Bar dataKey="left" fill={leftColor} radius={[4, 0, 0, 4]} isAnimationActive={animate} />
        <Bar dataKey="right" fill={rightColor} radius={[0, 4, 4, 0]} isAnimationActive={animate} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </BarChart>
    </ChartContainer>
  );
};
