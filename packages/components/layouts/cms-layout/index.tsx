import { useMemo } from 'react';

import { CMSLayoutHeader } from './components/header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './components/sidebar';

export const CMSLayout: React.FC<{
  sidebar?: {
    groupcontent: {
      id: string;
      label?: string;
      items: {
        id: string;
        icon?: React.ReactNode;
        label: string;
      }[];
    }[];
  };
}> = ({ sidebar }) => {
  const groupcontent = useMemo(() => {
    return sidebar?.groupcontent || [];
  }, [sidebar]);
  return (
    <SidebarProvider>
      <CMSLayoutHeader />

      <Sidebar variant="inset" collapsible="icon">
        {/*<SidebarHeader></SidebarHeader>*/}
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
                          <SidebarMenuButton>
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
        <SidebarFooter></SidebarFooter>
      </Sidebar>

      <SidebarInset>Content goes here</SidebarInset>
    </SidebarProvider>
  );
};
