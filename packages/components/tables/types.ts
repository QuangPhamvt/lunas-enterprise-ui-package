import type { ColumnDef, ColumnPinningState, Row, RowData, RowSelectionState, Table } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type TTableContext<TData extends RowData> = {
  title: string;
  table: Table<TData>;
  isEmpty: boolean;
  isFetching?: boolean;

  rows: Row<TData>[];

  rowSelection: RowSelectionState;

  columnPinning: ColumnPinningState;
};

export type TTableVirtualizerContext = {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  virtualItems: VirtualItem[];
};

export type TableProviderProps<TData extends RowData> = {
  title: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  isFetching?: boolean;
};
