'use client';

import { useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { Scatter, ScatterChart, XAxis, YAxis } from 'recharts';
import type { ActivityPoint, BaseChartProps } from '../types';
import { toDateLabel } from '../utils';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const CELL_SIZE = 13;
const MS_PER_DAY = 86_400_000;

export type ActivityHeatmapChartProps = BaseChartProps & {
  data: ActivityPoint[];
  /** Series label used in the theme config. Defaults to `'Activity'`. */
  label?: string;
  color?: string;
  valueFormatter?: (value: number) => string;
};

/**
 * A GitHub-style calendar heatmap for daily activity/usage intensity — logins, orders, commits
 * per day — laid out as a week-by-weekday grid with color opacity mapped to value.
 *
 * @example
 * ```tsx
 * import { ActivityHeatmapChart } from '@customafk/lunas-ui/features/charts';
 *
 * <ActivityHeatmapChart
 *   data={[
 *     { date: '2026-06-01', value: 4 },
 *     { date: '2026-06-02', value: 12 },
 *   ]}
 * />
 * ```
 */
export const ActivityHeatmapChart = ({
  data,
  label = 'Activity',
  color = 'var(--chart-1)',
  valueFormatter = value => value.toLocaleString('en-US'),
  className,
  height,
}: ActivityHeatmapChartProps) => {
  const config = useMemo<ChartConfig>(() => ({ value: { label, color } }), [label, color]);

  const { chartData, monthTicks, maxWeek, maxValue } = useMemo(() => {
    const parsed = data
      .map(point => ({ ...point, parsedDate: point.date instanceof Date ? point.date : new Date(point.date) }))
      .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

    if (parsed.length === 0) return { chartData: [], monthTicks: new Map<number, string>(), maxWeek: 0, maxValue: 1 };

    const firstDate = parsed[0]?.parsedDate;
    const weekStart = new Date(firstDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const months = new Map<number, string>();
    let lastMonth = -1;

    const points = parsed.map(point => {
      const weekday = point.parsedDate.getDay();
      const weekIndex = Math.floor((point.parsedDate.getTime() - weekStart.getTime()) / MS_PER_DAY / 7);
      const month = point.parsedDate.getMonth();
      if (month !== lastMonth) {
        months.set(weekIndex, point.parsedDate.toLocaleDateString('en-US', { month: 'short' }));
        lastMonth = month;
      }
      return { x: weekIndex, y: weekday, value: point.value, date: point.date };
    });

    return {
      chartData: points,
      monthTicks: months,
      maxWeek: Math.max(...points.map(point => point.x)),
      maxValue: Math.max(...points.map(point => point.value), 1),
    };
  }, [data]);

  return (
    <ChartContainer
      data-slot="activity-heatmap-chart"
      config={config}
      className={cn('w-full', className)}
      style={height !== undefined ? { height, aspectRatio: 'auto' } : undefined}
    >
      <ScatterChart margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <XAxis
          type="number"
          dataKey="x"
          domain={[-0.5, maxWeek + 0.5]}
          ticks={Array.from(monthTicks.keys())}
          tickFormatter={x => monthTicks.get(x) ?? ''}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
        />
        <YAxis
          type="number"
          dataKey="y"
          domain={[-0.5, 6.5]}
          reversed
          ticks={[0, 1, 2, 3, 4, 5, 6]}
          tickFormatter={y => WEEKDAY_LABELS[y] ?? ''}
          tickLine={false}
          axisLine={false}
          width={20}
          interval={0}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              hideIndicator
              formatter={(_value, _name, item) => {
                const point = item.payload as { date: string | Date; value: number };
                return (
                  <div className="grid gap-0.5">
                    <span className="font-medium text-muted-strong">{toDateLabel(point.date)}</span>
                    <span className="text-muted">
                      {valueFormatter(point.value)} {config.value?.label}
                    </span>
                  </div>
                );
              }}
            />
          }
        />
        <Scatter
          data={chartData}
          shape={props => {
            const { cx, cy, payload } = props;
            if (cx === undefined || cy === undefined) return <g />;
            const point = payload as { value: number };
            const intensity = Math.min(0.12 + 0.88 * (point.value / maxValue), 1);
            return <rect x={cx - CELL_SIZE / 2} y={cy - CELL_SIZE / 2} width={CELL_SIZE} height={CELL_SIZE} rx={3} fill={color} fillOpacity={intensity} />;
          }}
        />
      </ScatterChart>
    </ChartContainer>
  );
};
