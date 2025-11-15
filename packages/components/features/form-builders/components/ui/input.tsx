'use client';

import { useCallback } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

const inputVariant = cva(
  'w-full rounded font-normal text-text-positive caret-primary transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        outline:
          '-outline-offset-1 outline-1 outline-border placeholder:text-text-positive-muted focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak aria-invalid:bg-danger-bg-subtle aria-invalid:outline-danger aria-invalid:ring-danger-weak aria-invalid:focus:outline-danger-strong aria-invalid:focus:ring-4',
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

type InputVariantProps = VariantProps<typeof inputVariant>;

export const Input = ({
  className,
  variant,
  size,
  onChange,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> & {
  variant?: InputVariantProps['variant'];
  size?: InputVariantProps['size'];
  onValueChange?: (value: string) => void;
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    },
    [onChange, onValueChange]
  );
  return <input data-slot="input" className={inputVariant({ variant, size, className })} {...props} onChange={handleChange} />;
};
