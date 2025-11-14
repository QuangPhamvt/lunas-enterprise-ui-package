import { useMemo } from 'react';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod/v4';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/inputs/number-input';
import { Switch } from '@/components/ui/switch';
import { toCamelCase } from '../../utils';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../forms';
import { useFormBuilderValueContext } from '../providers';

export const FormBuilderTextareaFieldTooltipFieldType: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder, onFieldUpdate } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const data = formBuilder.form.find(field => field.id === fieldId);
    if (data && data.type === 'textarea-field') {
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
      showCharacterCount: z.boolean(),
      showErrorMessage: z.boolean(),
    });
  }, []);

  const form = useForm({
    defaultValues: {
      name: currentField?.name || '',
      label: currentField?.label || '',
      description: currentField?.description || '',
      placeholder: currentField?.placeholder || '',
      showCharacterCount: currentField?.showCharacterCount || false,
      showErrorMessage: currentField?.showErrorMessage || false,
    },
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      onFieldUpdate(fieldId, {
        name: value.name,
        camelCaseName: toCamelCase(value.name),
        label: value.label,
        description: value.description,
        placeholder: value.placeholder,
        showCharacterCount: value.showCharacterCount,
        showErrorMessage: value.showErrorMessage,
      });
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
          <FieldDescription>Configure the settings for the text area field.</FieldDescription>
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
            name="showCharacterCount"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel htmlFor={field.name} className="text-text-positive-weak">
                      Show Character Count
                    </FieldLabel>
                  </FieldContent>
                  <div className="flex basis-3/5 justify-end">
                    <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                  </div>
                </Field>
              );
            }}
          />
          <FieldSeparator />
          <form.Field
            name="showErrorMessage"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel htmlFor={field.name} className="text-text-positive-weak">
                      Show Error Message
                    </FieldLabel>
                  </FieldContent>
                  <div className="flex basis-3/5 justify-end">
                    <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
                  </div>
                </Field>
              );
            }}
          />
          <FieldSeparator />
          <Field orientation="responsive">
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => {
                return (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
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

export const FormBuilderTextareaFieldTooltipFieldRules: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder, onFieldUpdate } = useFormBuilderValueContext();
  const currentField = useMemo(() => {
    const data = formBuilder.form.find(field => field.id === fieldId);
    if (data && data.type === 'textarea-field') {
      return data;
    }
    return null;
  }, [fieldId, formBuilder]);
  const schema = useMemo(() => {
    return z
      .object({
        maxLength: z.number().gte(0),
        minLength: z.number().gte(0),
      })
      .refine(data => data.minLength <= data.maxLength && data.maxLength !== 0, {
        message: 'Min length must be less than or equal to max length',
      });
  }, []);

  const form = useForm({
    defaultValues: {
      maxLength: currentField?.rules?.maxLength || 0,
      minLength: currentField?.rules?.minLength || 0,
    } as z.infer<typeof schema>,
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      onFieldUpdate(fieldId, {
        rules: {
          minLength: value.minLength || undefined,
          maxLength: value.maxLength || undefined,
        },
      });
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
          <FieldDescription>Set validation rules for the text field.</FieldDescription>
          <FieldSeparator />
        </FieldSet>
        <form.Field
          name="minLength"
          children={field => {
            return (
              <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                <FieldContent>
                  <FieldLabel className="text-text-positive-weak">Min Length</FieldLabel>
                </FieldContent>
                <FieldContentMain className="flex justify-end">
                  <NumberInput
                    id={field.name}
                    value={field.state.value}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    unitText=""
                    placeholder="0"
                    wrapperClassName="w-48"
                    className="rounded!"
                    onBlur={field.handleBlur}
                    onValueChange={value => {
                      if (value === undefined) return;
                      field.handleChange(value);
                    }}
                  />
                </FieldContentMain>
              </Field>
            );
          }}
        />
        <FieldSeparator />
        <form.Field
          name="maxLength"
          children={field => {
            return (
              <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                <FieldContent>
                  <FieldLabel htmlFor={field.name} className="text-text-positive-weak">
                    Max Length
                  </FieldLabel>
                </FieldContent>
                <FieldContentMain className="flex justify-end">
                  <NumberInput
                    id={field.name}
                    value={field.state.value}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    unitText=""
                    placeholder="0"
                    wrapperClassName="w-48"
                    className="rounded!"
                    onBlur={field.handleBlur}
                    onValueChange={value => {
                      if (value === undefined) return;
                      field.handleChange(value);
                    }}
                  />
                </FieldContentMain>
              </Field>
            );
          }}
        />
        <FieldSeparator />
        <Field orientation="responsive">
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => {
              return (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
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
    </form>
  );
};
