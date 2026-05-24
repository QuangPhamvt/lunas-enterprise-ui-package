'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

/**
 * Constrains its child to a given aspect ratio using the Radix UI AspectRatio primitive.
 *
 * @example
 * ```tsx
 * import { AspectRatio } from '@customafk/lunas-ui/ui/aspect-ratio';
 *
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/banner.jpg" alt="Banner" className="size-full object-cover" />
 * </AspectRatio>
 * ```
 */
function AspectRatio({ className, ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" className={cn('bg-secondary-muted rounded-md', className)} {...props} />;
}

export { AspectRatio };
