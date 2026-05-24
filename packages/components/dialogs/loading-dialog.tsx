'use client';

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

export type LoadingDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const LoadingDialog: React.FC<LoadingDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="pointer-events-none border-none bg-transparent shadow-none outline-none [&>div]:bg-transparent">
        <DialogTitle />
        <div className="flex items-center justify-center">
          <div className="loader opacity-60" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
