'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Switch as SwitchPrimitive } from 'radix-ui';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer',
        'w-8 shrink-0 cursor-pointer items-center rounded-full shadow-xs transition-all',
        'inline-flex h-5',
        'focus-visible:border-primary-strong',
        'focus-visible:ring-primary-weak',
        'focus-visible:ring-4',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        '-outline-offset-1 inset-shadow-2xs outline-1',

        'data-[state=checked]:bg-primary',
        'data-[state=checked]:outline-primary-strong',

        'data-[state=unchecked]:bg-muted-weak',
        'data-[state=unchecked]:outline-border',

        'data-[state=unchecked]:[&_span]:size-4',
        'data-[state=unchecked]:[&_span]:translate-x-0.5',
        'data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'block size-4 bg-card shadow-xs',
          'pointer-events-none rounded-full ring-0 transition-transform',
          'data-[state=checked]:translate-x-[calc(100%-3px)]',
          'data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
