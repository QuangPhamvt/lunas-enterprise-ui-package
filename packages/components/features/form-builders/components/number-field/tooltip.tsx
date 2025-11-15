import { useMemo, useState } from 'react';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod/v4';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from '../../components/ui/fields';
import { toCamelCase } from '../../utils';
import { useFormBuilderValueContext } from '../providers';
import { Input } from '../ui/input';
import { NumberInput } from '../ui/number-input';

export const FormBuilderNumberFieldTooltipFieldType: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder, onFieldUpdate } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const data = formBuilder.form.find(field => field.id === fieldId);
    if (data && data.type === 'number-field') {
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
      unitText: z.string(),

      showErrorMessage: z.boolean(),
    });
  }, []);

  const form = useForm({
    defaultValues: {
      name: currentField?.name || '',
      label: currentField?.label || '',
      description: currentField?.description || '',
      placeholder: currentField?.placeholder || '',
      unitText: currentField?.unitText || '',
      showErrorMessage: currentField?.showErrorMessage || true,
    } as z.input<typeof schema>,
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
        unitText: value.unitText,
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
            name="unitText"
            children={field => {
              return (
                <Field orientation="horizontal" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
                  <FieldContent>
                    <FieldLabel className="text-text-positive-weak">Units</FieldLabel>
                  </FieldContent>
                  <Input
                    value={field.state.value}
                    placeholder="Enter field unit text"
                    className="rounded!"
                    onChange={e => field.handleChange(e.target.value)}
                  />
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

export const FormBuilderNumberFieldTooltipFieldRules: React.FC<{
  fieldId: string;
}> = ({ fieldId }) => {
  const { formBuilder, onFieldUpdate } = useFormBuilderValueContext();

  const currentField = useMemo(() => {
    const data = formBuilder.form.find(field => field.id === fieldId);
    if (data && data.type === 'number-field') {
      return data;
    }
    return null;
  }, [fieldId, formBuilder]);

  const [greaterOption, setGreaterOption] = useState<'greaterThan' | 'greaterThanOrEqualTo'>(
    fieldId && currentField?.rules.greaterThanOrEqualTo !== null
      ? 'greaterThanOrEqualTo'
      : currentField?.rules.greaterThan !== null
        ? 'greaterThan'
        : 'greaterThan'
  );

  const [lessOption, setLessOption] = useState<'lessThan' | 'lessThanOrEqualTo'>(
    fieldId && currentField?.rules.lessThanOrEqualTo !== null ? 'lessThanOrEqualTo' : currentField?.rules.lessThan !== null ? 'lessThan' : 'lessThan'
  );

  const schema = useMemo(() => {
    return z
      .object({
        greaterThan: z.number().nullable(),
        greaterThanOrEqualTo: z.number().nullable(),
        lessThan: z.number().nullable(),
        lessThanOrEqualTo: z.number().nullable(),
      })
      .refine(
        value => {
          if (value.greaterThan !== null && value.greaterThanOrEqualTo !== null) {
            return false;
          }
          if (value.lessThan !== null && value.lessThanOrEqualTo !== null) {
            return false;
          }
          return true;
        },
        {
          message: 'Cannot set both Greater Than and Greater Than or Equal To or Less Than and Less Than or Equal To',
        }
      )
      .refine(
        value => {
          if (value.greaterThan !== null && value.lessThan !== null) {
            return value.greaterThan < value.lessThan;
          }
          if (value.greaterThanOrEqualTo !== null && value.lessThanOrEqualTo !== null) {
            return value.greaterThanOrEqualTo < value.lessThanOrEqualTo;
          }
          if (value.greaterThan !== null && value.lessThanOrEqualTo !== null) {
            return value.greaterThan < value.lessThanOrEqualTo;
          }
          if (value.greaterThanOrEqualTo !== null && value.lessThan !== null) {
            return value.greaterThanOrEqualTo < value.lessThan;
          }
          return true;
        },
        {
          message: 'Greater than value must be less than Less than value',
        }
      );
  }, []);

  const form = useForm({
    defaultValues: {
      greaterThan: currentField?.rules.greaterThan || null,
      greaterThanOrEqualTo: currentField?.rules.greaterThanOrEqualTo || null,
      lessThan: currentField?.rules.lessThan || null,
      lessThanOrEqualTo: currentField?.rules.lessThanOrEqualTo || null,
    } as z.infer<typeof schema>,
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
    onSubmit: ({ value }) => {
      const newRules = {
        greaterThan: value.greaterThanOrEqualTo !== null ? null : value.greaterThan,
        greaterThanOrEqualTo: value.greaterThan !== null ? null : value.greaterThanOrEqualTo,
        lessThan: value.lessThanOrEqualTo !== null ? null : value.lessThan,
        lessThanOrEqualTo: value.lessThan !== null ? null : value.lessThanOrEqualTo,
      };
      onFieldUpdate(fieldId, { rules: newRules });
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

        <Field orientation="vertical" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
          <FieldContent>
            <FieldLabel className="text-text-positive-weak">Greater</FieldLabel>
          </FieldContent>
          <FieldContentMain className="flex space-x-2">
            <form.Field
              name="greaterThan"
              children={field => {
                if (greaterOption === 'greaterThanOrEqualTo') return null;
                return (
                  <NumberInput
                    id={field.name}
                    value={field.state.value ?? 0}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    unitText=""
                    placeholder="0"
                    wrapperClassName="flex-1"
                    className="rounded!"
                    onBlur={field.handleBlur}
                    onValueChange={value => {
                      if (value === undefined) {
                        field.handleChange(null);
                        return;
                      }
                      field.handleChange(value);
                    }}
                  />
                );
              }}
            />
            <form.Field
              name="greaterThanOrEqualTo"
              children={field => {
                if (greaterOption === 'greaterThan') return null;
                return (
                  <NumberInput
                    id={field.name}
                    value={field.state.value ?? 0}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    unitText=""
                    placeholder="0"
                    wrapperClassName="flex-1"
                    className="rounded!"
                    onBlur={field.handleBlur}
                    onValueChange={value => {
                      if (value === undefined) {
                        field.handleChange(null);
                        return;
                      }
                      field.handleChange(value);
                    }}
                  />
                );
              }}
            />
            <form.Subscribe
              children={() => {
                return (
                  <Select
                    defaultValue="greaterThan"
                    value={greaterOption}
                    onValueChange={value => {
                      if (value === 'greaterThan') {
                        form.setFieldValue('greaterThanOrEqualTo', null);
                      }
                      if (value === 'greaterThanOrEqualTo') {
                        form.setFieldValue('greaterThan', null);
                      }
                      setGreaterOption(value as 'greaterThan' | 'greaterThanOrEqualTo');
                    }}
                  >
                    <SelectTrigger className="w-48 rounded [&>span]:line-clamp-1">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="rounded">
                      <SelectItem value="greaterThan">Greater Than</SelectItem>
                      <SelectItem value="greaterThanOrEqualTo">Greater Than or Equal To</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </FieldContentMain>
        </Field>
        <FieldSeparator />

        <Field orientation="vertical" className="*:data-[slot=field-content-main]:basis-3/5 *:data-[slot=field-content]:basis-2/5">
          <FieldContent>
            <FieldLabel className="text-text-positive-weak">Less</FieldLabel>
          </FieldContent>
          <FieldContentMain className="flex space-x-2">
            <form.Field
              name="lessThan"
              children={field => {
                if (lessOption === 'lessThanOrEqualTo') return null;
                return (
                  <NumberInput
                    id={field.name}
                    value={field.state.value ?? 0}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    unitText=""
                    placeholder="0"
                    wrapperClassName="flex-1"
                    className="rounded!"
                    onBlur={field.handleBlur}
                    onValueChange={value => {
                      if (value === undefined) {
                        field.handleChange(null);
                        return;
                      }
                      field.handleChange(value);
                    }}
                  />
                );
              }}
            />
            <form.Field
              name="lessThanOrEqualTo"
              children={field => {
                if (lessOption === 'lessThan') return null;
                return (
                  <NumberInput
                    id={field.name}
                    value={field.state.value ?? 0}
                    aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    unitText=""
                    placeholder="0"
                    wrapperClassName="flex-1"
                    className="rounded!"
                    onBlur={field.handleBlur}
                    onValueChange={value => {
                      if (value === undefined) {
                        field.handleChange(null);
                        return;
                      }
                      field.handleChange(value);
                    }}
                  />
                );
              }}
            />
            <form.Subscribe
              children={() => {
                return (
                  <Select
                    defaultValue="lessThan"
                    value={lessOption}
                    onValueChange={value => {
                      if (value === 'lessThan') {
                        form.setFieldValue('lessThanOrEqualTo', null);
                      }
                      if (value === 'lessThanOrEqualTo') {
                        form.setFieldValue('lessThan', null);
                      }
                      setLessOption(value as 'lessThan' | 'lessThanOrEqualTo');
                    }}
                  >
                    <SelectTrigger className="w-48 rounded [&>span]:line-clamp-1">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="rounded">
                      <SelectItem value="lessThan">Less Than</SelectItem>
                      <SelectItem value="lessThanOrEqualTo">Less Than or Equal To</SelectItem>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </FieldContentMain>
        </Field>
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
