'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

/**
 * Secondary outline button used to dismiss or cancel a form without submitting, defaulting to the label "Cancel".
 *
 * @example
 * import { CancelButton } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <CancelButton onClick={() => router.back()} />
 */
export const CancelButton: React.FC<React.ComponentProps<'button'>> = ({ disabled, className, onClick, children }) => {
  return (
    <Button
      type="button"
      variant="outline"
      color="muted"
      disabled={disabled}
      className={cn('min-w-40', className)}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {children ?? 'Cancel'}
    </Button>
  );
};
