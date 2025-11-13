import { useMemo } from 'react';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod/v4';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../forms';
import { useFormBuilderValueContext } from '../providers';
import { toCamelCase } from '../../utils';
import { Switch } from '@/components/ui/switch';

export const FormBuilderTextFieldTooltipFieldType: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder, onFieldUpdate } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const data = formBuilder.form.find(field => field.id === fieldId);
    if (data && data.type === 'text-field') {
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
      showClearButton: z.boolean(),
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
      showClearButton: currentField?.showClearButton || false,
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
        showClearButton: value.showClearButton,
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
          <FieldDescription>Configure the settings for the text field.</FieldDescription>
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
            name="showClearButton"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel htmlFor={field.name} className="text-text-positive-weak">
                      Show Clear Button
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
              selector={state => [state.isValid, state.isSubmitting]}
              children={([isValid, isSubmitting]) => {
                return (
                  <Button type="submit" disabled={!isValid || isSubmitting}>
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

export const FormBuilderTextFieldTooltipFieldRules: React.FC = () => {
  return <div>Text Field Rules</div>;
};
