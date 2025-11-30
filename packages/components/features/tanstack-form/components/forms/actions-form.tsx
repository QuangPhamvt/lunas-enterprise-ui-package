import { Button } from '@/components/ui/button';

import { useTanStackFormContext } from '../../tanstack-form';

export const TanStackActionsForm: React.FC<React.PropsWithChildren> = () => {
  const form = useTanStackFormContext();
  return (
    <div className="flex h-8 items-center justify-between">
      <form.Subscribe
        selector={state => ({
          disabled: state.isPristine || state.isSubmitting,
        })}
        children={({ disabled }) => {
          return (
            <Button color="muted" variant="outline" type="button" size="md" disabled={disabled} className="h-full min-w-32" onClick={() => form.reset()}>
              Cancel
            </Button>
          );
        }}
      />
      <form.Subscribe
        selector={state => ({
          disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
        children={({ disabled, isSubmitting }) => {
          return (
            <Button
              type="submit"
              size="md"
              disabled={disabled}
              isLoading={isSubmitting}
              className="h-full min-w-32"
              onClick={async () => {
                await form.handleSubmit();
                if (!form.state.isSubmitSuccessful) return;
                form.reset();
              }}
            >
              Submit
            </Button>
          );
        }}
      />
    </div>
  );
};
