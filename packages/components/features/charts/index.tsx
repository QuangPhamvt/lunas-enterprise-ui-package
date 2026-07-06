'use client';

/**
 * @module @customafk/lunas-ui/features/charts
 *
 * Prebuilt Recharts-based dashboard charts for ecommerce, finance/stock, and general analytics
 * CMS screens — revenue trends, order volumes, product rankings, category breakdowns, conversion
 * funnels, sales targets, KPI sparklines, candlesticks, trading volume, portfolio allocation,
 * indexed performance comparison, gain/loss bars, waterfalls, stacked composition, radar
 * comparisons, correlation/bubble scatter, activity heatmaps, mirrored comparisons, and Sankey
 * flow diagrams. Built on the `@customafk/lunas-ui/ui/chart` primitives.
 *
 * Each chart is loaded on demand behind `React.lazy` — a page that renders only a couple of
 * these only pays for the recharts sub-tree those specific charts need, not all twenty.
 *
 * Requires the `recharts` peer dependency.
 *
 * @example
 * ```tsx
 * import {
 *   ActivityHeatmapChart,
 *   CandlestickChart,
 *   ConversionFunnelChart,
 *   CorrelationScatterChart,
 *   DonutChart,
 *   GainLossBarChart,
 *   IndexedPerformanceLineChart,
 *   MetricRadarChart,
 *   MirroredBarChart,
 *   OrdersBarChart,
 *   PortfolioAllocationTreemap,
 *   PriceRangeAreaChart,
 *   RevenueAreaChart,
 *   RevenueOrdersComposedChart,
 *   SalesTargetRadialChart,
 *   SankeyFlowChart,
 *   SparklineChart,
 *   StackedAreaChart,
 *   TopProductsBarChart,
 *   VolumeBarChart,
 *   WaterfallChart,
 * } from '@customafk/lunas-ui/features/charts';
 * ```
 */
import type { ComponentProps, ComponentType } from 'react';
import { lazy, Suspense } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export * from './types';
export * from './utils';

import type { ActivityHeatmapChart as ActivityHeatmapChartType } from './components/activity-heatmap-chart';
import type { CandlestickChart as CandlestickChartType } from './components/candlestick-chart';
import type { ConversionFunnelChart as ConversionFunnelChartType } from './components/conversion-funnel-chart';
import type { CorrelationScatterChart as CorrelationScatterChartType } from './components/correlation-scatter-chart';
import type { DonutChart as DonutChartType } from './components/donut-chart';
import type { GainLossBarChart as GainLossBarChartType } from './components/gain-loss-bar-chart';
import type { IndexedPerformanceLineChart as IndexedPerformanceLineChartType } from './components/indexed-performance-line-chart';
import type { MetricRadarChart as MetricRadarChartType } from './components/metric-radar-chart';
import type { MirroredBarChart as MirroredBarChartType } from './components/mirrored-bar-chart';
import type { OrdersBarChart as OrdersBarChartType } from './components/orders-bar-chart';
import type { PortfolioAllocationTreemap as PortfolioAllocationTreemapType } from './components/portfolio-allocation-treemap';
import type { PriceRangeAreaChart as PriceRangeAreaChartType } from './components/price-range-area-chart';
import type { RevenueAreaChart as RevenueAreaChartType } from './components/revenue-area-chart';
import type { RevenueOrdersComposedChart as RevenueOrdersComposedChartType } from './components/revenue-orders-composed-chart';
import type { SalesTargetRadialChart as SalesTargetRadialChartType } from './components/sales-target-radial-chart';
import type { SankeyFlowChart as SankeyFlowChartType } from './components/sankey-flow-chart';
import type { SparklineChart as SparklineChartType } from './components/sparkline-chart';
import type { StackedAreaChart as StackedAreaChartType } from './components/stacked-area-chart';
import type { TopProductsBarChart as TopProductsBarChartType } from './components/top-products-bar-chart';
import type { VolumeBarChart as VolumeBarChartType } from './components/volume-bar-chart';
import type { WaterfallChart as WaterfallChartType } from './components/waterfall-chart';

