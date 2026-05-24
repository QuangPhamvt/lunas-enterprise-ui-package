'use client';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

/**
 * Props for the {@link SubmitButton} component.
 */
type SubmitButtonProps = React.ComponentProps<'button'> & {
  /**
   * When `true` the button enters a loading state and is automatically disabled to prevent duplicate submissions.
   */
  isSubmitting?: boolean;
  /**
   * Label text rendered inside the button.
   * @default 'Submit'
   */
  submitText?: string;
};

/**
 * Primary form submission button that shows a loading indicator while the form is being submitted.
 *
 * @example
 * import { SubmitButton } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <SubmitButton isSubmitting={form.state.isSubmitting} submitText="Save changes" />
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, submitText = 'Submit', disabled, className, onClick }) => {
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
