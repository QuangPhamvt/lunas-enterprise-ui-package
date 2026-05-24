'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@customafk/react-toolkit/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const paragraphVariants = cva('not-first:mt-3 max-w-prose whitespace-pre-line text-pretty text-start leading-7 transition-colors', {
  variants: {
    variant: {
      lead: 'text-base leading-8 font-medium text-text-positive-strong md:text-lg',
      lg: 'text-base leading-8 font-normal text-text-positive md:text-lg',
      p: 'text-sm font-normal text-text-positive md:text-base',
      sm: 'text-sm leading-6 font-normal text-text-positive',
      muted: 'text-sm font-normal text-text-positive-weak md:text-base',
      xs: 'text-xs leading-5 font-normal text-text-positive-weak',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

/**
 * Props for the {@link Paragraph} component.
 *
 * Extends all native `<p>` HTML attributes plus the CVA variant.
 *
 * @property variant - Visual style variant.
 *   - `'lead'` — large, medium-weight introductory text (default size `text-base` / `md:text-lg`)
 *   - `'lg'`  — large normal-weight text
 *   - `'p'`   — standard body text (default)
 *   - `'sm'`  — small normal-weight text with tighter leading
 *   - `'muted'` — subdued colour, standard body size
 *   - `'xs'`  — extra-small text in a muted colour
 */
export type ParagraphProps = ComponentPropsWithoutRef<'p'> & VariantProps<typeof paragraphVariants>;

/**
 * A styled `<p>` element with semantic size and weight variants for body text.
 *
 * @example
 * ```tsx
 * import { Paragraph } from '@customafk/lunas-ui/typography/paragraph';
 *
 * // Default body paragraph
 * <Paragraph>This is body text.</Paragraph>
 *
 * // Lead paragraph with larger, medium-weight text
 * <Paragraph variant="lead">Introducing our new feature.</Paragraph>
 *
 * // Muted helper text
 * <Paragraph variant="muted">Last updated 3 days ago.</Paragraph>
 * ```
 */
export const Paragraph = ({ variant, className, ...props }: ParagraphProps) => {
  return <p data-slot="paragraph" className={cn(paragraphVariants({ variant }), className)} {...props} />;
};
