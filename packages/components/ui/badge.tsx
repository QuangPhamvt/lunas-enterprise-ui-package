'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-hidden focus:ring-ring forced-colors:outline',
  {
    variants: {
      variant: {
        solid: 'shadow-btn',
        soft: '',
        outline: 'bg-transparent border',
      },
      color: {
        primary: '',
        secondary: '',
        muted: '',
        accent: '',
        info: '',
        success: '',
        warning: '',
        danger: '',
      },
      size: {
        xs: 'text-[10px]/3 px-1.5 py-0.5 gap-1',
        sm: 'text-xs px-2 py-0.5 gap-1',
        md: 'text-sm px-2.5 py-0.5 gap-1.5',
        lg: 'text-base px-3 py-1 gap-1.5',
        xl: 'text-lg px-3.5 py-1 gap-1.5',
      },
      pill: {
        true: 'rounded-full',
        false: 'rounded',
      },
    },
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      pill: true,
    },
    compoundVariants: [
      // solid
      { variant: 'solid', color: 'primary', className: 'bg-primary text-primary-foreground' },
      { variant: 'solid', color: 'secondary', className: 'bg-secondary text-secondary-foreground' },
      { variant: 'solid', color: 'muted', className: 'bg-muted text-text-negative' },
      { variant: 'solid', color: 'accent', className: 'bg-accent text-text-negative' },
      { variant: 'solid', color: 'info', className: 'bg-info text-info-foreground' },
      { variant: 'solid', color: 'success', className: 'bg-success text-success-foreground' },
      { variant: 'solid', color: 'warning', className: 'bg-warning text-text-negative' },
      { variant: 'solid', color: 'danger', className: 'bg-danger text-danger-foreground' },
      // soft
      { variant: 'soft', color: 'primary', className: 'bg-primary-bg-subtle text-primary-intense' },
      { variant: 'soft', color: 'secondary', className: 'bg-secondary-bg-subtle text-secondary-intense' },
      { variant: 'soft', color: 'muted', className: 'bg-muted-bg-subtle text-muted-intense' },
      { variant: 'soft', color: 'accent', className: 'bg-accent-bg-subtle text-accent-intense' },
      { variant: 'soft', color: 'info', className: 'bg-info-bg-subtle text-info-intense' },
      { variant: 'soft', color: 'success', className: 'bg-success-bg-subtle text-success-intense' },
      { variant: 'soft', color: 'warning', className: 'bg-warning-bg-subtle text-warning-intense' },
      { variant: 'soft', color: 'danger', className: 'bg-danger-bg-subtle text-danger-intense' },
      // outline
      { variant: 'outline', color: 'primary', className: 'border-primary text-primary' },
      { variant: 'outline', color: 'secondary', className: 'border-secondary text-secondary' },
      { variant: 'outline', color: 'muted', className: 'border-muted text-muted' },
      { variant: 'outline', color: 'accent', className: 'border-accent text-accent' },
      { variant: 'outline', color: 'info', className: 'border-info text-info' },
      { variant: 'outline', color: 'success', className: 'border-success text-success' },
      { variant: 'outline', color: 'warning', className: 'border-warning text-warning' },
      { variant: 'outline', color: 'danger', className: 'border-danger text-danger' },
    ],
  }
);

/**
 * Props for the `Badge` component.
 *
 * @property variant - Visual fill style — `'solid'` (filled, default), `'soft'` (tinted background), or `'outline'` (border only).
 * @property color - Semantic color token — `'primary'` | `'secondary'` | `'muted'` | `'accent'` | `'info'` | `'success'` | `'warning'` | `'danger'`. Defaults to `'primary'`.
 * @property size - Badge size — `'xs'` | `'sm'` | `'md'` (default) | `'lg'` | `'xl'`.
 * @property pill - When `true` (default), renders with fully rounded corners (`rounded-full`); when `false`, uses `rounded-sm`.
 */
export type BadgeProps = VariantProps<typeof badgeVariants> & React.ComponentPropsWithoutRef<'span'>;

/**
 * Inline status label rendered as a `<span>` with CVA-driven variant, color, size, and shape options.
 *
 * @example
 * ```tsx
 * import { Badge } from '@customafk/lunas-ui/ui/badge';
 *
 * <Badge variant="soft" color="success" size="sm">Active</Badge>
 * <Badge variant="outline" color="danger">Overdue</Badge>
 * ```
 */
function Badge({ className, variant, color, size, pill, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, color, pill, size }), className)} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
