import { MenuIcon } from 'lucide-react';

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
    </header>
  );
};
