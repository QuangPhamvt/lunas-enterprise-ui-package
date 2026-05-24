'use client';

import type { ElementType, ReactNode } from 'react';
import { cn } from '@customafk/react-toolkit/utils';
import { cva } from 'class-variance-authority';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export type HeadingProps = {
  level?: HeadingLevel;
  className?: string;
  children?: ReactNode;
  as?: ElementType;
};

export const headingVariants = cva('scroll-m-20 text-start text-balance text-text-positive-strong tracking-tight transition-colors', {
  variants: {
    level: {
      h1: 'text-3xl leading-tight font-bold md:text-4xl',
      h2: 'text-2xl leading-tight font-semibold md:text-3xl',
      h3: 'text-xl leading-snug font-semibold md:text-2xl',
      h4: 'text-lg leading-snug font-semibold md:text-xl',
      h5: 'text-base leading-normal font-semibold md:text-lg',
    },
  },
  defaultVariants: {
    level: 'h2',
  },
});

export const Heading = ({ level = 'h3', className, as, children }: HeadingProps) => {
  const Component = as || level;

  return (
    <Component data-slot="heading" className={cn(headingVariants({ level }), className)}>
      {children}
    </Component>
  );
};
