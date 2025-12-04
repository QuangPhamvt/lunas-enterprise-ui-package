import type z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLegend, FieldSeparator } from '@/components/features/tanstack-form/components/ui/field';
import type { TanStackFormTitleFieldSchema } from '@/components/features/tanstack-form/schema';

import { useFormBuilderFieldContext } from '../form-buidler-form';
import {
  FormBuilderFieldTooltip,
  FormBuilderFieldTooltipCopy,
  FormBuilderFieldTooltipSettings,
  FormBuilderFieldTooltipSettingsFieldType,
  FormBuilderFieldTooltipSettingsRules,
  FormBuilderFieldTooltipTrash,
  FormBuilderFieldTrigger,
  FormBuilderFieldWrapper,
} from './wrapper';

const FieldType: React.FC = () => {
  const { state, handleChange } = useFormBuilderFieldContext<z.input<typeof TanStackFormTitleFieldSchema>>();
  const { AppForm, AppField, TanStackContainerForm, TanStackActionsForm } = useTanStackForm({
    defaultValues: {
      label: state.value.label,
      description: state.value.description || null,
      helperText: state.value.helperText || null,
    },
    onSubmit: ({ value }) => {
      handleChange({
        ...state.value,
        label: value.label,
        description: value.description || undefined,
        helperText: value.helperText || undefined,
      });
    },
  });
  return (
    <TanStackContainerForm>
      <AppField
        name="label"
        children={({ TextField }) => {
          return <TextField label="Label" description="The title text displayed in the form." />;
        }}
      />
      <AppField
        name="description"
        children={({ TextField }) => {
          return <TextField label="Description" description="The description text displayed below the title." />;
        }}
      />
      <AppField
        name="helperText"
        children={({ TextField }) => {
          return (
            <TextField
              label="Helper Text"
              placeholder='e.g., "This will not be shared publicly."'
              description="Additional helper text displayed below the description."
            />
          );
        }}
      />
      <AppForm>
        <TanStackActionsForm type="update" />
      </AppForm>
    </TanStackContainerForm>
  );
};

const FieldRules: React.FC = () => {
  return <div className="flex h-40 w-full items-center justify-center rounded border border-border bg-muted-muted px-2.5 py-2">Not implemented yet</div>;
};

export const FormBuilderTitleField: React.FC<{
  sectionIndex: number;
  fieldId: string;
}> = ({ sectionIndex, fieldId }) => {
  const { state } = useFormBuilderFieldContext<z.infer<typeof TanStackFormTitleFieldSchema>>();
  return (
    <FormBuilderFieldWrapper>
      <FormBuilderFieldTrigger>
        <FieldGroup className="gap-y-4 px-2">
          <Field className="gap-0">
            <FieldContent>
              <FieldLegend className="mb-1">{state.value.label}</FieldLegend>
              <FieldDescription>{state.value.description}</FieldDescription>
            </FieldContent>
            {!!state.value.helperText && (
              <div className="mt-1 text-wrap rounded bg-primary-bg-subtle p-2 text-text-positive-weak text-xs">
                <p>{state.value.helperText}</p>
              </div>
            )}
          </Field>
          <FieldSeparator />
        </FieldGroup>
      </FormBuilderFieldTrigger>

      <FormBuilderFieldTooltip>
        <FormBuilderFieldTooltipCopy />
        <FormBuilderFieldTooltipSettings>
          <FormBuilderFieldTooltipSettingsFieldType>
            <FieldType />
          </FormBuilderFieldTooltipSettingsFieldType>
          <FormBuilderFieldTooltipSettingsRules>
            <FieldRules />
          </FormBuilderFieldTooltipSettingsRules>
        </FormBuilderFieldTooltipSettings>
        <FormBuilderFieldTooltipTrash sectionIndex={sectionIndex} fieldId={fieldId} />
      </FormBuilderFieldTooltip>
    </FormBuilderFieldWrapper>
  );
};
