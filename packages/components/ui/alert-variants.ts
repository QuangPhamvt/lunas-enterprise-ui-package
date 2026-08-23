import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Alert component variants for styling using class-variance-authority
 */
export const alertVariants = cva(
  [
    'relative grid w-full items-start gap-y-0.5 rounded border py-3 pr-5 pl-4 text-sm',
    'grid-cols-[0_1fr]',
    'has-[>svg]:grid-cols-[24px_1fr] has-[>svg]:gap-x-3',
    '[&>svg]:size-6 [&>svg]:text-current',
    'transition-colors duration-150',
  ],
  {
    variants: {
      variant: {
        default: 'border-border bg-muted-bg-subtle text-text-positive-strong *:data-[slot=alert-description]:text-text-positive-weak',
        destructive: 'border-danger-border-subtle bg-danger-bg-subtle text-danger-strong *:data-[slot=alert-description]:text-danger [&>svg]:text-danger',
        warning:
          'border-warning-border-subtle bg-warning-bg-subtle text-warning-intense *:data-[slot=alert-description]:text-warning-strong [&>svg]:text-warning',
        success:
          'border-success-border-subtle bg-success-bg-subtle text-success-intense *:data-[slot=alert-description]:text-success-strong [&>svg]:text-success',
        info: 'border-info-border-subtle bg-info-bg-subtle text-info-intense *:data-[slot=alert-description]:text-info-strong [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
