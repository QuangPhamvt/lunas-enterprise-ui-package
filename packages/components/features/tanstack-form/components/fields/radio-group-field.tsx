'use client';

import { useStore } from '@tanstack/react-form';

import { cn } from '@customafk/react-toolkit/utils';

import { useTanStackFieldContext } from '../../tanstack-form';
import {
  Field,
  FieldContent,
  FieldContentMain,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldNote,
  FieldSeparator,
  FieldTitle,
  FieldTooltip,
} from '../ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { RadioGroupFieldProps as Props } from '../../types';

export const RadioGroupField: React.FC<Props> = ({ label, description, orientation, options, tooltip, helperText }) => {
  const field = useTanStackFieldContext<string | null>();
  const isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} className="flex-col gap-2">
        <FieldContent>
          <FieldLabel>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContent>

        <FieldContentMain>
          <RadioGroup value={field.state.value ?? ''} className="w-full" onValueChange={field.handleChange}>
            {options.map(option => (
              <FieldLabel
                key={option.value}
                className={cn(
                  'h-fit',
                  field.state.value === option.value && 'border-primary-weak! bg-primary-bg-subtle',
                  isSubmitting && 'pointer-events-none bg-muted-muted opacity-60',
                  field.state.value === option.value && isSubmitting && 'border-border-strong!'
                )}
              >
                <Field orientation="horizontal" className="items-start gap-3 rounded p-2!">
                  <RadioGroupItem value={option.value} className="mt-0.5 shrink-0" />
                  <FieldContent className="gap-0.5!">
                    <FieldTitle>{option.label}</FieldTitle>
                    <FieldDescription className="text-xs">{option.description}</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
