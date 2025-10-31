import { cva, type VariantProps } from 'class-variance-authority';

export const buttonLoadingVariant = cva(['absolute z-10 top-0 left-0 inset-0 flex items-center justify-center rounded-sm cursor-default pointer-events-none'], {
  variants: {
    variant: {
      default: '',
      outline: '',
      soft: '',
      subtle: '',
      ghost: '',
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
  },
  compoundVariants: [
    {
      variant: 'default',
      color: 'primary',
      className: 'bg-primary-weak',
    },
    {
      variant: 'default',
      color: 'secondary',
      className: 'bg-secondary-weak',
    },
    { variant: 'default', color: 'muted', className: 'bg-muted-weak' },
    {
      variant: 'default',
      color: 'success',
      className: 'bg-success-weak',
    },
    {
      variant: 'default',
      color: 'info',
      className: 'bg-info-weak',
    },
    {
      variant: 'default',
      color: 'warning',
      className: 'bg-warning-weak',
    },
    {
      variant: 'default',
      color: 'danger',
      className: 'bg-danger-weak',
    },
    {
      variant: 'outline',
      color: 'primary',
      className: 'outline-primary-weak outline-1 bg-card',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: 'outline-secondary-weak outline-1 bg-card',
    },
    {
      variant: 'outline',
      color: 'muted',
      className: 'outline-border-weak outline-1 bg-card',
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'outline-success-weak outline-1 bg-card',
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'outline-info-weak outline-1 bg-card',
    },
    {
      variant: 'outline',
      color: 'warning',
      className: 'outline-warning-weak outline-1 bg-card',
    },
    {
      variant: 'outline',
      color: 'danger',
      className: 'outline-danger-weak outline-1 bg-card',
    },
    {
      variant: 'soft',
      color: 'primary',
      className: 'bg-primary-bg-subtle',
    },
    {
      variant: 'soft',
      color: 'secondary',
      className: 'bg-secondary-bg-subtle',
    },
    {
      variant: 'soft',
      color: 'muted',
      className: 'bg-muted-bg-subtle',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'bg-success-bg-subtle',
    },
    {
      variant: 'soft',
      color: 'info',
      className: 'bg-info-bg-subtle',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'bg-warning-bg-subtle',
    },
    {
      variant: 'soft',
      color: 'danger',
      className: 'bg-danger-bg-subtle',
    },
    {
      variant: 'subtle',
      color: 'primary',
      className: 'bg-primary-bg-subtle outline-primary-weak outline-1',
    },
    {
      variant: 'subtle',
      color: 'secondary',
      className: 'bg-secondary-bg-subtle outline-secondary-weak outline-1',
    },
    {
      variant: 'subtle',
      color: 'muted',
      className: 'bg-muted-bg-subtle outline-border-weak outline-1',
    },
    {
      variant: 'subtle',
      color: 'success',
      className: 'bg-success-bg-subtle outline-success-weak outline-1',
    },
    {
      variant: 'subtle',
      color: 'info',
      className: 'bg-info-bg-subtle outline-info-weak outline-1',
    },
    {
      variant: 'subtle',
      color: 'warning',
      className: 'bg-warning-bg-subtle outline-warning-weak outline-1',
    },
    {
      variant: 'subtle',
      color: 'danger',
      className: 'bg-danger-bg-subtle outline-danger-weak outline-1',
    },
    {
      variant: 'ghost',
      color: 'primary',
      className: 'bg-primary-bg-subtle',
    },
    {
      variant: 'ghost',
      color: 'secondary',
      className: 'bg-secondary-bg-subtle',
    },
    {
      variant: 'ghost',
      color: 'muted',
      className: 'bg-muted-bg-subtle',
    },
    {
      variant: 'ghost',
      color: 'success',
      className: 'bg-success-bg-subtle',
    },
    {
      variant: 'ghost',
      color: 'info',
      className: 'bg-info-bg-subtle',
    },
    {
      variant: 'ghost',
      color: 'warning',
      className: 'bg-warning-bg-subtle',
    },
    {
      variant: 'ghost',
      color: 'danger',
      className: 'bg-danger-bg-subtle',
    },
  ],
});

/**
 * Button variants definition for styling using class-variance-authority
 */
export const buttonVariants = cva(
  [
    'relative cursor-pointer rounded-sm transition-all',
    'whitespace-normal',
    'inline-flex items-center justify-center',
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
    'disabled:pointer-events-none disabled:cursor-default disabled:opacity-60',
    'data-[state=loading]:pointer-events-none data-[state=loading]:cursor-default',
  ],
  {
    variants: {
      variant: {
        default: 'text-text-negative outline-0 outline-offset-0',
        outline: 'bg-card outline-1 -outline-offset-1',
        soft: 'outline-none outline-0',
        subtle: 'outline-1 -outline-offset-1',
        ghost: 'outline-0',
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
        xs: 'gap-1 text-xs leading-4 font-medium px-2 py-1',
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
        color: 'muted',
        className: 'bg-muted hover:opacity-80 focus:outline-offset-2 focus:outline-2 focus:outline-muted',
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
        className: 'outline-secondary text-secondary hover:bg-secondary-muted focus:outline-2 focus:outline-secondary',
      },
      {
        variant: 'outline',
        color: 'muted',
        className: 'outline-muted text-muted hover:bg-muted-muted focus:outline-2 focus:outline-muted',
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
        className: 'outline-warning text-warning hover:bg-warning-muted focus:outline-2 focus:outline-warning-strong',
      },
      {
        variant: 'outline',
        color: 'danger',
        className: 'outline-danger text-danger hover:bg-danger-muted focus:outline-2 focus:outline-danger-strong',
      },
      {
        variant: 'soft',
        color: 'primary',
        className: 'bg-primary-bg-subtle text-primary hover:bg-primary-muted hover:text-primary-strong focus:bg-primary-weak',
      },
      {
        variant: 'soft',
        color: 'secondary',
        className: 'bg-secondary-bg-subtle text-secondary hover:bg-secondary-muted hover:text-secondary-strong focus:bg-secondary-weak',
      },
      {
        variant: 'soft',
        color: 'muted',
        className: 'bg-muted-bg-subtle text-muted hover:bg-muted-muted hover:text-muted-strong focus:bg-muted-weak',
      },
      {
        variant: 'soft',
        color: 'success',
        className: 'bg-success-bg-subtle text-success hover:bg-success-muted hover:text-success-strong focus:bg-success-weak',
      },
      {
        variant: 'soft',
        color: 'info',
        className: 'bg-info-bg-subtle text-info hover:bg-info-muted hover:text-info-strong focus:bg-info-weak',
      },
      {
        variant: 'soft',
        color: 'warning',
        className: 'bg-warning-bg-subtle text-warning hover:bg-warning-muted hover:text-warning-strong focus:bg-warning-weak',
      },
      {
        variant: 'soft',
        color: 'danger',
        className: 'bg-danger-bg-subtle text-danger hover:bg-danger-muted hover:text-danger-strong focus:bg-danger-weak',
      },
      {
        variant: 'subtle',
        color: 'primary',
        className: 'outline-primary bg-primary-bg-subtle text-primary hover:bg-primary-bg-subtle focus:outline-2 focus:outline-primary',
      },
      {
        variant: 'subtle',
        color: 'secondary',
        className: 'outline-secondary bg-secondary-bg-subtle text-secondary hover:bg-secondary-bg-subtle focus:outline-2 focus:outline-secondary',
      },
      {
        variant: 'subtle',
        color: 'muted',
        className: 'outline-border bg-muted-bg-subtle text-muted hover:bg-muted-bg-subtle focus:outline-2 focus:outline-border',
      },
      {
        variant: 'subtle',
        color: 'success',
        className: 'outline-success bg-success-bg-subtle text-success hover:bg-success-bg-subtle focus:outline-2 focus:outline-success',
      },
      {
        variant: 'subtle',
        color: 'info',
        className: 'outline-info bg-info-bg-subtle text-info hover:bg-info-bg-subtle focus:outline-2 focus:outline-info',
      },
      {
        variant: 'subtle',
        color: 'warning',
        className: 'outline-warning bg-warning-bg-subtle text-warning hover:bg-warning-bg-subtle focus:outline-2 focus:outline-warning',
      },
      {
        variant: 'subtle',
        color: 'danger',
        className: 'outline-danger bg-danger-bg-subtle text-danger hover:bg-danger-bg-subtle focus:outline-2 focus:outline-danger',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-primary hover:bg-primary-bg-subtle focus:bg-primary-muted',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'text-text-positive-weak hover:bg-secondary-bg-subtle focus:bg-secondary-muted',
      },
      {
        variant: 'ghost',
        color: 'muted',
        className: 'text-text-positive-weak hover:bg-muted-bg-subtle focus:bg-muted-muted',
      },
      {
        variant: 'ghost',
        color: 'success',
        className: 'text-success hover:bg-success-bg-subtle focus:bg-success-muted',
      },
      {
        variant: 'ghost',
        color: 'info',
        className: 'text-info hover:bg-info-bg-subtle focus:bg-info-muted',
      },
      {
        variant: 'ghost',
        color: 'warning',
        className: 'text-warning hover:bg-warning-bg-subtle focus:bg-warning-muted',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className: 'text-danger hover:bg-danger-bg-subtle focus:bg-danger-muted',
      },
      {
        variant: 'link',
        color: 'primary',
        className: 'text-primary -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-primary',
      },
      {
        variant: 'link',
        color: 'secondary',
        className: 'text-secondary -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-secondary',
      },
      {
        variant: 'link',
        color: 'muted',
        className: 'text-muted -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-muted',
      },
      {
        variant: 'link',
        color: 'success',
        className: 'text-success -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-success',
      },
      {
        variant: 'link',
        color: 'important',
        className: 'text-important -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-important',
      },
      {
        variant: 'link',
        color: 'info',
        className: 'text-info -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-info',
      },
      {
        variant: 'link',
        color: 'warning',
        className: 'text-warning -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-warning',
      },
      {
        variant: 'link',
        color: 'danger',
        className: 'text-danger -outline-offset-2 focus:outline-2 focus:-outline-offset-2 focus:outline-danger',
      },
    ],
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
