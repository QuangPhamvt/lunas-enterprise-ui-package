/** Trend direction shared with the `Statistic` display component. */
export type ChartTrend = 'up' | 'down' | 'neutral';

/** One value at a point in time. */
export type TimeSeriesPoint = {
  /** Bucket date — a `Date` or an ISO date string. */
  date: string | Date;
  /** Metric value for the bucket. */
  value: number;
  /** Same-bucket value from the comparison period (enables the comparison series). */
  previousValue?: number;
};

/** One named series in a multi-series chart. */
export type ChartSeries = {
  /** Data field that holds this series' values. */
  key: string;
  /** Human-readable name for the legend and tooltip. */
  label: string;
  /** Series color; defaults to the next `--chart-N` palette color. */
  color?: string;
};

/** A labelled number — one slice, bar or ranking entry. */
export type NamedValue = {
  /** Display name. */
  name: string;
  /** Numeric value. */
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
  /** Class names for the chart container. */
  className?: string;
  /** Enable the recharts enter animation. Disable for deterministic tests. Defaults to `true`. */
  animate?: boolean;
  /** Fixed height in px; otherwise the container's aspect-video ratio applies. */
  height?: number;
};
