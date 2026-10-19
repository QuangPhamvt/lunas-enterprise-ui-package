import type { ColumnPinningState, ExpandedState, Header, RowSelectionState, Table } from '@tanstack/react-table';

import type { AnyEntity } from '@/types';
import type { CsvCell, SummaryItem } from './columns';
import type { RowData } from './components';
import type { ActiveFilter, FilterDefinition } from './filters';

/**
 * Value shape of the root `TableContext` consumed by toolbar and body
 * components via `useUITableContext`.
 */
export type TTableContext<TData extends RowData<TData>> = {
  /** Human-readable table title rendered in `UITableToolbar`. */
  title: string;
  /** The TanStack `Table` instance for the current dataset. */
  table: Table<TData>;

  /** `true` when no rows exist after a successful (non-loading) fetch. */
  isEmpty: boolean;
  /** `true` while the initial data fetch is in-flight. */
  isFetching?: boolean;
  /** `true` while a background refetch is running (data is already present). */
  isRefetching?: boolean;

  /** `true` while any data fetch is in-flight; deprecated in favor of `isFetching` and `isRefetching`. */
  isLoading?: boolean;

  /** The rows currently visible when loading data */
  loadingDisplayRow?: number;

  /** Total number of rows in the remote dataset, used for virtual scroll height. */
  totalRows?: number;

  /** Callback that loads the next page; forwarded to `UITableLoadMore`. */
  fetchMoreData?: () => void | Promise<void>;

  /** CSS height of the `UITableEmptyDisplay` overlay. Defaults to `384px` when omitted. */
  emptyDisplayHeight?: React.CSSProperties['height'];

  /** CSV export rows; each row is an ordered array of `{ label, value }` cells. */
  csvData?: CsvCell[][];
  /** File name (without `.csv`) for the downloaded file. Defaults to the table title. */
  csvFileName?: string;

  /** Definitions of all filterable fields shown in the "Add Filter" dropdown. */
  filterDefinitions?: FilterDefinition[];
  /** Called with the full list of active filters whenever filters are added, removed, or updated. */
  onFilterChange?: (filters: ActiveFilter[]) => void;

  /** KPI stat cards displayed in `UITableSummaryBar` above the toolbar. */
  summary?: SummaryItem[];
  /** Called when a summary bar card is clicked; receives the clicked `SummaryItem`. */
  onSummaryItemClick?: (item: SummaryItem) => void;
  /** When `true`, a toggle button appears in `UITableToolbarActions` to open `UITableAnalysisPanel`. */
  showAnalysisPanel?: boolean;

  /** Optional subtitle rendered below the title in `UITableToolbar`. */
  description?: string;
  /** Optional React node rendered on the right side of the `UITableToolbar` header row (e.g. action buttons). */
  headerActions?: React.ReactNode;
};

/** Context value provided by `UITableInnerWrapperProvider`. */
export type TTableInnerWrapperContext = {
  /** Stable `useId`-generated id on the scrollable inner wrapper `<div>`. */
  innerWrapperId: string;
};

/** Context value provided by `UITableInnerTableProvider`. */
export type TTableInnerTableContext = {
  /** The TanStack `Table` instance (typed as `AnyEntity` for the context boundary). */
  table: Table<AnyEntity>;
  /** Stable `useId`-generated id on the `<table>` element. */
  innerTableId: string;
  /** Pre-computed sum of all column sizes used as the `<table>` `minWidth`. */
  totalSize: number;
  /** Ref attached to the inner `<table>` DOM element, shared with descendants that need direct DOM access. */
  tableRef: React.RefObject<HTMLTableElement | null>;
  /**
   * The current `{ left, right }` column pinning map. Included so `UITableInnerTableProvider`
   * re-renders on a pin-only change — its other fields never change reference/value then.
   */
  columnPinningState: ColumnPinningState;
};

/** Context value provided by `UITableHeadRowProvider`. */
export type TTableHeadRowContext = {
  /** Whether every visible row is currently selected. */
  isAllRowsSelected: boolean;
  /** The current `{ left, right }` column pinning map. */
  columnPinningState: ColumnPinningState;
  /** Ordered list of `Header` objects in the left-pinned group. */
  leftPinnedHeaders: Header<AnyEntity, unknown>[];
  /** Ordered list of `Header` objects in the right-pinned group. */
  rightPinnedHeaders: Header<AnyEntity, unknown>[];
  /** Toggles all-row selection; delegates to `table.toggleAllRowsSelected`. */
  onToggleAllRowsSelected?: (value?: boolean) => void;
  /** Whether every expandable row is currently expanded. */
  isAllRowsExpanded?: boolean;
  /** Toggles all-row expansion; delegates to `table.toggleAllRowsExpanded`. */
  onToggleAllRowsExpanded?: () => void;
};

/** Context value provided by `UITableBodyProvider`. */
export type TTableBodyContext = {
  /** `true` while data is loading; causes `UITableBody` to render `null`. */
  isFetching: boolean;
  /** `true` while a background refetch is running; passed to `UITableEmptyDisplay`. */
  isRefetching: boolean;
  /** `true` when there are no rows after a successful fetch. */
  isEmpty: boolean;
  /** The current `Record<rowId, boolean>` row-selection map from TanStack state. */
  rowSelectionState: RowSelectionState;
  /**
   * The current `{ left, right }` column pinning map. Exposed here, alongside `rowSelectionState`,
   * so `UITableContainer` reliably re-renders and remounts header/body rows on a pin-only change.
   */
  columnPinningState: ColumnPinningState;
  /**
   * The current expansion map. Exposed here (same reasoning as `columnPinningState`) so
   * `UITableContainer` reliably re-renders and picks up newly-visible sub-rows when a
   * parent row is expanded or collapsed.
   */
  expandedState: ExpandedState;
};

/** Context value provided by `UITableRowProvider`, consumed by individual `UITableRow` renders. */
export type TTableRowContext<TData extends RowData<TData> = RowData<AnyEntity>, TKey extends keyof TData = keyof TData> = {
  /** The data key whose value is passed as the second argument to `onClickRow`. */
  keyOfClickRow?: TKey;
  /** Whether all rows are selected (drives the select cell's checked state). */
  isAllRowsSelected?: boolean;
  /** The current `{ left, right }` column pinning map used by each cell. */
  columnPinningState: ColumnPinningState;
  /** Called with the virtual row index and the extracted `keyOfClickRow` value. */
  onClickRow?: (rowIndex: number, rowId?: AnyEntity) => void;
  /** Left-pinned headers used to determine border separator placement. */
  leftPinnedHeaders?: Header<TData, unknown>[];
  /** Right-pinned headers used to determine border separator placement. */
  rightPinnedHeaders?: Header<TData, unknown>[];
};
