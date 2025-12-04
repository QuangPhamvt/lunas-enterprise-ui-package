import type z from 'zod';

import { cn } from '@customafk/react-toolkit/utils';

import type { TanStackFormRadioGroupFieldSchema } from '../../schema';
import { useTanStackFieldContext } from '../../tanstack-form';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldNote, FieldSeparator, FieldTitle } from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type Props = Pick<z.input<typeof TanStackFormRadioGroupFieldSchema>, 'label' | 'description' | 'options' | 'orientation' | 'helperText'>;

export const RadioGroupField: React.FC<Props> = ({ label, description, orientation, options, helperText }) => {
  const field = useTanStackFieldContext<string | null>();
  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} className="flex-col gap-2">
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <FieldDescription>{description}</FieldDescription>
          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContent>

        <FieldContentMain>
          <RadioGroup className="w-full" onValueChange={field.handleChange}>
            {options.map(option => (
              <FieldLabel key={option.value} className={cn('h-fit', field.state.value === option.value && 'border-primary-weak! bg-primary-bg-subtle')}>
                <Field orientation="horizontal" className="justify-between rounded p-2!">
                  <FieldContent className="gap-1!">
                    <FieldTitle>{option.label}</FieldTitle>
                    <FieldDescription className="text-xs">{option.description}</FieldDescription>
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
