import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button variants definition for styling using class-variance-authority
 */
export const buttonVariants = cva(
  [
    'relative h-fit shrink-0 cursor-pointer whitespace-normal rounded-md font-medium transition-all',
    'inline-flex items-center justify-center',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'disabled:pointer-events-none disabled:cursor-default disabled:opacity-60',
    'ring-offset-background',
  ],
  {
    variants: {
      variant: {
        default: 'text-text-negative outline-1 outline-offset-0',
        outline: 'bg-card outline-1 -outline-offset-1',
        soft: '',
        subtle: '',
        ghost: 'shadow-none outline-0 hover:shadow-none',
        link: '',
      },
      color: {
        primary: '',
        secondary: '',
        muted: '',
        success: '',
        important: '',
        info: '',
        warning: '',
        danger: '',
      },
      size: {
        default: 'gap-1.5 text-sm leading-5 font-medium px-2.5 py-1.5',
        xs: 'gap-1 text-xs leading-4 font-medium px-2 py-1 has-[>svg]:size-6',
        sm: 'gap-1.5 text-xs leading-4 font-medium px-2.5 py-1.5',
        md: 'gap-1.5 text-sm leading-5 font-medium px-2.5 py-1.5',
        lg: 'gap-1.5 text-sm leading-5 font-medium px-3 py-2',
        xl: 'gap-2 text-base leading-6 font-medium px-3 py-2',
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
        className: 'bg-primary hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-primary',
      },
      {
        variant: 'default',
        color: 'secondary',
        className: 'bg-secondary hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-secondary',
      },
      {
        variant: 'default',
        color: 'success',
        className: 'bg-success hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-success',
      },
      {
        variant: 'default',
        color: 'important',
        className: 'bg-important hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-important',
      },
      {
        variant: 'default',
        color: 'info',
        className: 'bg-info hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-info',
      },
      {
        variant: 'default',
        color: 'warning',
        className: 'bg-warning hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-warning',
      },
      {
        variant: 'default',
        color: 'danger',
        className: 'bg-danger hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-danger',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'outline-primary text-primary hover:bg-primary-bg-subtle focus:outline-2 focus:outline-primary-strong',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: 'outline-secondary text-secondary hover:bg-secondary-muted focus:outline-2 focus:outline-secondary-strong',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'outline-success text-success hover:bg-success-muted focus:outline-2 focus:outline-success-strong',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'outline-info text-info hover:bg-info-muted focus:outline-2 focus:outline-info-strong',
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
        variant: 'outline',
        color: 'muted',
        className: 'bg-background outline-border focus:bg-border-muted focus:outline-border-emphasis focus:ring-border-weak active:bg-border-emphasis',
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
