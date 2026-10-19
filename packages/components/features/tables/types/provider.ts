import type { ColumnPinningState, ExpandedState, Row, RowSelectionState } from '@tanstack/react-table';

import type { CsvCell, SummaryItem, TUITableColumn } from './columns';
import type { RowData } from './components';
import type { TTableRowContext } from './context';
import type { ActiveFilter, FilterDefinition } from './filters';

/**
 * Props accepted by `UITableProvider` — the single entry point for configuring
 * a UITable instance.
 *
 * @example
 * ```tsx
 * import { UITableProvider } from '@customafk/lunas-ui/features/tables';
 *
 * <UITableProvider<User>
 *   title="Users"
 *   data={users}
 *   columns={columns}
 *   totalRows={total}
 *   isFetching={isLoading}
 *   leftPinnedColumns={['name']}
 *   onClickRow={(index, id) => openDetail(id)}
 *   onRowSelection={sel => setSelected(sel)}
 *   fetchMoreData={fetchNextPage}
 * >
 *   <UITableContainer />
 * </UITableProvider>
 * ```
 */
export type TableProviderProps<
  TData extends RowData<TData>,
  TKey extends keyof TData = keyof TData,
  TColumns extends ReadonlyArray<TUITableColumn<TData>> = TUITableColumn<TData>[],
> = {
  /** Human-readable label shown in `UITableToolbar`. */
  title: string;

  /** Pass `true` while the initial page of data is being fetched. */
  isFetching?: boolean;
  /** Pass `true` while a background refetch is running (stale data remains visible). */
  isRefetching?: boolean;

  /** Pass `true` while any data fetch is in-flight; deprecated in favor of `isFetching` and `isRefetching`. */
  isLoading?: boolean; // deprecated in favor of isFetching

  /** The rows currently visible when loading data */
  loadingDisplayRow?: number;

  /** The current page / slice of row data. */
  data: TData[];
  /** Typed column definitions; use `TUITableColumn<TData>` for full type safety. */
  columns: TColumns;
  /** Total number of rows in the remote dataset; required for accurate virtual-scroll height. */
  totalRows?: number;
  /**
   * Async callback invoked by `UITableLoadMore` when the user scrolls to the
   * bottom or clicks "Load More".  Omit to hide the load-more row entirely.
   */
  fetchMoreData?: () => void | Promise<void>;

  /** Column accessor keys to pin on the left (the `select` column is always pinned left). */
  leftPinnedColumns?: Array<TColumns[number]['accessorKey']>;
  /** Column accessor keys (or plain string ids) to pin on the right. */
  rightPinnedColumns?: Array<TColumns[number]['accessorKey']> | string[];

  /** Data key whose value is extracted and passed as the second argument of `onClickRow`. */
  keyOfClickRow?: TTableRowContext<TData, TKey>['keyOfClickRow'];
  /** Called with the virtual row index and the value of `keyOfClickRow` when a row is clicked. */
  onClickRow?: TTableRowContext<TData, TKey>['onClickRow'];
  /** Called with the updated row-selection map after each selection change. */
  onRowSelection?: (rowSelection: RowSelectionState) => void;
  /**
   * Which rows may be selected. `true` (default) allows every row; pass a
   * predicate to restrict selection — e.g. `row => row.depth > 0` to only allow
   * selecting nested child rows and never their parent.
   */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /**
   * Whether toggling a parent row also selects its sub-rows (default `true`).
   * Set `false` when a parent row is an aggregate that should not carry a
   * selection of its own.
   */
  enableSubRowSelection?: boolean;
  /**
   * Derives a stable id for each row (and sub-row) from its data. Without it
   * TanStack falls back to the row's index path (`"0"`, `"0.1"`, …), which is
   * not stable across reorders/pagination — pass e.g. `row => row.uuid` when the
   * selection map is keyed back to domain ids.
   */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  /**
   * Initial expansion state for the grouped/expanded row model. `true` expands
   * every parent row on mount; an `ExpandedState` object expands specific rows.
   * Defaults to all rows collapsed.
   */
  defaultExpanded?: ExpandedState | boolean;
  /** Called with the updated column-pinning state after each pin/unpin action. */
  onColumnPinning?: (columnPinning: ColumnPinningState) => void;

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
