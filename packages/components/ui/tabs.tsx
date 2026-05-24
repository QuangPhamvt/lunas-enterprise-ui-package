'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Tabs as TabsPrimitive } from 'radix-ui';

/**
 * Keyboard-accessible tabbed panel built on Radix UI's Tabs primitives, composed from `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`.
 *
 * @example
 * ```tsx
 * import { Tabs, TabsList, TabsTrigger, TabsContent } from '@customafk/lunas-ui/ui/tabs';
 *
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="settings">Settings</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">Overview content here.</TabsContent>
 *   <TabsContent value="settings">Settings content here.</TabsContent>
 * </Tabs>
 * ```
 */
function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

/** Container that holds the row of `TabsTrigger` buttons with a muted background pill style. */
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('inline-flex h-9 w-fit items-center justify-center gap-x-1 rounded-sm bg-muted-muted p-1', className)}
      {...props}
    />
  );
}

/** Individual tab button that activates its associated `TabsContent` panel when clicked. */
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'text-text-positive-weak',
        'inline-flex h-[calc(100%-1px)] min-w-32 flex-1 cursor-pointer items-center justify-center gap-1.5',
        'rounded-sm',
        'whitespace-nowrap border border-transparent px-2 py-1 font-medium text-sm transition',
        // 'hover:bg-muted-muted/60',
        'data-[state=active]:shadow-card',
        'data-[state=active]:bg-background',
        'disabled:opacity-50',
        'disabled:pointer-events-none',
        'focus-visible:border-primary',
        'focus-visible:ring-4',
        'focus-visible:ring-primary-weak',
        'focus-visible:outline-1',
        'focus-visible:outline-primary',
        '[&_svg]:pointer-events-none',
        '[&_svg]:shrink-0',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

/** Panel whose visibility is controlled by the active `TabsTrigger`; each panel must have a matching `value`. */
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
