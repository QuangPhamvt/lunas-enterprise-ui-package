import { useMemo } from 'react';

import { PaymentLayoutHeader } from './components/header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './components/sidebar';

export const PaymentLayout: React.FC<
  React.PropsWithChildren<{
    activeNavItemId?: string;
    sidebar?: {
      groupcontent: {
        id: string;
        label?: string;
        items: {
          id: string;
          label: string;
          icon?: React.ReactNode;
          onClick?: () => void;
        }[];
      }[];
    };
    onLogout?: () => void;
  }>
> = ({ activeNavItemId, sidebar, children }) => {
  const groupcontent = useMemo(() => {
    return sidebar?.groupcontent || [];
  }, [sidebar]);
  return (
    <SidebarProvider>
      <PaymentLayoutHeader />

      <Sidebar variant="inset" collapsible="icon">
        <SidebarContent>
          {groupcontent.map(group => {
            return (
              <SidebarGroup key={group.id}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map(item => {
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            isActive={item.id === activeNavItemId}
                            onClick={event => {
                              item.onClick?.();
                              event.preventDefault();
                              event.stopPropagation();
                            }}
                          >
                            {item.icon}
                            {item.label}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {/*<SidebarMenuItem>
              <SidebarMenuButton
                className="border border-border"
                onClick={event => {
                  onLogout?.();
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <LogOutIcon className="text-text-positive-weak" />
                Đăng xuất
              </SidebarMenuButton>
            </SidebarMenuItem>*/}
            <SidebarMenuItem className="mt-2 border-t border-t-border">
              <p className="pt-2 text-center text-muted-foreground text-xs">Copyright © 2025, Lunas.</p>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <section className="relative size-full">
          <div className="absolute inset-0">{children}</div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};
