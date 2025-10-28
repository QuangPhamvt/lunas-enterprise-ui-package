import type { ColumnDef, ColumnPinningState, RowData, Table } from '@tanstack/react-table';

import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type TTableContext<TData extends RowData> = {
  title: string;
  table: Table<TData>;
  isEmpty: boolean;
  isFetching?: boolean;
  columnSizeVars: { [key: string]: number | undefined };
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
