import z from 'zod';

import { useTanStackForm } from '../tanstack-form';
import { useGetDefaultValues } from './hooks/useGetDefaultValues';
import type { LunasFormFormMeta, LunasFormProps } from './types';

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
    defaultValues: defaultValues as any,
    onSubmitMeta: {
      submitAction: null,
    } as LunasFormFormMeta,
    onSubmit: async ({ value, meta, formApi }) => {
      // Create Action
      if (meta.submitAction === 'create') {
        await onCreate?.(value);
        formApi.reset();
      }

      // Update Action
      if (meta.submitAction === 'update') {
        const fieldKeys = Object.keys(formApi.state.fieldMeta);
        const updatedData: Record<string, unknown> = {};
        fieldKeys.forEach(key => {
          if (formApi.state.fieldMeta[key]?.isDefaultValue) return;
          updatedData[key] = value[key];
        });
        await onUpdate?.(updatedData);
        formApi.reset(value);
      }

      // Debounce Update
      if (meta.submitAction === 'debounce_update') {
        const fieldKeys = Object.keys(formApi.state.fieldMeta);
        const updatedData: Record<string, unknown> = {};
        fieldKeys.forEach(key => {
          if (formApi.state.fieldMeta[key]?.isDefaultValue) return;
          updatedData[key] = value[key];
        });
        await onDebounceUpdate?.(updatedData);
        formApi.reset(value);
      }
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
                        onSubmit: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .string()
                              .nullable()
                              .refine(val => {
                                if (rules.required) return val !== null && val.trim().length > 0;
                                return true;
                              }, `${field.label} is required.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                        onChangeAsyncDebounceMs: 300,
                        onChangeAsync: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .string()
                              .nullable()
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.required) return val.trim().length > 0;
                                return true;
                              }, `${field.label} is required.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.maxLength !== undefined) return val.length <= rules.maxLength;
                                return true;
                              }, `${field.label} must be at most ${rules.maxLength} characters.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.minLength !== undefined) return val.length >= rules.minLength;
                                return true;
                              }, `${field.label} must be at least ${rules.minLength} characters.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.exactLength !== undefined) return val.length === rules.exactLength;
                                return true;
                              }, `${field.label} must be exactly ${rules.exactLength} characters.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                      }}
                      children={({ TextField }) => {
                        return (
                          <TextField
                            label={field.label}
                            placeholder={field.placeholder}
                            description={field.description}
                            required={field.rules?.required}
                            counter={field.counter}
                            tooltip={field.tooltip}
                            helperText={field.helperText}
                            orientation={field.orientation}
                            showClearButton={field.showClearButton}
                            showErrorMessage={field.showErrorMessage}
                          />
                        );
                      }}
                    />
                  );
                }

                // Textarea Field
                if (field.type === 'textarea-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .string()
                              .nullable()
                              .refine(val => {
                                if (rules.required) return val !== null && val.trim().length > 0;
                                return true;
                              }, `${field.label} is required.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                        onChangeAsyncDebounceMs: 300,
                        onChangeAsync: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .string()
                              .nullable()
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.required) return val.trim().length > 0;
                                return true;
                              }, `${field.label} is required.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.maxLength !== undefined) return val.length <= rules.maxLength;
                                return true;
                              }, `${field.label} must be at most ${rules.maxLength} characters.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.minLength !== undefined) return val.length >= rules.minLength;
                                return true;
                              }, `${field.label} must be at least ${rules.minLength} characters.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.exactLength !== undefined) return val.length === rules.exactLength;
                                return true;
                              }, `${field.label} must be exactly ${rules.exactLength} characters.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                      }}
                      children={({ TextareaField }) => {
                        return (
                          <TextareaField
                            label={field.label}
                            placeholder={field.placeholder}
                            description={field.description}
                            required={field.rules?.required}
                            counter={field.counter}
                            // tooltip={field.tooltip}
                            helperText={field.helperText}
                            orientation={field.orientation}
                            showErrorMessage={field.showErrorMessage}
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
                        onSubmit: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .number()
                              .nullable()
                              .refine(val => {
                                if (rules.required) return val !== null;
                                return true;
                              }, `${field.label} is required.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                        onChangeAsyncDebounceMs: 300,
                        onChangeAsync: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .number()
                              .nullable()
                              .refine(
                                val => {
                                  if (val === null) return true;
                                  if (rules.min !== undefined) return rules.min.inclusive ? val >= rules.min.value : val > rules.min.value;
                                  return true;
                                },
                                `${field.label} must be ${rules.min?.inclusive ? 'at least' : 'greater than'} ${rules.min?.value}.`
                              )
                              .refine(
                                val => {
                                  if (val === null) return true;
                                  if (rules.max !== undefined) return rules.max.inclusive ? val <= rules.max.value : val < rules.max.value;
                                  return true;
                                },
                                `${field.label} must be ${rules.max?.inclusive ? 'at most' : 'less than'} ${rules.max?.value}.`
                              )
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.positiveOnly) return val >= 0;
                                return true;
                              }, `${field.label} must be a positive number.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.integerOnly) return Number.isInteger(val);
                                return true;
                              }, `${field.label} must be an integer.`)
                              .refine(val => {
                                if (val === null) return true;
                                if (rules.exactDigits !== undefined) {
                                  const digitCount = val.toString().replace('-', '').replace('.', '').length;
                                  return digitCount === rules.exactDigits;
                                }
                                return true;
                              }, `${field.label} must have exactly ${rules.exactDigits} digits.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                      }}
                      children={({ NumberField }) => {
                        return (
                          <NumberField
                            label={field.label}
                            description={field.description}
                            placeholder={field.placeholder}
                            helperText={field.helperText}
                            orientation={field.orientation}
                            showErrorMessage={field.showErrorMessage}
                            rounding={field.rounding}
                            decimalPlaces={field.decimalPlaces}
                            percision={field.percision}
                            unit={field.unit}
                            required={field.rules?.required}
                            allowNegative={!field.rules.positiveOnly}
                          />
                        );
                      }}
                    />
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
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .string()
                              .nullable()
                              .refine(val => {
                                if (rules.required) return val !== null && val.trim().length > 0;
                                return true;
                              }, `${field.label} is required.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                      }}
                      children={({ SelectField }) => {
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
                    />
                  );
                }

                if (field.type === 'date-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onSubmit: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .date()
                              .nullable()
                              .refine(val => {
                                if (rules.required) return val !== null;
                                return true;
                              }, `${field.label} is required.`)
                          );
                          if (errors) return errors;
                          return undefined;
                        },
                      }}
                      children={({ DateField }) => {
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
                    />
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
