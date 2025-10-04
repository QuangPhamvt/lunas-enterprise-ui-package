'use client';
import { cn } from '@customafk/react-toolkit/utils';

import { Tabs as TabsPrimitive } from 'radix-ui';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('bg-muted-muted inline-flex h-9 w-fit items-center justify-center rounded-full p-1', className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'text-text-positive-weak',
        'inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5',
        'rounded-full',
        'border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition',
        'hover:bg-muted-weak',
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

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
