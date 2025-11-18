import { PackagePlusIcon } from 'lucide-react';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderArrayField as TFormBuilderArrayField } from '../../types';
import { Field, FieldContent, FieldContentMain, FieldGroup, FieldLabel, FieldSet } from '../ui/fields';

export const FormBuilderArrayField: React.FC<{ fieldId: string }> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderArrayField>('array-field', fieldId);

  if (!currentField) return null;

  return (
    <FieldSet className="rounded-md bg-muted-muted">
      <FieldGroup className="p-3">
        <Field orientation="vertical">
          <FieldContent>
            <FieldLabel className="text-sm leading-4">{currentField.label}</FieldLabel>
          </FieldContent>

          <FieldContentMain className="space-y-3 rounded-md bg-card p-2">
            <div className="flex items-center gap-x-2">
              <div className="w-fit rounded-full bg-muted-muted px-3 py-1 text-xs tabular-nums">1/2</div>
              <p className="font-semibold">No Name</p>
            </div>
            <div className="flex h-32 w-full items-center justify-center rounded-lg border border-border bg-muted-muted text-text-positive-weak">
              <PackagePlusIcon size={48} strokeWidth={1} />
            </div>
          </FieldContentMain>

          <FieldContentMain className="space-y-3 rounded-md bg-card p-2">
            <div className="flex items-center gap-x-2">
              <div className="w-fit rounded-full bg-muted-muted px-3 py-1 text-xs tabular-nums">2/2</div>
              <p className="font-semibold">No Name</p>
            </div>
            <div className="flex h-32 w-full items-center justify-center rounded-lg border border-border bg-muted-muted text-text-positive-weak">
              <PackagePlusIcon size={48} strokeWidth={1} />
            </div>
          </FieldContentMain>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
};
