'use client';

import { memo } from 'react';

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

type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type NavGroup = {
  id: string;
  label?: string;
  items: NavItem[];
};

export type CMSLayoutProps = {
  i18nText?: string;
  activeNavItemId?: string;
  sidebar?: { groupcontent: NavGroup[] };
  onLogout?: () => void;
  onChangeToEnLocale?: () => void;
  onChangeToViLocale?: () => void;
  logoutLabel?: string;
  copyright?: string;
};

const SidebarContentGroupItem = memo<NavItem & { activeNavItemId?: string }>(({ id, label, icon, activeNavItemId, onClick }) => (
  <SidebarMenuItem>
    <SidebarMenuButton isActive={id === activeNavItemId} onClick={onClick}>
      {icon}
      {label}
    </SidebarMenuButton>
  </SidebarMenuItem>
));
SidebarContentGroupItem.displayName = 'SidebarContentGroupItem';

const SidebarContentGroup = memo<React.PropsWithChildren<Omit<NavGroup, 'items'>>>(({ id, label, children }) => (
  <SidebarGroup>
    <SidebarGroupLabel>{label}</SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
));
SidebarContentGroup.displayName = 'SidebarContentGroup';

export const CMSLayout: React.FC<React.PropsWithChildren<CMSLayoutProps>> = ({
  i18nText,
  activeNavItemId,
  sidebar,
  children,
  onChangeToEnLocale,
  onChangeToViLocale,
  onLogout,
  logoutLabel = 'Log out',
  copyright = `Copyright © ${new Date().getFullYear()}, Lunas.`,
}) => {
  const groups = sidebar?.groupcontent ?? [];

  return (
    <CMSLayoutProvider>
      <CMSLayoutHeader i18nText={i18nText} onChangeToEnLocale={onChangeToEnLocale} onChangeToViLocale={onChangeToViLocale} />
      <CMSLayoutSidebar variant="inset" collapsible="icon">
        <SidebarContent>
          {groups.map(group => (
            <SidebarContentGroup key={group.id} id={group.id} label={group.label}>
              {group.items.map(item => (
                <SidebarContentGroupItem
                  key={item.id}
                  id={item.id}
                  activeNavItemId={activeNavItemId}
                  label={item.label}
                  icon={item.icon}
                  onClick={item.onClick}
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
                {logoutLabel}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="mt-2 border-t border-t-border">
              <p className="pt-2 text-center text-xs text-text-positive-subtle">{copyright}</p>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </CMSLayoutSidebar>
      <CMSLayoutMain>{children}</CMSLayoutMain>
    </CMSLayoutProvider>
  );
};
