'use client'
import React from 'react'
import { cn } from '@customafk/react-toolkit/utils'

function Input({
  className,
  onChange,
  onValueChange,
  ...props
}: React.ComponentProps<'input'> & {
  onValueChange?: (value: string) => void
}) {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    },
    [onChange, onValueChange],
  )
  return (
    <input
      data-slot="input"
      className={cn(
        'flex h-9 w-full px-3 py-1',
        'border-border-weak shadow-input rounded-md border',
        'caret-primary bg-transparent text-sm',
        'transition-[color,border,box-shadow] outline-none',
        'placeholder:text-text-positive-muted',
        'hover:border-border',
        'disabled:pointer-events-none',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'focus-visible:ring-4',
        'focus-visible:ring-primary-weak',
        'focus-visible:border-primary-strong',
        'aria-invalid:ring-danger-muted',
        'aria-invalid:border-danger',
        className,
      )}
      {...props}
      onChange={handleChange}
    />
  )
}

export { Input }
