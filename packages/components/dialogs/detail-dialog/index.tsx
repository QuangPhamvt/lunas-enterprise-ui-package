'use client';

import { DetailDialogContent } from './components/content';
import { DetailDialogHeader } from './components/header';
import { DetailDialogProvider } from './components/provider';
import { DetailDialogSidebarPanel, type DetailDialogSidebarPanelProps } from './components/sidebar-panel';
import { DetailDialogWrapper } from './components/wrapper';

export type DetailDialogProps = {
  /** Controls whether the dialog is open. */
  open?: boolean;
  /** When `true`, replaces the main content area with a centered loading spinner. */
  isLoading?: boolean;
  /** Primary title displayed in the dialog header. */
  title?: string;
  /** ISO string, `Date` object, or Unix timestamp shown as a formatted creation date below the title. */
  createdAt?: string | Date | number | null;
  /** Optional sidebar configuration — title, body content, and footer content. */
  sidebar?: DetailDialogSidebarPanelProps;
  /** Custom content replacing the default title/date block in the header. Suspense-wrapped. */
  headerComponent?: React.ReactNode;
  /** Callback invoked when the dialog open state changes. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Full-screen detail dialog with a collapsible sidebar, a header with creation date, and a scrollable content area.
 *
 * @example
 * ```tsx
 * import { DetailDialog } from '@customafk/lunas-ui/dialogs/detail-dialog';
 *
 * <DetailDialog
 *   open={open}
 *   title="Order #1234"
 *   createdAt="2024-01-15T09:00:00Z"
 *   sidebar={{ title: 'Navigation', content: <nav>...</nav> }}
 *   onOpenChange={setOpen}
 * >
 *   <p>Detail content goes here.</p>
 * </DetailDialog>
 * ```
 */
export const DetailDialog: React.FC<React.PropsWithChildren<DetailDialogProps>> = ({
  open,
  isLoading,
  title,
  createdAt,
  onOpenChange,
  sidebar,
  headerComponent,
  children,
}) => {
  return (
    <DetailDialogWrapper open={open} onOpenChange={onOpenChange}>
      <DetailDialogProvider>
        <DetailDialogSidebarPanel title={sidebar?.title} content={sidebar?.content} footer={sidebar?.footer} />
        <DetailDialogHeader title={title} createdAt={createdAt} headerComponent={headerComponent} />
        <DetailDialogContent isLoading={isLoading}>{children}</DetailDialogContent>
      </DetailDialogProvider>
    </DetailDialogWrapper>
  );
};
