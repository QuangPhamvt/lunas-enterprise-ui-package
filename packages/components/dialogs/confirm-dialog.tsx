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

export type ConfirmDialogProps = {
  open?: boolean;
  isLoading?: boolean;
  title: string;
  description: string;
  cancelText?: string;
  submitText?: string;
  descriptionClassName?: string;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => Promise<void> | void;
};

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
