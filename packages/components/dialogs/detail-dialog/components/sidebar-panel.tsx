'use client';

import { LunasLogo } from '@/components/features/logo';

import {
  DetailDialogSidebarContent,
  DetailDialogSidebarFooter,
  DetailDialogSidebarHeader,
  DetailDialogSidebarMenu,
  DetailDialogSidebarMenuButton,
  DetailDialogSidebarMenuItem,
  Sidebar,
} from './sidebar-core';

export type DetailDialogSidebarPanelProps = {
  /** Title shown in the collapsible sidebar header. Defaults to `'Detail Dialog'`. */
  title?: string;
  /** Title shown in the collapsible sidebar header. Defaults to `'Detail Dialog'`. */
  sidebarTitle?: string;
  /** Arbitrary content rendered inside the sidebar scrollable area. */
  content?: React.ReactNode;
  /** Arbitrary content rendered at the bottom of the sidebar footer. */
  footer?: React.ReactNode;
};

export function DetailDialogSidebarPanel({ title, sidebarTitle, content, footer }: DetailDialogSidebarPanelProps) {
  return (
    <div className="col-start-1 row-span-2 row-start-1">
      <Sidebar>
        <DetailDialogSidebarHeader>
          <DetailDialogSidebarMenu>
            <DetailDialogSidebarMenuItem>
              <DetailDialogSidebarMenuButton size="lg" tabIndex={-1}>
                <LunasLogo variant="icon" iconStyle="solid" size="md" className="size-8 min-h-8 min-w-8" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{sidebarTitle || 'Detail Dialog'}</span>
                  <span className="truncate text-xs">Lunas Enterprise</span>
                </div>
              </DetailDialogSidebarMenuButton>
            </DetailDialogSidebarMenuItem>
          </DetailDialogSidebarMenu>
        </DetailDialogSidebarHeader>
        <DetailDialogSidebarContent>{content}</DetailDialogSidebarContent>
        <DetailDialogSidebarFooter>{footer}</DetailDialogSidebarFooter>
      </Sidebar>
    </div>
  );
}
