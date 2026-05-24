'use client';
import { useCallback } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

/**
 * Styled multi-line text area built on the native `<textarea>` element with resize, focus, and validation state styles.
 *
 * @example
 * ```tsx
 * import { Textarea } from '@customafk/lunas-ui/ui/textarea';
 *
 * <Textarea
 *   placeholder="Write a description…"
 *   rows={4}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
function Textarea({
  className,
  onChange,
  onValueChange,
  ...props
}: React.ComponentProps<'textarea'> & {
  /** Convenience callback that receives the raw string value on every change, bypassing the synthetic event. */
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
        'flex min-h-24 w-full bg-transparent px-3 py-2',
        'rounded shadow-input transition-[color,box-shadow] duration-200',
        'resize-y text-sm text-text-positive-weak tabular-nums caret-primary',

        // Border and shadow styles
        '-outline-offset-1 outline-1 outline-border',

        // Placeholder styling
        'placeholder:text-text-positive-muted',

        // State styles
        'focus:text-text-positive focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',

        // Read-only state
        'read-only:pointer-events-none read-only:bg-muted-muted read-only:placeholder:text-text-positive-weak',

        // Invalid state
        'aria-invalid:bg-danger-bg-subtle',
        'aria-invalid:outline-danger',
        'aria-invalid:ring-danger-weak',
        'aria-invalid:focus:outline-danger-strong',
        'aria-invalid:focus:ring-4',
        'aria-invalid:placeholder:text-text-positive-weak',

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
