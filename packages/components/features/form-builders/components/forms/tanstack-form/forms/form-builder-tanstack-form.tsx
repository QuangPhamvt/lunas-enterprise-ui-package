import { useCallback } from 'react';

import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '../../fields';

export const FormBuilderTanStackForm: React.FC<
  React.PropsWithChildren<{
    label: string;
    description: string;
    onSubmit?: () => void | Promise<void>;
  }>
> = ({ label, description, onSubmit, children }) => {
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
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{label}</FieldLegend>
          <FieldDescription>{description}</FieldDescription>
          <FieldSeparator />
        </FieldSet>
        {children}
      </FieldGroup>
    </form>
  );
};
