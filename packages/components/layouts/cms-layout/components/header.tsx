import { MenuIcon, ShoppingCartIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

import { useSidebar } from './sidebar';

export const CMSLayoutHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header
      data-slot="cms-layout-header"
      className={cn(
        'bg-card',
        'h-(--header-height)',
        'sm:h-[calc(var(--header-height)+0.5rem)] sm:px-4 sm:pr-6',
        'absolute inset-x-0 top-0 z-20 gap-2 px-2 pr-4.5',
        'flex items-center shadow-nav',
        'transition-[width,height] ease-linear'
      )}
    >
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        color="muted"
        size="icon"
        className="size-10 rounded-full"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          toggleSidebar();
        }}
      >
        <MenuIcon className="size-6!" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex gap-x-2 sm:ml-2.5">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <ShoppingCartIcon size={20} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Lunas Enterprise</span>
          <span className="truncate text-xs">Established 2025</span>
        </div>
      </div>
    </header>
  );
};
