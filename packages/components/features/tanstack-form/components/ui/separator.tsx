'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Separator as SeparatorPrimitive } from 'radix-ui';

/**
 * Thin decorative divider line that supports horizontal and vertical orientations via Radix UI Separator.
 *
 * @example
 * import { Separator } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <Separator orientation="horizontal" />
 */
function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border-weak',
        'data-[orientation=horizontal]:h-px',
        'data-[orientation=horizontal]:w-full',
        'data-[orientation=vertical]:h-full',
        'data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
