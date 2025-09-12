import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DataTablePaginationProps {
  filteredSelectedRowsLength?: number
  filteredRowsLength?: number

  pageSize?: number
  setPageSize?: (size: number) => void

  pageIndex?: number
  setPageIndex?: (index: number) => void

  previousPage?: () => void
  nextPage?: () => void

  canPreviousPage?: boolean
  canNextPage?: boolean

  pageCount?: number
}

export function DataTablePagination({
  filteredSelectedRowsLength,
  filteredRowsLength,
  pageSize,
  setPageSize,
  pageIndex = 0,
  setPageIndex,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount = 1,
}: DataTablePaginationProps) {
  'use no memo'
  return (
    <div className="mt-4 flex w-full flex-0 flex-col flex-wrap items-start space-y-2 px-2 sm:flex-row">
      <div className="text-text-positive flex-1 text-sm">
        {filteredSelectedRowsLength} of {filteredRowsLength} row(s) selected.
      </div>

      <div className="flex w-full flex-col flex-wrap items-start space-y-2 sm:w-fit sm:space-y-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <p className="sr-only text-sm font-medium sm:not-sr-only sm:mr-4">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize?.(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-18">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center justify-center text-sm font-medium">
            Page {pageIndex + 1} of {pageCount}
          </div>
        </div>

        <div className="flex w-full justify-end space-x-2 *:size-9 *:p-0">
          <Button variant="outline" color="muted" onClick={() => setPageIndex?.(0)} disabled={!canPreviousPage}>
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" color="muted" onClick={previousPage} disabled={!canPreviousPage}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button variant="outline" color="muted" onClick={nextPage} disabled={!canNextPage}>
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            color="muted"
            onClick={() => {
              setPageIndex?.(pageCount - 1)
            }}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
