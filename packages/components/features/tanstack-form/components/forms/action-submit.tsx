import { useCallback } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

import { useTanStackFormContext } from '../../tanstack-form';

export const TanStackActionSubmit: React.FC<{
  label?: string;
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
          <Button type="button" size="md" disabled={disabled} isLoading={isSubmitting} className={cn('min-w-32', className)} onClick={onSubmit}>
            {label ?? 'Submit'}
          </Button>
        );
      }}
    />
  );
};
