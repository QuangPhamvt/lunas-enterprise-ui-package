import { cva, type VariantProps } from 'class-variance-authority';

/**
 * These variants only carry surface/border/padding/typography classes. Flex mechanics
 * (`flex`, `items-*`, `justify-*`, `gap-*`) are expressed as props on the `Flex` component
 * that wraps each region instead — don't re-add them here.
 */

/** Shared size scale across every Description sub-component, matching `ui/badge.tsx`/`ui/button.tsx`'s `xs–xl` scale. */
export type TDescriptionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const descriptionVariants = cva('relative flex flex-col bg-white', {
  variants: {
    surface: {
      /**
       * Standalone card — the default. Self-caps its own max-width against the `@container/description-panel`
       * wrapper it renders inside (see `description.tsx`), fully automatic, no prop needed. Fills 100% of a
       * narrow host (SidePanel, Dialog); past 768px (`3xl`) it keeps growing in steps to make good use of
       * wide desktop screens, but ever more slowly, until it stops for good at 1280px (`7xl`) — comfortably
       * wide without stretching edge-to-edge on an ultra-wide monitor.
       */
      card: 'size-full @3xl/description-panel:max-w-3xl @4xl/description-panel:max-w-4xl @5xl/description-panel:max-w-5xl @6xl/description-panel:max-w-6xl @7xl/description-panel:max-w-7xl max-w-full overflow-y-auto rounded',
      /** Embedded inside another Description's value cell — no shadow/ring, always fills its cell. */
      nested: 'w-full overflow-hidden rounded',
      /** Rendered inside a DescriptionGroup — the group owns the card chrome. */
      grouped: '',
    },
    bordered: {
      true: '',
      false: 'bg-transparent shadow-none',
    },
  },
  compoundVariants: [
    { surface: 'card', bordered: true, className: 'border border-border shadow-card' },
    { surface: 'nested', bordered: true, className: 'border border-border' },
    {
      surface: 'grouped',
      bordered: true,
      /**
       * Can't use `last:border-b-0` here — this div is always the sole child of its own
       * `data-slot="description-panel"` wrapper (see `description.tsx`), so `:last-child`
       * trivially matches every group member, not just the true last one. Test the wrapper's
       * position among the group's real children instead.
       */
      className: 'border-b border-b-border [[data-slot="description-panel"]:last-child>&]:border-b-0',
    },
  ],
  defaultVariants: {
    surface: 'card',
    bordered: true,
  },
});

/**
 * Same self-capping max-width as `descriptionVariants`'s `card` surface — see its comment above.
 * `DescriptionGroup` renders inside its own `@container/description-panel` wrapper too (`group.tsx`).
 */
export const descriptionGroupVariants = cva(
  'relative mx-auto size-full @3xl/description-panel:max-w-3xl @4xl/description-panel:max-w-4xl @5xl/description-panel:max-w-5xl @6xl/description-panel:max-w-6xl @7xl/description-panel:max-w-7xl max-w-full overflow-y-auto rounded bg-white',
  {
    variants: {
      bordered: {
        true: 'border border-border shadow-card ring-1 ring-border-weak',
        false: '',
      },
    },
    defaultVariants: {
      bordered: true,
    },
  }
);

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

/** Caps the header subtitle at 2 lines — anything past that clips with an ellipsis rather than pushing the header taller. */
export const descriptionHeaderDescriptionVariants = cva('line-clamp-2 text-text-positive-weak', {
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

export const descriptionItemVariants = cva('', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'flex flex-col',
    },
    bordered: {
      /**
       * Bottom rule that disappears on the last *visible* row instead of merely the last DOM row.
       * `:has(~ …)` reads "has a following sibling item/row/section/collapsible-section that isn't
       * search-hidden" — this also survives a `DescriptionSearch` filter hiding trailing rows via
       * `data-search-hidden` (see `search.tsx`). Deliberately NOT paired with a plain `last:border-b-0`
       * fallback: `:last-child` only looks at an element's own immediate DOM siblings, and that clause
       * alone already covers this top-level case just as well. It's also explicitly restricted to items
       * that are NOT inside a `DescriptionCollapsibleSection`'s content wrapper — otherwise this rule
       * alone would also (wrongly) strip the border off the last item of a non-last collapsible section,
       * since it has no further item siblings of its own regardless of what follows the section.
       *
       * A second, ancestor-scoped rule handles that collapsible-section case instead: such an item's
       * real DOM siblings are only the other items in that same section, so from the item's own position
       * there is no way to see whether more content follows the section itself. Instead of testing the
       * item, that rule tests the *enclosing* `description-collapsible-section` element for "no
       * following visible sibling" and applies `border-b-0` down to `&` when it is additionally that
       * section's own `:last-child` — i.e. "this item is last in a section that is itself last".
       */
      true: 'border-b border-b-border [&:not(:has(~:is([data-slot="description-item"],[data-slot="description-row"],[data-slot="description-section"],[data-slot="description-collapsible-section"]):not([data-search-hidden]))):not([data-slot="description-collapsible-section-content"]_&)]:border-b-0 [[data-slot="description-collapsible-section"]:not(:has(~:is([data-slot="description-item"],[data-slot="description-row"],[data-slot="description-section"],[data-slot="description-collapsible-section"]):not([data-search-hidden])))_&:last-child]:border-b-0',
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

export const descriptionItemLabelVariants = cva('font-medium text-text-positive', {
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
      true: 'bg-muted-bg-subtle',
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
      /** Same "last *visible* row" rule as `descriptionItemVariants`'s `bordered` — see its comment. */
      true: 'border-b border-b-border [&:not(:has(~:is([data-slot="description-item"],[data-slot="description-row"],[data-slot="description-section"],[data-slot="description-collapsible-section"]):not([data-search-hidden]))):not([data-slot="description-collapsible-section-content"]_&)]:border-b-0 [[data-slot="description-collapsible-section"]:not(:has(~:is([data-slot="description-item"],[data-slot="description-row"],[data-slot="description-section"],[data-slot="description-collapsible-section"]):not([data-search-hidden])))_&:last-child]:border-b-0',
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
