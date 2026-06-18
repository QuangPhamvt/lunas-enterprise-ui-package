'use client';

import { useCallback } from 'react';

import { TriangleAlert } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

/**
 * Props for the {@link ConfirmDialog} component.
 */
export type ConfirmDialogProps = {
  /**
   * Controls whether the dialog is currently open.
   * This is a **controlled** prop — pair it with `onOpenChange` to manage state.
   */
  open?: boolean;

  /**
   * When `true`, shows an animated spinner inside the confirm button and
   * prevents double-submission. Typically bound to a mutation's pending state.
   *
   * @default false
   */
  isLoading?: boolean;

  /**
   * The dialog heading text. Keep it short and action-oriented,
   * e.g. `"Delete user?"` or `"Unsaved changes"`.
   */
  title: string;

  /**
   * Body copy explaining what will happen if the user confirms.
   * For irreversible actions, state explicitly that the action cannot be undone.
   */
  description: string;

  /**
   * Label for the cancel / dismiss button.
   *
   * @default "Cancel"
   */
  cancelText?: string;

  /**
   * Label for the confirm / submit button.
   *
   * @default "Confirm"
   */
  submitText?: string;

  /**
   * Additional class names applied to the `AlertDialogDescription` element.
   * Useful for overriding text color or font size for specific contexts.
   */
  descriptionClassName?: string;

  /**
   * Callback fired when the dialog open state changes.
   * Required to implement controlled open / close behavior.
   *
   * @param open - `true` when opening, `false` when closing.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Async-safe callback fired when the user clicks the confirm button.
   * Supports both synchronous and `Promise`-returning functions.
   *
   * The dialog does **not** auto-close after `onConfirm` resolves — the caller
   * is responsible for setting `open` to `false` once the operation completes.
   *
   * @example
   * ```tsx
   * onConfirm={async () => {
   *   await deleteUser(userId);
   *   setOpen(false);
   * }}
   * ```
   */
  onConfirm?: () => Promise<void> | void;
};

/**
 * A controlled confirmation dialog for destructive or irreversible actions.
 *
 * Built on Radix UI's `AlertDialog` primitive. Renders a warning icon, title,
 * description, and Cancel / Confirm buttons. The confirm button supports an
 * async loading state to prevent double-submission.
 *
 * **Import:** `import { ConfirmDialog } from '@customafk/lunas-ui/dialogs/confirm-dialog'`
 *
 * @example Delete confirmation with React state
 * ```tsx
 * import { useState } from 'react';
 * import { Button } from '@customafk/lunas-ui/ui/button';
 * import { ConfirmDialog } from '@customafk/lunas-ui/dialogs/confirm-dialog';
 *
 * export function DeleteUserButton({ userId }: { userId: string }) {
 *   const [open, setOpen] = useState(false);
 *   const [isPending, setIsPending] = useState(false);
 *
 *   const handleDelete = async () => {
 *     setIsPending(true);
 *     try {
 *       await deleteUser(userId);
 *       setOpen(false);
 *     } finally {
 *       setIsPending(false);
 *     }
 *   };
 *
 *   return (
 *     <>
 *       <Button variant="outline" color="danger" onClick={() => setOpen(true)}>
 *         Delete user
 *       </Button>
 *       <ConfirmDialog
 *         open={open}
 *         title="Delete user?"
 *         description="This action is permanent and cannot be undone."
 *         submitText="Yes, delete"
 *         isLoading={isPending}
 *         onOpenChange={setOpen}
 *         onConfirm={handleDelete}
 *       />
 *     </>
 *   );
 * }
 * ```
 *
 * @example With TanStack Query mutation
 * ```tsx
 * import { ConfirmDialog } from '@customafk/lunas-ui/dialogs/confirm-dialog';
 * import { useMutation } from '@tanstack/react-query';
 *
 * export function ArchiveDialog({ open, onOpenChange, id }: Props) {
 *   const { mutateAsync, isPending } = useMutation({ mutationFn: archiveItem });
 *
 *   return (
 *     <ConfirmDialog
 *       open={open}
 *       title="Archive item?"
 *       description="The item will be hidden but can be restored later."
 *       submitText="Archive"
 *       isLoading={isPending}
 *       onOpenChange={onOpenChange}
 *       onConfirm={() => mutateAsync(id).then(() => onOpenChange(false))}
 *     />
 *   );
 * }
 * ```
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  isLoading = false,
  title,
  description,
  cancelText = 'Cancel',
  submitText = 'Confirm',
  descriptionClassName,
  onOpenChange,
  onConfirm,
}) => {
  const handleConfirm = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onConfirm?.();
    },
    [onConfirm]
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 pb-5">
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="inline-flex items-center gap-x-1">
            <TriangleAlert size={20} />
            <p>{title}</p>
          </AlertDialogTitle>
          <AlertDialogDescription className={descriptionClassName}>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction type="button" className="min-h-9 w-full md:w-24" onClick={handleConfirm}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader-spinner text-text-positive-weak" />
              </div>
            ) : (
              submitText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
