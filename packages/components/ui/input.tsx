'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useCallback } from 'react';

/** CVA variant definitions for the `Input` component — controls sizing and visual style. */
export const inputVariants = cva(
  [
    'w-full rounded font-normal text-text-positive caret-primary transition-all tabular-nums',
    'placeholder:text-text-positive-muted',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'read-only:pointer-events-none read-only:bg-muted-muted read-only:placeholder:text-text-positive-weak',
  ],
  {
    variants: {
      variant: {
        outline: [
          'outline-1 outline-border -outline-offset-1 bg-transparent shadow-input',
          'focus-visible:outline-primary-strong',
          'focus-visible:ring-4',
          'focus-visible:ring-primary-weak',
          'aria-invalid:outline-danger',
          'aria-invalid:ring-danger-weak',
          'aria-invalid:bg-danger-bg-subtle',
          'aria-invalid:focus-visible:outline-danger-strong',
          'aria-invalid:focus-visible:ring-4',
          'aria-invalid:placeholder:text-text-positive-weak',
        ],
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

/**
 * Styled text input field built on the native `<input>` element with CVA-driven size and variant tokens.
 *
 * @example
 * ```tsx
 * import { Input } from '@customafk/lunas-ui/ui/input';
 *
 * <Input
 *   placeholder="Enter your name"
 *   variant="outline"
 *   size="md"
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
function Input({
  className,
  variant,
  size,
  onChange,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> & {
  /** Visual style of the input border — `'outline'` (default), `'ghost'`, `'none'`, `'soft'`, or `'subtle'`. */
  variant?: InputVariantProps['variant'];
  /** Controls padding and font size — `'xs'` | `'sm'` | `'md'` (default) | `'lg'` | `'xl'`. */
  size?: InputVariantProps['size'];
  /** Convenience callback that receives the raw string value on every change, bypassing the synthetic event. */
  onValueChange?: (value: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    },
    [onChange, onValueChange]
  );
  return <input data-slot="input" className={inputVariants({ variant, size, className })} {...props} onChange={handleChange} />;
}

export { Input };
