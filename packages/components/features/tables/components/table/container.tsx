'use client';

import { Fragment } from 'react';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { useUITableBodyContext, useUITableContext } from '../../hooks/use-context';
import type { TUITableContainer } from '../../types';
import { UITableBody, UITableEmptyDisplay, UITableHead, UITableHeadRow, UITableInnerTable, UITableInnerWrapper, UITableLoadMore, UITableRow } from '../commons';
import { UITableLoadingDisplay } from '../commons/empty-display';
import type { TSlotKey } from '../commons/wrapper';

/**
 * Renders the table itself (head/body/rows) plus any number of additional
 * resizable side panels passed via `sidePanels`. Each panel is placed after
 * its own `ResizableHandle`, in the order given — so composing more panels
 * later (e.g. `sidePanels={[<UITableFilter />, <SomeOtherPanel />]}`) is just
 * adding more array entries, no change needed here.
 *
 * @example
 * ```tsx
 * <UITableContainer sidePanels={[<UITableFilter key="filter" />]} />
 * ```
 */
export const UITableContainer: React.FC<TUITableContainer> & { tableWrapperSlot?: TSlotKey } = ({ sidePanels = [] }) => {
  const { table, fetchMoreData } = useUITableContext();

  // Read from `TableBodyContext` rather than `table.getState().columnPinning` directly —
  // `TableContext`'s dependency on the latter doesn't reliably re-render this component on a
  // pin-only change. `pinKey` is folded into the header/body row `key`s below so pinning a
  // column always forces a fresh render in the new [...left, ...center, ...right] grouping,
  // instead of possibly leaving stale, memoized rows behind.
  const { rowSelectionState, columnPinningState } = useUITableBodyContext();

  const { left: leftPinned = [], right: rightPinned = [] } = columnPinningState;

  const pinKey = `${leftPinned.join(',')}|${rightPinned.join(',')}`;

  const { rows } = table.getRowModel();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ direction: table.options.columnResizeDirection }}
      className="relative flex h-full min-h-0 w-full min-w-0 max-w-full overflow-auto border-x border-x-border border-t border-t-border p-0 text-sm"
    >
      <ResizablePanel data-slot="table-scroll-host" className="relative flex flex-col">
        <UITableInnerWrapper>
          <UITableInnerTable>
            <UITableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <UITableHeadRow key={`${headerGroup.id}-${pinKey}`} headerGroup={headerGroup} />
              ))}
            </UITableHead>
            <UITableBody>
              {rows.map((row, index) => {
                const isSelected = rowSelectionState[row.id] === true;
                return <UITableRow key={`${row.id}-${pinKey}`} row={row} isSelected={isSelected} rowIndex={index} />;
              })}
              {!!fetchMoreData && <UITableLoadMore fetchMoreData={fetchMoreData} />}
            </UITableBody>
            <UITableLoadingDisplay />
          </UITableInnerTable>
          <UITableEmptyDisplay />
        </UITableInnerWrapper>
      </ResizablePanel>
      {sidePanels.map((panel, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: `sidePanels` is a static passthrough list re-derived from `children` every render, not a reorderable collection
        <Fragment key={index}>
          <ResizableHandle />
          {panel}
        </Fragment>
      ))}
    </ResizablePanelGroup>
  );
};
UITableContainer.displayName = 'UITableContainer';
UITableContainer.tableWrapperSlot = 'container';
