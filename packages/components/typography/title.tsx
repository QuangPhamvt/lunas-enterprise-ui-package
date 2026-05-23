import type { JSX, ReactNode } from 'react';
import { cn } from '@customafk/react-toolkit/utils';
import { cva } from 'class-variance-authority';

const titleVariants = cva('scroll-m-20 text-balance text-text-positive-strong tracking-tight', {
  variants: {
    level: {
      1: 'text-3xl leading-tight font-bold md:text-4xl',
      2: 'text-2xl leading-tight font-semibold md:text-3xl',
      3: 'text-xl leading-snug font-semibold md:text-2xl',
      4: 'text-lg leading-snug font-semibold md:text-xl',
      5: 'text-base leading-normal font-semibold md:text-lg',
      6: 'text-sm leading-normal font-semibold md:text-base',
    },
  },
  defaultVariants: {
    level: 1,
  },
});

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: ReactNode;
};

export const Title = ({ level = 1, className, children }: Props) => {
  const Comp = ('h' + level) as keyof JSX.IntrinsicElements;
  return (
    <Comp data-slot="title" className={cn(titleVariants({ level }), className)}>
      {children}
    </Comp>
  );
};
