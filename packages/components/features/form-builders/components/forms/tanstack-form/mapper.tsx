import type { AppFieldExtendedReactFormApi } from '@tanstack/react-form';

import { cn } from '@customafk/react-toolkit/utils';

import type { FormBuilderField } from '../../../types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '../../ui/fields';
import { withFormBuilderTanStackForm } from './tanstack-form';

export const FormBuilderTanStackFieldMapper = ({
  form,
  field,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: Any Enabled
  form: AppFieldExtendedReactFormApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
  field: FormBuilderField;
}) => {
  // Mapper: Title Field
  if (field.type === 'title-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return <form.FormBuilderTanStackTitleField label={field.label} description={field.description} />;
      },
    });
    return <WithHOC form={form} />;
  }

  // Mapper: Text Field
  if (field.type === 'text-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return (
          <form.AppField
            name={field.camelCaseName}
            children={({ TextField }) => {
              return (
                <TextField
                  orientation={field.orientation}
                  label={field.label}
                  description={field.description}
                  placeholder={field.placeholder}
                  maxLength={field.rules.maxLength}
                  showClearButton={field.showClearButton}
                  showCharacterCount={field.showCharacterCount}
                  showErrorMessage={field.showErrorMessage}
                />
              );
            }}
          />
        );
      },
    });
    return <WithHOC form={form} />;
  }

  // Mapper: Textarea Field
  if (field.type === 'textarea-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return (
          <form.AppField
            name={field.camelCaseName}
            children={({ TextareaField }) => {
              return (
                <TextareaField
                  orientation={field.orientation}
                  label={field.label}
                  description={field.description}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  maxLength={field.rules.maxLength}
                  showCharacterCount={field.showCharacterCount}
                  showErrorMessage={field.showErrorMessage}
                />
              );
            }}
          />
        );
      },
    });
    return <WithHOC form={form} />;
  }

  if (field.type === 'number-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return (
          <form.AppField
            name={field.camelCaseName}
            children={({ NumberField }) => {
              return (
                <NumberField
                  orientation={field.orientation}
                  label={field.label}
                  description={field.description}
                  placeholder={field.placeholder}
                  unitText={field.unitText}
                  showErrorMessage={field.showErrorMessage}
                />
              );
            }}
          />
        );
      },
    });
    return <WithHOC form={form} />;
  }

  // Mapper: Select Field
  if (field.type === 'select-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return (
          <form.AppField
            name={field.camelCaseName}
            children={({ SelectField }) => {
              return (
                <SelectField
                  orientation={field.orientation}
                  label={field.label}
                  description={field.description}
                  placeholder={field.placeholder}
                  options={field.options}
                />
              );
            }}
          />
        );
      },
    });
    return <WithHOC form={form} />;
  }

  // Mapper: Date Field
  if (field.type === 'date-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return (
          <form.AppField
            name={field.camelCaseName}
            children={({ DateField }) => {
              return <DateField orientation={field.orientation} label={field.label} description={field.description} placeholder={field.placeholder} />;
            }}
          />
        );
      },
    });
    return <WithHOC form={form} />;
  }

  if (field.type === 'switch-field') {
    const WithHOC = withFormBuilderTanStackForm({
      render: ({ form }) => {
        return (
          <FieldGroup>
            <Field orientation="vertical">
              <FieldContent>
                <FieldLabel>{field.label}</FieldLabel>

                <FieldDescription>{field.description}</FieldDescription>
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
                  {field.options.map(option => {
                    return (
                      <form.AppField
                        key={option.name}
                        name={option.camelCaseName}
                        children={({ SwitchField }) => <SwitchField label={option.label} description={option.description} />}
                      />
                    );
                  })}
                </div>
              </FieldContentMain>
            </Field>
            <FieldSeparator />
          </FieldGroup>
        );
      },
    });
    return <WithHOC form={form} />;
  }

  // Add more mappers for other field types here...
  return <div>Field Mapper</div>;
};
