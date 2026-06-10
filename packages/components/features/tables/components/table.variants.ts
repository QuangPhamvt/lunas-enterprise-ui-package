import { cva, type VariantProps } from 'class-variance-authority';

export const tableHeadCellOptionTriggerVariants = cva([
  'absolute right-2 z-10 p-0.5 opacity-0 bg-card',
  'cursor-pointer rounded-full transition-all',
  'text-text-positive-weak',
  '[&>svg]:size-4',
  'group-hover:opacity-100',
  'hover:bg-muted-muted hover:text-text-positive',
]);

export const tableEmptyDisplayVariants = cva(['sticky left-0 flex flex-1 items-center justify-center bg-transparent text-text-positive-weak opacity-100']);

export const tableWrapperVariants = cva(['relative m-0 flex size-full flex-col flex-nowrap items-start justify-start gap-2']);

export const tableInnerWrapperVariants = cva(['relative w-full flex-1 min-h-0 overflow-auto border-b border-b-border border-l border-l-border']);

export const tableInnerTableVariants = cva(['grid w-full table-fixed caption-bottom border-collapse border-spacing-0 flex-col content-start']);

export const tableHeadVariants = cva([
  'sticky top-0 z-20 h-9 w-full',
  'grid select-none bg-white',
  'border-b border-b-border shadow',
  'font-medium text-[13px] text-text-positive-weak',
  '[&_tr:not(:last-child)_td]:border-b',
  '[&_th]:inline-flex',
  '[&_th]:bg-card',
  '[&_th]:items-center',
  '[&_th]:transition-all',
  '[&_th]:duration-300',
  '[&_th]:whitespace-nowrap',
  '[&_th]:border-border',
  '[&_th]:border-r',
  '[&_th]:first:border-l-0',
  '[&_tr_th:not([data-pinned=false])]:bg-card',
]);

export const tableHeadRowVariants = cva(['flex']);

export const tableHeadCellVariants = cva(['group flex'], {
  variants: {
    isPinned: {
      left: 'sticky',
      right: 'sticky',
      false: 'relative',
    },
    isActions: {
      true: 'border-r-0!',
      false: '',
    },
    isLastCell: {
      true: '',
      false: '',
    },
    isFirstCell: {
      true: '',
      false: '',
    },
    position: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  compoundVariants: [
    { isPinned: 'left', isLastCell: true, className: 'border-r border-r-border' },
    { isPinned: 'right', isFirstCell: true, className: 'border-l border-l-border' },
  ],
});

export const tableBodyVariants = cva([
  'relative w-full',
  'grid',
  '[&_tr]:absolute',
  '[&_tr]:flex',
  '[&_tr]:flex-none',
  '[&_tr]:w-full',
  '[&_tr]:cursor-pointer [&_tr]:focus:outline-none',
  '[&_tr]:border-b [&_tr]:border-b-border',
  '[&_td]:z-10',
  '[&_td]:transition-all',
  '[&_td]:flex',
  '[&_td]:flex-none',
  '[&_td]:overflow-hidden',
  '[&_td]:whitespace-nowrap',
  '[&_td]:px-4',
  '[&_td]:py-2.5',
  '[&_td]:align-middle',
  '[&_td]:border-border',
  '[&_td]:data-[selected=true]:bg-muted-muted!',
  '[&_td]:data-[selected=true]:hover:bg-muted-muted!',
  '[&_td>div]:inline-flex',
  '[&_td>div]:items-center',
  '[&_td>div]:w-full',
  '[&_td:not([data-pinned=false])]:z-20',
  '[&_td:not([data-pinned=false])]:sticky',
  '[&_td:not([data-pinned=false])]:bg-muted-bg-subtle',
]);

export const tableRowVariants = cva(['group transition-colors hover:bg-muted-muted hover:[&_td]:bg-muted-muted! [&_td]:border-r [&_td]:border-r-border']);

export const tableCellSelectVariants = cva(['group-hover:bg-muted-muted!'], {
  variants: {
    isPinned: {
      left: 'sticky',
      right: 'sticky',
      false: 'relative',
    },
  },
  defaultVariants: {
    isPinned: undefined,
  },
});

export const tableCellActionsVariants = cva(['sticky border-r-0! inset-y-0 right-0 z-50 flex items-center pr-4 group-hover:bg-muted-muted!']);

export const tableCellVariants = cva(['group-hover:bg-muted-muted!'], {
  variants: {
    isPinned: {
      left: '',
      right: '',
      false: '',
    },
    isLastCell: {
      true: '',
      false: '',
    },
    isFirstCell: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { isPinned: 'left', isLastCell: true, className: 'border-r border-r-border' },
    { isPinned: 'right', isFirstCell: true, className: 'border-l border-l-border' },
  ],
});

export const tableCellInnerVariants = cva(['overflow-x-hidden'], {
  variants: {
    position: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    position: 'start',
  },
});

export const tableFooterVariants = cva(['shrink-0 flex w-full justify-center border-t border-border-weak font-medium']);

export const tableFooterRowVariants = cva(['flex w-full', 'text-[13px] font-medium text-text-positive-weak']);

export const tableFooterCellVariants = cva(['flex flex-none items-center overflow-hidden whitespace-nowrap px-4 py-2', 'border-r border-r-border'], {
  variants: {
    isPinned: {
      left: 'sticky z-20 bg-white',
      right: 'sticky z-20 bg-white',
      false: 'relative',
    },
    isFirstCell: { true: 'border-l border-l-border', false: '' },
    isLastCell: { true: 'border-r border-r-border', false: '' },
  },
});

export const tableLoadMoreButtonVariants = cva(['flex cursor-pointer gap-x-0.5'], {
  variants: {
    state: {
      idle: 'text-text-positive-weak hover:text-text-positive',
      fetching: 'cursor-not-allowed',
      error: 'text-danger hover:text-danger-strong',
    },
  },
  defaultVariants: {
    state: 'idle',
  },
});

export type TableHeadCellVariantProps = VariantProps<typeof tableHeadCellVariants>;
export type TableCellSelectVariantProps = VariantProps<typeof tableCellSelectVariants>;
export type TableCellVariantProps = VariantProps<typeof tableCellVariants>;
export type TableCellInnerVariantProps = VariantProps<typeof tableCellInnerVariants>;
export type TableLoadMoreButtonVariantProps = VariantProps<typeof tableLoadMoreButtonVariants>;
