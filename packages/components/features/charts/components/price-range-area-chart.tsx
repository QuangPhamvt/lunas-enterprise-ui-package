'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, OHLCPoint } from '../types';
import { toDateLabel } from '../utils';

export type PriceRangeAreaChartProps = BaseChartProps & {
  /** Only `date`, `high`, `low`, and `close` are used; pass the same rows given to `CandlestickChart`. */
  data: Array<Pick<OHLCPoint, 'date' | 'high' | 'low' | 'close'>>;
  /** Close-price series label. Defaults to `'Close'`. */
  label?: string;
  /** High-low band label. Defaults to `'Range'`. */
  rangeLabel?: string;
  color?: string;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string | Date) => string;
  showGrid?: boolean;
};

/**
 * A shaded high-low trading-range band with the close price drawn on top — the daily range is
 * visible at a glance alongside the closing trend.
 *
 * @example
 * ```tsx
 * import { PriceRangeAreaChart } from '@customafk/lunas-ui/features/charts';
 *
 * <PriceRangeAreaChart
 *   data={[{ date: '2026-06-01', high: 146.2, low: 141.8, close: 144.9 }]}
 * />
 * ```
 */
export const PriceRangeAreaChart = ({
  data,
  label = 'Close',
  rangeLabel = 'Range',
  color = 'var(--chart-1)',
  valueFormatter = value => value.toLocaleString('en-US'),
  dateFormatter = toDateLabel,
  showGrid = true,
  className,
  animate = true,
  height,
}: PriceRangeAreaChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ close: { label, color }, rangeSpan: { label: rangeLabel, color } }), [label, color, rangeLabel]);

  const chartData = useMemo(() => data.map(point => ({ ...point, rangeSpan: point.high - point.low })), [data]);

  return (
    <ChartContainer
      data-slot="price-range-area-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <ComposedChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={valueFormatter} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? dateFormatter(date) : null;
              }}
              formatter={(value, name, item) => {
                if (name !== 'close') return null;
                const point = item.payload as { high: number; low: number };
                return (
                  <div className="grid gap-0.5">
                    <span className="text-muted">
                      {config.close?.label} <span className="font-medium font-number text-text-positive-strong">{valueFormatter(Number(value))}</span>
                    </span>
                    <span className="text-[11px] text-muted">
                      {valueFormatter(point.low)} – {valueFormatter(point.high)}
                    </span>
                  </div>
                );
              }}
            />
          }
        />
        <Area dataKey="low" stackId="range" stroke="none" fill="transparent" isAnimationActive={animate} />
        <Area dataKey="rangeSpan" stackId="range" stroke="none" fill={color} fillOpacity={0.15} isAnimationActive={animate} />
        <Line type="natural" dataKey="close" stroke={color} strokeWidth={2} dot={false} isAnimationActive={animate} />
      </ComposedChart>
    </ChartContainer>
  );
};
