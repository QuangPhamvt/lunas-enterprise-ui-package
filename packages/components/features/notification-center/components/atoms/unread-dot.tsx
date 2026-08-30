import { cn } from '@customafk/react-toolkit/utils';

export type UnreadDotProps = {
  className?: string;
};

/** Small solid dot marking a row as unread, shown next to the eyebrow category label. */
export const UnreadDot: React.FC<UnreadDotProps> = ({ className }) => (
  <p className={cn('size-2.5 rounded-full bg-danger ring-2 ring-background', className)} aria-hidden />
);
