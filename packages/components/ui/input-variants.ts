import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Input component styling variants using class-variance-authority
 */
export const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-transparent text-sm transition-colors',
    'caret-primary outline-none',
    'placeholder:text-text-positive-muted',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-border-weak shadow-input',
          'hover:border-border',
          'focus-visible:ring-4 focus-visible:ring-primary-weak focus-visible:border-primary-strong',
          'aria-invalid:ring-danger-muted aria-invalid:border-danger',
        ],
        filled: [
          'border-transparent bg-secondary-muted/50',
          'hover:bg-secondary-muted',
          'focus-visible:border-primary-strong focus-visible:ring-4 focus-visible:ring-primary-weak',
          'aria-invalid:bg-danger-muted/20 aria-invalid:ring-danger-muted aria-invalid:border-danger',
        ],
        outline: [
          'border-border shadow-none',
          'hover:border-border-strong',
          'focus-visible:ring-4 focus-visible:ring-primary-weak focus-visible:border-primary-strong',
          'aria-invalid:ring-danger-muted aria-invalid:border-danger',
        ],
        ghost: [
          'border-transparent shadow-none',
          'hover:bg-secondary-muted/50',
          'focus-visible:ring-4 focus-visible:ring-primary-weak focus-visible:bg-secondary-muted/50',
          'aria-invalid:ring-danger-muted aria-invalid:bg-danger-muted/10',
        ],
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        default: 'h-9 px-3 py-1.5',
        lg: 'h-10 px-4 py-2',
        xl: 'h-12 px-4 py-2.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>
