import { useMemo } from 'react';

import { useForm } from '@tanstack/react-form';
import { PlusIcon, XIcon } from 'lucide-react';
import { z } from 'zod/v4';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../../components/ui/fields';
import { toCamelCase } from '../../utils';
import { useFormBuilderValueContext } from '../providers';
import { Input } from '../ui/input';

export const FormBuilderSelectFieldTooltipFieldType: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder, onFieldUpdate } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const data = formBuilder.form.find(field => field.id === fieldId);
    if (data && data.type === 'select-field') {
      return data;
    }
    return null;
  }, [fieldId, formBuilder.form]);

  const schema = useMemo(() => {
    return z.object({
      name: z.string().nonempty('Name is required'),
      label: z.string().nonempty('Label is required'),
      description: z.string(),
      placeholder: z.string(),

      options: z
        .array(
          z.object({
            label: z.string().nonempty('Option label is required'),
            value: z.string().nonempty('Option value is required'),
          })
        )
        .refine(
          options => {
            const values = options.map(option => option.value);
            const uniqueValues = new Set(values);
            return uniqueValues.size === values.length;
          },
          {
            message: 'Option values must be unique and at least one option is required',
          }
        ),
    });
  }, []);

  const form = useForm({
    defaultValues: {
      name: currentField?.name || '',
      label: currentField?.label || '',
      description: currentField?.description || '',
      placeholder: currentField?.placeholder || '',

      options: currentField?.options || [],
    } as z.input<typeof schema>,
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    onSubmit: ({ value, formApi }) => {
      onFieldUpdate(fieldId, {
        name: value.name,
        camelCaseName: toCamelCase(value.name),
        label: value.label,
        description: value.description,
        placeholder: value.placeholder,

        options: value.options,
      });

      formApi.reset(value);
    },
    onSubmitInvalid: state => {
      state.formApi.reset();
    },
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldDescription>Configure the settings for the select field.</FieldDescription>
          <FieldSeparator />
        </FieldSet>
        <FieldGroup>
          <form.Field
            name="name"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel className="text-text-positive-weak">Name</FieldLabel>
                  </FieldContent>
                  <Input value={field.state.value} placeholder="Enter field name" className="rounded!" onChange={e => field.handleChange(e.target.value)} />
                </Field>
              );
            }}
          />
          <FieldSeparator />

          <form.Field
            name="label"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel className="text-text-positive-weak">Label</FieldLabel>
                  </FieldContent>
                  <Input value={field.state.value} placeholder="Enter field label" className="rounded!" onChange={e => field.handleChange(e.target.value)} />
                </Field>
              );
            }}
          />
          <FieldSeparator />

          <form.Field
            name="description"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel className="text-text-positive-weak">Description</FieldLabel>
                  </FieldContent>
                  <Input
                    value={field.state.value}
                    placeholder="Enter field descriltion"
                    className="rounded!"
                    onChange={e => field.handleChange(e.target.value)}
                  />
                </Field>
              );
            }}
          />
          <FieldSeparator />

          <form.Field
            name="placeholder"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel className="text-text-positive-weak">Placeholder</FieldLabel>
                  </FieldContent>
                  <Input
                    value={field.state.value}
                    placeholder="Enter field placeholder"
                    className="rounded!"
                    onChange={e => field.handleChange(e.target.value)}
                  />
                </Field>
              );
            }}
          />
          <FieldSeparator />

          <form.Field
            name="options"
            mode="array"
            children={field => {
              return (
                <Field orientation="vertical">
                  <FieldContent className="flex flex-row justify-between">
                    <FieldLabel className="text-text-positive-weak">Options</FieldLabel>
                    <Button
                      type="button"
                      variant="ghost"
                      color="muted"
                      size="icon"
                      onClick={() => {
                        field.pushValue({
                          label: '',
                          value: '',
                        });
                      }}
                    >
                      <PlusIcon size={16} aria-hidden="true" />
                    </Button>
                  </FieldContent>
                  <div className="flex flex-col space-y-2">
                    {field.state.value.map((_, index) => {
                      return (
                        <div key={index.toString()} className="flex space-x-2">
                          <form.Field
                            name={`options[${index}].label`}
                            children={subField => {
                              return <Input value={subField.state.value} placeholder="Option Label" onChange={e => subField.handleChange(e.target.value)} />;
                            }}
                          />
                          <form.Field
                            name={`options[${index}].value`}
                            children={subField => {
                              return <Input value={subField.state.value} placeholder="Option Value" onChange={e => subField.handleChange(e.target.value)} />;
                            }}
                          />
                          <Button type="button" color="muted" variant="ghost" onClick={() => field.removeValue(index)}>
                            <XIcon />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </Field>
              );
            }}
          />
          <FieldSeparator />

          <Field orientation="responsive">
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting, state.isDirty]}
              children={([canSubmit, isSubmitting, isDirty]) => {
                return (
                  <Button type="submit" disabled={!canSubmit || isSubmitting || !isDirty}>
                    Submit
                  </Button>
                );
              }}
            />
            <Button type="button" color="muted" variant="outline" onClick={() => form.reset()}>
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export const FormBuilderSelectFieldTooltipFieldRules: React.FC<{
  fieldId: string;
}> = () => {
  return <div>Select Field Rules</div>;
};
