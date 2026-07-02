'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer } from '@/components/ui/chart';

import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import type { BaseChartProps } from '../types';
import { formatPercent } from '../utils';

export type SalesTargetRadialChartProps = BaseChartProps & {
  /** Current progress value, e.g. revenue to date. */
  value: number;
  /** The goal the value is measured against. */
  target: number;
  /** Text under the center figure. Defaults to `'Target'`. */
  label?: string;
  /** Formats the center figure. Defaults to percent-of-target. */
  valueFormatter?: (value: number, target: number) => string;
  color?: string;
};

/**
 * A radial gauge showing progress toward a sales target with the completion figure in the center.
 *
 * @example
 * ```tsx
 * import { SalesTargetRadialChart } from '@customafk/lunas-ui/features/charts';
 *
 * <SalesTargetRadialChart value={65_000} target={100_000} label="Monthly target" />
 * ```
 */
export const SalesTargetRadialChart = ({
  value,
  target,
  label = 'Target',
  valueFormatter = (current, goal) => formatPercent(goal === 0 ? 0 : current / goal),
  color = 'var(--chart-1)',
  className,
  animate = true,
  height,
}: SalesTargetRadialChartProps) => {
  const chartData = useMemo(() => [{ name: 'progress', value: Math.min(Math.max(value, 0), target), fill: color }], [value, target, color]);

  const config = useMemo<ChartConfig>(() => ({ progress: { label, color } }), [label, color]);

  return (
    <ChartContainer
      data-slot="sales-target-radial-chart"
      config={config}
      className={cn('mx-auto', height === undefined && 'aspect-square', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <RadialBarChart data={chartData} startAngle={90} endAngle={-270} innerRadius="75%" outerRadius="100%">
        <PolarAngleAxis type="number" domain={[0, target]} angleAxisId={0} tick={false} />
        <RadialBar dataKey="value" angleAxisId={0} background cornerRadius={10} isAnimationActive={animate} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
              return (
                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                  <tspan x={viewBox.cx} y={viewBox.cy} className="fill-text-positive-strong font-number text-3xl font-bold">
                    {valueFormatter(value, target)}
                  </tspan>
                  <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted text-xs">
                    {label}
                  </tspan>
                </text>
              );
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};
