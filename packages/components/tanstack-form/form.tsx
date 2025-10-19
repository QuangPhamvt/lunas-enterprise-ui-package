import { useCallback } from 'react';

import { FieldContent, FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from '../ui/field';

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
          {children}
        </FieldSet>
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
          <FieldLegend>{label}</FieldLegend>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <div className="basis-3/5 w-full flex flex-col items-end">
          <div className="flex flex-col space-y-2 max-w-80 w-full">{children}</div>
        </div>
      </FieldGroup>
      <FieldSeparator />
    </>
  );
};

export const TanStackFormFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
};
