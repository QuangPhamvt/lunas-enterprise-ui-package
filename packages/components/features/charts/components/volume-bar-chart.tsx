'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, OHLCPoint } from '../types';
import { formatCompactNumber, getDirectionColor, toDateLabel } from '../utils';

export type VolumeBarChartProps = BaseChartProps & {
  /** Only `date`, `close`, and `volume` are used; pass the same rows given to `CandlestickChart`. */
  data: Array<Pick<OHLCPoint, 'date' | 'close' | 'volume'>>;
  /** Series label. Defaults to `'Volume'`. */
  label?: string;
  upColor?: string;
  downColor?: string;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string | Date) => string;
  showGrid?: boolean;
};

/**
 * Volume bars colored by day direction (close vs. previous close), meant to sit under a
 * `CandlestickChart` on a shared time axis.
 *
 * @example
 * ```tsx
 * import { VolumeBarChart } from '@customafk/lunas-ui/features/charts';
 *
 * <VolumeBarChart
 *   data={[
 *     { date: '2026-06-01', close: 142.5, volume: 2_400_000 },
 *     { date: '2026-06-02', close: 145.1, volume: 3_100_000 },
 *   ]}
 * />
 * ```
 */
export const VolumeBarChart = ({
  data,
  label = 'Volume',
  upColor = 'var(--success)',
  downColor = 'var(--danger)',
  valueFormatter = formatCompactNumber,
  dateFormatter = toDateLabel,
  showGrid = true,
  className,
  animate = true,
  height,
}: VolumeBarChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ volume: { label, color: upColor } }), [label, upColor]);

  const chartData = useMemo(() => data.map((point, index) => ({ ...point, previousClose: index > 0 ? data[index - 1]?.close : point.close })), [data]);

  return (
    <ChartContainer
      data-slot="volume-bar-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <BarChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={56} tickFormatter={valueFormatter} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? dateFormatter(date) : null;
              }}
              formatter={value => valueFormatter(Number(value))}
            />
          }
        />
        <Bar
          dataKey="volume"
          isAnimationActive={animate}
          shape={props => {
            const point = props.payload as { close?: number; previousClose?: number } | undefined;
            const color = getDirectionColor(point?.close ?? 0, point?.previousClose ?? 0, { up: upColor, down: downColor });
            return <Rectangle {...props} fill={color} />;
          }}
        />
      </BarChart>
    </ChartContainer>
  );
};
