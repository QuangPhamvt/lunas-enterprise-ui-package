import { cn } from '@customafk/react-toolkit/utils';

import { Switch } from '@/components/ui/switch';
import { useGetCurrentField } from '../../hooks/use-get-current-field';
import type { FormBuilderSwitchField as TFormBuilderSwitchField } from '../../types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from '../ui/fields';

export const FormBuilderSwitchField: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const currentField = useGetCurrentField<TFormBuilderSwitchField>('switch-field', fieldId);

  if (!currentField) return null;

  return (
    <FieldSet>
      <FieldGroup>
        <Field orientation="vertical">
          <FieldContent>
            <FieldLabel>{currentField.label}</FieldLabel>
            <FieldDescription>{currentField.description}</FieldDescription>
          </FieldContent>
          <FieldContentMain className="@container/field-content-main">
            <div
              className={cn(
                'grid grid-cols-1 gap-4',
                '@md/field-content-main:grid-cols-2 @md/field-content-main:gap-4',
                '@5xl/field-content-main:grid-cols-4 @5xl/field-content-main:gap-2',
                '@2xl/field-content-main:grid-cols-3 @3xl/field-content-main:gap-4'
              )}
            >
              <FieldLabel>
                <Field orientation="horizontal" className="justify-between">
                  <FieldContent>
                    <FieldTitle>Switch Field.</FieldTitle>
                    <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                  </FieldContent>
                  <Switch disabled />
                </Field>
              </FieldLabel>

              <FieldLabel>
                <Field orientation="horizontal" className="justify-between">
                  <FieldContent>
                    <FieldTitle>Switch Field.</FieldTitle>
                    <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                  </FieldContent>
                  <Switch disabled className="" />
                </Field>
              </FieldLabel>

              <FieldLabel>
                <Field orientation="horizontal" className="justify-between">
                  <FieldContent>
                    <FieldTitle>Switch Field.</FieldTitle>
                    <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                  </FieldContent>
                  <Switch disabled />
                </Field>
              </FieldLabel>

              <FieldLabel>
                <Field orientation="horizontal" className="justify-between">
                  <FieldContent>
                    <FieldTitle>Switch Field.</FieldTitle>
                    <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                  </FieldContent>
                  <Switch disabled />
                </Field>
              </FieldLabel>
            </div>
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    </FieldSet>
  );
};
