import type { AppFieldExtendedReactFormApi } from '@tanstack/react-form';

import type { FormBuilderField } from '../../../types';
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

  // Add more mappers for other field types here...
  return <div>Field Mapper</div>;
};
