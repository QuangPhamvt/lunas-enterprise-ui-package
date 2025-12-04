import type z from 'zod';

import type { TanStackFormCheckboxGroupFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Checkbox } from '../ui/checkbox';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldNote, FieldSeparator } from '../ui/field';

type Props = Pick<z.input<typeof TanStackFormCheckboxGroupFieldSchema>, 'label' | 'description' | 'orientation' | 'options' | 'helperText'>;

export const CheckboxField: React.FC<Props> = ({ label, description, options, helperText, orientation }) => {
  const field = useTanStackFieldContext<string[] | null>();
  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation}>
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContent>
        <FieldContentMain>
          <FieldGroup className="flex flex-col gap-y-2">
            {options.map(option => {
              return (
                <Field key={option.value} orientation="horizontal">
                  <Checkbox
                    id={`${field.name}-${option.value}`}
                    name={field.name}
                    checked={field.state.value?.includes(option.value) ?? false}
                    onCheckedChange={checked => {
                      // Update the field value based on the checkbox state

                      // If checked and field value is not null, push the option value
                      if (checked && field.state.value !== null) {
                        field.pushValue(option.value);
                        // If the field value is null, initialize it with the selected option
                      } else if (checked && field.state.value === null) {
                        field.setValue([option.value]);
                        // If unchecked and field value is not null, remove the option value
                      } else if (!checked && field.state.value !== null) {
                        const index = field.state.value.indexOf(option.value);
                        if (index > -1) field.removeValue(index);
                        // If unchecked and field value is null, do nothing
                      } else if (!checked && field.state.value === null) {
                        field.setValue(null);
                      }
                    }}
                  />
                  <FieldLabel htmlFor={`${field.name}-${option.value}`} className="text-text-positive">
                    {option.label}
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
