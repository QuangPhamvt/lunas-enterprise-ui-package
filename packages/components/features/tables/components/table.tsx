'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import { useUITableBodyContext, useUITableContext } from '../hooks/use-context';
import { UITableBody, UITableEmptyDisplay, UITableHead, UITableHeadRow, UITableInnerTable, UITableInnerWrapper, UITableLoadMore, UITableRow } from './common';
import { UITableLoadingDisplay } from './commons/empty-display';

export const UITableContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { table, fetchMoreData } = useUITableContext();
  const { rowSelectionState } = useUITableBodyContext();

  const { rows } = table.getRowModel();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      style={{ direction: table.options.columnResizeDirection }}
      className="relative flex w-full max-w-full flex-1 gap-1 overflow-auto border-t border-t-border border-r border-r-border p-0 text-sm"
    >
      <ResizablePanel data-slot="table-scroll-host" className="relative flex flex-col">
        <UITableInnerWrapper>
          <UITableInnerTable>
            <UITableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <UITableHeadRow key={headerGroup.id} headerGroup={headerGroup} />
              ))}
            </UITableHead>
            <UITableBody>
              {rows.map((row, index) => {
                const isSelected = rowSelectionState[row.id] === true;
                return <UITableRow key={row.id} row={row} isSelected={isSelected} rowIndex={index} />;
              })}
              {fetchMoreData && <UITableLoadMore fetchMoreData={fetchMoreData} />}
            </UITableBody>
            <UITableLoadingDisplay />
          </UITableInnerTable>
          <UITableEmptyDisplay />
        </UITableInnerWrapper>
      </ResizablePanel>
      {children && (
        <>
          <ResizableHandle />
          {children}
        </>
      )}
    </ResizablePanelGroup>
  );
};
