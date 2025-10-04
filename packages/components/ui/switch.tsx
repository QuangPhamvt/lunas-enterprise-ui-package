'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { Switch as SwitchPrimitive } from 'radix-ui';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer',
        'w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none',
        'inline-flex h-5',
        'data-[state=checked]:bg-primary',
        'data-[state=unchecked]:bg-border-muted',
        'focus-visible:border-primary-strong',
        'focus-visible:ring-primary-weak',
        'focus-visible:ring-4',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'data-[state=unchecked]:border-border-weak',
        'data-[state=unchecked]:[&_span]:bg-accent-weak',
        'data-[state=unchecked]:bg-transparent',
        'data-[state=unchecked]:[&_span]:size-4',
        'data-[state=unchecked]:[&_span]:translate-x-0.5',
        'data-[state=unchecked]:[&_span]:shadow-none',
        'data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background',
          'pointer-events-none block size-4 rounded-full ring-0 transition-transform',
          'data-[state=checked]:translate-x-[calc(100%-3px)]',
          'data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
