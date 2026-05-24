'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

export const SubmitButton: React.FC<
  React.ComponentProps<'button'> & {
    isSubmitting?: boolean;
    submitText?: string;
  }
> = ({ isSubmitting, submitText = 'Submit', disabled, className, onClick }) => {
  return (
    <Button
      type="button"
      isLoading={isSubmitting}
      disabled={disabled || isSubmitting}
      className={cn('min-w-40', className)}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {submitText}
    </Button>
  );
};
