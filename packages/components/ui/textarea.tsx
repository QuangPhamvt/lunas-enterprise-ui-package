'use client';
import { useCallback } from 'react';
import { cn } from '@customafk/react-toolkit/utils';

function Textarea({
  className,
  onChange,
  onValueChange,
  ...props
}: React.ComponentProps<'textarea'> & {
  onValueChange?: (value: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    },
    [onChange, onValueChange]
  );
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Base styles
        'flex min-h-24 w-full px-3 py-2',
        'rounded-md border transition-all duration-200',
        'text-text-positive-strong bg-transparent text-sm',
        'field-sizing-content resize-y',

        // Border and shadow styles
        'border-border-weak shadow-input',
        'caret-primary outline-none',

        // Placeholder styling
        'placeholder:text-text-positive-muted',

        // State styles
        'hover:border-border hover:shadow-input',
        'focus:border-primary-strong focus:shadow-none',
        'focus-visible:ring-primary-border-subtle focus-visible:ring-4',

        // Invalid state
        'aria-invalid:border-danger',
        'aria-invalid:ring-danger-muted',
        'aria-invalid:bg-danger-bg-subtle/40',
        'aria-invalid:hover:border-danger-strong',

        // Disabled state
        'disabled:cursor-not-allowed disabled:opacity-50',
        'disabled:pointer-events-none',
        'disabled:border-border-weak/50 disabled:bg-secondary-muted/10',

        // Additional custom styling
        className
      )}
      {...props}
      onChange={handleChange}
    />
  );
}

export { Textarea };
