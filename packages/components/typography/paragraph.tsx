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

export type ParagraphProps = ComponentPropsWithoutRef<'p'> & VariantProps<typeof paragraphVariants>;

export const Paragraph = ({ variant, className, ...props }: ParagraphProps) => {
  return <p data-slot="paragraph" className={cn(paragraphVariants({ variant }), className)} {...props} />;
};
