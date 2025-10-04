import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export const LoadingDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="pointer-events-none border-none bg-transparent shadow-none outline-0 [&>div]:bg-transparent">
        <DialogTitle />
        <div className="flex items-center justify-center">
          <div className="loader opacity-60" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
