'use client';

import { memo } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

/**
 * Full-width semantic table with caption-bottom layout, intended to be composed with TableHeader, TableBody, and related sub-components.
 *
 * @example
 * ```tsx
 * import {
 *   Table, TableHeader, TableBody, TableRow,
 *   TableHead, TableCell, TableCaption,
 * } from '@customafk/lunas-ui/ui/table';
 *
 * <Table>
 *   <TableCaption>Invoice list</TableCaption>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Acme Corp</TableCell>
 *       <TableCell>$1,200</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = memo(({ className, ...props }: React.ComponentProps<'table'>) => {
  return <table data-slot="table" className={cn('w-full caption-bottom text-sm', className)} {...props} />;
});
Table.displayName = 'Table';

/** The `<thead>` element containing one or more header rows. */
const TableHeader = memo(({ className, ...props }: React.ComponentProps<'thead'>) => {
  return <thead data-slot="table-header" className={cn('[&_tr:not(:last-child)_td]:border-b', className)} {...props} />;
});
TableHeader.displayName = 'TableHeader';

/** The `<tbody>` element containing data rows with hover and selection styling. */
const TableBody = memo(({ className, ...props }: React.ComponentProps<'tbody'>) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        '[&_tr:last-child]:border-0',
        '[&_tr]:hover:bg-muted-muted/50',
        '[&_tr]:active:bg-muted-muted',
        '[&_tr]:data-[state=selected]:bg-muted',
        '[&_tr]:border-border-weak',
        '[&_tr]:border-b',
        '[&_tr]:transition-colors',
        className
      )}
      {...props}
    />
  );
});
TableBody.displayName = 'TableBody';

/** The `<tfoot>` element for summary or aggregate rows at the bottom of the table. */
const TableFooter = memo(({ className, ...props }: React.ComponentProps<'tfoot'>) => {
  return <tfoot data-slot="table-footer" className={cn('border-border-weak border-t font-medium [&>tr]:last:border-b-0', className)} {...props} />;
});
TableFooter.displayName = 'TableFooter';

/** A single `<tr>` row used inside TableHeader, TableBody, or TableFooter. */
const TableRow = memo(({ className, ...props }: React.ComponentProps<'tr'>) => {
  return <tr data-slot="table-row" className={className} {...props} />;
});
TableRow.displayName = 'TableRow';

/** A `<th>` column header cell with medium-weight text and left alignment. */
const TableHead = memo(({ className, ...props }: React.ComponentProps<'th'>) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-text-positive-weak',
        'h-10 whitespace-nowrap px-2 text-left align-middle font-medium',
        '[&:has([role=checkbox])]:pr-0',
        '[&>[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    />
  );
});
TableHead.displayName = 'TableHead';

/** A standard `<td>` data cell used inside a TableRow. */
const TableCell = memo(({ className, ...props }: React.ComponentProps<'td'>) => {
  return <td data-slot="table-cell" className={className} {...props} />;
});
TableCell.displayName = 'TableCell';

/** An accessible `<caption>` element displayed below the table. */
const TableCaption = memo(({ className, ...props }: React.ComponentProps<'caption'>) => {
  return <caption data-slot="table-caption" className={cn('text-text-positive-muted mt-4 text-sm', className)} {...props} />;
});
TableCaption.displayName = 'TableCaption';

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
