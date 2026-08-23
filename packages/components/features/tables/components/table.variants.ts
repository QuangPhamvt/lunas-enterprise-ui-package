import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Trailing border so users can see it's
 * pinned over scrollable content without needing a tinted background. Border forced `!important`
 * because `tableRowVariants`' `[&_td]:border-r-border` descendant selector otherwise outranks a
 * plain utility class set directly on the `<td>`.
 */
const PINNED_LEFT_EDGE_BORDER = 'border-r! !border-r-border';
/** Leading border + drop shadow marking the first right-pinned column (mirrored). */
const PINNED_RIGHT_EDGE_BORDER = 'border-l! !border-l-border';

export const tableHeadCellOptionTriggerVariants = cva([
  'absolute right-2 z-10 bg-card p-0.5 opacity-0',
  'cursor-pointer rounded-full transition-all',
  'text-text-positive-weak',
  '[&>svg]:size-4',
  'group-hover:opacity-100',
  'hover:bg-muted-muted hover:text-text-positive',
]);

export const tableEmptyDisplayVariants = cva(['sticky left-0 flex flex-1 items-center justify-center bg-transparent text-text-positive-weak opacity-100']);

export const tableWrapperVariants = cva([
  '@container/table-wrapper relative m-0 grid size-full min-h-96 min-w-0 grid-cols-1 content-start justify-items-start gap-2',
]);

/**
 * `shrinkable: true` (only the `container` row) opts into `min-h-0` so its `1fr` grid track can
 * shrink below content height and let `ResizablePanelGroup`'s own `overflow-auto` take over.
 * The other rows (toolbar/summaryBar/analysisPanel/extra) keep the grid default `min-height:
 * auto`, so their `auto` track never shrinks below its content — content that doesn't fit
 * overflows visibly (or forces the wrapper taller) instead of being silently clipped by the
 * `overflow-hidden` on inner cards (e.g. the summary bar's stat cards) when space is tight.
 */
export const tableWrapperRowVariants = cva(['w-full min-w-0'], {
  variants: {
    shrinkable: {
      true: 'min-h-0',
      false: '',
    },
  },
  defaultVariants: {
    shrinkable: false,
  },
});

export const tableInnerWrapperVariants = cva(['relative min-h-0 w-full flex-1 overflow-auto']);

export const tableInnerTableVariants = cva(['grid w-full table-fixed caption-bottom border-collapse border-spacing-0 flex-col content-start']);

export const tableHeadVariants = cva([
  'sticky top-0 z-40 h-9 w-full',
  'grid select-none bg-white',
  'border-b border-b-border shadow',
  'font-normal text-[13px] text-text-positive-weak',
  '[&_tr:not(:last-child)_td]:border-b',
  '[&_th]:inline-flex',
  '[&_th]:bg-card',
  '[&_th]:items-center',
  '[&_th]:transition-all',
  '[&_th]:duration-300',
  '[&_th]:whitespace-nowrap',
  '[&_tr_th:not([data-pinned=false])]:bg-card',
]);

export const tableHeadRowVariants = cva(['flex']);

export const tableHeadCellVariants = cva(['group flex pr-4'], {
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

  // Table row variants
  '[&_tr]:flex',
  '[&_tr]:flex-none',
  '[&_tr]:w-full',
  '[&_tr]:transition-all',
  '[&_tr]:hover:bg-muted-muted',
  '[&_tr]:hover:[&_td]:bg-muted-bg-subtle',
  '[&_tr]:cursor-pointer',
  '[&_tr]:focus:outline-none',
  '[&_tr]:border-b',
  '[&_tr]:border-b-border',

  // Table cell variants
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
  '[&_td:not([data-pinned=false])]:bg-card',
]);

export const tableRowVariants = cva(['group']);

export const tableCellSelectVariants = cva([], {
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

export const tableCellActionsVariants = cva(['sticky inset-y-0 right-0 z-30 flex items-center border-r-0! pr-4 group-hover:bg-muted-muted!']);

export const tableCellVariants = cva([], {
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

export const tableFooterVariants = cva(['flex w-full shrink-0 justify-center border-border-weak border-t font-medium']);

export const tableFooterRowVariants = cva(['flex w-full', 'font-medium text-[13px] text-text-positive-weak']);

export const tableFooterCellVariants = cva(['flex flex-none items-center overflow-hidden whitespace-nowrap px-4 py-2'], {
  variants: {
    isPinned: {
      left: 'sticky z-20 bg-card',
      right: 'sticky z-20 bg-card',
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
