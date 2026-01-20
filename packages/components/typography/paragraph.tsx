'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { cva } from 'class-variance-authority';

type Props = {
  variant?: 'p' | 'muted' | 'lead' | 'sm' | 'lg';
  className?: string;
  children?: React.ReactNode;
};

const paragraphVariants = cva('', {
  variants: {
    variant: {
      p: 'not-first:mt-6 leading-7',
      sm: 'font-normal text-sm leading-5',
      lg: 'font-semibold text-lg',
      lead: 'text-text-positive-strong text-xl',
      muted: 'text-sm text-text-positive-muted',
    },
    default: {
      variant: 'sm',
    },
  },
});

export const Paragraph = ({ variant = 'p', className, children }: Props) => {
  return <p className={cn('text-wrap text-start text-text-positive tabular-nums', paragraphVariants({ variant }), className)}>{children}</p>;
};
