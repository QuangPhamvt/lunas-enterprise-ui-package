import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Strong-colored trailing border marking the last left-pinned column, so users can see it's
 * pinned over scrollable content. Forced `!important` because `tableRowVariants`' `[&_td]:border-r-border`
 * descendant selector otherwise outranks a plain utility class set directly on the `<td>`.
 */
const PINNED_LEFT_EDGE_BORDER = 'border-r! !border-r-border-strong/30';
/** Strong-colored leading border marking the first right-pinned column (mirrored). */
const PINNED_RIGHT_EDGE_BORDER = 'border-l! !border-l-border-strong/30';

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

export const tableInnerWrapperVariants = cva(['relative w-full flex-1 min-h-0 overflow-auto border-b border-b-border']);

export const tableInnerTableVariants = cva(['grid w-full table-fixed caption-bottom border-collapse border-spacing-0 flex-col content-start']);

export const tableHeadVariants = cva([
  'sticky top-0 z-40 h-9 w-full',
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
  '[&_tr_th:not([data-pinned=false])]:bg-secondary-bg-subtle',
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
    { isPinned: 'left', isLastCell: true, className: PINNED_LEFT_EDGE_BORDER },
    { isPinned: 'right', isFirstCell: true, className: PINNED_RIGHT_EDGE_BORDER },
  ],
});

export const tableBodyVariants = cva([
  'relative w-full',
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
  '[&_td]:data-[selected=true]:bg-muted-muted!',
  '[&_td]:data-[selected=true]:hover:bg-muted-muted!',
  '[&_td>div]:inline-flex',
  '[&_td>div]:items-center',
  '[&_td>div]:w-full',
  '[&_td:not([data-pinned=false])]:z-20',
  '[&_td:not([data-pinned=false])]:sticky',
  '[&_td:not([data-pinned=false])]:bg-secondary-bg-subtle',
]);

export const tableRowVariants = cva(['group transition-colors hover:bg-secondary-bg-subtle hover:[&_td]:bg-secondary-bg-subtle!']);

export const tableCellSelectVariants = cva(['group-hover:bg-secondary-bg-subtle!'], {
  variants: {
    isPinned: {
      left: 'sticky',
      right: 'sticky',
      false: 'relative',
    },
    isLastCell: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [{ isPinned: 'left', isLastCell: true, className: PINNED_LEFT_EDGE_BORDER }],
  defaultVariants: {
    isPinned: undefined,
  },
});

export const tableCellActionsVariants = cva(['sticky border-r-0! inset-y-0 right-0 z-30 flex items-center pr-4 group-hover:bg-secondary-bg-subtle!']);

export const tableCellVariants = cva(['group-hover:bg-secondary-bg-subtle!'], {
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
    { isPinned: 'left', isLastCell: true, className: PINNED_LEFT_EDGE_BORDER },
    { isPinned: 'right', isFirstCell: true, className: PINNED_RIGHT_EDGE_BORDER },
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

export const tableFooterCellVariants = cva(['flex flex-none items-center overflow-hidden whitespace-nowrap px-4 py-2'], {
  variants: {
    isPinned: {
      left: 'sticky z-20 bg-secondary-bg-subtle',
      right: 'sticky z-20 bg-secondary-bg-subtle',
      false: 'relative',
    },
    isFirstCell: { true: '', false: '' },
    isLastCell: { true: '', false: '' },
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
