import type z from 'zod';

import { useTanStackForm } from '@/components/features/tanstack-form';
import {
  Field,
  FieldContent,
  FieldContentMain,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldNote,
  FieldSeparator,
  FieldSet,
} from '@/components/features/tanstack-form/components/ui/field';
import { Input } from '@/components/features/tanstack-form/components/ui/input';
import type { TanStackFormTextFieldSchema } from '@/components/features/tanstack-form/schema';

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
  const {
    state: { value: currentField },
    handleChange,
  } = useFormBuilderFieldContext<z.infer<typeof TanStackFormTextFieldSchema>>();
  const { AppForm, AppField, TanStackContainerForm, TanStackActionsForm } = useTanStackForm({
    defaultValues: {
      label: currentField.label,
      description: currentField.description || null,
      placeholder: currentField.placeholder || null,

      counter: currentField.counter || false,
      helperText: currentField.helperText || null,
    },
    onSubmit: ({ value, formApi }) => {
      handleChange({
        ...currentField,
        ...(formApi.state.fieldMeta.label?.isDefaultValue ? {} : { label: value.label }),
        ...(formApi.state.fieldMeta.description?.isDefaultValue ? {} : { description: value.description || undefined }),
        ...(formApi.state.fieldMeta.placeholder?.isDefaultValue ? {} : { placeholder: value.placeholder || undefined }),

        ...(formApi.state.fieldMeta.counter?.isDefaultValue ? {} : { counter: value.counter }),
        ...(formApi.state.fieldMeta.helperText?.isDefaultValue ? {} : { helperText: value.helperText || undefined }),
      });
    },
  });
  return (
    <TanStackContainerForm>
      <AppField
        name="label"
        children={({ TextField }) => {
          return <TextField label="Label" description="The label text displayed for the text field." />;
        }}
      />
      <AppField
        name="description"
        children={({ TextField }) => {
          return <TextField label="Description" description="The description text displayed below the label." />;
        }}
      />
      <AppField
        name="placeholder"
        children={({ TextField }) => {
          return <TextField label="Placeholder" description="The placeholder text displayed inside the text field." />;
        }}
      />
      <AppField
        name="helperText"
        children={({ TextField }) => {
          return (
            <TextField label="Helper Text" placeholder='e.g., "Enter your full name."' description="Additional helper text displayed below the text field." />
          );
        }}
      />
      <AppField
        name="counter"
        children={({ SwitchField }) => {
          return <SwitchField label="Character Counter" description="Display a character counter below the text field." />;
        }}
      />
      <AppForm>
        <TanStackActionsForm type="update" />
      </AppForm>
    </TanStackContainerForm>
  );
};

const FieldRules: React.FC = () => {
  const {
    state: { value: currentField },
    handleChange,
  } = useFormBuilderFieldContext<z.infer<typeof TanStackFormTextFieldSchema>>();
  const { AppForm, AppField, TanStackContainerForm, TanStackActionsForm } = useTanStackForm({
    defaultValues: {
      minLength: currentField.rules?.minLength || null,
      maxLength: currentField.rules?.maxLength || null,
      exactLength: currentField.rules?.exactLength || null,
      required: currentField.rules?.required || null,
    },
    listeners: {
      onChange: ({ formApi }) => {
        // Update the field rules in the form builder context
        if (formApi.state.values.exactLength !== null) {
          if (formApi.state.values.minLength !== null) {
            formApi.setFieldValue('minLength', null, { dontRunListeners: true });
          }
          if (formApi.state.values.maxLength !== null) {
            formApi.setFieldValue('maxLength', null, { dontRunListeners: true });
          }
        }
        if (formApi.state.values.exactLength === null) {
          if (formApi.state.values.minLength !== null || formApi.state.values.maxLength !== null) {
            formApi.setFieldValue('exactLength', null, { dontRunListeners: true });
          }
        }
      },
    },
    onSubmit: ({ value, formApi }) => {
      handleChange({
        ...currentField,
        rules: {
          ...currentField.rules,
          ...(formApi.state.fieldMeta.minLength?.isDefaultValue ? {} : { minLength: value.minLength ?? undefined }),
          ...(formApi.state.fieldMeta.maxLength?.isDefaultValue ? {} : { maxLength: value.maxLength ?? undefined }),
          ...(formApi.state.fieldMeta.exactLength?.isDefaultValue ? {} : { exactLength: value.exactLength ?? undefined }),
          ...(formApi.state.fieldMeta.required?.isDefaultValue ? {} : { required: value.required ?? undefined }),
        },
      });
    },
  });
  return (
    <TanStackContainerForm>
      <AppField
        name="minLength"
        children={({ NumberField }) => {
          return <NumberField label="Minimum Length" description="Set the minimum number of characters required." placeholder="e.g., 5" />;
        }}
      />
      <AppField
        name="maxLength"
        children={({ NumberField }) => {
          return <NumberField label="Maximum Length" description="Set the maximum number of characters allowed." placeholder="e.g., 100" />;
        }}
      />
      <AppField
        name="exactLength"
        children={({ NumberField }) => {
          return <NumberField label="Exact Length" description="Set an exact number of characters required." placeholder="e.g., 10" />;
        }}
      />
      <AppField
        name="required"
        children={({ SwitchField }) => {
          return <SwitchField label="Required" description="Mark this field as required." />;
        }}
      />
      <AppForm>
        <TanStackActionsForm type="update" />
      </AppForm>
    </TanStackContainerForm>
  );
};

export const FormBuilderTextField: React.FC<{
  sectionIndex: number;
  fieldId: string;
}> = ({ sectionIndex, fieldId }) => {
  const { state } = useFormBuilderFieldContext<z.input<typeof TanStackFormTextFieldSchema>>();
  return (
    <FormBuilderFieldWrapper>
      <FormBuilderFieldTrigger>
        <FieldSet>
          <FieldGroup className="gap-y-4 px-2">
            <Field orientation={state.value.orientation}>
              <FieldContent>
                <FieldLabel aria-required={!!state.value.rules?.required}>{state.value.label}</FieldLabel>
                <FieldDescription>{state.value.description}</FieldDescription>
              </FieldContent>
              <FieldContentMain className="space-y-1">
                <Input className="pointer-events-none" placeholder={state.value.placeholder} />
                <FieldNote isShow={!!state.value.helperText}>{state.value.helperText}</FieldNote>
              </FieldContentMain>
            </Field>
            <FieldSeparator />
          </FieldGroup>
        </FieldSet>
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
