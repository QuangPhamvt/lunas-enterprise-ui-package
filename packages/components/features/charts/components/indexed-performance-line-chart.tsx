'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, ChartSeries } from '../types';
import { computeIndexedSeries, formatSignedPercent, getChartColor, toDateLabel } from '../utils';

export type IndexedPerformanceLineChartProps = BaseChartProps & {
  data: Array<{ date: string | Date } & Record<string, unknown>>;
  /** One entry per instrument/fund to compare. */
  series: ChartSeries[];
  /** The value every series is normalized to at its first data point. Defaults to `100`. */
  base?: number;
  /** Formats tooltip and Y-axis values. Defaults to signed % change from `base`. */
  valueFormatter?: (indexedValue: number, base: number) => string;
  dateFormatter?: (date: string | Date) => string;
  showLegend?: boolean;
  showGrid?: boolean;
};

/**
 * A multi-line chart normalizing several instruments to a common base (default 100) at the
 * start of the period, so relative performance is directly comparable regardless of price scale.
 *
 * @example
 * ```tsx
 * import { IndexedPerformanceLineChart } from '@customafk/lunas-ui/features/charts';
 *
 * <IndexedPerformanceLineChart
 *   data={[
 *     { date: '2026-06-01', aapl: 142.5, spy: 512.1 },
 *     { date: '2026-06-02', aapl: 145.1, spy: 515.8 },
 *   ]}
 *   series={[
 *     { key: 'aapl', label: 'AAPL' },
 *     { key: 'spy', label: 'S&P 500' },
 *   ]}
 * />
 * ```
 */
export const IndexedPerformanceLineChart = ({
  data,
  series,
  base = 100,
  valueFormatter = (indexedValue, indexBase) => formatSignedPercent(indexedValue / indexBase - 1),
  dateFormatter = toDateLabel,
  showLegend = true,
  showGrid = true,
  className,
  animate = true,
  height,
}: IndexedPerformanceLineChartProps) => {
  const seriesKeys = useMemo(() => series.map(item => item.key), [series]);

  const chartData = useMemo(() => computeIndexedSeries(data, seriesKeys, base), [data, seriesKeys, base]);

  const config = useMemo<ChartConfig>(
    () => Object.fromEntries(series.map((item, index) => [item.key, { label: item.label, color: item.color || getChartColor(index) }])),
    [series]
  );

  return (
    <ChartContainer
      data-slot="indexed-performance-line-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={56}
          domain={['auto', 'auto']}
          tickFormatter={value => valueFormatter(Number(value), base)}
        />
        <ChartTooltip
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
                  <span className="ml-auto font-medium font-number text-text-positive-strong tabular-nums">{valueFormatter(Number(value), base)}</span>
                </>
              )}
            />
          }
        />
        {series.map((item, index) => (
          <Line
            key={item.key}
            type="natural"
            dataKey={item.key}
            stroke={item.color || getChartColor(index)}
            strokeWidth={2}
            dot={false}
            isAnimationActive={animate}
          />
        ))}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </LineChart>
    </ChartContainer>
  );
};
