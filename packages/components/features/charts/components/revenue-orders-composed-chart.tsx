'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';
import type { BaseChartProps } from '../types';
import { formatCurrency, toDateLabel } from '../utils';

/** Revenue and order count for one time bucket. */
export type RevenueOrdersPoint = {
  /** Bucket date — a `Date` or an ISO date string. */
  date: string | Date;
  /** Revenue for the bucket (area series). */
  revenue: number;
  /** Number of orders in the bucket (bar series). */
  orders: number;
};

/** Props for `RevenueOrdersComposedChart`. */
export type RevenueOrdersComposedChartProps = BaseChartProps & {
  /** Data points to plot, in display order. */
  data: RevenueOrdersPoint[];
  /**
   * Legend label of the revenue (area) series.
   * @default 'Revenue'
   */
  revenueLabel?: string;
  /**
   * Legend label of the orders (bar) series.
   * @default 'Orders'
   */
  ordersLabel?: string;
  /**
   * Color of the revenue series.
   * @default 'var(--chart-1)'
   */
  revenueColor?: string;
  /**
   * Color of the orders series.
   * @default 'var(--chart-4)'
   */
  ordersColor?: string;
  /** Formats the left (revenue) axis and tooltip values. Defaults to compact currency. */
  revenueFormatter?: (value: number) => string;
  /** Formats the right (orders) axis and tooltip values. */
  ordersFormatter?: (value: number) => string;
  /**
   * Formats dates on the time axis and in the tooltip.
   * @default toDateLabel
   */
  dateFormatter?: (date: string | Date) => string;
  /**
   * Show the series legend.
   * @default true
   */
  showLegend?: boolean;
  /**
   * Draw background grid lines.
   * @default true
   */
  showGrid?: boolean;
};

/**
 * A dual-axis chart combining revenue bars (left axis, currency) with an orders line
 * (right axis, count) to correlate the two metrics per period.
 *
 * @example
 * ```tsx
 * import { RevenueOrdersComposedChart } from '@customafk/lunas-ui/features/charts';
 *
 * <RevenueOrdersComposedChart
 *   data={[{ date: '2026-06-01', revenue: 12400, orders: 87 }]}
 * />
 * ```
 */
export const RevenueOrdersComposedChart = ({
  data,
  revenueLabel = 'Revenue',
  ordersLabel = 'Orders',
  revenueColor = 'var(--chart-1)',
  ordersColor = 'var(--chart-4)',
  revenueFormatter = value => formatCurrency(value),
  ordersFormatter = value => value.toLocaleString('en-US'),
  dateFormatter = toDateLabel,
  showLegend = true,
  showGrid = true,
  className,
  animate = true,
  height,
}: RevenueOrdersComposedChartProps) => {
  const config = useMemo<ChartConfig>(
    () => ({
      revenue: { label: revenueLabel, color: revenueColor },
      orders: { label: ordersLabel, color: ordersColor },
    }),
    [revenueLabel, revenueColor, ordersLabel, ordersColor]
  );

  return (
    <ChartContainer
      data-slot="revenue-orders-composed-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis yAxisId="revenue" tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={revenueFormatter} />
        <YAxis
          yAxisId="orders"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={48}
          allowDecimals={false}
          tickFormatter={ordersFormatter}
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
                  <span className="text-text-positive-strong font-number ml-auto font-medium tabular-nums">
                    {name === 'revenue' ? revenueFormatter(Number(value)) : ordersFormatter(Number(value))}
                  </span>
                </>
              )}
            />
          }
        />
        <Bar dataKey="revenue" yAxisId="revenue" fill={revenueColor} radius={[4, 4, 0, 0]} isAnimationActive={animate} />
        <Line type="natural" dataKey="orders" yAxisId="orders" stroke={ordersColor} strokeWidth={2} dot={false} isAnimationActive={animate} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </ComposedChart>
    </ChartContainer>
  );
};
