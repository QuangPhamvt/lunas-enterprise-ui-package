import type { ColumnDef, RowData, Table } from '@tanstack/react-table';

import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

export type TTableContext<TData extends RowData> = {
  title: string;
  table: Table<TData>;
  columnSizeVars: { [key: string]: number | undefined };
  isEmpty: boolean;
  isFetching?: boolean;
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
