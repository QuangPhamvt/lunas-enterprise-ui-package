import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  'font-normal w-full rounded-sm caret-primary text-text-positive transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      variant: {
        outline:
          '-outline-offset-1 outline-1 outline-border placeholder:text-text-positive-muted focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak aria-invalid:outline-danger aria-invalid:bg-danger-bg-subtle aria-invalid:focus:outline-danger-strong aria-invalid:focus:ring-4 aria-invalid:ring-danger-weak',
        ghost: '',
        none: '',
        soft: '',
        subtle: '',
      },
      size: {
        xs: 'px-2 py-1 text-xs leading-4',
        sm: 'px-2.5 py-1.5 text-xs leading-4',
        md: 'px-2.5 py-2 text-sm leading-5',
        lg: 'px-3 py-2 text-sm leading-5',
        xl: 'px-3 py-2 text-base leading-6',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
