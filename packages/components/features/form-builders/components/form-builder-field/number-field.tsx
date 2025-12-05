import z from 'zod';

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
import { RoundingField, type TanStackFormNumberFieldSchema } from '@/components/features/tanstack-form/schema';

import { useFormBuilderFieldContext } from '../form-buidler-form';
import { NumberInput } from '../ui/number-input';
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
  const { state, handleChange } = useFormBuilderFieldContext<z.infer<typeof TanStackFormNumberFieldSchema>>();

  const { AppForm, AppField, TanStackContainerForm, TanStackActionsForm } = useTanStackForm({
    defaultValues: {
      label: state.value.label,
      description: state.value.description || null,
      placeholder: state.value.placeholder || null,

      helperText: state.value.helperText || null,
      rounding: state.value.rounding || 'none',
      decimalPlaces: state.value.decimalPlaces || null,
      percision: state.value.percision || null,
      unit: state.value.unit || null,
    },
    onSubmit: ({ value, formApi }) => {
      handleChange({
        ...state.value,
        ...(formApi.state.fieldMeta.label?.isDefaultValue ? {} : { label: value.label }),
        ...(formApi.state.fieldMeta.description?.isDefaultValue ? {} : { description: value.description || undefined }),
        ...(formApi.state.fieldMeta.placeholder?.isDefaultValue ? {} : { placeholder: value.placeholder || undefined }),

        ...(formApi.state.fieldMeta.helperText?.isDefaultValue ? {} : { helperText: value.helperText || undefined }),
        ...(formApi.state.fieldMeta.rounding?.isDefaultValue ? {} : { rounding: value.rounding }),
        ...(formApi.state.fieldMeta.decimalPlaces?.isDefaultValue ? {} : { decimalPlaces: value.decimalPlaces || undefined }),
        ...(formApi.state.fieldMeta.percision?.isDefaultValue ? {} : { percision: value.percision || undefined }),
        ...(formApi.state.fieldMeta.unit?.isDefaultValue ? {} : { unit: value.unit || undefined }),
      });
    },
  });
  return (
    <TanStackContainerForm>
      <AppField
        name="label"
        children={({ TextField }) => {
          return <TextField label="Label" placeholder="Enter field label" required />;
        }}
      />
      <AppField
        name="description"
        children={({ TextField }) => {
          return <TextField label="Description" placeholder="Enter field description" />;
        }}
      />
      <AppField
        name="placeholder"
        children={({ TextField }) => {
          return <TextField label="Placeholder" placeholder="Enter field placeholder" />;
        }}
      />
      <AppField
        name="helperText"
        children={({ TextField }) => {
          return <TextField label="Helper Text" placeholder="Enter helper text" />;
        }}
      />
      <AppField
        name="rounding"
        children={({ SelectField }) => {
          return (
            <SelectField
              label="Rounding"
              options={[
                { label: 'None', value: RoundingField.NONE },
                { label: 'Up', value: RoundingField.UP },
                { label: 'Down', value: RoundingField.DOWN },
                { label: 'Nearest', value: RoundingField.NEAREST },
              ]}
              helperText='Rounding rule for the text field. Eg: "None", "Up", "Down", "Nearest". "up" => 2.13 to 2.2, "down" => 2.13 to 2.1, "nearest" => 2.15 to 2.2'
            />
          );
        }}
      />
      <AppField
        name="decimalPlaces"
        children={({ NumberField }) => {
          return <NumberField label="Decimal Places" placeholder="Enter number of decimal places" helperText="Number of digits after the decimal point" />;
        }}
      />
      <AppField
        name="percision"
        children={({ NumberField }) => {
          return <NumberField label="Precision" placeholder="Enter precision value" helperText='E.g., "2.13" with precision "1" becomes "2.1"' />;
        }}
      />
      <AppField
        name="unit"
        children={({ TextField }) => {
          return <TextField label="Unit" placeholder="Enter unit (e.g., kg, cm)" helperText='Unit text for the text field. E.g., "kg", "m", "USD"...' />;
        }}
      />
      <AppForm>
        <TanStackActionsForm type="update" />
      </AppForm>
    </TanStackContainerForm>
  );
};

