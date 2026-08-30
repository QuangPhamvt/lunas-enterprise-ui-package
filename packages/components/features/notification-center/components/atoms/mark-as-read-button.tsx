'use client';

import { CheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export type MarkAsReadButtonProps = {
  onClick: () => void;
};

/**
 * Small, low-emphasis icon button shared by every per-type notification row for the "mark as
 * read" action — kept as a single shared atom (not a whole row template) since every type still
 * needs the exact same affordance for this one action, even though the surrounding row differs.
 */
export const MarkAsReadButton: React.FC<MarkAsReadButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      color="muted"
      size="icon"
      aria-label="Đánh dấu đã đọc"
      className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      onClick={event => {
        event.stopPropagation();
        onClick();
      }}
    >
      <CheckIcon />
    </Button>
  );
};
