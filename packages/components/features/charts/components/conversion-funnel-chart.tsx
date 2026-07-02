'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Funnel, FunnelChart, LabelList } from 'recharts';
import type { BaseChartProps, NamedValue } from '../types';
import { formatCompactNumber, formatPercent, getChartColor } from '../utils';

export type FunnelStage = NamedValue & {
  /** Config key; derived from `name` when omitted. */
  key?: string;
  color?: string;
};

export type ConversionFunnelChartProps = BaseChartProps & {
  /** Funnel stages ordered top (widest) to bottom. */
  data: FunnelStage[];
  /** Appends each stage's percentage of the first stage. Defaults to `true`. */
  showConversionRates?: boolean;
  valueFormatter?: (value: number) => string;
};

/**
 * A conversion funnel for the ecommerce purchase journey — sessions, product views, carts,
 * checkouts, purchases — with per-stage conversion rates against the first stage.
 *
 * @example
 * ```tsx
 * import { ConversionFunnelChart } from '@customafk/lunas-ui/features/charts';
 *
 * <ConversionFunnelChart
 *   data={[
 *     { name: 'Sessions', value: 50000 },
 *     { name: 'Product views', value: 32000 },
 *     { name: 'Added to cart', value: 8400 },
 *     { name: 'Purchased', value: 2900 },
 *   ]}
 * />
 * ```
 */
export const ConversionFunnelChart = ({
  data,
  showConversionRates = true,
  valueFormatter = formatCompactNumber,
  className,
  animate = true,
  height,
}: ConversionFunnelChartProps) => {
  const { chartData, config } = useMemo(() => {
    const first = data[0]?.value ?? 0;
    const entries = data.map((stage, index) => {
      const rate = first === 0 ? 0 : stage.value / first;
      const valueLabel = showConversionRates ? `${valueFormatter(stage.value)} (${formatPercent(rate)})` : valueFormatter(stage.value);
      return {
        ...stage,
        key: stage.key || stage.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        fill: stage.color || getChartColor(index),
        valueLabel,
      };
    });
    const chartConfig: ChartConfig = Object.fromEntries(entries.map(entry => [entry.key, { label: entry.name, color: entry.fill }]));
    return { chartData: entries, config: chartConfig };
  }, [data, showConversionRates, valueFormatter]);

  return (
    <ChartContainer
      data-slot="conversion-funnel-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <FunnelChart margin={{ top: 8, right: 120, bottom: 8, left: 120 }}>
        <ChartTooltip content={<ChartTooltipContent nameKey="key" hideLabel />} />
        <Funnel dataKey="value" data={chartData} isAnimationActive={animate}>
          <LabelList dataKey="name" position="left" offset={12} className="fill-muted-strong" fontSize={12} />
          <LabelList dataKey="valueLabel" position="right" offset={12} className="fill-text-positive-strong font-number" fontSize={12} />
        </Funnel>
      </FunnelChart>
    </ChartContainer>
  );
};
