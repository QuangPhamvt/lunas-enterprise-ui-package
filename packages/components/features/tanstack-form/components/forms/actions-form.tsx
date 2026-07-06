import { ArrowDownToLine, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useTanStackFormContext } from '../form-context';

/**
 * Renders a form action bar with a Cancel button and a context-aware submit button (Add New or Update) driven by TanStack Form state.
 *
 * @example
 * import { TanStackActionsForm } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * // Inside a TanStack Form provider:
 * <TanStackActionsForm type="create" />
 *
 * // For an update workflow:
 * <TanStackActionsForm type="update" />
 */
export const TanStackActionsForm: React.FC<
  React.PropsWithChildren<{
    /**
     * Determines which submit button variant is rendered.
     * - `'create'` — shows an "Add New" button that resets the form on success.
     * - `'update'` — shows an "Update" button that resets the form on success.
     * Defaults to `'create'`.
     */
    type?: 'create' | 'update';
  }>
> = ({ type = 'create' }) => {
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
              Hủy bỏ
            </Button>
          );
        }}
      />
      {type === 'create' && (
        <form.Subscribe
          selector={state => ({
            disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit || state.isDefaultValue,
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
                  await form.handleSubmit({ submitAction: 'create' });
                  if (!form.state.isSubmitSuccessful) return;
                  form.reset();
                }}
              >
                <PlusIcon />
                Thêm mới
              </Button>
            );
          }}
        />
      )}
      {type === 'update' && (
        <form.Subscribe
          selector={state => ({
            disabled: state.isPristine || !state.isValid || state.isValidating || state.isSubmitting || !state.canSubmit || state.isDefaultValue,
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
                  await form.handleSubmit({ submitAction: 'update' });
                  if (!form.state.isSubmitSuccessful) return;
                  form.reset();
                }}
              >
                <ArrowDownToLine />
                Cập nhật
              </Button>
            );
          }}
        />
      )}
    </div>
  );
};
