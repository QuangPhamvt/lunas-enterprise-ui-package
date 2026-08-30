'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 forced-colors:outline',
  {
    variants: {
      variant: {
        solid: 'shadow-btn',
        soft: '',
        outline: 'border bg-transparent',
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
        xs: 'gap-1 px-1.5 py-0.5 text-[10px]/3',
        sm: 'gap-1 px-2 py-1 text-xs',
        md: 'gap-1.5 px-2.5 py-0.5 text-sm',
        lg: 'gap-1.5 px-3 py-1 text-base',
        xl: 'gap-1.5 px-3.5 py-1 text-lg',
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

/**
 * Dot indicator fill color, keyed by the same `color` union as `badgeVariants`, so the palette
 * has a single home instead of being re-declared by each consumer that pairs a status dot with a Badge.
 */

// biome-ignore lint/style/useComponentExportOnlyModules: more
export const badgeDotVariants = cva('inline-block size-1.5 shrink-0 rounded-full', {
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      accent: 'bg-accent',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
      white: 'bg-white',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

// biome-ignore lint/style/useComponentExportOnlyModules: more
export { Badge, badgeVariants };
