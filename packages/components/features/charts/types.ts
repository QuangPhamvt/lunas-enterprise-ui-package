/** Trend direction shared with the `Statistic` display component. */
export type ChartTrend = 'up' | 'down' | 'neutral';

export type TimeSeriesPoint = {
  date: string | Date;
  value: number;
  /** Same-bucket value from the comparison period (enables the comparison series). */
  previousValue?: number;
};

export type ChartSeries = {
  key: string;
  label: string;
  color?: string;
};

export type NamedValue = {
  name: string;
  value: number;
};

/** A single OHLC(V) period — one candle, one trading day, etc. */
export type OHLCPoint = {
  date: string | Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

/** A single portfolio holding or asset allocation segment. */
export type PortfolioHolding = NamedValue & {
  /** Config key; derived from `name` when omitted. */
  key?: string;
  color?: string;
};

/** A single step in a waterfall/bridge chart. */
export type WaterfallPoint = {
  label: string;
  /** Signed delta for a step; the running/starting/ending amount when `isTotal` is set. */
  value: number;
  /** Renders as a full-height bar from zero instead of a floating delta. Defaults to `false`. */
  isTotal?: boolean;
};

/** A single point in an x/y correlation chart; `z` optionally sizes the bubble. */
export type ScatterPoint = {
  x: number;
  y: number;
  z?: number;
  name?: string;
};

/** A single day's intensity value in an activity/usage calendar heatmap. */
export type ActivityPoint = {
  date: string | Date;
  value: number;
};

/** Props shared by every prebuilt chart. */
export type BaseChartProps = {
  className?: string;
  /** Enable the recharts enter animation. Disable for deterministic tests. Defaults to `true`. */
  animate?: boolean;
  /** Fixed height in px; otherwise the container's aspect-video ratio applies. */
  height?: number;
};
