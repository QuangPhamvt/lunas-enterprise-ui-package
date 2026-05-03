import { EarthIcon, MenuIcon, ShoppingCartIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { useSidebar } from './sidebar';

export const CMSLayoutHeader: React.FC<{
  i18nText?: string;
  onChangeToEnLocale?: () => void;
  onChangeToViLocale?: () => void;
}> = ({ i18nText, onChangeToEnLocale, onChangeToViLocale }) => {
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
        className="size-10 rounded-full transition-all hover:text-text-positive"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          toggleSidebar();
        }}
      >
        <MenuIcon className="size-6!" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex flex-1 gap-x-2 sm:ml-2.5">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <ShoppingCartIcon size={20} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Lunas Enterprise</span>
          <span className="truncate text-xs">Established 2025</span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            color="muted"
            className="gap-x-1 rounded-full transition-all hover:text-text-positive"
          >
            <EarthIcon className="size-6!" />
            {i18nText}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={event => {
                onChangeToEnLocale?.();
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              EN - English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={event => {
                onChangeToViLocale?.();
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              VI - Vietnamese
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
