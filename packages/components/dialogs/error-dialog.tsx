'use client';

import { useCallback } from 'react';

import { AlertTriangleIcon } from 'lucide-react';

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export type ErrorDialogProps = {
  open?: boolean;
  title?: string;
  onOpenChange?: (open: boolean) => void;
};

export const ErrorDialog: React.FC<React.PropsWithChildren<ErrorDialogProps>> = ({ open, title, children, onOpenChange }) => {
  const handleClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-8 p-4 sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex flex-col items-center text-danger">
            <AlertTriangleIcon size={42} />
            <AlertDialogTitle className="text-xl font-medium">{title || 'An error occurred'}</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogAction className="w-full sm:w-28" onClick={handleClose}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
