import { memo, useMemo } from 'react';

import { LogOutIcon } from 'lucide-react';

import { CMSLayoutHeader } from './components/header';
import {
  CMSLayoutSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  CMSLayoutMain,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  CMSLayoutProvider,
} from './components/sidebar';

const SidebarContentGroupItem: React.FC<{
  id: string;
  label: string;
  icon?: React.ReactNode;
  activeNavItemId?: string;
  onClick?: () => void;
}> = memo(({ id, label, icon, activeNavItemId, onClick }) => {
  return (
    <SidebarMenuItem key={id}>
      <SidebarMenuButton isActive={id === activeNavItemId} onClick={onClick}>
        {icon}
        {label}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
SidebarContentGroupItem.displayName = 'SidebarContentGroupItem';

const SidebarContentGroup: React.FC<
  React.PropsWithChildren<{
    id: string;
    label?: string;
  }>
> = memo(({ id, label, children }) => {
  return (
    <SidebarGroup key={id}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>{children}</SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
});
SidebarContentGroup.displayName = 'SidebarContentGroup';

export const CMSLayout: React.FC<
  React.PropsWithChildren<{
    i18nText?: string;
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
    onChangeToEnLocale?: () => void;
    onChangeToViLocale?: () => void;
  }>
> = ({ i18nText, activeNavItemId, sidebar, children, onChangeToEnLocale, onChangeToViLocale, onLogout }) => {
  const groupcontent = useMemo(() => {
    return sidebar?.groupcontent || [];
  }, [sidebar]);

  return (
    <CMSLayoutProvider>
      <CMSLayoutHeader i18nText={i18nText} onChangeToEnLocale={onChangeToEnLocale} onChangeToViLocale={onChangeToViLocale} />
      <CMSLayoutSidebar variant="inset" collapsible="icon">
        <SidebarContent>
          {groupcontent.map(group => (
            <SidebarContentGroup key={group.id} id={group.id} label={group.label}>
              {group.items.map(groupItem => (
                <SidebarContentGroupItem
                  key={groupItem.id}
                  activeNavItemId={activeNavItemId}
                  id={groupItem.id}
                  label={groupItem.label}
                  icon={groupItem.icon}
                  onClick={groupItem.onClick}
                />
              ))}
            </SidebarContentGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="border border-border" onClick={onLogout}>
                <LogOutIcon className="text-text-positive-weak" />
                Đăng xuất
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="mt-2 border-t border-t-border">
              <p className="pt-2 text-center text-muted-foreground text-xs">Copyright © 2025, Lunas.</p>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </CMSLayoutSidebar>
      <CMSLayoutMain>{children}</CMSLayoutMain>
    </CMSLayoutProvider>
  );
};
