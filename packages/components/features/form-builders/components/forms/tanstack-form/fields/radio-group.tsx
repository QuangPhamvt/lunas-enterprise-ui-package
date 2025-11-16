import type { FormBuilderRadioGroupField } from '@/components/features/form-builders/types';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldTitle } from '../../../ui/fields';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { useFieldContext } from '../tanstack-form';

export const RadioGroupField: React.FC<Pick<FormBuilderRadioGroupField, 'label' | 'description' | 'orientation' | 'options'>> = ({
  label,
  description,
  orientation,
  options,
}) => {
  const field = useFieldContext<string | null>();
  return (
    <FieldGroup>
      <Field orientation={orientation} className="flex-col gap-2">
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain className="flex justify-end">
          <RadioGroup className="w-full max-w-80" onValueChange={field.handleChange}>
            {options.map(option => (
              <FieldLabel key={option.value}>
                <Field orientation="horizontal" className="rounded! justify-between p-2!">
                  <FieldContent className="gap-1">
                    <FieldTitle>{option.label}</FieldTitle>
                    <FieldDescription>{option.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={option.value} />
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
