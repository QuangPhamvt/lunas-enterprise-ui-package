import type {
  AccessorKeyColumnDef,
  CellContext,
  Column,
  ColumnPinningPosition,
  ColumnPinningState,
  Header,
  HeaderGroup,
  Row,
  RowSelectionState,
  Table,
} from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import type { AnyEntity } from '@/types';

/**
 * Base constraint for all row data objects used with UITable.
 *
 * Any property key is allowed so that generic column definitions remain
 * flexible, but the optional `subRows` field is the well-known expansion
 * hook understood by TanStack Table's grouped-row model.
 */
export type RowData<TData extends RowData<AnyEntity>> = {
  /** Allows any property key so column `accessorKey` values type-check. */
  [x: string | number | symbol]: AnyEntity;
  /** Nested child rows used by the grouped/expanded row model. */
  subRows?: TData[] | undefined;
};

/** Props for `UITableEmptyDisplay` — controls which placeholder state is shown. */
export type TUITableEmptyDisplay = {
  /** When `true` a loading spinner is shown instead of the empty-box illustration. */
  isFetching?: boolean;
  /** When `true` (and `isFetching` is `false`) the "No data available" illustration is shown. */
  isEmpty?: boolean;
};

/** Props for `UITableWrapper` — all native `<div>` attributes are forwarded. */
export type TUITableWrapper = React.PropsWithChildren<React.ComponentProps<'div'>>;

/** Props for `UITableInnerWrapper` — all native `<div>` attributes are forwarded. */
export type TUITableInnerWrapper = React.PropsWithChildren<React.ComponentProps<'div'>>;

/** Props for `UITableInnerTable` — all native `<table>` attributes are forwarded. */
export type TUITableInnerTable = React.PropsWithChildren<React.ComponentProps<'table'>>;

/** Props for `UITableHead` — all native `<thead>` attributes are forwarded. */
export type TUITableHead = React.PropsWithChildren<React.ComponentProps<'thead'>>;

/** Props for `UITableHeadCellOption` — the pin/unpin dropdown on a header cell. */
export type TUITableHeadCellOption = {
  /** Current pinning position of the column (`'left'`, `'right'`, or `false`). */
  isPinned?: ColumnPinningPosition;
  /** Whether the column is currently visible; reserved for future hide/show actions. */
  isVisible?: boolean;
  /** Additional CSS classes applied to the dropdown trigger button. */
  className?: string;
  /** Called with `'left'` when the user selects "Pin to Left". */
  onLeftPin?: (pos: ColumnPinningPosition) => void;
  /** Called with `'right'` when the user selects "Pin to Right". */
  onRightPin?: (pos: ColumnPinningPosition) => void;
  /** Called with `false` when the user selects "Unpin". */
  onUnpin?: (pos: ColumnPinningPosition) => void;
  /** Called when the user toggles column visibility via the dropdown. */
  onToggleVisibility?: (props: AnyEntity) => void;
};

/** Props for `UITableHeadCellSelect` — the "select all rows" header checkbox cell. */
export type TUITableHeadCellSelect = React.ComponentProps<'th'> & {
  /** Whether the column is pinned to a side (the select cell is always sticky). */
  isPinned?: ColumnPinningPosition;
  /** Reflects `table.getIsAllRowsSelected()` to set the checkbox state. */
  isAllRowsSelected?: boolean;
  /** Calls `table.toggleAllRowsSelected` when the checkbox value changes. */
  onToggleAllRowsSelected?: (value?: boolean) => void;
};

/** Props for `UITableHeadRow` — a single header `<tr>` built from a TanStack `HeaderGroup`. */
export type TUITableHeadRow = React.PropsWithChildren<
  React.ComponentProps<'tr'> & {
    /** The TanStack `HeaderGroup` whose `headers` are rendered as `<th>` cells. */
    headerGroup: HeaderGroup<unknown>;
    /** Forwarded to `UITableHeadCellSelect`; toggles all-row selection. */
    onToggleAllRowsSelected?: (value?: boolean) => void;
  }
>;

