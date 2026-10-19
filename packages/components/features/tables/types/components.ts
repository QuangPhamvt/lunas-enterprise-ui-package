import type { CellContext, Column, ColumnPinningPosition, HeaderGroup, Row } from '@tanstack/react-table';

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
  /** When `true` a "Refetching data..." message is shown below the spinner to indicate a background refresh. */
  isRefetching?: boolean;
  /** CSS height of the overlay container. Defaults to `384px` (`min-h-96`) when omitted. */
  height?: React.CSSProperties['height'];
};

/** Props for `UITableWrapper` — all native `<div>` attributes are forwarded. */
export type TUITableWrapper = React.PropsWithChildren<React.ComponentProps<'div'>>;

/**
 * Props for `UITableContainer`. `sidePanels` renders additional resizable
 * panels next to the table (e.g. `UITableFilter`) — each entry gets its own
 * `ResizableHandle`, in array order. Omit or pass `[]` for no side panels.
 */
export type TUITableContainer = {
  sidePanels?: React.ReactNode[];
};

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
  /** Whether this is the last left-pinned column; renders a trailing edge shadow so users can see it's pinned over scrollable content. */
  isLastCell?: boolean;
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

/** Props for `UITableBody` — the `<tbody>` container. */
export type TUITableBody = React.PropsWithChildren<
  React.ComponentProps<'tbody'> & {
    /** When `true` the body renders `null` (loading state is handled by `UITableEmptyDisplay`). */
    isFetching?: boolean;
    /** When `true` the body renders `null` (empty state is handled by `UITableEmptyDisplay`). */
    isEmpty?: boolean;
  }
>;

/** Props for `UITableRow` — a single data `<tr>`. */
export type TUITableRow = React.ComponentProps<'tr'> & {
  /** The TanStack `Row` object whose visible cells are iterated. */
  row: Row<AnyEntity>;
  /** Whether this row is currently selected (drives `data-selected` attribute). */
  isSelected?: boolean;
  /** Zero-based row index passed to `onClickRow`. */
  rowIndex: number;
};

/** Props for `UITableCellExpand` — the per-row expand/collapse toggle `<td>`. */
export type TUITableCellExpand = React.ComponentProps<'td'> & {
  /** Pinning position; the expand cell is always rendered sticky regardless. */
  isPinned?: ColumnPinningPosition;
  /** Whether this is the last left-pinned column; renders a trailing edge shadow. */
  isLastCell?: boolean;
  /** Whether the row currently has child rows that can be expanded. */
  canExpand?: boolean;
  /** Whether the row is currently expanded (drives the chevron rotation). */
  isExpanded?: boolean;
  /** Nesting level of the row; the toggle is indented by `depth` steps. */
  depth?: number;
  /** Calls `row.toggleExpanded` when the toggle is clicked. */
  onToggleExpanded?: () => void;
};

/** Props for `UITableHeadCellExpand` — the header cell above the expand column. */
export type TUITableHeadCellExpand = React.ComponentProps<'th'> & {
  /** Whether the column is pinned to a side (the expand cell is always sticky). */
  isPinned?: ColumnPinningPosition;
  /** Whether this is the last left-pinned column; renders a trailing edge shadow. */
  isLastCell?: boolean;
  /** Reflects `table.getIsAllRowsExpanded()` to set the toggle state. */
  isAllRowsExpanded?: boolean;
  /** Calls `table.toggleAllRowsExpanded` when the toggle is clicked. */
  onToggleAllRowsExpanded?: () => void;
};

/** Props for `UITableCellSelect` — the per-row selection checkbox `<td>`. */
export type TUITableCellSelect = React.ComponentProps<'td'> & {
  /** Pinning position; the select cell is always rendered sticky regardless. */
  isPinned?: ColumnPinningPosition;
  /** Whether this is the last left-pinned column; renders a trailing edge shadow so users can see it's pinned over scrollable content. */
  isLastCell?: boolean;
  /**
   * Whether this row may be selected (`row.getCanSelect()`). When `false` the
   * `<td>` renders empty — used to keep selection on sub-rows only.
   */
  canSelect?: boolean;
  /** Whether the checkbox should appear checked. */
  isSelected?: boolean;
  /** Calls `row.toggleSelected` when the checkbox value changes. */
  onToggleRowSelected?: (value?: boolean) => void;
};

/** Props for `UITableCellActions` — the sticky right-edge actions `<td>`. */
export type TUITableCellActions = React.ComponentProps<'td'> & {
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
  /**
   * Row nesting level. When `> 0` the cell content is indented by that many
   * steps — set only on the first non-special data cell so nested rows read as
   * children of their parent.
   */
  indent?: number;
  /** TanStack `Column` instance used to derive sticky offsets and content-fit sizing. */
  column?: Column<unknown, unknown>;
  /** Returns the `CellContext` passed to `flexRender`. */
  getContext: () => CellContext<unknown, unknown>;
};

/** Props for `UITableFooter` — rendered as a `<div>` below the scroll container. */
export type TUITableFooter = React.PropsWithChildren<React.ComponentProps<'div'>>;

/** Props for `UITableLoadMore` — the append-row "load more" trigger. */
export type TUITableLoadMore = React.PropsWithChildren<
  React.ComponentProps<'tr'> & {
    /**
     * Async callback that fetches the next page of data.
     * When omitted the component renders `null`.
     */
    fetchMoreData?: () => void | Promise<void>;
  }
>;
