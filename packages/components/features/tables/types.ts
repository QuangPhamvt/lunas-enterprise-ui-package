import type { AccessorKeyColumnDef, ColumnPinningState, RowData, RowSelectionState, Table } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type TUITableColumn<TData extends RowData> = Pick<
  AccessorKeyColumnDef<TData, unknown>,
  'accessorKey' | 'size' | 'maxSize' | 'minSize' | 'header' | 'cell'
>;

export type TTableContext<TData extends RowData> = {
  title: string;
  table: Table<TData>;
  data: TData[];

  isEmpty: boolean;
  isFetching?: boolean;

  totalRows?: number;

  rowSelection: RowSelectionState;

  columnPinning: ColumnPinningState;

  fetchMoreData?: () => void | Promise<void>;
};

export type TTableClickRow<TData extends RowData, TKey extends keyof TData = keyof TData> = {
  keyOfClickRow?: TKey;
  onClickRow?: (rowIndex: number, rowId?: TData[TKey]) => void;
};

export type TTableVirtualizerContext = {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualItems: VirtualItem[];
};

export type TableProviderProps<TData extends RowData, TKey extends keyof TData> = {
  title: string;
  isFetching?: boolean;
  data: TData[];
  columns: TUITableColumn<TData>[];
  totalRows?: number;
  fetchMoreData?: () => void | Promise<void>;

  // Click Row Props
  // For enabling row click functionality
  keyOfClickRow?: TTableClickRow<TData, TKey>['keyOfClickRow'];
  onClickRow?: TTableClickRow<TData, TKey>['onClickRow'];
};