/** Props for `UITableHeadCell` — a single data `<th>` with pinning and resize support. */
export type TUITableHeadCell = React.PropsWithChildren<
  React.ComponentProps<'th'> & {
    /** Whether the column is currently visible (used for future hide/show UI). */
    isVisible?: boolean;
    /** Current pinning position (`'left'`, `'right'`, or `false`). */
    isPinned?: ColumnPinningPosition;
    /** `true` when this is the first cell in the right-pinned group (adds a left border). */
    isFirstCell?: boolean;
    /** `true` when this is the last cell in the left-pinned group (adds a right border). */
    isLastCell?: boolean;
    /** When `false` the pin/unpin option dropdown is hidden (e.g. `actions` column). */
    isOptionsVisible?: boolean;
    /** Column id used to look up the CSS custom property `--header-<id>-size`. */
    headerId?: string;
    /** TanStack `Column` instance used to derive `left`/`right` sticky offsets and size constraints. */
    headerColumn?: Column<unknown, unknown>;
    /** Calls `column.pin` with the chosen `ColumnPinningPosition`. */
    onColumnPin?: (pos: ColumnPinningPosition) => void;
    /** Calls `column.toggleVisibility` when hide/show is triggered from the dropdown. */
    onToggleVisibility?: (value?: boolean) => void;
  }
>;

/** Props for `UITableBody` — the virtual-scroll `<tbody>` container. */
export type TUITableBody = React.PropsWithChildren<
  React.ComponentProps<'tbody'> & {
    /** When `true` the body renders `null` (loading state is handled by `UITableEmptyDisplay`). */
    isFetching?: boolean;
    /** When `true` the body renders `null` (empty state is handled by `UITableEmptyDisplay`). */
    isEmpty?: boolean;
    /** CSS string for the total virtual height of all rows, e.g. `"4200px"`. */
    height: string;
  }
>;

/** Props for `UITableRow` — a single virtualised data `<tr>`. */
export type TUITableRow = React.ComponentProps<'tr'> & {
  /** The TanStack `Row` object whose visible cells are iterated. */
  row: Row<AnyEntity>;
  /** Whether this row is currently selected (drives `data-selected` attribute). */
  isSelected?: boolean;
  /** Zero-based virtual row index used for `data-index` and passed to `onClickRow`. */
  virtualRowIndex: number;
  /** Pixel offset from the top of the scroll container for the CSS `translateY`. */
  virtualRowStart: number;
};

/** Props for `UITableCellSelect` — the per-row selection checkbox `<td>`. */
export type TUITableCellSelect = React.ComponentProps<'td'> & {
  /** Pinning position; the select cell is always rendered sticky regardless. */
  isPinned?: ColumnPinningPosition;
  /** Whether the checkbox should appear checked. */
  isSelected?: boolean;
  /** Calls `row.toggleSelected` when the checkbox value changes. */
  onToggleRowSelected?: (value?: boolean) => void;
};

/** Props for `UITableCellActions` — the sticky right-edge actions `<td>`. */
export type TUITableCellActions = React.ComponentProps<'td'> & {
  /** Virtual row index forwarded to the cell renderer via `data-cell`. */
  virtualRowIndex: number;
  /** TanStack `Column` whose `columnDef.cell` is rendered inside the `<td>`. */
  column?: Column<unknown, unknown>;
  /** Returns the `CellContext` passed to `flexRender`. */
  getContext: () => CellContext<unknown, unknown>;
};

/** Props for `UITableCell` — a standard data `<td>` with pinning and sizing support. */
export type TUITableCell = React.ComponentProps<'td'> & {
  /** Current pinning position of the column. */
  isPinned?: ColumnPinningPosition;
  /** `true` when this is the first cell in the right-pinned group (adds a left border separator). */
  isFirstCell?: boolean;
  /** `true` when this is the last cell in the left-pinned group (adds a right border separator). */
  isLastCell?: boolean;
  /** Column id used to read `--col-<id>-size` CSS custom property for width. */
  colId?: string;
  /** Unused reserved field for a future per-cell identifier. */
  cellId?: string;
  /** Horizontal alignment of the cell content (`'start'` is the default). */
  position?: 'start' | 'center' | 'end';
  /** TanStack `Column` instance used to derive sticky offsets and content-fit sizing. */
  column?: Column<unknown, unknown>;
  /** Returns the `CellContext` passed to `flexRender`. */
  getContext: () => CellContext<unknown, unknown>;
};

