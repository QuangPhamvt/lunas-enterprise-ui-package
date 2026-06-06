'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { useSidebar } from './sidebar';

type MobileBottomNavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type MobileBottomNavProps = {
  items: MobileBottomNavItem[];
  activeNavItemId?: string;
};

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ items, activeNavItemId }) => {
  const { isMobile } = useSidebar();

  if (!isMobile || items.length === 0) return null;

  const visibleItems = items.slice(0, 5);

  return (
    <nav
      data-slot="mobile-bottom-nav"
      className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-stretch border-t border-border bg-card md:hidden"
    >
      {visibleItems.map(item => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          data-active={item.id === activeNavItemId}
          className={cn(
            'flex flex-1 flex-col items-center justify-center gap-0.5',
            'text-muted-foreground transition-colors',
            'data-[active=true]:text-sidebar-primary',
            '[&>svg]:size-5 [&>svg]:shrink-0',
          )}
        >
          {item.icon}
          <span className="max-w-16 truncate text-[10px] leading-3">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
