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

type Props = {
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

export const ConfirmDialog: React.FC<React.PropsWithChildren<Props>> = ({
  open,
  isLoading = false,
  title,
  description,
  cancelText,
  submitText,
  descriptionClassName,
  onOpenChange,
  onConfirm,
}) => {
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
          <AlertDialogCancel>{cancelText || 'Cancel'}</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className="min-h-9 w-full md:w-24"
            onClick={e => {
              onConfirm?.();
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {!isLoading ? (
              submitText || 'Confirm'
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loader-spinner text-muted-foreground" />
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
