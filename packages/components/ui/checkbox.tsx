'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { CheckIcon } from 'lucide-react';

import { Checkbox as CheckboxPrimitive } from 'radix-ui';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-border',
        'size-4 shrink-0 rounded border shadow-xs transition-shadow outline-none',
        'data-[state=checked]:bg-primary',
        'data-[state=checked]:text-text-negative-strong',
        'data-[state=checked]:border-primary',
        'focus-visible:border-primary-strong',
        'focus-visible:ring-primary-weak',
        'focus-visible:ring-3',
        'aria-invalid:ring-danger-weak',
        'aria-invalid:border-danger',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
