import { useTanStackForm } from '../tanstack-form';
import { useGetDefaultValues } from './hooks/useGetDefaultValues';
import type { LunasFormFormMeta, LunasFormProps } from './types';
import {
  dateFieldOnSubmitValidation,
  numberFieldOnChangeValidation,
  numberFieldOnSubmitValidation,
  selectFieldOnSubmitValidation,
  textareaFieldOnSubmitValidation,
  textFieldOnChangeValidation,
  textFieldOnSubmitValidation,
} from './utils';

export const LunasForm: React.FC<React.PropsWithChildren<LunasFormProps>> = ({
  initialValues,
  changeDebounce = 1000,
  formSchema,
  onCreate,
  onUpdate,
  onDebounceUpdate,
}) => {
  const { defaultValues } = useGetDefaultValues(initialValues ?? {}, formSchema.sections);
  const { AppForm, AppField, TanStackTitleField, TanStackContainerForm, TanStackSectionForm, TanStackActionsForm } = useTanStackForm({
    defaultValues: defaultValues,
    onSubmitMeta: {
      submitAction: 'null',
    } as LunasFormFormMeta,
    onSubmit: async ({ value, meta, formApi }) => {
      // Handle submit based on action
      const handleSubmit: Record<LunasFormFormMeta['submitAction'], () => Promise<void>> = {
        create: async () => {
          await onCreate?.(value);
          formApi.reset();
        },
        update: async () => {
          const fieldKeys = Object.keys(formApi.state.fieldMeta);
          const updatedData: Record<string, string | string[] | number | Date | boolean | null> = {};
          fieldKeys.forEach(key => {
            if (formApi.state.fieldMeta[key]?.isDefaultValue) return;
            updatedData[key] = value[key];
          });
          await onUpdate?.(updatedData);
          formApi.reset(value);
        },
        debounce_update: async () => {
          const fieldKeys = Object.keys(formApi.state.fieldMeta);
          const updatedData: Record<string, unknown> = {};
          fieldKeys.forEach(key => {
            if (formApi.state.fieldMeta[key]?.isDefaultValue) return;
            updatedData[key] = value[key];
          });
          try {
            await onDebounceUpdate?.(updatedData);
            formApi.reset(value);
          } catch (error) {
            console.error('Debounce update failed:', error);
          }
        },
        null: async () => {
          // do nothing
        },
      };

      await handleSubmit[meta.submitAction]();
    },
    listeners: {
      onChangeDebounceMs: changeDebounce,
      onChange: form => {
        if (onDebounceUpdate) {
          form.formApi.handleSubmit({ submitAction: 'debounce_update' });
        }
      },
    },
  });
  return (
    <AppForm>
      <TanStackContainerForm>
        {formSchema.sections.map(section => {
          return (
            <TanStackSectionForm key={section.name} title={section.name}>
              {section.fields.map(field => {
                if (field.type === 'title-field') {
                  return <TanStackTitleField key={field.id} title={field.label} description={field.description} helperText={field.helperText} />;
                }
                // Text Field
                if (field.type === 'text-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onChangeAsyncDebounceMs: 300,
                        onSubmit: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = textFieldOnSubmitValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                        onChangeAsync: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = textFieldOnChangeValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                      }}
                    >
                      {({ TextField }) => {
                        return (
                          <TextField
                            label={field.label}
                            placeholder={field.placeholder}
                            description={field.description}
                            orientation={field.orientation}
                            tooltip={field.tooltip}
                            helperText={field.helperText}
                            counter={field.counter}
                            showClearButton={field.showClearButton}
                            showErrorMessage={field.showErrorMessage}
                            required={field.rules?.required}
                            maxLength={field.rules?.maxLength}
                          />
                        );
                      }}
                    </AppField>
                  );
                }

                // Textarea Field
                if (field.type === 'textarea-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onChangeAsyncDebounceMs: 300,
                        onSubmit: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = textareaFieldOnSubmitValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                        onChangeAsync: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = textFieldOnChangeValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                      }}
                      children={({ TextareaField }) => {
                        return (
                          <TextareaField
                            label={field.label}
                            placeholder={field.placeholder}
                            description={field.description}
                            orientation={field.orientation}
                            counter={field.counter}
                            helperText={field.helperText}
                            showErrorMessage={field.showErrorMessage}
                            required={field.rules?.required}
                            maxLength={field.rules?.maxLength}
                          />
                        );
                      }}
                    />
                  );
                }

                // Number Field
                if (field.type === 'number-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onChangeAsyncDebounceMs: 300,
                        onSubmit: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = numberFieldOnSubmitValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                        onChangeAsync: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = numberFieldOnChangeValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                      }}
                    >
                      {({ NumberField }) => {
                        return (
                          <NumberField
                            label={field.label}
                            description={field.description}
                            placeholder={field.placeholder}
                            // UI Helpers
                            orientation={field.orientation}
                            tooltip={field.tooltip}
                            helperText={field.helperText}
                            rounding={field.rounding}
                            decimalPlaces={field.decimalPlaces}
                            percision={field.percision}
                            unit={field.unit}
                            showErrorMessage={field.showErrorMessage}
                            // Validation
                            required={field.rules?.required}
                            allowNegative={!field.rules?.positiveOnly}
                          />
                        );
                      }}
                    </AppField>
                  );
                }

                // Select Field
                if (field.type === 'select-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = selectFieldOnSubmitValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                      }}
                    >
                      {({ SelectField }) => {
                        return (
                          <SelectField
                            label={field.label}
                            description={field.description}
                            placeholder={field.placeholder}
                            defaultValue={field.defaultValue}
                            orientation={field.orientation}
                            options={field.options}
                            helperText={field.helperText}
                            required={field.rules?.required}
                          />
                        );
                      }}
                    </AppField>
                  );
                }

                // Switch Field
                if (field.type === 'switch-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: () => {},
                      }}
                    >
                      {({ SwitchField }) => {
                        return <SwitchField label={field.label} description={field.description} helperText={field.helperText} />;
                      }}
                    </AppField>
                  );
                }

                // Radio Group Field
                if (field.type === 'radio-group-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: () => {},
                      }}
                    >
                      {({ RadioGroupField }) => {
                        return (
                          <RadioGroupField
                            label={field.label}
                            description={field.description}
                            options={field.options}
                            orientation={field.orientation}
                            helperText={field.helperText}
                          />
                        );
                      }}
                    </AppField>
                  );
                }

                // Checkbox Group Field
                if (field.type === 'checkbox-group-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: () => {},
                      }}
                    >
                      {({ CheckboxField }) => {
                        return (
                          <CheckboxField
                            label={field.label}
                            description={field.description}
                            options={field.options}
                            orientation={field.orientation}
                            helperText={field.helperText}
                          />
                        );
                      }}
                    </AppField>
                  );
                }

                // Date Field
                if (field.type === 'date-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: ({ fieldApi }) => {
                          const { label, rules } = field;
                          const schema = dateFieldOnSubmitValidation(label, rules);
                          if (!schema) return undefined;
                          return fieldApi.parseValueWithSchema(schema);
                        },
                      }}
                    >
                      {({ DateField }) => {
                        return (
                          <DateField
                            label={field.label}
                            description={field.description}
                            placeholder={field.placeholder}
                            orientation={field.orientation}
                            helperText={field.helperText}
                            required={field.rules?.required}
                            minDate={field.rules?.minDate}
                            maxDate={field.rules?.maxDate}
                          />
                        );
                      }}
                    </AppField>
                  );
                }

                return null;
              })}
            </TanStackSectionForm>
          );
        })}
        <TanStackActionsForm type={onCreate ? 'create' : onUpdate ? 'update' : 'create'} />
      </TanStackContainerForm>
    </AppForm>
  );
};
