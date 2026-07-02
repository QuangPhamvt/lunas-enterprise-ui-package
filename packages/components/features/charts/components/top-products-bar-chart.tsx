'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, NamedValue } from '../types';
import { formatCompactNumber } from '../utils';

export type TopProductsBarChartProps = BaseChartProps & {
  data: NamedValue[];
  /** Series label. Defaults to `'Sales'`. */
  label?: string;
  /** Number of items shown after sorting descending. Defaults to `8`. */
  maxItems?: number;
  color?: string;
  valueFormatter?: (value: number) => string;
  /** Value labels at the end of each bar. Defaults to `true`. */
  showValueLabels?: boolean;
};

/**
 * A horizontal bar ranking chart — top products, best categories, top customers.
 *
 * @example
 * ```tsx
 * import { TopProductsBarChart } from '@customafk/lunas-ui/features/charts';
 *
 * <TopProductsBarChart
 *   data={[
 *     { name: 'Wireless Earbuds', value: 1245 },
 *     { name: 'Smart Watch', value: 986 },
 *   ]}
 * />
 * ```
 */
export const TopProductsBarChart = ({
  data,
  label = 'Sales',
  maxItems = 8,
  color = 'var(--chart-1)',
  valueFormatter = formatCompactNumber,
  showValueLabels = true,
  className,
  animate = true,
  height,
}: TopProductsBarChartProps) => {
  const chartData = useMemo(() => [...data].sort((a, b) => b.value - a.value).slice(0, maxItems), [data, maxItems]);

  const config = useMemo<ChartConfig>(() => ({ value: { label, color } }), [label, color]);

  return (
    <ChartContainer
      data-slot="top-products-bar-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: showValueLabels ? 48 : 12, bottom: 0, left: 12 }}>
        <XAxis type="number" dataKey="value" hide />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tickMargin={8} width={120} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" fill={color} radius={4} isAnimationActive={animate}>
          {showValueLabels && (
            <LabelList
              dataKey="value"
              position="right"
              offset={8}
              className="fill-muted-strong"
              fontSize={12}
              formatter={(value: React.ReactNode) => valueFormatter(Number(value))}
            />
          )}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
