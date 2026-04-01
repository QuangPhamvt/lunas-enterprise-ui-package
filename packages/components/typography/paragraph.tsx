'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { cva } from 'class-variance-authority';

type Props = {
  /**
   * The variant of the paragraph. It can be one of the following:
   * - `p`: The default paragraph style. It has a normal font weight and is used for regular text content.
   * - `muted`: The muted paragraph style. It has a lighter color to indicate less emphasis and is often used for secondary information.
   * - `lead`: The lead paragraph style. It is typically used to introduce the content of a section and has a larger font size and stronger text color.
   * - `sm`: The small paragraph style. It is used for less important text and has a smaller font size.
   * - `lg`: The large paragraph style. It is used for more emphasis and visibility, with a larger font size.
   */
  variant?: 'p' | 'muted' | 'lead' | 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
};

export const paragraphVariants = cva('text-wrap text-sm text-start max-w-prose tabular-nums transition-colors not-first:mt-3', {
  variants: {
    variant: {
      // Lead: Nhấn mạnh mạnh mẽ nhất, dùng cho mở bài/highlight
      lead: 'text-text-positive-strong font-semibold tracking-tight',
      lg: 'font-medium text-text-positive-strong',
      p: 'font-normal text-text-positive',
      sm: 'font-light text-text-positive-weak',
      muted: 'text-text-positive-weak font-normal',
    },
  },
  defaultVariants: {
    variant: 'sm',
  },
});

export const Paragraph = ({ variant = 'p', className, children }: Props) => {
  return <p className={cn(paragraphVariants({ variant }), className)}>{children}</p>;
};
