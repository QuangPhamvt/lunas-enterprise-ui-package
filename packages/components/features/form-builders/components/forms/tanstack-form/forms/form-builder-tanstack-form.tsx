import { useCallback } from 'react';

import { FieldGroup } from '../../fields';

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
    <form className="px-2.5" onSubmit={handleSubmit}>
      <FieldGroup>{children}</FieldGroup>
    </form>
  );
};
