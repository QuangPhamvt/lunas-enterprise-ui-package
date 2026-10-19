import type { AccessorKeyColumnDef } from '@tanstack/react-table';

import type { AnyEntity } from '@/types';
import type { RowData } from './components';

/** Aggregation function types supported by `UITableFooterRow`. */
export type ColumnAggregationType = 'sum' | 'avg' | 'count' | 'min' | 'max';

/** Per-column aggregation config placed in `TUITableColumn.meta.aggregation`. */
export type ColumnAggregation = {
  /** Which aggregation to compute from the column's numeric values. */
  type: ColumnAggregationType;
  /** Override label shown in the analysis panel. Defaults to the column header text. */
  label?: string;
  /** Optional prefix rendered before the computed value (e.g. `'$'`). */
  prefix?: string;
  /** Optional suffix rendered after the computed value (e.g. `'%'`). */
  suffix?: string;
  /** Decimal precision for the formatted result. */
  precision?: number;
};

/**
 * Typed column definition accepted by `UITableProvider`.
 *
 * Extends TanStack's `AccessorKeyColumnDef` with a typed `meta` block so that
 * the alignment and auto-fit behaviour can be specified in a type-safe manner.
 */
export type TUITableColumn<TData extends RowData<TData>> = Pick<
  AccessorKeyColumnDef<TData, AnyEntity>,
  'id' | 'accessorKey' | 'size' | 'maxSize' | 'minSize' | 'header' | 'cell' | 'meta'
> & {
  meta?: {
    /** Horizontal alignment of the column's cells and header. Defaults to `'start'`. */
    position?: 'start' | 'center' | 'end';
    /** When `true`, the cell auto-expands to fit its rendered content width. */
    fitContent?: boolean;
    /** When set, renders an aggregated value in the footer row for this column. */
    aggregation?: ColumnAggregation;
  };
};

/** A single KPI tile displayed in `UITableSummaryBar`. */
export type SummaryItem = {
  /** Short label displayed above the value. */
  label: string;
  /** The numeric or string value to display. */
  value: number | string | null;
  /** Optional prefix rendered before the value (e.g. `'$'`). */
  prefix?: string;
  /** Optional suffix rendered after the value (e.g. `'%'`). */
  suffix?: string;
  /** Decimal precision for numeric values. */
  precision?: number;
  /** Colour trend indicator. */
  trend?: 'neutral' | 'up' | 'down';
  /** Secondary description text rendered below the value. */
  description?: string;
  /** Arbitrary key passed back in `onSummaryItemClick` to identify which filter to apply. */
  filterKey?: string;
};

/** Context value provided by the analysis panel toggle state. */
export type TTableAnalysisContext = {
  /** Whether the analysis panel is currently expanded. */
  isOpen: boolean;
  /** Toggles the analysis panel open/closed. */
  toggle: () => void;
};

/** Context value provided by the summary bar visibility toggle state. */
export type TTableSummaryContext = {
  /** Whether `UITableSummaryBar` is currently visible. */
  isOpen: boolean;
  /** Toggles the summary bar's visibility. */
  toggle: () => void;
};

/** A single cell in a CSV export row. */
export type CsvCell = {
  /** Column header label for this cell. */
  label: string;
  /** Cell value — numbers render right-aligned in spreadsheet editors. */
  value: string | number | boolean | null | undefined;
};
