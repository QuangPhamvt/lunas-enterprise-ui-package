import { cva, type VariantProps } from 'class-variance-authority';

/**
 * These variants only carry surface/border/padding/typography classes. Flex mechanics
 * (`flex`, `items-*`, `justify-*`, `gap-*`) are expressed as props on the `Flex` component
 * that wraps each region instead — don't re-add them here.
 */

/** Shared size scale across every Description sub-component, matching `ui/badge.tsx`/`ui/button.tsx`'s `xs–xl` scale. */
export type TDescriptionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const descriptionVariants = cva('relative flex flex-col bg-card', {
  variants: {
    surface: {
      /** Standalone card — the default. */
      card: 'size-full overflow-y-auto rounded-lg',
      /** Embedded inside another Description's value cell — no shadow/ring. */
      nested: 'w-full overflow-hidden rounded-md',
      /** Rendered inside a DescriptionGroup — the group owns the card chrome. */
      grouped: '',
    },
    bordered: {
      true: '',
      false: 'bg-transparent shadow-none ring-0',
    },
  },
  compoundVariants: [
    { surface: 'card', bordered: true, className: 'border border-border shadow-card ring-1 ring-border-weak' },
    { surface: 'nested', bordered: true, className: 'border border-border' },
    { surface: 'grouped', bordered: true, className: 'border-b border-b-border last:border-b-0' },
  ],
  defaultVariants: {
    surface: 'card',
    bordered: true,
  },
});

export const descriptionGroupVariants = cva('relative size-full overflow-y-auto rounded-lg bg-card', {
  variants: {
    bordered: {
      true: 'border border-border shadow-card ring-1 ring-border-weak',
      false: '',
    },
  },
  defaultVariants: {
    bordered: true,
  },
});

export const descriptionHeaderVariants = cva('bg-card', {
  variants: {
    sticky: {
      true: 'sticky top-0 z-30',
      false: 'relative',
    },
    size: {
      xs: 'px-2.5 py-1.5',
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-5 py-3.5',
      xl: 'px-6 py-4',
    },
    bordered: {
      true: 'border-b border-b-border',
      false: '',
    },
  },
  defaultVariants: {
    sticky: true,
    size: 'md',
    bordered: true,
  },
});

export const descriptionHeaderTitleVariants = cva('truncate font-semibold text-text-positive', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const descriptionHeaderDescriptionVariants = cva('text-text-positive-weak', {
  variants: {
    size: {
      xs: 'text-[10px]',
      sm: 'text-[11px]',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const descriptionSectionVariants = cva('', {
  variants: {
    size: {
      xs: 'gap-2 px-2.5 py-1.5',
      sm: 'gap-2.5 px-3 py-2',
      md: 'gap-3 px-4 py-2.5',
      lg: 'gap-3 px-5 py-3',
      xl: 'gap-4 px-6 py-3.5',
    },
    bordered: {
      true: 'border-b border-b-border',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    bordered: true,
  },
});

/**
 * Bottom rule that disappears on the last *visible* row instead of merely the last DOM row.
 * `:has(~ …)` reads "has a following sibling row/item that isn't search-hidden" — this subsumes
 * plain `last:border-b-0` and additionally survives a `DescriptionSearch` filter hiding trailing
 * rows via `data-search-hidden` (see `search.tsx`). `last:border-b-0` stays as a plain fallback.
 */
export const DESCRIPTION_LAST_ROW_SELECTOR =
  'last:border-b-0 [&:not(:has(~:is([data-slot="description-item"],[data-slot="description-row"]):not([data-search-hidden])))]:border-b-0';

export const descriptionItemVariants = cva('', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'flex flex-col',
    },
    bordered: {
      true: `border-b border-b-border ${DESCRIPTION_LAST_ROW_SELECTOR}`,
      false: '',
    },
    /** Set when rendered as a cell inside a `DescriptionRow` — the row wrapper owns the horizontal rule instead. */
    inRow: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [{ inRow: true, bordered: true, className: 'border-b-0' }],
  defaultVariants: {
    orientation: 'horizontal',
    bordered: true,
    inRow: false,
  },
});

export const descriptionItemLabelVariants = cva('font-medium text-text-positive-weak', {
  variants: {
    orientation: {
      horizontal: 'h-full min-w-full tabular-nums',
      vertical: '',
    },
    size: {
      xs: 'text-[11px]',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    },
    bordered: {
      true: 'bg-secondary-muted',
      false: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', bordered: true, className: 'border-r border-r-border' },
    { orientation: 'vertical', bordered: true, className: 'border-b border-b-border' },
    { orientation: 'horizontal', size: 'xs', className: 'py-1.5 pr-1.5 pl-2.5' },
    { orientation: 'horizontal', size: 'sm', className: 'py-2 pr-2 pl-3' },
    { orientation: 'horizontal', size: 'md', className: 'py-3 pr-2 pl-4' },
    { orientation: 'horizontal', size: 'lg', className: 'py-3.5 pr-2.5 pl-5' },
    { orientation: 'horizontal', size: 'xl', className: 'py-4 pr-3 pl-6' },
    { orientation: 'vertical', size: 'xs', className: 'py-1 pr-1.5 pl-2.5' },
    { orientation: 'vertical', size: 'sm', className: 'py-1.5 pr-2 pl-3' },
    { orientation: 'vertical', size: 'md', className: 'py-2 pr-2 pl-4' },
    { orientation: 'vertical', size: 'lg', className: 'py-2.5 pr-2.5 pl-5' },
    { orientation: 'vertical', size: 'xl', className: 'py-3 pr-3 pl-6' },
    /** Borderless mode needs no left inset — the panel edge itself is the alignment reference. */
    { bordered: false, className: 'pl-0' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
    bordered: true,
  },
});

export const descriptionItemValueVariants = cva('text-text-positive', {
  variants: {
    size: {
      xs: 'py-1.5 pr-1.5 pl-2.5 text-[11px]',
      sm: 'py-2 pr-2 pl-3 text-xs',
      md: 'py-3 pr-2 pl-4 text-sm',
      lg: 'py-3.5 pr-2.5 pl-5 text-sm',
      xl: 'py-4 pr-3 pl-6 text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/** Layout-only — surface/border classes for a `DescriptionRow`'s wrapper (the row itself, not its cells). */
export const descriptionRowVariants = cva('', {
  variants: {
    bordered: {
      true: `border-b border-b-border ${DESCRIPTION_LAST_ROW_SELECTOR}`,
      false: '',
    },
  },
  defaultVariants: {
    bordered: true,
  },
});

export type DescriptionVariants = VariantProps<typeof descriptionVariants>;
export type DescriptionHeaderVariants = VariantProps<typeof descriptionHeaderVariants>;
export type DescriptionItemVariants = VariantProps<typeof descriptionItemVariants>;
