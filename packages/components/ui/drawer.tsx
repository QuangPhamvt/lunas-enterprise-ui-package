'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { Drawer as DrawerPrimitive } from 'vaul';

/**
 * Root provider for the Drawer — a vaul-powered slide-in panel supporting top, bottom, left, and right directions.
 *
 * @example
 * ```tsx
 * import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@customafk/lunas-ui/ui/drawer';
 *
 * <Drawer>
 *   <DrawerTrigger>Open Drawer</DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Confirm action</DrawerTitle>
 *       <DrawerDescription>This action cannot be undone.</DrawerDescription>
 *     </DrawerHeader>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

/** Element that opens the Drawer when activated. */
function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

/** Portals Drawer content outside the current DOM tree. */
function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

/** Button that programmatically closes the Drawer. */
function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

/** Dimmed backdrop rendered behind the Drawer panel. */
function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0',
        'data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

/** The main Drawer panel; automatically positions itself based on the direction set on the root. */
function DrawerContent({ className, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content bg-background shadow-card fixed z-50 flex h-auto flex-col',

          'data-[vaul-drawer-direction=top]:inset-x-0',
          'data-[vaul-drawer-direction=top]:top-0',
          'data-[vaul-drawer-direction=top]:mb-24',
          'data-[vaul-drawer-direction=top]:max-h-[80vh]',
          'data-[vaul-drawer-direction=top]:rounded-b-lg',

          'data-[vaul-drawer-direction=bottom]:inset-x-0',
          'data-[vaul-drawer-direction=bottom]:bottom-0',
          'data-[vaul-drawer-direction=bottom]:mt-24',
          'data-[vaul-drawer-direction=bottom]:max-h-[80vh]',
          'data-[vaul-drawer-direction=bottom]:rounded-t-lg',

          'data-[vaul-drawer-direction=right]:inset-y-0',
          'data-[vaul-drawer-direction=right]:right-0',
          'data-[vaul-drawer-direction=right]:w-3/4',
          'data-[vaul-drawer-direction=right]:sm:max-w-sm',

          'data-[vaul-drawer-direction=left]:inset-y-0',
          'data-[vaul-drawer-direction=left]:left-0',
          'data-[vaul-drawer-direction=left]:w-3/4',
          'data-[vaul-drawer-direction=left]:sm:max-w-sm',
          className
        )}
        {...props}
      >
        <div className="bg-border-weak mx-auto mt-4 hidden h-2 w-25 shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/** Padded header section at the top of the Drawer for the title and description. */
function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-0.5 p-4',
        'md:gap-1.5 md:text-left',
        'group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center',
        'group-data-[vaul-drawer-direction=top]/drawer-content:text-center',
        className
      )}
      {...props}
    />
  );
}

/** Footer section pinned to the bottom of the Drawer, typically used for action buttons. */
function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />;
}

/** Accessible title element for the Drawer, announced by screen readers on open. */
function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return <DrawerPrimitive.Title data-slot="drawer-title" className={cn('text-text-positive font-semibold', className)} {...props} />;
}

/** Accessible description element for the Drawer, providing supplemental context to the title. */
function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return <DrawerPrimitive.Description data-slot="drawer-description" className={cn('text-text-positive-weak text-sm', className)} {...props} />;
}

export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger };
