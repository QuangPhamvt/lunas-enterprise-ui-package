'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';
import type { BaseChartProps, ChartSeries } from '../types';
import { getChartColor } from '../utils';

export type MetricRadarChartProps = BaseChartProps & {
  data: Array<{ metric: string } & Record<string, unknown>>;
  /** One entry per entity being compared (e.g. a candidate, a product, a team). */
  series: ChartSeries[];
  valueFormatter?: (value: number) => string;
  /** Radius-axis domain. Defaults to `['auto', 'auto']`. */
  domain?: [number | 'auto', number | 'auto'];
  showLegend?: boolean;
};

/**
 * A radar chart comparing one or more entities across several metrics/dimensions — performance
 * review scores, feature comparisons, skill matrices.
 *
 * @example
 * ```tsx
 * import { MetricRadarChart } from '@customafk/lunas-ui/features/charts';
 *
 * <MetricRadarChart
 *   data={[
 *     { metric: 'Speed', teamA: 80, teamB: 65 },
 *     { metric: 'Quality', teamA: 70, teamB: 90 },
 *     { metric: 'Cost', teamA: 60, teamB: 75 },
 *   ]}
 *   series={[
 *     { key: 'teamA', label: 'Team A' },
 *     { key: 'teamB', label: 'Team B' },
 *   ]}
 * />
 * ```
 */
export const MetricRadarChart = ({
  data,
  series,
  valueFormatter = value => value.toLocaleString('en-US'),
  domain = ['auto', 'auto'],
  showLegend = true,
  className,
  animate = true,
  height,
}: MetricRadarChartProps) => {
  const config = useMemo<ChartConfig>(
    () => Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: item.color || getChartColor(index) }])),
    [series]
  );

  return (
    <ChartContainer
      data-slot="metric-radar-chart"
      config={config}
      className={cn('mx-auto', height === undefined && 'aspect-square', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis domain={domain} tick={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent formatter={value => valueFormatter(Number(value))} />} />
        {series.map((item, index) => {
          const color = item.color || getChartColor(index);
          return <Radar key={item.key} dataKey={item.key} stroke={color} fill={color} fillOpacity={0.25} isAnimationActive={animate} />;
        })}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </RadarChart>
    </ChartContainer>
  );
};
