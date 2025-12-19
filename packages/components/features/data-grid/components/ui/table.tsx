import { useRef } from 'react';

import type { Header } from '@tanstack/react-table';

import { cn } from '@customafk/react-toolkit/utils';

import { cva } from 'class-variance-authority';

const tableCss = cva('relative grid h-full border-spacing-0 tabular-nums');
const tableHeaderCss = cva('sticky border-b border-b-border text-sm leading-4 shadow-sm');
const tableHeaderRowCss = cva('flex w-full [&_th]:border-r [&_th]:border-r-border [&_th]:last:border-r-0');
const tableHeaderCellCss = cva('relative flex select-none items-center justify-start border-0 border-transparent px-3 py-1.5');
const tableBodyCss = cva('flex flex-col text-sm text-text-positive-weak');
const tableRowCss = cva(
  'group relative flex border-b border-b-border hover:bg-muted-muted data-[state="create"]:border-primary-weak data-[state="create"]:bg-primary-bg-subtle [&_td]:border-r [&_td]:border-r-transparent [&_td]:last:border-r-0'
);
const tableCellCss = cva('');
const tableCellContentCss = cva([
  'relative size-full border border-transparent outline-none',
  'data-[state="focus"]:bg-background',
  'data-[state="focus"]:outline-solid',
  'data-[state="focus"]:-outline-offset-1',
  'data-[state="focus"]:outline-1',
  'data-[state="focus"]:outline-primary',
  'aria-invalid:bg-danger-bg-subtle',
  'aria-invalid:outline-solid',
  'aria-invalid:outline-danger!',
  'aria-invalid:outline-1',
  'aria-invalid:-outline-offset-1',
]);

const Table: React.FC<React.ComponentProps<'table'>> = ({ className, children, ...props }) => {
  const tableRef = useRef<HTMLTableElement>(null);
  return (
    <table ref={tableRef} data-testid="data-grid-table" className={cn(tableCss(), className)} {...props}>
      {children}
    </table>
  );
};

const TableHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <thead data-slot="data-grid-table-header" className={cn(tableHeaderCss())}>
      {children}
    </thead>
  );
};

const TableHeaderRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <tr data-slot="data-grid-table-header-row" className={cn(tableHeaderRowCss())}>
      {children}
    </tr>
  );
};

const TableHeaderCell: React.FC<
  React.ComponentProps<'th'> & {
    header: Header<any, unknown>;
  }
> = ({ id, header, children, className }) => {
  return (
    <th
      data-slot="data-grid-table-header-cell"
      style={{
        width: `calc(var(--header-${id}-size)*1px)`,
      }}
      className={cn(tableHeaderCellCss(), className)}
    >
      {children}
      <div
        onDoubleClick={header.column.resetSize}
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        className="-right-[3px] absolute inset-y-0 z-10 w-[5px] cursor-e-resize bg-transparent hover:bg-border"
      />
    </th>
  );
};

const TableBody: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <tbody data-slot="data-grid-table-body" className={cn(tableBodyCss())}>
      {children}
    </tbody>
  );
};

const TableRow: React.FC<React.ComponentProps<'tr'>> = ({ className, children, ...props }) => {
  return (
    <tr data-slot="data-grid-table-row" className={cn(tableRowCss(), className)} {...props}>
      {children}
    </tr>
  );
};

const TableCell: React.FC<
  React.ComponentProps<'td'> & {
    columnId: string;
  }
> = ({ columnId, style, className, children, ...props }) => {
  return (
    <td
      data-slot="data-grid-table-cell"
      style={{
        width: `calc(var(--col-${columnId}-size)*1px)`,
        ...style,
      }}
      className={cn(tableCellCss(), className)}
      {...props}
    >
      {children}
    </td>
  );
};

const TableCellContent: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn(tableCellContentCss(), className)}>
      {children}
    </div>
  );
};

export { Table, TableHeader, TableHeaderRow, TableHeaderCell, TableBody, TableRow, TableCell, TableCellContent };
