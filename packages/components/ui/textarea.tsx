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
        'flex min-h-24 w-full bg-white px-3 py-2 outline-none',
        'rounded shadow-xs transition-all',
        'resize-y text-sm text-text-positive tabular-nums caret-primary',

        // Border and shadow styles
        'border border-border',

        // Placeholder styling
        'placeholder:text-text-positive-weak',

        // State styles
        'focus:border-primary-strong',
        'focus:ring-3',
        'focus:ring-primary-muted',

        // Read-only state
        'read-only:pointer-events-none read-only:bg-muted-bg-subtle',

        // Invalid state
        'aria-invalid:border-danger',
        'aria-invalid:bg-danger-bg-subtle',
        'aria-invalid:hover:border-danger-strong',
        'aria-invalid:focus-visible:border-danger-intense',
        'aria-invalid:focus-visible:ring-3',
        'aria-invalid:focus-visible:ring-danger-weak',
        'aria-invalid:text-danger-strong',
        'aria-invalid:placeholder:text-danger-weak',

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
