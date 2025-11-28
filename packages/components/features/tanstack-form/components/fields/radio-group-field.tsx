import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator, FieldTitle } from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type RadioGroupFieldProps = {
  label: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal' | 'responsive';
  options: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
};

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ label, description, orientation, options }) => {
  const field = useTanStackFieldContext<string | null>();
  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} className="flex-col gap-2">
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain>
          <RadioGroup className="w-full" onValueChange={field.handleChange}>
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