/** Props for `UITableFooter` — all native `<tfoot>` attributes are forwarded. */
export type TUITableFooter = React.PropsWithChildren<React.ComponentProps<'tfoot'>>;

/** Props for `UITableLoadMore` — the append-row "load more" trigger. */
export type TUITableLoadMore = React.PropsWithChildren<
  React.ComponentProps<'tr'> & {
    /** Virtual index of this synthetic row (appended after the last data row). */
    virtualRowIndex: number;
    /** Pixel offset used for the CSS `translateY` to position the row correctly. */
    virtualRowStart: number;
    /**
     * Async callback that fetches the next page of data.
     * When omitted the component renders `null`.
     */
    fetchMoreData?: () => void | Promise<void>;
  }
>;

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
  };
};

/** A single cell in a CSV export row. */
export type CsvCell = {
  /** Column header label for this cell. */
  label: string;
  /** Cell value — numbers render right-aligned in spreadsheet editors. */
  value: string | number | boolean | null | undefined;
};

/**
 * Value shape of the root `TableContext` consumed by toolbar and body
 * components via `useUITableContext`.
 */
export type TTableContext<TData extends RowData<TData>> = {
  /** Human-readable table title rendered in `UITableTooltip`. */
  title: string;
  /** The TanStack `Table` instance for the current dataset. */
  table: Table<TData>;

  /** `true` when no rows exist after a successful (non-loading) fetch. */
  isEmpty: boolean;
  /** `true` while the initial data fetch is in-flight. */
  isFetching?: boolean;
  /** `true` while a background refetch is running (data is already present). */
  isRefetching?: boolean;

  /** Total number of rows in the remote dataset, used for virtual scroll height. */
  totalRows?: number;

  /** Callback that loads the next page; forwarded to `UITableLoadMore`. */
  fetchMoreData?: () => void | Promise<void>;

  /** CSV export rows; each row is an ordered array of `{ label, value }` cells. */
  csvData?: CsvCell[][];
  /** File name (without `.csv`) for the downloaded file. Defaults to the table title. */
  csvFileName?: string;
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
};

/** Context value provided by `UITableBodyProvider`. */
export type TTableBodyContext = {
  /** `true` while data is loading; causes `UITableBody` to render `null`. */
  isFetching: boolean;
  /** `true` when there are no rows after a successful fetch. */
  isEmpty: boolean;
  /** The current `Record<rowId, boolean>` row-selection map from TanStack state. */
  rowSelectionState: RowSelectionState;
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

/** Context value for the virtualiser, shared between the body and the load-more row. */
export type TTableVirtualizerContext = {
  /** The TanStack Virtual `Virtualizer` instance driving row windowing. */
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  /** The currently visible `VirtualItem` slice (index + start offset for each row). */
  virtualItems: VirtualItem[];
};

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
 *   <UITable />
 * </UITableProvider>
 * ```
 */
export type TableProviderProps<
  TData extends RowData<TData>,
  TKey extends keyof TData = keyof TData,
  TColumns extends ReadonlyArray<TUITableColumn<TData>> = TUITableColumn<TData>[],
> = {
  /** Human-readable label shown in `UITableTooltip`. */
  title: string;

  /** Pass `true` while the initial page of data is being fetched. */
  isFetching?: boolean;
  /** Pass `true` while a background refetch is running (stale data remains visible). */
  isRefetching?: boolean;

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
  /** Called with the updated column-pinning state after each pin/unpin action. */
  onColumnPinning?: (columnPinning: ColumnPinningState) => void;

  /** CSV export rows; each row is an ordered array of `{ label, value }` cells. */
  csvData?: CsvCell[][];
  /** File name (without `.csv`) for the downloaded file. Defaults to the table title. */
  csvFileName?: string;
};
