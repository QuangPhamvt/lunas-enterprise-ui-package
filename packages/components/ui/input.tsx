'use client';

import { useCallback } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

/** CVA variant definitions for the `Input` component — controls sizing and visual style. */
export const inputVariants = cva(
  [
    'w-full rounded font-normal text-text-positive tabular-nums caret-primary transition-all placeholder:text-text-positive-weak',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
    'read-only:pointer-events-none read-only:bg-muted-bg-subtle',
  ],
  {
    variants: {
      variant: {
        outline: [
          'outline-none',
          'border border-border bg-white shadow-xs',
          'hover:border-border-strong',
          'focus:border-primary-strong',
          'focus:ring-3',
          'focus:ring-primary-muted',
          'aria-invalid:border-danger',
          'aria-invalid:bg-danger-bg-subtle',
          'aria-invalid:hover:border-danger-strong',
          'aria-invalid:focus-visible:border-danger-intense',
          'aria-invalid:focus-visible:ring-3',
          'aria-invalid:focus-visible:ring-danger-weak',
          'aria-invalid:text-danger-strong',
          'aria-invalid:placeholder:text-danger-weak',
        ],
        ghost: '',
        none: '',
        soft: '',
        subtle: '',
      },
      size: {
        xs: 'h-7 px-3 text-sm leading-5',
        sm: 'h-8 px-3 text-sm leading-5',
        md: 'h-9 px-3 text-sm leading-5',
        lg: 'h-10 px-3 text-sm leading-5',
        xl: 'h-11 px-3 text-sm leading-5',
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
  return (
    <input
      data-slot="input"
      tabIndex={props.readOnly || props.disabled ? -1 : 0}
      className={inputVariants({ variant, size, className })}
      {...props}
      onChange={handleChange}
    />
  );
}

export { Input };
