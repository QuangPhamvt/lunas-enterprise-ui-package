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

/**
 * Full-page payment application shell with a collapsible inset sidebar and a fixed header.
 *
 * @example
 * ```tsx
 * import { PaymentLayout } from '@customafk/lunas-ui/layouts/payment-layout';
 * import { CreditCardIcon } from 'lucide-react';
 *
 * <PaymentLayout
 *   activeNavItemId="transactions"
 *   sidebar={{
 *     groupcontent: [
 *       {
 *         id: 'payment',
 *         label: 'Payment',
 *         items: [
 *           { id: 'transactions', label: 'Transactions', icon: <CreditCardIcon />, onClick: () => router.push('/transactions') },
 *         ],
 *       },
 *     ],
 *   }}
 * >
 *   <TransactionsPage />
 * </PaymentLayout>
 * ```
 */
export const PaymentLayout: React.FC<
  React.PropsWithChildren<{
    /** ID of the currently active navigation item; matched against each item's `id` to apply the active style. */
    activeNavItemId?: string;
    /** Sidebar navigation definition; omitting this prop renders an empty sidebar. */
    sidebar?: {
      groupcontent: {
        /** Unique identifier for the group, used as React key. */
        id: string;
        /** Optional section heading rendered above the group's items. */
        label?: string;
        items: {
          /** Unique identifier for the nav item, used as React key and for active-state comparison. */
          id: string;
          /** Human-readable label rendered inside the sidebar button. */
          label: string;
          /** Optional icon element rendered to the left of the label. */
          icon?: React.ReactNode;
          /** Callback fired when the sidebar button is clicked. */
          onClick?: () => void;
        }[];
      }[];
    };
    /** Reserved for a future logout action (currently unused in the rendered output). */
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
