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
  return <div>Field Mapper</div>;
};
