import z from 'zod';

import { useTanStackForm } from '../tanstack-form';
import type { LunasFormProps } from './types';

export const LunasForm: React.FC<React.PropsWithChildren<LunasFormProps>> = ({ formSchema }) => {
  const { AppForm, AppField, TanStackContainerForm, TanStackSectionForm } = useTanStackForm({});
  return (
    <AppForm>
      <TanStackContainerForm>
        {formSchema.sections.map(section => {
          return (
            <TanStackSectionForm key={section.name} title={section.name}>
              {section.fields.map(field => {
                if (field.type === 'title-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={''}
                      children={() => {
                        return null;
                      }}
                    />
                  );
                }
                if (field.type === 'text-field') {
                  return (
                    <AppField
                      key={field.id}
                      name={field.camelCaseName}
                      validators={{
                        onChange: ({ fieldApi }) => {
                          const { rules } = field;
                          if (!rules) return undefined;
                          const errors = fieldApi.parseValueWithSchema(
                            z
                              .string()
                              .refine(val => {
                                if (rules.required) return val.trim().length > 0;
                                return true;
                              }, `${field.label} is required.`)
                              .refine(val => {
                                if (rules.maxLength !== undefined) return val.length <= rules.maxLength;
                                return true;
                              }, `${field.label} must be at most ${rules.maxLength} characters.`)
                              .refine(val => {
                                if (rules.minLength !== undefined) return val.length >= rules.minLength;
                                return true;
                              }, `${field.label} must be at least ${rules.minLength} characters.`)
                              .refine(val => {
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
                return null;
              })}
            </TanStackSectionForm>
          );
        })}
      </TanStackContainerForm>
    </AppForm>
  );
};