export type { ActivityHeatmapChartProps } from './components/activity-heatmap-chart';
export type { CandlestickChartProps } from './components/candlestick-chart';
export type { ConversionFunnelChartProps, FunnelStage } from './components/conversion-funnel-chart';
export type { CorrelationScatterChartProps } from './components/correlation-scatter-chart';
// Named types beyond each component's own `XChartProps`, re-exported for consumers.
export type { DonutChartProps, DonutChartSegment } from './components/donut-chart';
export type { GainLossBarChartProps } from './components/gain-loss-bar-chart';
export type { IndexedPerformanceLineChartProps } from './components/indexed-performance-line-chart';
export type { MetricRadarChartProps } from './components/metric-radar-chart';
export type { MirroredBarChartProps, MirroredBarRow } from './components/mirrored-bar-chart';
export type { OrdersBarChartProps } from './components/orders-bar-chart';
export type { PortfolioAllocationTreemapProps } from './components/portfolio-allocation-treemap';
export type { PriceRangeAreaChartProps } from './components/price-range-area-chart';
export type { RevenueAreaChartProps } from './components/revenue-area-chart';
export type { RevenueOrdersComposedChartProps, RevenueOrdersPoint } from './components/revenue-orders-composed-chart';
export type { SalesTargetRadialChartProps } from './components/sales-target-radial-chart';
export type { SankeyFlowChartProps, SankeyFlowLink, SankeyFlowNode } from './components/sankey-flow-chart';
export type { SparklineChartProps } from './components/sparkline-chart';
export type { StackedAreaChartProps } from './components/stacked-area-chart';
export type { TopProductsBarChartProps } from './components/top-products-bar-chart';
export type { VolumeBarChartProps } from './components/volume-bar-chart';
export type { WaterfallChartProps } from './components/waterfall-chart';

/** Aspect-video-shaped pulse placeholder shown while a lazy chart chunk is still loading. */
function ChartSkeleton() {
  return <Skeleton data-slot="chart-skeleton" className="aspect-video w-full rounded" />;
}

/**
 * Wraps a `lazy()`-loaded chart in its own `Suspense` boundary so it can be dropped anywhere
 * without callers needing to set up Suspense themselves. Keeps this file itself small — each
 * chart's `recharts` sub-tree only loads when a page actually renders that chart type.
 */
