'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Dialog as SidePanelPrimitive } from 'radix-ui';
import { paragraphVariants } from '../typography/paragraph';
import { CloseButton } from '../ui/buttons/close';

/**
 * Props for the {@link SidePanel} component.
 */
export type SidePanelProps = {
  /**
   * Controls whether the panel is currently open.
   * This is a **controlled** prop — pair it with `onOpenChange` to manage state.
   */
  open?: boolean;

  /**
   * Callback fired when the open state changes (e.g. backdrop click, close button, `Escape`).
   *
   * @param open - `true` when opening, `false` when closing.
   */
  onOpenChange?: (open: boolean) => void;

  /** Heading rendered at the top of the panel. */
  title?: React.ReactNode;

  /** Supporting text rendered below the title. */
  description?: React.ReactNode;

  /** Content rendered pinned to the bottom of the panel, typically action buttons. */
  footer?: React.ReactNode;

  /**
   * When `true` (default), renders a `CloseButton` in the top-right corner of the panel.
   *
   * @default true
   */
  showCloseButton?: boolean;

  /** Main scrollable body content of the panel. */
  children?: React.ReactNode;

  /**
   * Tailwind width classes applied to the panel from the `sm` breakpoint up (below `sm` the
   * panel always fills the available inset area). Override to make the panel narrower, wider,
   * or a fixed size, e.g. `'sm:w-96'` or `'sm:w-full sm:max-w-3xl'`.
   *
   * @default 'sm:w-1/2 sm:max-w-2xl'
   */
  width?: string;

  /**
   * When `false`, the panel becomes non-modal: no dimmed overlay is rendered, background content
   * stays fully visible and interactive, and the panel can only be closed via its close button
   * (`Escape` and outside clicks are disabled). `showCloseButton` is forced to `true` in this mode
   * regardless of what's passed, since it becomes the only way to close the panel.
   *
   * @default true
   */
  modal?: boolean;

  /** Additional class names applied to the panel itself. */
  className?: string;
};

/**
 * A controlled dialog panel anchored to the right half of the screen, inset from the viewport
 * edges on both axes. Always lays out as a fixed header, a scrollable body, and a fixed footer.
 *
 * **Import:** `import { SidePanel } from '@customafk/lunas-ui/dialogs/side-panel'`
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 * import { SidePanel } from '@customafk/lunas-ui/dialogs/side-panel';
 *
 * export function OrderDetailPanel({ order }: { order: Order }) {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>Xem chi tiết</Button>
 *       <SidePanel
 *         open={open}
 *         onOpenChange={setOpen}
 *         title="Chi tiết đơn hàng"
 *         description="Xem và cập nhật thông tin đơn hàng."
 *         footer={<Button onClick={() => setOpen(false)}>Lưu thay đổi</Button>}
 *       >
 *         <p>Nội dung có thể cuộn ở đây.</p>
 *       </SidePanel>
 *     </>
 *   );
 * }
 * ```
 */
export const SidePanel: React.FC<SidePanelProps> = ({
  open,
  onOpenChange,
  title,
  description,
  footer,
  showCloseButton = true,
  children,
  width = 'sm:w-1/2 sm:max-w-2xl',
  modal = true,
  className,
}) => {
  const resolvedShowCloseButton = modal ? showCloseButton : true;

  return (
    <SidePanelPrimitive.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      <SidePanelPrimitive.Portal>
        {modal && (
          <SidePanelPrimitive.Overlay
            className={cn(
              'fixed inset-0 z-50 bg-black/50',
              'data-[state=open]:fade-in-0 data-[state=open]:animate-in',
              'data-[state=closed]:fade-out-0 data-[state=closed]:animate-out'
            )}
          />
        )}
        <SidePanelPrimitive.Content
          className={cn(
            'fixed z-50 flex flex-col bg-background',
            'rounded-2xl border border-border-weak shadow-dialog outline-none',
            'inset-2 sm:inset-y-2 sm:right-2 sm:left-auto',
            width,
            'data-[state=open]:slide-in-from-right data-[state=open]:animate-in data-[state=open]:duration-500',
            'data-[state=closed]:slide-out-to-right data-[state=closed]:animate-out data-[state=closed]:duration-300',
            className
          )}
          onEscapeKeyDown={event => {
            if (!modal) event.preventDefault();
          }}
          onInteractOutside={event => {
            if (!modal) event.preventDefault();
          }}
        >
          {(title || description) && (
            <div className={cn('flex flex-none flex-col gap-1 border-border-weak border-b p-4', resolvedShowCloseButton && 'pr-14')}>
              {title && <SidePanelPrimitive.Title className="font-bold text-base text-text-positive-strong">{title}</SidePanelPrimitive.Title>}
              {description && (
                <SidePanelPrimitive.Description className={cn(paragraphVariants({ variant: 'muted' }), 'not-first:mt-0 md:text-sm')}>
                  {description}
                </SidePanelPrimitive.Description>
              )}
            </div>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
          {footer && <div className="mt-auto flex flex-none flex-col-reverse gap-2 border-t border-border-weak p-4 sm:flex-row sm:justify-end">{footer}</div>}
          {resolvedShowCloseButton && (
            <SidePanelPrimitive.Close tabIndex={-1} asChild className="absolute top-4 right-4">
              <CloseButton aria-label="Đóng" />
            </SidePanelPrimitive.Close>
          )}
        </SidePanelPrimitive.Content>
      </SidePanelPrimitive.Portal>
    </SidePanelPrimitive.Root>
  );
};
