import React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import { DataTable } from "./data-table";
import { DataTablePagination } from "./data-table-pagination";
import { Flex } from "../layouts/flex";
import { AddNewBtn } from "../ui/buttons/add-new";
import { RefreshBtn } from "../ui/buttons/refresh";
import { SearchInput } from "../ui/inputs/search-input";

type Props<T> = {
  data: T[];
  totalCount?: number;
  isLoading?: boolean;
  columns: ColumnDef<T>[];
  pagination?: PaginationState;
  onAdd?: () => void;
  onRefresh?: () => void;
  onClickRow?: (id: string) => void;
  onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
};
export function Table<T extends Record<string, unknown>>({
  data,
  totalCount,
  isLoading,
  columns,
  pagination,
  onAdd,
  onRefresh,
  onClickRow,
  onPaginationChange,
}: Props<T>) {
  "use no memo";

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const initialState = React.useMemo(
    () => ({
      columnPinning: { right: ["actions", "update", "delete"] },
      pagination: { pageIndex: 0, pageSize: 20 },
    }),
    [],
  );

  const table = useReactTable<T>({
    initialState,
    data,
    columns,
    rowCount: totalCount,
    columnResizeMode: "onChange",
    manualPagination: true,
    enableColumnResizing: false,
    enableMultiRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: (row) => (row.id as string) || (row.uuid as string),
    state: {
      rowSelection,
      sorting,
      columnVisibility,
      columnFilters,
      ...(pagination ? { pagination } : {}),
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    ...(onPaginationChange ? { onPaginationChange } : {}),
  });

  return (
    <Flex
      vertical
      wrap={false}
      gap="sm"
      align="start"
      className="size-full overflow-y-auto pt-1"
    >
      <Flex justify="between" padding="none" width="full" className="flex-0">
        <SearchInput placeholder="Search..." />
        <Flex className="px-0">
          {onAdd && <AddNewBtn onClick={onAdd} />}
          <RefreshBtn onClick={onRefresh} />
        </Flex>
      </Flex>
      <Flex
        padding="none"
        vertical
        wrap={false}
        width="full"
        className="flex-1 overflow-auto"
      >
        <DataTable
          table={table}
          isLoading={isLoading}
          onClickRow={onClickRow}
        />
        <DataTablePagination<T> table={table} />
      </Flex>
    </Flex>
  );
}
