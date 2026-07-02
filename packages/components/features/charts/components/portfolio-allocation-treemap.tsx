'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import type { TreemapNode } from 'recharts';
import { Treemap } from 'recharts';
import type { BaseChartProps, PortfolioHolding } from '../types';
import { formatCompactNumber, getChartColor } from '../utils';

export type PortfolioAllocationTreemapProps = BaseChartProps & {
  data: PortfolioHolding[];
  valueFormatter?: (value: number) => string;
  /** Shows the holding name and formatted value inside each rect when it fits. Defaults to `true`. */
  showLabels?: boolean;
};

const toKey = (holding: PortfolioHolding): string => holding.key || holding.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * A treemap for portfolio holdings / asset allocation, sized by weight — clearer than a donut
 * once there are more than a handful of positions.
 *
 * @example
 * ```tsx
 * import { PortfolioAllocationTreemap } from '@customafk/lunas-ui/features/charts';
 *
 * <PortfolioAllocationTreemap
 *   data={[
 *     { name: 'AAPL', value: 24000 },
 *     { name: 'MSFT', value: 18500 },
 *     { name: 'Bonds', value: 12000 },
 *   ]}
 * />
 * ```
 */
export const PortfolioAllocationTreemap = ({
  data,
  valueFormatter = formatCompactNumber,
  showLabels = true,
  className,
  animate = true,
  height,
}: PortfolioAllocationTreemapProps) => {
  const { chartData, config } = useMemo(() => {
    const entries = data.map((holding, index) => ({
      ...holding,
      key: toKey(holding),
      fill: holding.color || getChartColor(index),
    }));
    const chartConfig: ChartConfig = Object.fromEntries(entries.map(entry => [entry.key, { label: entry.name, color: entry.fill }]));
    return { chartData: entries, config: chartConfig };
  }, [data]);

  const renderContent = (node: TreemapNode) => {
    if (node.depth !== 1) return <g />;
    const holding = chartData.find(entry => entry.key === node.name);
    const fitsLabel = showLabels && node.width >= 36 && node.height >= 24;

    return (
      <g>
        <rect x={node.x} y={node.y} width={node.width} height={node.height} fill={holding?.fill} stroke="var(--background)" />
        {fitsLabel && (
          <text x={node.x + 6} y={node.y + 16} className="fill-white font-medium text-xs">
            {holding?.name}
          </text>
        )}
        {fitsLabel && node.height > 40 && (
          <text x={node.x + 6} y={node.y + 32} className="fill-white/80 font-number text-[11px]">
            {valueFormatter(node.value)}
          </text>
        )}
      </g>
    );
  };

  return (
    <ChartContainer
      data-slot="portfolio-allocation-treemap"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <Treemap data={chartData} dataKey="value" nameKey="key" isAnimationActive={animate} content={renderContent}>
        <ChartTooltip content={<ChartTooltipContent nameKey="key" hideLabel formatter={value => valueFormatter(Number(value))} />} />
      </Treemap>
    </ChartContainer>
  );
};
