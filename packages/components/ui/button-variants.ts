import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button variants definition for styling using class-variance-authority
 */
export const buttonVariants = cva(
  [
    'relative h-fit shrink-0 cursor-pointer whitespace-normal rounded-md font-medium transition-all',
    'hover:shadow-md',
    'inline-flex items-center justify-center',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'disabled:pointer-events-none',
    'disabled:cursor-default disabled:opacity-50',
    'focus:outline-none focus-visible:ring-2',
    'ring-offset-background',
  ],
  {
    variants: {
      variant: {
        default: '-outline-offset-1 text-text-negative-strong outline-1',
        outline:
          '-outline-offset-1 text-text-positive outline-1 hover:text-text-positive-strong focus:text-text-positive-strong active:text-text-positive-strong',
        ghost: 'shadow-none outline-0 hover:shadow-none',
        link: '',
      },
      color: {
        primary: 'hover:shadow-primary-weak',
        secondary: 'hover:shadow-secondary-weak',
        muted: 'hover:shadow-border-weak',
        success: 'hover:shadow-success-weak',
        important: 'hover:shadow-important-weak',
        info: 'hover:shadow-info-weak',
        warning: 'hover:shadow-warning-weak',
        danger: 'hover:shadow-danger-weak',
      },
      size: {
        sm: 'gap-1 px-2 py-1.5 text-xs focus:ring-4 has-[>svg]:px-2.5',
        default: 'gap-1 px-2.5 py-2 text-sm focus:ring-4 has-[>svg]:px-3',
        lg: 'gap-1 px-3 py-2.5 text-base focus:ring-6 has-[>svg]:px-4',
        icon: 'size-8 focus:ring-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'default',
        color: 'primary',
        className:
          'bg-primary outline-primary-strong focus:bg-primary-strong focus:outline-primary-intense focus:ring-primary-border-subtle active:bg-primary-strong',
      },
      {
        variant: 'default',
        color: 'secondary',
        className:
          'bg-secondary outline-secondary-strong focus:bg-secondary-strong focus:outline-secondary-intense focus:ring-secondary-border-subtle active:bg-secondary-strong',
      },
      {
        variant: 'default',
        color: 'success',
        className: 'bg-success outline-success-strong focus:bg-success-strong focus:outline-success-intense focus:ring-success-weak active:bg-success-strong',
      },
      {
        variant: 'default',
        color: 'important',
        className:
          'bg-important outline-important-strong focus:bg-important-strong focus:outline-important-intense focus:ring-important-weak active:bg-important-strong',
      },
      {
        variant: 'default',
        color: 'info',
        className: 'bg-info outline-info-strong focus:bg-info-strong focus:outline-info-intense focus:ring-info-weak active:bg-info-strong',
      },
      {
        variant: 'default',
        color: 'warning',
        className: 'bg-warning outline-warning-strong focus:bg-warning-strong focus:outline-warning-intense focus:ring-warning-weak active:bg-warning-strong',
      },
      {
        variant: 'default',
        color: 'danger',
        className: 'bg-danger outline-danger-strong focus:bg-danger-strong focus:outline-danger-intense focus:ring-danger-weak active:bg-danger-strong',
      },
      {
        variant: 'outline',
        color: 'muted',
        className: 'bg-background outline-border focus:bg-border-muted focus:outline-border-emphasis focus:ring-border-weak active:bg-border-emphasis',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'bg-background outline-primary-strong focus:bg-primary-muted focus:outline-primary-intense focus:ring-primary-weak active:bg-primary-muted',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className:
          'bg-background outline-secondary-strong focus:bg-secondary-muted focus:outline-secondary-intense focus:ring-secondary-weak active:bg-secondary-muted',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'bg-background outline-success-strong focus:bg-success-muted focus:outline-success-intense focus:ring-success-weak active:bg-success-muted',
      },
      {
        variant: 'outline',
        color: 'important',
        className:
          'bg-background outline-important-strong focus:bg-important-muted focus:outline-important-intense focus:ring-important-weak active:bg-important-muted',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'bg-background outline-info-strong focus:bg-info-muted focus:outline-info-intense focus:ring-info-weak active:bg-info-muted',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'bg-background outline-warning-strong focus:bg-warning-muted focus:outline-warning-intense focus:ring-warning-weak active:bg-warning-muted',
      },
      {
        variant: 'outline',
        color: 'danger',
        className: 'bg-background outline-danger-strong focus:bg-danger-muted focus:outline-danger-intense focus:ring-danger-weak active:bg-danger-muted',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-primary-strong hover:bg-primary-muted focus:bg-primary/10 focus:ring-primary-weak active:bg-primary/10',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'text-secondary-strong hover:bg-secondary-muted focus:bg-secondary/10 focus:ring-secondary-weak active:bg-secondary/10',
      },
      {
        variant: 'ghost',
        color: 'muted',
        className: 'text-text-positive hover:bg-border-muted focus:bg-border/10 focus:ring-border-weak active:bg-border/10',
      },
      {
        variant: 'ghost',
        color: 'success',
        className: 'text-success-strong hover:bg-success-muted focus:bg-success/10 focus:ring-success-weak active:bg-success/10',
      },
      {
        variant: 'ghost',
        color: 'important',
        className: 'text-important-strong hover:bg-important-muted focus:bg-important/10 focus:ring-important-weak active:bg-important/10',
      },
      {
        variant: 'ghost',
        color: 'info',
        className: 'text-info-strong hover:bg-info-muted focus:bg-info/10 focus:ring-info-weak active:bg-info/10',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className: 'text-warning-strong hover:bg-warning-muted focus:bg-warning/10 focus:ring-warning-weak active:bg-warning/10',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-danger-strong hover:bg-danger-muted focus:bg-danger/10 focus:ring-danger-weak active:bg-danger/10',
      },
    ],
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
