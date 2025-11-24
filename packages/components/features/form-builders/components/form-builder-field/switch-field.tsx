import { useMemo } from 'react';

import { useForm } from '@tanstack/react-form';
import { PlusIcon, XIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import z from 'zod';
import { Button } from '@/components/ui/button';
import type { formBuilderSwitchFieldSchema } from '../../schema';
import { toCamelCase } from '../../utils';
import { useFormBuilderFieldContext } from '../form-buidler-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from '../ui/fields';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
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
  const {
    state: { value: currentField },
    handleChange,
  } = useFormBuilderFieldContext<z.infer<typeof formBuilderSwitchFieldSchema>>();

  const schema = useMemo(() => {
    return z.object({
      name: z.string().nonempty('Name is required'),
      label: z.string().nonempty('Label is required'),
      description: z.string(),

      options: z
        .array(
          z.object({
            name: z.string().nonempty('Option name is required'),
            label: z.string().nonempty('Option label is required'),
            description: z.string(),
          })
        )
        .refine(value => value.length > 0, { message: 'At least one option is required' })
        .refine(
          options => {
            const names = options.map(option => option.name);
            const uniqueNames = new Set(names);
            return uniqueNames.size === names.length;
          },
          { message: 'Option names must be unique' }
        ),
    });
  }, []);

  const form = useForm({
    defaultValues: {
      name: currentField?.name || '',
      label: currentField?.label || '',
      description: currentField?.description || '',

      options: currentField?.options || [],
    } as z.input<typeof schema>,
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    onSubmit: ({ value, formApi }) => {
      handleChange({
        ...currentField,
        name: value.name,
        camelCaseName: toCamelCase(value.name),
        label: value.label,
        description: value.description,

        options: value.options.map(option => ({
          name: option.name,
          camelCaseName: toCamelCase(option.name),
          label: option.label,
          description: option.description,
        })),
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
                        field.pushValue({ name: '', label: '', description: '' });
                      }}
                    >
                      <PlusIcon size={16} aria-hidden="true" />
                    </Button>
                  </FieldContent>
                  <div className="flex flex-col space-y-2">
                    {field.state.value.map((_, index) => {
                      return (
                        <div key={index.toString()}>
                          <div className="flex space-x-2">
                            <form.Field
                              name={`options[${index}].name`}
                              children={subField => {
                                return (
                                  <Input
                                    value={subField.state.value}
                                    placeholder="Switch Name"
                                    className="max-w-40"
                                    onChange={e => subField.handleChange(e.target.value)}
                                  />
                                );
                              }}
                            />
                            <form.Field
                              name={`options[${index}].label`}
                              children={subField => {
                                return <Input value={subField.state.value} placeholder="Switch Label" onChange={e => subField.handleChange(e.target.value)} />;
                              }}
                            />
                            <Button type="button" color="muted" variant="outline" onClick={() => field.removeValue(index)}>
                              <XIcon />
                            </Button>
                          </div>
                          <form.Field
                            name={`options[${index}].description`}
                            children={subField => {
                              return (
                                <Textarea
                                  value={subField.state.value}
                                  placeholder="Switch Description (optional)"
                                  className="mt-1"
                                  onChange={e => subField.handleChange(e.target.value)}
                                />
                              );
                            }}
                          />
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

const FieldRules: React.FC = () => {
  return <div>Select Field Rules</div>;
};

export const FormBuilderSwitchField: React.FC<{
  sectionIndex: number;
  fieldId: string;
}> = ({ sectionIndex, fieldId }) => {
  const { state } = useFormBuilderFieldContext<z.infer<typeof formBuilderSwitchFieldSchema>>();
  return (
    <FormBuilderFieldWrapper>
      <FormBuilderFieldTrigger>
        <FieldSet>
          <FieldGroup>
            <Field orientation="vertical">
              <FieldContent>
                <FieldLabel>{state.value.label}</FieldLabel>
                <FieldDescription>{state.value.description}</FieldDescription>
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
                  <FieldLabel>
                    <Field orientation="horizontal" className="justify-between">
                      <FieldContent>
                        <FieldTitle>Switch Field.</FieldTitle>
                        <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                      </FieldContent>
                      <Switch disabled />
                    </Field>
                  </FieldLabel>

                  <FieldLabel>
                    <Field orientation="horizontal" className="justify-between">
                      <FieldContent>
                        <FieldTitle>Switch Field.</FieldTitle>
                        <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                      </FieldContent>
                      <Switch disabled className="" />
                    </Field>
                  </FieldLabel>

                  <FieldLabel>
                    <Field orientation="horizontal" className="justify-between">
                      <FieldContent>
                        <FieldTitle>Switch Field.</FieldTitle>
                        <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                      </FieldContent>
                      <Switch disabled />
                    </Field>
                  </FieldLabel>

                  <FieldLabel>
                    <Field orientation="horizontal" className="justify-between">
                      <FieldContent>
                        <FieldTitle>Switch Field.</FieldTitle>
                        <FieldDescription>This is a placeholder for the switch field options.</FieldDescription>
                      </FieldContent>
                      <Switch disabled />
                    </Field>
                  </FieldLabel>
                </div>
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
