import { cva, type VariantProps } from 'class-variance-authority';

export const buttonLoadingVariant = cva(['pointer-events-none absolute inset-0 top-0 left-0 z-10 flex cursor-default items-center justify-center rounded-sm'], {
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
      className: 'bg-card outline-1 outline-primary-weak',
    },
    {
      variant: 'outline',
      color: 'secondary',
      className: 'bg-card outline-1 outline-secondary-weak',
    },
    {
      variant: 'outline',
      color: 'muted',
      className: 'bg-card outline-1 outline-muted-weak',
    },
    {
      variant: 'outline',
      color: 'success',
      className: 'bg-card outline-1 outline-success-weak',
    },
    {
      variant: 'outline',
      color: 'info',
      className: 'bg-card outline-1 outline-info-weak',
    },
    {
      variant: 'outline',
      color: 'warning',
      className: 'bg-card outline-1 outline-warning-weak',
    },
    {
      variant: 'outline',
      color: 'danger',
      className: 'bg-card outline-1 outline-danger-weak',
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
      className: 'bg-primary-bg-subtle outline-1 outline-primary-weak',
    },
    {
      variant: 'subtle',
      color: 'secondary',
      className: 'bg-secondary-bg-subtle outline-1 outline-secondary-weak',
    },
    {
      variant: 'subtle',
      color: 'muted',
      className: 'bg-muted-bg-subtle outline-1 outline-border-weak',
    },
    {
      variant: 'subtle',
      color: 'success',
      className: 'bg-success-bg-subtle outline-1 outline-success-weak',
    },
    {
      variant: 'subtle',
      color: 'info',
      className: 'bg-info-bg-subtle outline-1 outline-info-weak',
    },
    {
      variant: 'subtle',
      color: 'warning',
      className: 'bg-warning-bg-subtle outline-1 outline-warning-weak',
    },
    {
      variant: 'subtle',
      color: 'danger',
      className: 'bg-danger-bg-subtle outline-1 outline-danger-weak',
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
        outline: '-outline-offset-1 bg-card outline-1',
        soft: 'outline-none outline-0',
        subtle: '-outline-offset-1 outline-1',
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
        default: 'gap-1.5 px-2.5 py-1.5 font-medium text-sm leading-5',
        xs: 'gap-1 px-2 py-1 font-medium text-xs leading-4',
        sm: 'gap-1.5 px-2.5 py-1.5 font-medium text-xs leading-4',
        md: 'gap-1.5 px-2.5 py-1.5 font-medium text-sm leading-5',
        lg: 'gap-1.5 px-3 py-2 font-medium text-sm leading-5',
        xl: 'gap-2 px-3 py-2 font-medium text-base leading-6',
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
        className: 'bg-primary hover:opacity-80 focus:outline-2 focus:outline-primary focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'secondary',
        className: 'bg-secondary hover:opacity-80 focus:outline-2 focus:outline-secondary focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'muted',
        className: 'bg-muted hover:opacity-80 focus:outline-2 focus:outline-muted focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'success',
        className: 'bg-success hover:opacity-80 focus:outline-2 focus:outline-success focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'important',
        className: 'bg-important hover:opacity-80 focus:outline-2 focus:outline-important focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'info',
        className: 'bg-info hover:opacity-80 focus:outline-2 focus:outline-info focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'warning',
        className: 'bg-warning hover:opacity-80 focus:outline-2 focus:outline-warning focus:outline-offset-2',
      },
      {
        variant: 'default',
        color: 'danger',
        className: 'bg-danger hover:opacity-80 focus:outline-2 focus:outline-danger focus:outline-offset-2',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'text-primary outline-primary hover:bg-primary-bg-subtle focus:outline-2 focus:outline-primary-strong',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: 'text-secondary outline-secondary hover:bg-secondary-muted focus:outline-2 focus:outline-secondary',
      },
      {
        variant: 'outline',
        color: 'muted',
        className: 'text-muted outline-muted-weak hover:bg-muted-muted focus:outline-2 focus:outline-muted-weak',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'text-success outline-success hover:bg-success-muted focus:outline-2 focus:outline-success-strong',
      },
      {
        variant: 'outline',
        color: 'info',
        className: 'text-info outline-info hover:bg-info-muted focus:outline-2 focus:outline-info-strong',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'text-warning outline-warning hover:bg-warning-muted focus:outline-2 focus:outline-warning-strong',
      },
      {
        variant: 'outline',
        color: 'danger',
        className: 'text-danger outline-danger hover:bg-danger-muted focus:outline-2 focus:outline-danger-strong',
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
        className: 'bg-primary-bg-subtle text-primary outline-primary hover:bg-primary-bg-subtle focus:outline-2 focus:outline-primary',
      },
      {
        variant: 'subtle',
        color: 'secondary',
        className: 'bg-secondary-bg-subtle text-secondary outline-secondary hover:bg-secondary-bg-subtle focus:outline-2 focus:outline-secondary',
      },
      {
        variant: 'subtle',
        color: 'muted',
        className: 'bg-muted-bg-subtle text-muted outline-border hover:bg-muted-bg-subtle focus:outline-2 focus:outline-border',
      },
      {
        variant: 'subtle',
        color: 'success',
        className: 'bg-success-bg-subtle text-success outline-success hover:bg-success-bg-subtle focus:outline-2 focus:outline-success',
      },
      {
        variant: 'subtle',
        color: 'info',
        className: 'bg-info-bg-subtle text-info outline-info hover:bg-info-bg-subtle focus:outline-2 focus:outline-info',
      },
      {
        variant: 'subtle',
        color: 'warning',
        className: 'bg-warning-bg-subtle text-warning outline-warning hover:bg-warning-bg-subtle focus:outline-2 focus:outline-warning',
      },
      {
        variant: 'subtle',
        color: 'danger',
        className: 'bg-danger-bg-subtle text-danger outline-danger hover:bg-danger-bg-subtle focus:outline-2 focus:outline-danger',
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
        className: '-outline-offset-2 focus:-outline-offset-2 text-primary focus:outline-2 focus:outline-primary',
      },
      {
        variant: 'link',
        color: 'secondary',
        className: '-outline-offset-2 focus:-outline-offset-2 text-secondary focus:outline-2 focus:outline-secondary',
      },
      {
        variant: 'link',
        color: 'muted',
        className: '-outline-offset-2 focus:-outline-offset-2 text-muted focus:outline-2 focus:outline-muted',
      },
      {
        variant: 'link',
        color: 'success',
        className: '-outline-offset-2 focus:-outline-offset-2 text-success focus:outline-2 focus:outline-success',
      },
      {
        variant: 'link',
        color: 'important',
        className: '-outline-offset-2 focus:-outline-offset-2 text-important focus:outline-2 focus:outline-important',
      },
      {
        variant: 'link',
        color: 'info',
        className: '-outline-offset-2 focus:-outline-offset-2 text-info focus:outline-2 focus:outline-info',
      },
      {
        variant: 'link',
        color: 'warning',
        className: '-outline-offset-2 focus:-outline-offset-2 text-warning focus:outline-2 focus:outline-warning',
      },
      {
        variant: 'link',
        color: 'danger',
        className: '-outline-offset-2 focus:-outline-offset-2 text-danger focus:outline-2 focus:outline-danger',
      },
    ],
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
