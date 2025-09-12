import { cn } from '@customafk/react-toolkit/utils'

import { BellIcon, CircleQuestionMarkIcon, ShoppingCartIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const MainLayoutHeader = () => {
  return (
    <header
      className={cn(
        'bg-card',
        'h-(--header-height)',
        'absolute inset-x-0 top-0 z-20',
        'flex items-center gap-2 border-b shadow-sm',
        'transition-[width,height] ease-linear',
        'group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)',
        'px-4',
      )}
    >
      <SidebarTrigger />

      <div className="ml-2.5 flex gap-x-2">
        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <ShoppingCartIcon size={20} />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Lunas Store</span>
          <span className="truncate text-xs">Established 2023</span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
          <CircleQuestionMarkIcon />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
          <BellIcon />
        </Button>
      </div>
    </header>
  )
}
