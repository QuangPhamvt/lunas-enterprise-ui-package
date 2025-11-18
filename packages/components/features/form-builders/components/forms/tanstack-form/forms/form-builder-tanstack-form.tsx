import { useCallback } from 'react';

import { FieldGroup } from '../../../ui/fields';

export const FormBuilderTanStackForm: React.FC<
  React.PropsWithChildren<{
    onSubmit?: () => void | Promise<void>;
  }>
> = ({ onSubmit, children }) => {
  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async event => {
      event.preventDefault();
      event.stopPropagation();
      await onSubmit?.();
    },
    [onSubmit]
  );
  return (
    <form className="rounded bg-card pb-4 shadow-card" onSubmit={handleSubmit}>
      <FieldGroup>{children}</FieldGroup>
    </form>
  );
};
