'use client';

import { useCallback } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

export const Input = ({
  className,
  onChange,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> & {
  onValueChange?: (value: string) => void;
}) => {
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
      className={cn(
        'w-full min-w-0 rounded bg-transparent shadow-input transition-[color,box-shadow]',
        '-outline-offset-1 outline-1 outline-border',
        'px-2.5 py-2 text-sm text-text-positive tabular-nums leading-5',
        'placeholder:text-text-positive-muted',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-50',
        'read-only:pointer-events-none read-only:bg-muted-muted read-only:placeholder:text-text-positive-weak',
        'focus-visible:outline-primary-strong focus-visible:ring-4 focus-visible:ring-primary-weak',
        'aria-invalid:bg-danger-bg-subtle aria-invalid:outline-danger aria-invalid:ring-danger-weak aria-invalid:focus:outline-danger-strong aria-invalid:focus:ring-4 aria-invalid:placeholder:text-text-positive-weak',
        className
      )}
      {...props}
      onChange={handleChange}
    />
  );
};
