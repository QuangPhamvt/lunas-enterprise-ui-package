'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Label, Pie, PieChart } from 'recharts';
import type { BaseChartProps, NamedValue } from '../types';
import { formatCompactNumber, getChartColor } from '../utils';

export type DonutChartSegment = NamedValue & {
  /** Config key; derived from `name` when omitted. */
  key?: string;
  color?: string;
};

export type DonutChartProps = BaseChartProps & {
  data: DonutChartSegment[];
  /** Text under the center total, e.g. `'Total sales'`. */
  centerLabel?: string;
  /** Formats the center total. Defaults to compact notation. */
  centerValueFormatter?: (total: number) => string;
  /** Overrides the computed segment sum shown in the center. */
  totalValue?: number;
  showLegend?: boolean;
  showCenterTotal?: boolean;
};

const toKey = (segment: DonutChartSegment): string => segment.key || segment.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * A donut breakdown chart with a center total — category sales, traffic sources, payment methods.
 *
 * @example
 * ```tsx
 * import { DonutChart } from '@customafk/lunas-ui/features/charts';
 *
 * <DonutChart
 *   data={[
 *     { name: 'Fashion', value: 12400 },
 *     { name: 'Electronics', value: 8200 },
 *   ]}
 *   centerLabel="Total sales"
 * />
 * ```
 */
export const DonutChart = ({
  data,
  centerLabel,
  centerValueFormatter = formatCompactNumber,
  totalValue,
  showLegend = true,
  showCenterTotal = true,
  className,
  animate = true,
  height,
}: DonutChartProps) => {
  const { chartData, config, total } = useMemo(() => {
    const entries = data.map((segment, index) => ({
      ...segment,
      key: toKey(segment),
      fill: segment.color || getChartColor(index),
    }));
    const chartConfig: ChartConfig = Object.fromEntries(entries.map(entry => [entry.key, { label: entry.name, color: entry.fill }]));
    return {
      chartData: entries,
      config: chartConfig,
      total: totalValue ?? data.reduce((sum, segment) => sum + segment.value, 0),
    };
  }, [data, totalValue]);

  return (
    <ChartContainer
      data-slot="donut-chart"
      config={config}
      className={cn('mx-auto', height === undefined && 'aspect-square', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="key" hideLabel />} />
        <Pie data={chartData} dataKey="value" nameKey="key" innerRadius="60%" strokeWidth={5} isAnimationActive={animate}>
          {showCenterTotal && (
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-text-positive-strong font-number text-2xl font-bold">
                      {centerValueFormatter(total)}
                    </tspan>
                    {centerLabel && (
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 22} className="fill-muted text-xs">
                        {centerLabel}
                      </tspan>
                    )}
                  </text>
                );
              }}
            />
          )}
        </Pie>
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey="key" />} />}
      </PieChart>
    </ChartContainer>
  );
};
