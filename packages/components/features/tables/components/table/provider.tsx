/**
 * @file provider.tsx
 * Context providers that wire TanStack Table state into the UITable component tree.
 *
 * Each sub-provider is a memoised wrapper around a single React context so that
 * only the subtree that consumes a particular slice of state re-renders when that
 * slice changes. State ownership for each independent concern (selection, column
 * pinning, filters, analysis/summary panel toggles) lives in its own hook under
 * `../../hooks/`, so this file is left to compose them and instantiate the
 * TanStack `table` instance.
 */
import { useId, useMemo, useRef, useState } from 'react';

import type { ColumnDef, ExpandedState } from '@tanstack/react-table';
import { getCoreRowModel, getExpandedRowModel, getGroupedRowModel, useReactTable } from '@tanstack/react-table';

import type { AnyEntity } from '@/types';
import {
  TableAnalysisContext,
  TableBodyContext,
  TableContext,
  TableFilterContext,
  TableHeadRowContext,
  TableInnerTableContext,
  TableInnerWrapperContext,
  TableRowContext,
  TableSummaryContext,
} from '../../hooks/use-context';
import { useTableColumnPinning } from '../../hooks/use-table-column-pinning';
import { useTableFilters } from '../../hooks/use-table-filters';
import { useTableAnalysisPanel, useTableSummaryBar } from '../../hooks/use-table-panels';
import { useTableSelection } from '../../hooks/use-table-selection';
import type {
  RowData,
  TableProviderProps,
  TTableBodyContext,
  TTableContext,
  TTableHeadRowContext,
  TTableInnerTableContext,
  TTableInnerWrapperContext,
  TTableRowContext,
  TUITableColumn,
} from '../../types';
import { createScopedProvider } from './scoped-provider';

const UITableInnerWrapperProvider = createScopedProvider<TTableInnerWrapperContext>(TableInnerWrapperContext, 'UITableInnerWrapperProvider');

const UITableInnerTableProvider = createScopedProvider<TTableInnerTableContext>(TableInnerTableContext, 'UITableInnerTableProvider');

const UITableHeadRowProvider = createScopedProvider<TTableHeadRowContext>(TableHeadRowContext, 'UITableHeadRowProvider');

const UITableBodyProvider = createScopedProvider<TTableBodyContext>(TableBodyContext, 'UITableBodyProvider');

const UITableRowProvider = createScopedProvider<TTableRowContext<AnyEntity, AnyEntity>>(TableRowContext, 'UITableRowProvider');

/**
 * Root context provider for the UITable component family.
 *
 * Instantiates a TanStack Table instance with virtualisation-friendly settings
 * (column pinning, row selection, row grouping, row expansion) and propagates
 * all derived state through a nested set of memoised context providers so that
 * each layer only re-renders when its own slice of state changes.
 *
 * @example
 * ```tsx
 * import { UITableProvider } from '@customafk/lunas-ui/features/tables';
 *
 * const columns = [
 *   { accessorKey: 'name', header: 'Name' },
 *   { accessorKey: 'email', header: 'Email' },
 * ];
 *
 * function MyPage() {
 *   return (
 *     <UITableProvider
 *       title="Users"
 *       data={users}
 *       columns={columns}
 *       isFetching={isLoading}
 *       onClickRow={(index, id) => console.log(index, id)}
 *     >
 *       <UITableContainer />
 *     </UITableProvider>
 *   );
 * }
 * ```
 */
export const UITableProvider = <
  TData extends RowData<TData> = RowData<AnyEntity>,
  TKey extends keyof TData = keyof TData,
  TColumns extends ReadonlyArray<TUITableColumn<TData>> = TUITableColumn<TData>[],
