import { useCallback } from 'react';

import { FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from '../ui/field';

type Props = {
  label?: string;
  description?: string;
  onSubmit?: () => void | Promise<void>;
};

export const TanStackForm: React.FC<React.PropsWithChildren<Props>> = ({ label, description, onSubmit, children }) => {
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await onSubmit?.();
    },
    [onSubmit]
  );
  return (
    <form onSubmit={handleSubmit}>
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

export const TanStackFormGroup: React.FC<
  React.PropsWithChildren<{
    label?: string;
    description?: string;
  }>
> = ({ label, description, children }) => {
  return (
    <>
      <FieldGroup className="@md/field-group:flex-row @md/field-group:items-start">
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <div className="flex w-full basis-3/5 flex-col items-end">
          <div className="flex w-full max-w-80 flex-col space-y-3">{children}</div>
        </div>
      </FieldGroup>
      <FieldSeparator />
    </>
  );
};

export const TanStackFormFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
};
