import { useMemo } from 'react';

import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderRadioGroupField as TFormBuilderRadioGroupField } from '../../types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from '../ui/fields';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export const FormBuilderRadioGroupField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderRadioGroupField>('radio-group-field', fieldId);

  const orientation = useMemo(() => {
    return currentField?.orientation || 'responsive';
  }, [currentField]);

  if (!currentField) return null;
  return (
    <FieldSet>
      <FieldGroup>
        <Field orientation={orientation}>
          <FieldContent>
            <FieldLabel>{currentField.label}</FieldLabel>

            <FieldDescription>{currentField.description}</FieldDescription>
          </FieldContent>

          <FieldContentMain className="flex justify-end">
            <RadioGroup defaultValue="one" className="max-w-80">
              <FieldLabel>
                <Field orientation="horizontal" className="rounded! justify-between p-2!">
                  <FieldContent className="gap-1">
                    <FieldTitle>Kubernetes</FieldTitle>
                    <FieldDescription>Run GPU workloads on a K8s configured cluster.</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="one" disabled />
                </Field>
              </FieldLabel>

              <FieldLabel>
                <Field orientation="horizontal" className="rounded! justify-between p-2!">
                  <FieldContent className="gap-1">
                    <FieldTitle>Virtual Machine</FieldTitle>
                    <FieldDescription>Access a VM configured cluster to run GPU workloads.</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="two" disabled />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldContentMain>
        </Field>

        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
