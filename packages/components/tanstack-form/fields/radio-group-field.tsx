import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Activity } from 'react';
import type { CommonFieldProps } from '../types';
import { useFieldContext } from '../config';

type TanStackRadioGroupProps = {
  label: string;
  description?: string;
};
export const TanStackRadioGroup: React.FC<React.PropsWithChildren<TanStackRadioGroupProps>> = ({ label, description, children }) => {
  return (
    <FieldGroup>
      <Field orientation="responsive">
        <FieldContent>
          <FieldLabel>{label}</FieldLabel>
          <Activity mode={description ? 'visible' : 'hidden'}>
            <FieldDescription>{description}</FieldDescription>
          </Activity>
        </FieldContent>
        <div className="relative basis-3/5 space-y-0.5">
          <div className="flex flex-col space-y-1">{children}</div>
        </div>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};

type Option = {
  label: string;
  description?: string;
  value: string;
};
type Props = CommonFieldProps & {
  options: Option[];
};
export const RadioGroupField: React.FC<React.PropsWithChildren<Props>> = ({ options, children }) => {
  const { handleChange } = useFieldContext();
  return (
    <RadioGroup className="flex flex-col space-y-0.5 justify-end items-end" onValueChange={handleChange}>
      {options.map(option => {
        return (
          <label key={option.value} className="rounded-lg border border-border flex p-2 cursor-pointer max-w-90 w-full">
            <div className="flex flex-col grow">
              <p className="text-sm text-text-positive">{option.label}</p>
              <p className="text-sm text-text-positive-weak">{option.value}</p>
            </div>
            <RadioGroupItem value={option.value} />
          </label>
        );
      })}
    </RadioGroup>
  );
};
