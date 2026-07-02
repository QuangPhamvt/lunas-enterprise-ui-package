'use client';

import { createContext, useContext, useId, useMemo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import type { LegendPayload, TooltipContentProps } from 'recharts';
import { Legend, ResponsiveContainer, Tooltip } from 'recharts';

const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

export const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }
  return context;
};

export type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof ResponsiveContainer>['children'];
};

export const ChartContainer = ({ id, className, children, config, ...props }: ChartContainerProps) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          'flex aspect-video justify-center text-xs',
          '[&_.recharts-cartesian-axis-tick_text]:fill-muted',
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border',
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
          '[&_.recharts-radial-bar-background-sector]:fill-muted-muted',
          '[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted-muted',
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          '[&_.recharts-layer]:outline-hidden',
          '[&_.recharts-sector]:outline-hidden',
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          '[&_.recharts-surface]:outline-hidden',
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};

/** Accepts CSS color notations (hex, rgb/hsl/oklch, var(...)) while rejecting CSS injection. */
const SAFE_CSS_COLOR_PATTERN = /^[a-zA-Z0-9#(),.%\s/_-]+$/;
const SAFE_CSS_KEY_PATTERN = /^[a-zA-Z0-9_-]+$/;

export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([key, itemConfig]) => (itemConfig.theme || itemConfig.color) && SAFE_CSS_KEY_PATTERN.test(key));

  if (!colorConfig.length) return null;

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const rules = colorConfig
        .map(([key, itemConfig]) => {
          const color = itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color;
          if (!color || !SAFE_CSS_COLOR_PATTERN.test(color)) return null;
          return `  --color-${key}: ${color};`;
        })
        .filter(Boolean)
        .join('\n');
      return `${prefix} [data-chart=${id}] {\n${rules}\n}`;
    })
    .join('\n');

  // biome-ignore lint/security/noDangerouslySetInnerHtml: values are sanitized against SAFE_CSS_* patterns above
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

export const ChartTooltip = Tooltip;

type TooltipItemPayload = NonNullable<TooltipContentProps<number | string, string>['payload']>[number];

export type ChartTooltipContentProps = React.ComponentProps<'div'> &
  Partial<Pick<TooltipContentProps<number | string, string>, 'active' | 'payload' | 'label' | 'labelFormatter' | 'formatter'>> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    labelClassName?: string;
  };

export const ChartTooltipContent = ({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) => {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === 'string' ? config[label as keyof typeof config]?.label || label : itemConfig?.label;

    if (labelFormatter) {
      return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>;
    }
    if (!value) return null;
    return <div className={cn('font-medium', labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <div
      data-slot="chart-tooltip-content"
      className={cn('border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-dropdown', className)}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div
              key={typeof item.dataKey === 'function' ? index : (item.dataKey ?? index)}
              className={cn('flex w-full flex-wrap items-stretch gap-2', '[&>svg]:text-muted [&>svg]:size-2.5', indicator === 'dot' && 'items-center')}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value as number | string, String(item.name), item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={cn('shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)', {
                          'size-2.5': indicator === 'dot',
                          'w-1': indicator === 'line',
                          'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
                          'my-0.5': nestLabel && indicator === 'dashed',
                        })}
                        style={
                          {
                            '--color-bg': indicatorColor,
                            '--color-border': indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}
                  <div className={cn('flex flex-1 justify-between gap-2 leading-none', nestLabel ? 'items-end' : 'items-center')}>
                    <div className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <span className="text-muted">{itemConfig?.label || item.name}</span>
                    </div>
                    {item.value !== undefined && (
                      <span className="text-text-positive-strong font-number font-medium tabular-nums">
                        {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ChartLegend = Legend;

export type ChartLegendContentProps = React.ComponentProps<'div'> & {
  payload?: readonly LegendPayload[];
  verticalAlign?: 'top' | 'bottom' | 'middle';
  hideIcon?: boolean;
  nameKey?: string;
};

export const ChartLegendContent = ({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }: ChartLegendContentProps) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div data-slot="chart-legend-content" className={cn('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}>
      {payload.map(item => {
        const key = `${nameKey || item.dataKey || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={`${item.value}`} className={cn('flex items-center gap-1.5', '[&>svg]:text-muted [&>svg]:size-3')}>
            {itemConfig?.icon && !hideIcon ? <itemConfig.icon /> : <div className="size-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />}
            <span className="text-muted-strong">{itemConfig?.label ?? item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

const getPayloadConfigFromPayload = (config: ChartConfig, payload: TooltipItemPayload | LegendPayload | undefined, key: string) => {
  if (typeof payload !== 'object' || payload === null) return undefined;

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null ? (payload.payload as Record<string, unknown>) : undefined;

  let configLabelKey: string = key;

  const record = payload as unknown as Record<string, unknown>;
  if (key in record && typeof record[key] === 'string') {
    configLabelKey = record[key] as string;
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === 'string') {
    configLabelKey = payloadPayload[key] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
};
