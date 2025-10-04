import { useCallback } from 'react';

import { AlertTriangleIcon } from 'lucide-react';

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

type Props = {
  open?: boolean;
  title?: string;
  description?: string;
  onOpenChange?: (open: boolean) => void;
};
export const ErrorDialog: React.FC<React.PropsWithChildren<Props>> = ({ open, title, children, onOpenChange }) => {
  const handleClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-8 p-4 sm:max-w-md">
        <AlertDialogHeader>
          <div className="text-destructive flex flex-col items-center">
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