function lazyChart<P extends object>(loader: () => Promise<{ default: ComponentType<P> }>): ComponentType<P> {
  const LazyComponent = lazy(loader);
  return (props: P) => (
    <Suspense fallback={<ChartSkeleton />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

const ActivityHeatmapChart = lazyChart<ComponentProps<typeof ActivityHeatmapChartType>>(() =>
  import('./components/activity-heatmap-chart').then(m => ({ default: m.ActivityHeatmapChart }))
);
const CandlestickChart = lazyChart<ComponentProps<typeof CandlestickChartType>>(() =>
  import('./components/candlestick-chart').then(m => ({ default: m.CandlestickChart }))
);
const ConversionFunnelChart = lazyChart<ComponentProps<typeof ConversionFunnelChartType>>(() =>
  import('./components/conversion-funnel-chart').then(m => ({ default: m.ConversionFunnelChart }))
);
const CorrelationScatterChart = lazyChart<ComponentProps<typeof CorrelationScatterChartType>>(() =>
  import('./components/correlation-scatter-chart').then(m => ({ default: m.CorrelationScatterChart }))
);
const DonutChart = lazyChart<ComponentProps<typeof DonutChartType>>(() => import('./components/donut-chart').then(m => ({ default: m.DonutChart })));
const GainLossBarChart = lazyChart<ComponentProps<typeof GainLossBarChartType>>(() =>
  import('./components/gain-loss-bar-chart').then(m => ({ default: m.GainLossBarChart }))
);
const IndexedPerformanceLineChart = lazyChart<ComponentProps<typeof IndexedPerformanceLineChartType>>(() =>
  import('./components/indexed-performance-line-chart').then(m => ({ default: m.IndexedPerformanceLineChart }))
);
const MetricRadarChart = lazyChart<ComponentProps<typeof MetricRadarChartType>>(() =>
  import('./components/metric-radar-chart').then(m => ({ default: m.MetricRadarChart }))
);
const MirroredBarChart = lazyChart<ComponentProps<typeof MirroredBarChartType>>(() =>
  import('./components/mirrored-bar-chart').then(m => ({ default: m.MirroredBarChart }))
);
const OrdersBarChart = lazyChart<ComponentProps<typeof OrdersBarChartType>>(() =>
  import('./components/orders-bar-chart').then(m => ({ default: m.OrdersBarChart }))
);
const PortfolioAllocationTreemap = lazyChart<ComponentProps<typeof PortfolioAllocationTreemapType>>(() =>
  import('./components/portfolio-allocation-treemap').then(m => ({ default: m.PortfolioAllocationTreemap }))
);
const PriceRangeAreaChart = lazyChart<ComponentProps<typeof PriceRangeAreaChartType>>(() =>
  import('./components/price-range-area-chart').then(m => ({ default: m.PriceRangeAreaChart }))
);
const RevenueAreaChart = lazyChart<ComponentProps<typeof RevenueAreaChartType>>(() =>
  import('./components/revenue-area-chart').then(m => ({ default: m.RevenueAreaChart }))
);
const RevenueOrdersComposedChart = lazyChart<ComponentProps<typeof RevenueOrdersComposedChartType>>(() =>
  import('./components/revenue-orders-composed-chart').then(m => ({ default: m.RevenueOrdersComposedChart }))
);
const SalesTargetRadialChart = lazyChart<ComponentProps<typeof SalesTargetRadialChartType>>(() =>
  import('./components/sales-target-radial-chart').then(m => ({ default: m.SalesTargetRadialChart }))
);
const SankeyFlowChart = lazyChart<ComponentProps<typeof SankeyFlowChartType>>(() =>
  import('./components/sankey-flow-chart').then(m => ({ default: m.SankeyFlowChart }))
);
const SparklineChart = lazyChart<ComponentProps<typeof SparklineChartType>>(() =>
  import('./components/sparkline-chart').then(m => ({ default: m.SparklineChart }))
);
const StackedAreaChart = lazyChart<ComponentProps<typeof StackedAreaChartType>>(() =>
  import('./components/stacked-area-chart').then(m => ({ default: m.StackedAreaChart }))
);
const TopProductsBarChart = lazyChart<ComponentProps<typeof TopProductsBarChartType>>(() =>
  import('./components/top-products-bar-chart').then(m => ({ default: m.TopProductsBarChart }))
);
const VolumeBarChart = lazyChart<ComponentProps<typeof VolumeBarChartType>>(() =>
  import('./components/volume-bar-chart').then(m => ({ default: m.VolumeBarChart }))
);
const WaterfallChart = lazyChart<ComponentProps<typeof WaterfallChartType>>(() =>
  import('./components/waterfall-chart').then(m => ({ default: m.WaterfallChart }))
);

export {
  ActivityHeatmapChart,
  CandlestickChart,
  ConversionFunnelChart,
  CorrelationScatterChart,
  DonutChart,
  GainLossBarChart,
  IndexedPerformanceLineChart,
  MetricRadarChart,
  MirroredBarChart,
  OrdersBarChart,
  PortfolioAllocationTreemap,
  PriceRangeAreaChart,
  RevenueAreaChart,
  RevenueOrdersComposedChart,
  SalesTargetRadialChart,
  SankeyFlowChart,
  SparklineChart,
  StackedAreaChart,
  TopProductsBarChart,
  VolumeBarChart,
  WaterfallChart,
};
