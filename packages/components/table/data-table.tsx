import React from 'react'
import { type Column, flexRender, type Header, type Table as ReactTable } from '@tanstack/react-table'
import { ArrowLeftToLineIcon, ArrowRightToLineIcon, ChevronDown, ChevronUp, EllipsisIcon, PackagePlusIcon, PinOffIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { AnyEntity } from '@/types'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Helper function to compute pinning styles for columns
const getPinningStyles = (column: Column<AnyEntity>): React.CSSProperties => {
  const isPinned = column.getIsPinned()
  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

const SortingIndicator = ({ column }: { column: Column<AnyEntity> }) => {
  const sortDirection = column.getIsSorted()

  const icons = {
    asc: <ChevronUp className="shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />,
    desc: <ChevronDown className="shrink-0 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />,
  }

  return sortDirection ? icons[sortDirection] : null
}

const PinControls = ({ column }: { column: Column<AnyEntity> }) => {
  const columnHeader = column.columnDef.header as string

  if (!column.getCanPin()) return null

  if (column.getIsPinned()) {
    return (
      <Button
        size="icon"
        variant="ghost"
        color="secondary"
        className="hover:[&_svg]:text-secondary-foreground -mr-1 size-7 shadow-none"
        aria-label={`Unpin ${columnHeader} column`}
        title={`Unpin ${columnHeader} column`}
        onClick={() => column.pin(false)}
      >
        <PinOffIcon className="opacity-60" size={16} aria-hidden="true" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          color="secondary"
          className="-mr-1 size-7 shadow-none"
          aria-label={`Pin options for ${columnHeader} column`}
          title={`Pin options for ${columnHeader} column`}
        >
          <EllipsisIcon className="opacity-60" size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => column.pin('left')}>
          <ArrowLeftToLineIcon size={16} className="opacity-60" aria-hidden="true" />
          Stick to left
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.pin('right')}>
          <ArrowRightToLineIcon size={16} className="opacity-60" aria-hidden="true" />
          Stick to right
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeaderContent = ({ header }: { header: Header<AnyEntity, unknown> }) => {
  const { column } = header

  const handleSort = (e: React.KeyboardEvent) => {
    if (column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      column.getToggleSortingHandler()?.(e)
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 truncate">
      {!header.isPlaceholder && (
        <div
          className={cn(column.getCanSort() && 'flex h-full cursor-pointer items-center justify-between gap-2 select-none')}
          onClick={column.getToggleSortingHandler()}
          onKeyDown={handleSort}
          tabIndex={column.getCanSort() ? 0 : undefined}
        >
          <span className="truncate">{flexRender(column.columnDef.header, header.getContext())}</span>
          <SortingIndicator column={column} />
        </div>
      )}
      {!header.isPlaceholder && <PinControls column={column} />}
    </div>
  )
}

interface DataTableProps {
  table: ReactTable<AnyEntity>
  columnsLength?: number
  isLoading?: boolean
  onClickRow?: (id: string) => void
}

export const DataTable = ({ table, isLoading, onClickRow }: DataTableProps) => {
  'use no memo'
  return (
    <ScrollArea className="border-border-weak bg-background relative w-full overflow-auto rounded-lg border">
      <Table
        className={cn(
          '!w-full',
          '[&_td]:border-border-weak',
          '[&_th]:border-border-weak',
          'table-fixed border-separate border-spacing-0',
          '[&_tfoot_td]:border-t',
          '[&_th]:border-b',
          '[&_th]:border-b-border-weak',
          '[&_tr]:border-none',
          '[&_tr:not(:last-child)_td]:border-b',
          '[&_tr:not(:last-child)_td]:border-b-border-weak',
        )}
        style={{
          width: table.getTotalSize(),
        }}
      >
        <TableHeader className="sticky top-0 z-10 backdrop-blur-xs">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header
                const isPinned = column.getIsPinned()
                const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
                const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')
                return (
                  <TableHead
                    key={header.id}
                    data-pinned={isPinned || undefined}
                    data-last-col={isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined}
                    className={cn(
                      'relative h-9 font-semibold select-none',
                      'data-pinned:backdrop-blur-xs',
                      'data-pinned:bg-muted-weak',
                      '[&>.cursor-col-resize]:last:opacity-0',
                      '[&[data-pinned][data-last-col]]:border-border-weak',
                      '[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0',
                      '[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0',
                      '[&[data-pinned=left][data-last-col=left]]:border-r',
                      '[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0',
                      '[&[data-pinned=right][data-last-col=right]]:border-l',
                    )}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                        maxWidth: header.getSize(),
                        ...getPinningStyles(header.column),
                      },
                    }}
                  >
                    <HeaderContent header={header} />
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className={cn(isLoading && 'h-36', table.getRowModel().rows?.length === 0 && 'h-48')}>
          {isLoading ? (
            <TableRow className="absolute top-9 flex h-36 w-full items-center justify-center">
              <TableCell>loading...</TableCell>
            </TableRow>
          ) : (
            <React.Fragment>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="cursor-pointer border-none focus:outline-none"
                    onClick={() => onClickRow?.(row?.id || row.original?.id?.toString() || row.original?.uuid || undefined)}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { column } = cell
                      const isPinned = column.getIsPinned()
                      const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
                      const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            ...getPinningStyles(column),
                            width: cell.column.getSize(),
                            maxWidth: cell.column.getSize(),
                          }}
                          data-pinned={isPinned || undefined}
                          data-last-col={isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined}
                          className={cn(
                            'overflow-hidden py-2.5',
                            '[&[data-pinned][data-last-col]]:border-border-weak',
                            '[&[data-pinned=left][data-last-col=left]]:border-r',
                            '[&[data-pinned=right][data-last-col=right]]:border-l',
                            'data-pinned:bg-background/90',
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow className="absolute top-9 flex h-36 w-full items-center justify-center">
                  <TableCell>
                    <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-y-8 text-base">
                      <PackagePlusIcon size={48} strokeWidth={2} />
                      <p>Thêm dữ liệu để hiển thị</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          )}
        </TableBody>
      </Table>
      <ScrollBar orientation="vertical" className="z-10 w-2" />
      <ScrollBar orientation="horizontal" className="absolute right-0 bottom-0 left-0 h-2" />
    </ScrollArea>
  )
}
