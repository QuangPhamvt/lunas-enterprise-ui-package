import { useMemo, useState } from 'react'

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
} from '@tanstack/react-table'

import { DataTable } from './data-table'
import { DataTableHeader } from './data-table-header'
import { DataTablePagination } from './data-table-pagination'
import { Flex } from '../layouts/flex'

type Props<T> = {
  data: T[]
  totalCount?: number
  isLoading?: boolean
  columns: ColumnDef<T>[]
  pagination?: PaginationState
  onAdd?: () => void
  onRefresh?: () => void
  onClickRow?: (id: string) => void
  onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>
}
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
  'use no memo'

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const initialState = useMemo(
    () => ({
      columnPinning: { right: ['actions', 'update', 'delete'] },
      pagination: { pageIndex: 0, pageSize: 20 },
    }),
    [],
  )

  const table = useReactTable<T>({
    initialState,
    data,
    columns,
    rowCount: totalCount,
    columnResizeMode: 'onChange',
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
  })

  return (
    <Flex vertical wrap={false} gap="sm" align="start" className="size-full overflow-y-auto pt-1">
      <DataTableHeader onAdd={onAdd} onRefresh={onRefresh} />
      <Flex padding="none" vertical wrap={false} width="full" className="flex-1 overflow-auto pb-4">
        <DataTable table={table} isLoading={isLoading} onClickRow={onClickRow} />
        <DataTablePagination
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
          filteredSelectedRowsLength={table.getFilteredSelectedRowModel().rows.length}
          filteredRowsLength={table.getFilteredRowModel().rows.length}
          pageIndex={table.getState().pagination.pageIndex}
          setPageIndex={table.setPageIndex}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          pageCount={table.getPageCount()}
        />
      </Flex>
    </Flex>
  )
}
