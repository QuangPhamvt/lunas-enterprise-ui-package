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
    'transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card text-text-positive-strong border-border',
        destructive: 'text-danger-strong border-danger-muted bg-card [&>svg]:text-danger *:data-[slot=alert-description]:text-danger',
        warning: 'text-warning-strong border-warning-muted bg-card [&>svg]:text-warning *:data-[slot=alert-description]:text-warning',
        success: 'text-success-strong border-success-muted bg-card [&>svg]:text-success *:data-[slot=alert-description]:text-success',
        info: 'text-info-strong border-info-muted bg-card [&>svg]:text-info *:data-[slot=alert-description]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
