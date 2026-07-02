'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts';
import type { BaseChartProps, ScatterPoint } from '../types';

export type CorrelationScatterChartProps = BaseChartProps & {
  data: ScatterPoint[];
  /** Series label used in the theme config. Defaults to `'Points'`. */
  label?: string;
  color?: string;
  xLabel?: string;
  yLabel?: string;
  xFormatter?: (value: number) => string;
  yFormatter?: (value: number) => string;
  /** Sizes each point from its `z` value. Defaults to `false`. */
  showBubbleSize?: boolean;
  showGrid?: boolean;
};

/**
 * A scatter (or bubble, with `showBubbleSize`) chart for correlating two metrics, with an
 * optional third dimension mapped to point size.
 *
 * @example
 * ```tsx
 * import { CorrelationScatterChart } from '@customafk/lunas-ui/features/charts';
 *
 * <CorrelationScatterChart
 *   data={[
 *     { x: 12, y: 4200, z: 40, name: 'Product A' },
 *     { x: 18, y: 5100, z: 65, name: 'Product B' },
 *   ]}
 *   xLabel="Price ($)"
 *   yLabel="Units sold"
 *   showBubbleSize
 * />
 * ```
 */
export const CorrelationScatterChart = ({
  data,
  label = 'Points',
  color = 'var(--chart-1)',
  xLabel,
  yLabel,
  xFormatter = value => value.toLocaleString('en-US'),
  yFormatter = value => value.toLocaleString('en-US'),
  showBubbleSize = false,
  showGrid = true,
  className,
  animate = true,
  height,
}: CorrelationScatterChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ y: { label, color } }), [label, color]);

  return (
    <ChartContainer
      data-slot="correlation-scatter-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <ScatterChart margin={{ top: 8, right: 12, bottom: 0, left: 12 }}>
        {showGrid && <CartesianGrid />}
        <XAxis type="number" dataKey="x" name={xLabel} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={xFormatter} />
        <YAxis type="number" dataKey="y" name={yLabel} tickLine={false} axisLine={false} tickMargin={8} width={64} tickFormatter={yFormatter} />
        {showBubbleSize && <ZAxis type="number" dataKey="z" range={[64, 400]} />}
        <ChartTooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(_value, _name, item) => {
                const point = item.payload as ScatterPoint;
                return (
                  <div className="grid gap-0.5">
                    {point.name && <span className="font-medium text-muted-strong">{point.name}</span>}
                    <span className="text-muted">
                      {xLabel || 'x'}: <span className="font-medium font-number text-text-positive-strong">{xFormatter(point.x)}</span>
                    </span>
                    <span className="text-muted">
                      {yLabel || 'y'}: <span className="font-medium font-number text-text-positive-strong">{yFormatter(point.y)}</span>
                    </span>
                  </div>
                );
              }}
            />
          }
        />
        <Scatter data={data} fill={color} isAnimationActive={animate} />
      </ScatterChart>
    </ChartContainer>
  );
};
