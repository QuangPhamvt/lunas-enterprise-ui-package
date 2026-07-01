'use client';

import { memo } from 'react';

import { LogOutIcon } from 'lucide-react';

import { CMSLayoutHeader, type CMSLayoutUser } from './components/header';
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
  /** Unique identifier for the nav item, used as React key and for active-state comparison. */
  id: string;
  /** Human-readable label rendered inside the sidebar button. */
  label: string;
  /** Optional icon element rendered to the left of the label. */
  icon?: React.ReactNode;
  /** Callback fired when the sidebar button is clicked. Use for simple programmatic navigation. */
  onClick?: () => void;
  /**
   * Renders the button as a custom element using the Radix Slot (asChild) pattern.
   * Return a single element (e.g. a TanStack Router `<Link>`) wrapping the icon + label content.
   *
   * @example
   * ```tsx
   * renderAs: ({ icon, label }) => <Link to="/dashboard">{icon}{label}</Link>
   * ```
   */
  renderAs?: (content: { icon?: React.ReactNode; label: string }) => React.ReactElement;
};

type NavGroup = {
  /** Unique identifier for the group, used as React key. */
  id: string;
  /** Optional section heading rendered above the group's items. */
  label?: string;
  /** Navigation items that belong to this group. */
  items: NavItem[];
};

export type { CMSLayoutUser };

export type CMSLayoutProps = {
  /** Text label used by the header for language-toggle or i18n display. */
  i18nText?: string;
  /** ID of the currently active navigation item; matched against `NavItem.id` to highlight the active button. */
  activeNavItemId?: string;
  /** Sidebar navigation definition; omitting this prop renders an empty sidebar. */
  sidebar?: { groupcontent: NavGroup[] };
  /** Callback fired when the logout button is clicked. */
  onLogout?: () => void;
  /** Callback fired when the user switches the UI locale to English. */
  onChangeToEnLocale?: () => void;
  /** Callback fired when the user switches the UI locale to Vietnamese. */
  onChangeToViLocale?: () => void;
  /**
   * Label displayed on the logout button.
   * @default 'Log out'
   */
  logoutLabel?: string;
  /**
   * Copyright string shown at the bottom of the sidebar.
   * @default `Copyright © <current year>, Lunas.`
   */
  copyright?: string;
  /** Authenticated user shown in the header avatar dropdown. Omit to hide the user menu. */
  user?: CMSLayoutUser;
};

const SidebarContentGroupItem = memo<NavItem & { activeNavItemId?: string }>(({ id, label, icon, activeNavItemId, onClick, renderAs }) => (
  <SidebarMenuItem>
    {renderAs ? (
      <SidebarMenuButton asChild isActive={id === activeNavItemId}>
        {renderAs({ icon, label })}
      </SidebarMenuButton>
    ) : (
      <SidebarMenuButton isActive={id === activeNavItemId} onClick={onClick}>
        {icon}
        {label}
      </SidebarMenuButton>
    )}
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

/**
 * Full-page CMS application shell with a collapsible inset sidebar, header, and main content area.
 *
 * @example
 * ```tsx
 * import { CMSLayout } from '@customafk/lunas-ui/layouts/cms-layout';
 * import { LayoutDashboardIcon } from 'lucide-react';
 *
 * <CMSLayout
 *   activeNavItemId="dashboard"
 *   sidebar={{
 *     groupcontent: [
 *       {
 *         id: 'main',
 *         label: 'Main',
 *         items: [
 *           {
 *             id: 'dashboard',
 *             label: 'Dashboard',
 *             icon: <LayoutDashboardIcon />,
 *             // Option A — TanStack Router Link (asChild/Slot pattern):
 *             renderAs: ({ icon, label }) => <Link to="/">{icon}{label}</Link>,
 *             // Option B — simple click handler:
 *             // onClick: () => router.navigate({ to: '/' }),
 *           },
 *         ],
 *       },
 *     ],
 *   }}
 *   onLogout={() => signOut()}
 * >
 *   <DashboardPage />
 * </CMSLayout>
 * ```
 */
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
  user,
}) => {
  const groups = sidebar?.groupcontent ?? [];

  return (
    <CMSLayoutProvider>
      <CMSLayoutHeader
        i18nText={i18nText}
        onChangeToEnLocale={onChangeToEnLocale}
        onChangeToViLocale={onChangeToViLocale}
        user={user}
        onLogout={onLogout}
        logoutLabel={logoutLabel}
      />
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
                  renderAs={item.renderAs}
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
