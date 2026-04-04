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

export type RowData<TData extends RowData<AnyEntity>> = {
  [x: string | number | symbol]: AnyEntity;
  subRows?: TData[] | undefined;
};

export type TUITableEmptyDisplay = {
  isFetching?: boolean;
  isEmpty?: boolean;
};

export type TUITableWrapper = React.PropsWithChildren<React.ComponentProps<'div'>>;

export type TUITableInnerWrapper = React.PropsWithChildren<React.ComponentProps<'div'>>;

export type TUITableInnerTable = React.PropsWithChildren<React.ComponentProps<'table'>>;

export type TUITableHead = React.PropsWithChildren<React.ComponentProps<'thead'>>;

export type TUITableHeadCellOption = {
  isPinned?: ColumnPinningPosition;
  isVisible?: boolean;
  className?: string;
  onLeftPin?: (pos: ColumnPinningPosition) => void;
  onRightPin?: (pos: ColumnPinningPosition) => void;
  onUnpin?: (pos: ColumnPinningPosition) => void;
  onToggleVisibility?: (props: AnyEntity) => void;
};

export type TUITableHeadCellSelect = React.ComponentProps<'th'> & {
  isPinned?: ColumnPinningPosition;
  isAllRowsSelected?: boolean;
  onToggleAllRowsSelected?: (value?: boolean) => void;
};

export type TUITableHeadRow = React.PropsWithChildren<
  React.ComponentProps<'tr'> & {
    headerGroup: HeaderGroup<unknown>;
    onToggleAllRowsSelected?: (value?: boolean) => void;
  }
>;

export type TUITableHeadCell = React.PropsWithChildren<
  React.ComponentProps<'th'> & {
    isVisible?: boolean;
    isPinned?: ColumnPinningPosition;
    isFirstCell?: boolean;
    isLastCell?: boolean;
    isOptionsVisible?: boolean;
    headerId?: string;
    headerColumn?: Column<unknown, unknown>;
    onColumnPin?: (pos: ColumnPinningPosition) => void;
    onToggleVisibility?: (value?: boolean) => void;
  }
>;

export type TUITableBody = React.PropsWithChildren<
  React.ComponentProps<'tbody'> & {
    isFetching?: boolean;
    isEmpty?: boolean;
    height: string;
  }
>;

export type TUITableRow = React.ComponentProps<'tr'> & {
  row: Row<AnyEntity>;
  isSelected?: boolean;
  virtualRowIndex: number;
  virtualRowStart: number;
};

export type TUITableCellSelect = React.ComponentProps<'td'> & {
  isPinned?: ColumnPinningPosition;
  isSelected?: boolean;
  onToggleRowSelected?: (value?: boolean) => void;
};

export type TUITableCellActions = React.ComponentProps<'td'> & {
  virtualRowIndex: number;
  column?: Column<unknown, unknown>;
  getContext: () => CellContext<unknown, unknown>;
};

export type TUITableCell = React.ComponentProps<'td'> & {
  isPinned?: ColumnPinningPosition;
  isFirstCell?: boolean;
  isLastCell?: boolean;
  colId?: string;
  cellId?: string;
  position?: 'start' | 'center' | 'end';
  column?: Column<unknown, unknown>;
  getContext: () => CellContext<unknown, unknown>;
};

export type TUITableFooter = React.PropsWithChildren<React.ComponentProps<'tfoot'>>;

export type TUITableLoadMore = React.PropsWithChildren<
  React.ComponentProps<'tr'> & {
    virtualRowIndex: number;
    virtualRowStart: number;
    fetchMoreData?: () => void | Promise<void>;
  }
>;

export type TUITableColumn<TData extends RowData<TData>> = Pick<
  AccessorKeyColumnDef<TData, AnyEntity>,
  'id' | 'accessorKey' | 'size' | 'maxSize' | 'minSize' | 'header' | 'cell' | 'meta'
> & {
  meta?: {
    position?: 'start' | 'center' | 'end';
    fitContent?: boolean;
  };
};

export type TTableContext<TData extends RowData<TData>> = {
  title: string;
  table: Table<TData>;

  isEmpty: boolean;
  isFetching?: boolean;
  isRefetching?: boolean;

  totalRows?: number;

  fetchMoreData?: () => void | Promise<void>;
};

export type TTableInnerWrapperContext = {
  innerWrapperId: string;
};

export type TTableInnerTableContext = {
  table: Table<AnyEntity>;
  innerTableId: string;
  totalSize: number;
};

export type TTableHeadRowContext = {
  isAllRowsSelected: boolean;
  columnPinningState: ColumnPinningState;
  leftPinnedHeaders: Header<AnyEntity, unknown>[];
  rightPinnedHeaders: Header<AnyEntity, unknown>[];
  onToggleAllRowsSelected?: (value?: boolean) => void;
};

export type TTableBodyContext = {
  isFetching: boolean;
  isEmpty: boolean;
  rowSelectionState: RowSelectionState;
};

export type TTableRowContext<TData extends RowData<TData> = RowData<AnyEntity>, TKey extends keyof TData = keyof TData> = {
  keyOfClickRow?: TKey;
  isAllRowsSelected?: boolean;
  columnPinningState: ColumnPinningState;
  onClickRow?: (rowIndex: number, rowId?: AnyEntity) => void;
  leftPinnedHeaders?: Header<TData, unknown>[];
  rightPinnedHeaders?: Header<TData, unknown>[];
};

export type TTableVirtualizerContext = {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualItems: VirtualItem[];
};

export type TableProviderProps<
  TData extends RowData<TData>,
  TKey extends keyof TData = keyof TData,
  TColumns extends ReadonlyArray<TUITableColumn<TData>> = TUITableColumn<TData>[],
> = {
  title: string;

  isFetching?: boolean;
  isRefetching?: boolean;

  data: TData[];
  columns: TColumns;
  totalRows?: number;
  fetchMoreData?: () => void | Promise<void>;

  // Pinned Columns Props
  leftPinnedColumns?: Array<TColumns[number]['accessorKey']>;

  rightPinnedColumns?: Array<TColumns[number]['accessorKey']> | string[];

  // Row Props
  keyOfClickRow?: TTableRowContext<TData, TKey>['keyOfClickRow'];
  onClickRow?: TTableRowContext<TData, TKey>['onClickRow'];
  onRowSelection?: (rowSelection: RowSelectionState) => void;
  onColumnPinning?: (columnPinning: ColumnPinningState) => void;
};
