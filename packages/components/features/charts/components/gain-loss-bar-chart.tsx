'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Bar, BarChart, CartesianGrid, Rectangle, ReferenceLine, XAxis, YAxis } from 'recharts';
import type { BaseChartProps, NamedValue } from '../types';
import { formatSignedPercent, getDirectionColor } from '../utils';

export type GainLossBarChartProps = BaseChartProps & {
  /** `name` is the period label (e.g. a month or quarter); `value` is the signed return. */
  data: NamedValue[];
  /** Series label. Defaults to `'Return'`. */
  label?: string;
  upColor?: string;
  downColor?: string;
  /** Formats tooltip and Y-axis values. Defaults to a signed percentage. */
  valueFormatter?: (value: number) => string;
  showGrid?: boolean;
};

/**
 * Diverging bars for period returns — bars grow up (gain) or down (loss) from a zero baseline,
 * colored accordingly. Clearer than a plain bar chart for signed data.
 *
 * @example
 * ```tsx
 * import { GainLossBarChart } from '@customafk/lunas-ui/features/charts';
 *
 * <GainLossBarChart
 *   data={[
 *     { name: 'Jan', value: 0.032 },
 *     { name: 'Feb', value: -0.014 },
 *   ]}
 * />
 * ```
 */
export const GainLossBarChart = ({
  data,
  label = 'Return',
  upColor = 'var(--success)',
  downColor = 'var(--danger)',
  valueFormatter = value => formatSignedPercent(value),
  showGrid = true,
  className,
  animate = true,
  height,
}: GainLossBarChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ value: { label, color: upColor } }), [label, upColor]);

  return (
    <ChartContainer
      data-slot="gain-loss-bar-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={56} tickFormatter={valueFormatter} />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator formatter={value => valueFormatter(Number(value))} />} />
        <Bar
          dataKey="value"
          isAnimationActive={animate}
          shape={props => <Rectangle {...props} fill={getDirectionColor(Number(props.payload?.value ?? 0), 0, { up: upColor, down: downColor })} />}
        />
      </BarChart>
    </ChartContainer>
  );
};
