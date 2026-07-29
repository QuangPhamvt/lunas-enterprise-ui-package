import { cva, type VariantProps } from 'class-variance-authority';

/** CVA styling for the `Combobox` trigger box (border/background/focus-ring by color and size). */
export const comboboxVariants = cva(
  [
    'relative flex flex-wrap items-center gap-1 rounded border bg-transparent text-sm transition-shadow',
    'outline-hidden',
    'aria-disabled:cursor-not-allowed aria-disabled:bg-muted-muted aria-disabled:text-text-positive-weak',
  ],
  {
    variants: {
      color: {
        normal: [
          'border-border-weak',
          'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary-weak',
          'data-[state=open]:border-primary data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
        ].join(' '),
        danger: [
          'border-danger bg-danger-bg-subtle',
          'focus-visible:border-danger focus-visible:ring-4 focus-visible:ring-danger-weak',
          'data-[state=open]:border-danger data-[state=open]:ring-4 data-[state=open]:ring-danger-weak',
        ].join(' '),
      },
      size: {
        sm: 'min-h-8 text-xs',
        md: 'min-h-9 text-sm',
        lg: 'min-h-10 text-base',
      },
    },
    defaultVariants: { color: 'normal', size: 'md' },
  }
);

export type ComboboxVariantProps = VariantProps<typeof comboboxVariants>;
