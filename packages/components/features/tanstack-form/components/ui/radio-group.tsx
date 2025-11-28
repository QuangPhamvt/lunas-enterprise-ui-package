'use client';

import { CircleIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />;
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full border border-border shadow-xs outline-none transition-all',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'focus:border-border focus:ring-4 focus:ring-primary-weak',
        'aria-invalid:border-danger-strong aria-invalid:ring-danger-weak',
        'aria-readonly:pointer-events-none',
        'aria-readonly:[&_div]:bg-muted',
        'aria-readonly:[&_svg]:fill-muted-weak',
        'aria-readonly:[&_svg]:text-muted-weak',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex items-center justify-center bg-primary">
        <div className="absolute size-4 rounded-full bg-primary" />
        <CircleIcon className="-translate-1/2 absolute top-1/2 left-1/2 size-2 fill-text-negative-strong text-text-negative" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
