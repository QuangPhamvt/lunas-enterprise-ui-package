import type { ColumnDef, ColumnPinningState, RowData, RowSelectionState, Table } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type TTableContext<TData extends RowData> = {
  title: string;
  table: Table<TData>;

  isEmpty: boolean;
  isFetching?: boolean;

  totalRows?: number;

  rowSelection: RowSelectionState;

  columnPinning: ColumnPinningState;

  fetchMoreData?: () => void | Promise<void>;
};

export type TTableVirtualizerContext = {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualItems: VirtualItem[];
};

export type TableProviderProps<TData extends RowData> = {
  title: string;
  isFetching?: boolean;
  data: TData[];
  columns: ColumnDef<TData>[];
  totalRows?: number;
  fetchMoreData?: () => void | Promise<void>;
};
