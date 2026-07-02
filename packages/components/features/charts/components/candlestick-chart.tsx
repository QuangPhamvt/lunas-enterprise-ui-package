'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, CartesianGrid, ComposedChart, useXAxisScale, useYAxisScale, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, OHLCPoint } from '../types';
import { getDirectionColor, toDateLabel } from '../utils';

type CandlestickSeriesProps = {
  data: OHLCPoint[];
  upColor: string;
  downColor: string;
};

/** Draws candle wicks + bodies directly against the chart's computed axis scales (recharts v3 pattern). */
const CandlestickSeries = ({ data, upColor, downColor }: CandlestickSeriesProps) => {
  const xScale = useXAxisScale();
  const yScale = useYAxisScale();

  if (!xScale || !yScale) return null;

  return (
    <g>
      {data.map(point => {
        const xStart = xScale(point.date, { position: 'start' });
        const xEnd = xScale(point.date, { position: 'end' });
        const yHigh = yScale(point.high);
        const yLow = yScale(point.low);
        const yOpen = yScale(point.open);
        const yClose = yScale(point.close);
        if (xStart === undefined || xEnd === undefined || yHigh === undefined || yLow === undefined || yOpen === undefined || yClose === undefined) {
          return null;
        }

        const bandWidth = xEnd - xStart;
        const bodyWidth = Math.max(bandWidth * 0.6, 2);
        const xCenter = xStart + bandWidth / 2;
        const color = getDirectionColor(point.close, point.open, { up: upColor, down: downColor });
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(Math.abs(yClose - yOpen), 1);

        return (
          <g key={`${point.date}`}>
            <line x1={xCenter} x2={xCenter} y1={yHigh} y2={yLow} stroke={color} strokeWidth={1} />
            <rect x={xCenter - bodyWidth / 2} y={bodyTop} width={bodyWidth} height={bodyHeight} fill={color} />
          </g>
        );
      })}
    </g>
  );
};

export type CandlestickChartProps = BaseChartProps & {
  data: OHLCPoint[];
  /** Series label used in the theme config. Defaults to `'Price'`. */
  label?: string;
  upColor?: string;
  downColor?: string;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string | Date) => string;
  showGrid?: boolean;
};

/**
 * A stock candlestick chart — open/high/low/close per period, green/red bodies, high-low wicks.
 * Recharts has no native candlestick type, so bodies and wicks are drawn against the chart's
 * computed axis scales via `useXAxisScale`/`useYAxisScale` (recharts v3).
 *
 * @example
 * ```tsx
 * import { CandlestickChart } from '@customafk/lunas-ui/features/charts';
 *
 * <CandlestickChart
 *   data={[
 *     { date: '2026-06-01', open: 140, high: 146.2, low: 138.5, close: 144.9 },
 *     { date: '2026-06-02', open: 144.9, high: 145.6, low: 141.2, close: 142.1 },
 *   ]}
 * />
 * ```
 */
export const CandlestickChart = ({
  data,
  label = 'Price',
  upColor = 'var(--success)',
  downColor = 'var(--danger)',
  valueFormatter = value => value.toLocaleString('en-US'),
  dateFormatter = toDateLabel,
  showGrid = true,
  className,
  animate = true,
  height,
}: CandlestickChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ close: { label, color: upColor } }), [label, upColor]);

  const yDomain = useMemo<[number, number]>(() => {
    if (data.length === 0) return [0, 1];
    const min = Math.min(...data.map(point => point.low));
    const max = Math.max(...data.map(point => point.high));
    const padding = (max - min) * 0.08 || Math.max(max, 1) * 0.08;
    return [min - padding, max + padding];
  }, [data]);

  return (
    <ChartContainer
      data-slot="candlestick-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis domain={yDomain} tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={valueFormatter} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? dateFormatter(date) : null;
              }}
              formatter={(_value, _name, item) => {
                const point = item.payload as OHLCPoint;
                return (
                  <div className="grid gap-0.5">
                    <span className="text-muted">
                      O <span className="font-number text-text-positive-strong">{valueFormatter(point.open)}</span> H{' '}
                      <span className="font-number text-text-positive-strong">{valueFormatter(point.high)}</span>
                    </span>
                    <span className="text-muted">
                      L <span className="font-number text-text-positive-strong">{valueFormatter(point.low)}</span> C{' '}
                      <span className="font-number text-text-positive-strong">{valueFormatter(point.close)}</span>
                    </span>
                  </div>
                );
              }}
            />
          }
        />
        {/* Invisible series so the Tooltip has a graphical item to attach to; payload still carries the full OHLC row. */}
        <Bar dataKey="close" fill="transparent" isAnimationActive={animate} />
        <CandlestickSeries data={data} upColor={upColor} downColor={downColor} />
      </ComposedChart>
    </ChartContainer>
  );
};
