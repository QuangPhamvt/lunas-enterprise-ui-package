'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Label as LabelPrimitive } from 'radix-ui';
import { Badge } from './badge';

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
      {children}
      <Badge label="Required" color="danger" size="sm" className="hidden" />
    </LabelPrimitive.Root>
  );
}

export { Label };
