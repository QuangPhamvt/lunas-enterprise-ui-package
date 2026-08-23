import { cva, type VariantProps } from 'class-variance-authority';

/** Clamp/wrap + interactive-affordance classes for {@link ClampedText} (see `./clamped-text.tsx`). */
export const clampedTextVariants = cva('line-clamp-2 text-start', {
  variants: {
    wrap: {
      /** Preserves line breaks and force-breaks long unbroken runs (URLs, IDs) — for free-form text. */
      break: 'whitespace-pre-line break-all',
      /** Single-style ellipsis truncation — for short values like names. */
      truncate: 'w-full truncate',
    },
    interactive: {
      true: 'cursor-pointer transition-colors hover:text-text-positive',
      false: '',
    },
  },
  defaultVariants: {
    wrap: 'break',
    interactive: false,
  },
});

export type ClampedTextVariants = VariantProps<typeof clampedTextVariants>;
