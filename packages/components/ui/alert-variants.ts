import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Alert component variants for styling using class-variance-authority
 */
export const alertVariants = cva(
  [
    'relative grid w-full items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
    'grid-cols-[0_1fr]',
    'has-[>svg]:grid-cols-[24px_1fr] has-[>svg]:gap-x-3',
    '[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card text-text-positive-strong border-border',
        destructive:
          'bg-danger-bg-subtle text-danger-intense border-danger-border-subtle [&>svg]:text-danger *:data-[slot=alert-description]:text-danger-strong',
        warning:
          'bg-warning-bg-subtle text-warning-intense border-warning-border-subtle [&>svg]:text-warning *:data-[slot=alert-description]:text-warning-strong',
        success:
          'bg-success-bg-subtle text-success-intense border-success-border-subtle [&>svg]:text-success *:data-[slot=alert-description]:text-success-strong',
        info: 'bg-info-bg-subtle text-info-intense border-info-border-subtle [&>svg]:text-info *:data-[slot=alert-description]:text-info-strong',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
