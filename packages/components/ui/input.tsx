'use client';

import { useCallback } from 'react';

import { type InputVariantProps, inputVariants } from './input.variants';

function Input({
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
