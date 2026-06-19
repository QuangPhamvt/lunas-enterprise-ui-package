import { useCallback } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

import { useTanStackFormContext } from '../../tanstack-form';

/**
 * Renders a submit button wired to the current TanStack Form context, automatically handling loading and disabled states.
 *
 * @example
 * import { TanStackActionSubmit } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * // Inside a TanStack Form provider:
 * <TanStackActionSubmit label="Save Changes" className="mt-4" />
 */
export const TanStackActionSubmit: React.FC<{
  /** Button label text. Defaults to `'Submit'` when omitted. */
  label?: string;
  /** Additional CSS class names applied to the button element. */
  className?: string;
}> = ({ label, className }) => {
  const form = useTanStackFormContext();

  const onSubmit = useCallback(async () => {
    await form.handleSubmit({ submitAction: 'submit' });
    if (!form.state.isSubmitSuccessful) return;
    form.reset();
  }, [form]);
  return (
    <form.Subscribe
      selector={state => ({
        disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit || state.isDefaultValue,
        isSubmitting: state.isSubmitting,
      })}
      children={({ disabled, isSubmitting }) => {
        return (
          <Button type="button" size="md" disabled={disabled} isLoading={isSubmitting} className={cn('min-h-8 min-w-32', className)} onClick={onSubmit}>
            {label ?? 'Xác nhận'}
          </Button>
        );
      }}
    />
  );
};
