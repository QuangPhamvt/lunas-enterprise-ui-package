import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button variants definition for styling using class-variance-authority
 */
export const buttonVariants = cva(
  [
    'relative shrink-0 cursor-pointer rounded-md font-medium whitespace-normal transition-all h-fit',
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
        default: '-outline-offset-1 outline-1 text-text-negative-strong',
        outline:
          '-outline-offset-1 outline-1 text-text-positive hover:text-text-positive-strong focus:text-text-positive-strong active:text-text-positive-strong',
        ghost: 'outline-0 shadow-none hover:shadow-none',
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
        sm: 'px-2 py-1.5 gap-1 text-xs focus:ring-4 has-[>svg]:px-2.5',
        default: 'px-2.5 py-2 gap-1 text-sm focus:ring-4 has-[>svg]:px-3',
        lg: 'px-3 py-2.5 gap-1 text-base focus:ring-6 has-[>svg]:px-4',
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
        className: 'outline-primary-strong bg-primary focus:ring-primary-weak focus:outline-primary-intense focus:bg-primary-strong active:bg-primary-strong',
      },
      {
        variant: 'default',
        color: 'secondary',
        className:
          'outline-secondary-strong bg-secondary focus:ring-secondary-weak focus:outline-secondary-intense focus:bg-secondary-strong active:bg-secondary-strong',
      },
      {
        variant: 'default',
        color: 'success',
        className: 'outline-success-strong bg-success focus:ring-success-weak focus:outline-success-intense focus:bg-success-strong active:bg-success-strong',
      },
      {
        variant: 'default',
        color: 'important',
        className:
          'outline-important-strong bg-important focus:ring-important-weak focus:outline-important-intense focus:bg-important-strong active:bg-important-strong',
      },
      {
        variant: 'default',
        color: 'info',
        className: 'outline-info-strong bg-info focus:ring-info-weak focus:outline-info-intense focus:bg-info-strong active:bg-info-strong',
      },
      {
        variant: 'default',
        color: 'warning',
        className: 'outline-warning-strong bg-warning focus:ring-warning-weak focus:outline-warning-intense focus:bg-warning-strong active:bg-warning-strong',
      },
      {
        variant: 'default',
        color: 'danger',
        className: 'outline-danger-strong bg-danger focus:ring-danger-weak focus:outline-danger-intense focus:bg-danger-strong active:bg-danger-strong',
      },
      {
        variant: 'outline',
        color: 'muted',
        className: 'outline-border bg-background focus:ring-border-weak focus:outline-border-strong focus:bg-border-muted active:bg-border-muted',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'outline-primary-strong bg-background focus:ring-primary-weak focus:outline-primary-intense focus:bg-primary-muted active:bg-primary-muted',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className:
          'outline-secondary-strong bg-background focus:ring-secondary-weak focus:outline-secondary-intense focus:bg-secondary-muted active:bg-secondary-muted',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'outline-success-strong bg-background focus:ring-success-weak focus:outline-success-intense focus:bg-success-muted active:bg-success-muted',
      },
      {
        variant: 'outline',
        color: 'important',
        className:
          'outline-important-strong bg-background focus:ring-important-weak focus:outline-important-intense focus:bg-important-muted active:bg-important-muted',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'outline-info-strong bg-background focus:ring-info-weak focus:outline-info-intense focus:bg-info-muted active:bg-info-muted',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'outline-warning-strong bg-background focus:ring-warning-weak focus:outline-warning-intense focus:bg-warning-muted active:bg-warning-muted',
      },
      {
        variant: 'outline',
        color: 'danger',
        className: 'outline-danger-strong bg-background focus:ring-danger-weak focus:outline-danger-intense focus:bg-danger-muted active:bg-danger-muted',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-primary-strong hover:bg-primary-muted focus:ring-primary-weak focus:bg-primary/10 active:bg-primary/10',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'text-secondary-strong hover:bg-secondary-muted focus:ring-secondary-weak focus:bg-secondary/10 active:bg-secondary/10',
      },
      {
        variant: 'ghost',
        color: 'muted',
        className: 'text-text-positive hover:bg-border-muted focus:ring-border-weak focus:bg-border/10 active:bg-border/10',
      },
      {
        variant: 'ghost',
        color: 'success',
        className: 'text-success-strong hover:bg-success-muted focus:ring-success-weak focus:bg-success/10 active:bg-success/10',
      },
      {
        variant: 'ghost',
        color: 'important',
        className: 'text-important-strong hover:bg-important-muted focus:ring-important-weak focus:bg-important/10 active:bg-important/10',
      },
      {
        variant: 'ghost',
        color: 'info',
        className: 'text-info-strong hover:bg-info-muted focus:ring-info-weak focus:bg-info/10 active:bg-info/10',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className: 'text-warning-strong hover:bg-warning-muted focus:ring-warning-weak focus:bg-warning/10 active:bg-warning/10',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-danger-strong hover:bg-danger-muted focus:ring-danger-weak focus:bg-danger/10 active:bg-danger/10',
      },
    ],
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
