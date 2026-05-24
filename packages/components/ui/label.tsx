'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Label as LabelPrimitive } from 'radix-ui';

/**
 * Accessible form label built on Radix UI's `Label.Root`, with styles for disabled and peer-disabled states.
 *
 * @example
 * ```tsx
 * import { Label } from '@customafk/lunas-ui/ui/label';
 * import { Input } from '@customafk/lunas-ui/ui/input';
 *
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" placeholder="you@example.com" />
 * ```
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-text-positive',
        'flex items-center gap-2',
        'select-none font-medium text-sm/6 leading-none',
        'group-data-[disabled=true]:pointer-events-none',
        'group-data-[disabled=true]:opacity-50',
        'peer-disabled:cursor-not-allowed',
        'peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Label };
