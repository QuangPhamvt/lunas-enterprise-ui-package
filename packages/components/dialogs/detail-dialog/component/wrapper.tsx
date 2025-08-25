import { DialogContent } from "@/components/ui/dialog";

export const DetailDialogWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <DialogContent
      className="relative h-full max-h-[90svh] overflow-hidden rounded-lg border-none p-0 sm:max-w-[calc(100svw-2rem)]"
      onInteractOutside={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </DialogContent>
  );
};
