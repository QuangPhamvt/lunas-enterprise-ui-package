'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, ChartSeries } from '../types';
import { getChartColor, toDateLabel } from '../utils';

export type OrdersBarChartProps = BaseChartProps & {
  data: Array<{ date: string | Date } & Record<string, unknown>>;
  /** Simple mode: the key holding each period's count. Defaults to `'orders'`. */
  dataKey?: string;
  /** Series label in simple mode. Defaults to `'Orders'`. */
  label?: string;
  /** Stacked mode: one series per order status; each `key` indexes into the data rows. */
  statuses?: ChartSeries[];
  color?: string;
  valueFormatter?: (value: number) => string;
  dateFormatter?: (date: string | Date) => string;
  /** Defaults to `true` when `statuses` is provided. */
  showLegend?: boolean;
  showGrid?: boolean;
};

/**
 * A bar chart for order volume per period — a single series by default, or stacked by order
 * status when `statuses` is provided.
 *
 * @example
 * ```tsx
 * import { OrdersBarChart } from '@customafk/lunas-ui/features/charts';
 *
 * <OrdersBarChart
 *   data={[{ date: '2026-06-01', completed: 32, pending: 6, cancelled: 2 }]}
 *   statuses={[
 *     { key: 'completed', label: 'Completed' },
 *     { key: 'pending', label: 'Pending' },
 *     { key: 'cancelled', label: 'Cancelled' },
 *   ]}
 * />
 * ```
 */
export const OrdersBarChart = ({
  data,
  dataKey = 'orders',
  label = 'Orders',
  statuses,
  color = 'var(--chart-1)',
  valueFormatter = value => value.toLocaleString('en-US'),
  dateFormatter = toDateLabel,
  showLegend = !!statuses,
  showGrid = true,
  className,
  animate = true,
  height,
}: OrdersBarChartProps) => {
  const config = useMemo<ChartConfig>(() => {
    if (!statuses) return { [dataKey]: { label, color } };
    return Object.fromEntries(statuses.map((status, index) => [status.key, { label: status.label, color: status.color || getChartColor(index) }]));
  }, [statuses, dataKey, label, color]);

  return (
    <ChartContainer
      data-slot="orders-bar-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={dateFormatter} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={48} allowDecimals={false} tickFormatter={valueFormatter} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? dateFormatter(date) : null;
              }}
            />
          }
        />
        {statuses ? (
          statuses.map((status, index) => (
            <Bar
              key={status.key}
              dataKey={status.key}
              stackId="orders"
              fill={status.color || getChartColor(index)}
              radius={index === statuses.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              isAnimationActive={animate}
            />
          ))
        ) : (
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} isAnimationActive={animate} />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </BarChart>
    </ChartContainer>
  );
};