>({
  title,

  isFetching = false,
  isRefetching = false,
  isLoading = false,
  loadingDisplayRow = 3,

  data,
  columns,
  totalRows,

  leftPinnedColumns = [],
  rightPinnedColumns = [],

  keyOfClickRow,
  onClickRow,
  onRowSelection,
  onColumnPinning,

  fetchMoreData,
  emptyDisplayHeight,
  csvData,
  csvFileName,

  filterDefinitions = [],
  onFilterChange,

  summary = [],
  onSummaryItemClick,
  showAnalysisPanel = false,

  description,
  headerActions,

  children,
}: React.PropsWithChildren<TableProviderProps<TData, TKey, TColumns>>) => {
  const innerWrapperId = useId();
  const innerTableId = useId();
  const tableRef = useRef<HTMLTableElement | null>(null);

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { rowSelection, onRowSelectionChange } = useTableSelection(onRowSelection);
  const { columnPinning, onColumnPinningChange } = useTableColumnPinning({
    leftPinnedColumns: leftPinnedColumns as unknown as string[],
    rightPinnedColumns: rightPinnedColumns as unknown as string[],
    onColumnPinning,
  });
  const filterContextValue = useTableFilters({ filterDefinitions, onFilterChange });
  const analysisContextValue = useTableAnalysisPanel(false);
  const summaryContextValue = useTableSummaryBar(true);

  const table = useReactTable<TData>({
    data: data,
    columns: columns as unknown as ColumnDef<AnyEntity, unknown>[],
    state: {
      rowSelection,
      columnPinning,
      expanded,
    },
    defaultColumn: {
      enableResizing: false,
      size: undefined,
      minSize: undefined,
      maxSize: undefined,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',

    enableColumnPinning: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableMultiRowSelection: true,

    autoResetAll: false,
    autoResetExpanded: false,
    autoResetPageIndex: false,

    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    onRowSelectionChange,
    onColumnPinningChange,
    onExpandedChange: setExpanded,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: rows
  const rows = useMemo(() => {
    const { rows } = table.getRowModel();
    return rows;
  }, [table.getRowModel().rows, table.getState().columnPinning]);

  const isEmpty = useMemo<boolean>(() => {
    return !isFetching && !isRefetching && rows.length === 0;
  }, [rows, isFetching, isRefetching]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const value = useMemo<TTableContext<TData>>(
    () => ({
      title,
      table,

      isEmpty,
      isFetching,
      isRefetching,
      isLoading,
      loadingDisplayRow,

      totalRows,

      fetchMoreData,
      emptyDisplayHeight,

      csvData,
      csvFileName,

      summary,
      onSummaryItemClick,
      showAnalysisPanel,

      description,
      headerActions,
    }),
    [
      title,
      table,

      isEmpty,
      isRefetching,
      isFetching,
      isLoading,
      loadingDisplayRow,

      totalRows,

      fetchMoreData,
      emptyDisplayHeight,
      table.getState().columnPinning,
      table.getState().expanded,

      csvData,
      csvFileName,

      summary,
      onSummaryItemClick,
      showAnalysisPanel,

      description,
      headerActions,
    ]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const tableState = useMemo(() => {
    return table.getState();
  }, [table.getState()]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const isAllRowsSelected = useMemo(() => {
    return table.getIsAllRowsSelected();
  }, [table.getIsAllRowsSelected()]);

  const rowSelectionState = useMemo(() => {
    return tableState.rowSelection;
  }, [tableState.rowSelection]);

  const columnPinningState = useMemo(() => {
    return tableState.columnPinning;
  }, [tableState.columnPinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const leftPinnedHeaders = useMemo(() => {
    return table.getLeftHeaderGroups()[0]?.headers || [];
  }, [table.getState().columnPinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get state
  const rightPinnedHeaders = useMemo(() => {
    return table.getRightHeaderGroups()[0]?.headers || [];
  }, [table.getState().columnPinning]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: table get total size
  const totalSize = useMemo(() => {
    return table.getTotalSize();
  }, [table.getTotalSize()]);

  return (
    <TableAnalysisContext.Provider value={analysisContextValue}>
      <TableSummaryContext.Provider value={summaryContextValue}>
        <TableFilterContext.Provider value={filterContextValue}>
          <TableContext.Provider value={value as TTableContext<TData>}>
            <UITableInnerWrapperProvider innerWrapperId={innerWrapperId}>
              <UITableInnerTableProvider
                table={table}
                innerTableId={innerTableId}
                totalSize={totalSize}
                tableRef={tableRef}
                columnPinningState={columnPinningState}
              >
                <UITableHeadRowProvider
                  isAllRowsSelected={isAllRowsSelected}
                  columnPinningState={columnPinningState}
                  leftPinnedHeaders={leftPinnedHeaders}
                  rightPinnedHeaders={rightPinnedHeaders}
                  onToggleAllRowsSelected={table.toggleAllRowsSelected}
                >
                  <UITableBodyProvider
                    isFetching={isFetching}
                    isRefetching={isRefetching}
                    isEmpty={isEmpty}
                    rowSelectionState={rowSelectionState}
                    columnPinningState={columnPinningState}
                  >
                    <UITableRowProvider
                      keyOfClickRow={keyOfClickRow}
                      isAllRowsSelected={isAllRowsSelected}
                      columnPinningState={columnPinningState}
                      leftPinnedHeaders={leftPinnedHeaders}
                      rightPinnedHeaders={rightPinnedHeaders}
                      onClickRow={onClickRow}
                    >
                      {children}
                    </UITableRowProvider>
                  </UITableBodyProvider>
                </UITableHeadRowProvider>
              </UITableInnerTableProvider>
            </UITableInnerWrapperProvider>
          </TableContext.Provider>
        </TableFilterContext.Provider>
      </TableSummaryContext.Provider>
    </TableAnalysisContext.Provider>
  );
};
