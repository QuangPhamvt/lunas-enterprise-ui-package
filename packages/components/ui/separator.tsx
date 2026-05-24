'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { Separator as SeparatorPrimitive } from 'radix-ui';

/**
 * Thin visual divider built on Radix UI's Separator primitive, supporting horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * import { Separator } from '@customafk/lunas-ui/ui/separator';
 *
 * <div className="space-y-4">
 *   <p>Section one</p>
 *   <Separator />
 *   <p>Section two</p>
 * </div>
 *
 * <div className="flex h-8 items-center gap-4">
 *   <span>Left</span>
 *   <Separator orientation="vertical" />
 *   <span>Right</span>
 * </div>
 * ```
 */
function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border-weak shrink-0',
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
