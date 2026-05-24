'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { Avatar as AvatarPrimitive } from 'radix-ui';

/**
 * Circular user avatar built on Radix UI's Avatar primitives, falling back to initials or an icon when the image fails to load.
 *
 * @example
 * ```tsx
 * import { Avatar, AvatarImage, AvatarFallback } from '@customafk/lunas-ui/ui/avatar';
 *
 * <Avatar>
 *   <AvatarImage src="https://example.com/avatar.jpg" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)} {...props} />;
}

/** The avatar photo; hidden automatically by Radix UI when the image fails to load, revealing `AvatarFallback`. */
function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn('aspect-square size-full', className)} {...props} />;
}

/** Fallback content (e.g. initials) displayed inside the avatar when the image is unavailable or still loading. */
function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
