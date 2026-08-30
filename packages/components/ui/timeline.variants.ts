import { cva, type VariantProps } from 'class-variance-authority';

export const timelineDotVariants = cva('relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors [&_svg]:size-2.5', {
  variants: {
    status: {
      completed: '',
      current: 'ring-4 motion-safe:animate-pulse',
      upcoming: 'border-2 bg-background!',
      error: '',
    },
    size: {
      sm: 'size-2.5',
      md: 'size-3',
      lg: 'size-3.5',
    },
  },
  defaultVariants: { status: 'upcoming', size: 'md' },
});

export type TimelineDotVariants = VariantProps<typeof timelineDotVariants>;
