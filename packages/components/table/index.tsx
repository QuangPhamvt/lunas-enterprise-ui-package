import { useMemo, useState } from 'react';

import type { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, VisibilityState } from '@tanstack/react-table';
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from './data-table';
import { DataTableHeader } from './data-table-header';
import { Flex } from '../layouts/flex';

type Props<T> = {
  data: T[];
  totalCount?: number;
  isLoading?: boolean;
  isFetching?: boolean;
  allowLoadMore?: boolean;
  columns: ColumnDef<T>[];
  onAdd?: () => void;
  onRefresh?: () => void;
  onClickRow?: (id: string) => void;
  onFetchNextPage?: () => void;
};
export function Table<T extends Record<string, unknown>>({
  data,
  totalCount,
  isLoading,
  isFetching,
  allowLoadMore,
  columns,
  onAdd,
  onRefresh,
  onClickRow,
  onFetchNextPage,
}: Props<T>) {
  'use no memo';

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const initialState = useMemo(
    () => ({
      columnPinning: { right: ['actions', 'update', 'delete'] },
    }),
    []
  );

  const table = useReactTable<T>({
    initialState,
    data,
    columns,
    rowCount: totalCount,
    columnResizeMode: 'onChange',
    enableColumnResizing: false,
    enableMultiRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: row => (row.id as string) || (row.uuid as string),
    state: {
      rowSelection,
      sorting,
      columnVisibility,
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <Flex vertical wrap={false} gap="sm" align="start" className="size-full overflow-y-auto pt-1">
      <DataTableHeader onAdd={onAdd} onRefresh={onRefresh} />
      <Flex padding="none" vertical wrap={false} width="full" className="flex-1 overflow-auto pb-4">
        <DataTable
          table={table}
          isLoading={isLoading}
          isFetching={isFetching}
          allowFetchMore={allowLoadMore}
          onClickRow={onClickRow}
          onFetchNextPage={onFetchNextPage}
        />
      </Flex>
    </Flex>
  );
}