const FieldRules: React.FC = () => {
  const { state, handleChange } = useFormBuilderFieldContext<z.infer<typeof TanStackFormNumberFieldSchema>>();
  const { AppForm, AppField, TanStackContainerForm, TanStackActionsForm } = useTanStackForm({
    defaultValues: {
      required: state.value.rules?.required || false,

      minValue: state.value.rules?.min?.value || null,
      minInclusive: state.value.rules?.min?.inclusive || false,
      maxValue: state.value.rules?.max?.value || null,
      maxInclusive: state.value.rules?.max?.inclusive || false,

      integerOnly: state.value.rules?.integerOnly || false,
      positiveOnly: state.value.rules?.positiveOnly || false,
      exactDigits: state.value.rules?.exactDigits || null,
    },
    listeners: {},
    validators: {
      onSubmit: ({ value }) => {
        const errors: Record<string, string> = {
          ...(value.minValue !== null && value.maxValue !== null && value.minValue > value.maxValue
            ? { minValue: 'Minimum value cannot be greater than maximum value.' }
            : {}),

          ...(value.exactDigits !== null && value.exactDigits < 0 ? { exactDigits: 'Exact digits must be a non-negative number.' } : {}),
          ...(value.minValue !== null && value.exactDigits !== null && value.minValue.toString().length > value.exactDigits
            ? { minValue: 'Minimum value has more digits than specified in exact digits.' }
            : {}),
          ...(value.maxValue !== null && value.exactDigits !== null && value.maxValue.toString().length > value.exactDigits
            ? { maxValue: 'Maximum value has more digits than specified in exact digits.' }
            : {}),
        };
        if (errors && Object.keys(errors).length > 0) {
          return {
            form: 'Please fix the errors before submitting.',
            fields: errors,
          };
        }
        return null;
      },
      onChange: z.object({
        required: z.boolean(),

        minValue: z.number().nullable(),
        minInclusive: z.boolean(),
        maxValue: z.number().nullable(),
        maxInclusive: z.boolean(),

        integerOnly: z.boolean(),
        positiveOnly: z.boolean(),
        exactDigits: z.number().nullable(),
      }),
    },
    onSubmit: ({ value, formApi }) => {
      handleChange({
        ...state.value,
        rules: {
          ...state.value.rules,
          ...(formApi.state.fieldMeta.required?.isDefaultValue ? {} : { required: value.required || undefined }),

          ...(formApi.state.fieldMeta.minValue?.isDefaultValue
            ? {}
            : value.minValue !== null
              ? { min: { value: value.minValue, inclusive: value.minInclusive } }
              : { min: undefined }),
          ...(formApi.state.fieldMeta.maxValue?.isDefaultValue
            ? {}
            : value.maxValue !== null
              ? { max: { value: value.maxValue, inclusive: value.maxInclusive } }
              : { max: undefined }),

          ...(formApi.state.fieldMeta.integerOnly?.isDefaultValue ? {} : { integerOnly: value.integerOnly || undefined }),
          ...(formApi.state.fieldMeta.positiveOnly?.isDefaultValue ? {} : { positiveOnly: value.positiveOnly || undefined }),
          ...(formApi.state.fieldMeta.exactDigits?.isDefaultValue
            ? {}
            : value.exactDigits !== null
              ? { exactDigits: value.exactDigits }
              : { exactDigits: undefined }),
        },
      });
    },
  });
  return (
    <TanStackContainerForm>
      <AppField
        name="required"
        children={({ SwitchField }) => {
          return <SwitchField label="Required" description="Make this field mandatory to fill." />;
        }}
      />
      <AppField
        name="minValue"
        children={({ NumberField }) => {
          return <NumberField label="Minimum Value" placeholder="Enter minimum value" description="Set the minimum allowable value." />;
        }}
      />
      <AppField
        name="minInclusive"
        children={({ SwitchField }) => {
          return <SwitchField label="Min Inclusive" description="Include the minimum value in the allowable range." />;
        }}
      />
      <AppField
        name="maxValue"
        children={({ NumberField }) => {
          return <NumberField label="Maximum Value" placeholder="Enter maximum value" description="Set the maximum allowable value." />;
        }}
      />
      <AppField
        name="maxInclusive"
        children={({ SwitchField }) => {
          return <SwitchField label="Max Inclusive" description="Include the maximum value in the allowable range." />;
        }}
      />
      <AppField
        name="integerOnly"
        children={({ SwitchField }) => {
          return <SwitchField label="Integer Only" description="Allow only integer values." />;
        }}
      />
      <AppField
        name="positiveOnly"
        children={({ SwitchField }) => {
          return <SwitchField label="Positive Only" description="Allow only positive values." />;
        }}
      />
      <AppField
        name="exactDigits"
        children={({ NumberField }) => {
          return <NumberField label="Exact Digits" placeholder="Enter exact number of digits" description="Specify the exact number of digits required." />;
        }}
      />
      <AppForm>
        <TanStackActionsForm type="update" />
      </AppForm>
    </TanStackContainerForm>
  );
};

export const FormBuilderNumberField: React.FC<{
  sectionIndex: number;
  fieldId: string;
}> = ({ sectionIndex, fieldId }) => {
  const { state } = useFormBuilderFieldContext<z.infer<typeof TanStackFormNumberFieldSchema>>();
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

              <FieldContentMain>
                <NumberInput placeholder="0" className="pointer-events-none" />
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
