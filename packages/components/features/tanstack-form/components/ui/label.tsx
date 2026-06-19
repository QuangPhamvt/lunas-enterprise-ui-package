'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Label as LabelPrimitive } from 'radix-ui';

/**
 * Form field label that automatically renders a "Required" badge when the field is marked aria-required.
 *
 * @example
 * import { Label } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <Label htmlFor="email">Email address</Label>
 */
function Label({ className, children, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'text-text-positive',
        'flex w-full items-center justify-between',
        'select-none font-medium text-sm/6 leading-none',
        'group-data-[disabled=true]:pointer-events-none',
        'group-data-[disabled=true]:opacity-50',
        'peer-disabled:cursor-not-allowed',
        'peer-disabled:opacity-50',
        'aria-required:*:data-[slot=required-indicator]:inline-block',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1">{children}</span>
      <span
        data-slot="required-indicator"
        className="hidden shrink-0 rounded-lg bg-danger-strong px-1.5 py-1 font-semibold text-[11px] leading-none text-white"
      >
        Bắt buộc
      </span>
    </LabelPrimitive.Root>
  );
}

export { Label };
