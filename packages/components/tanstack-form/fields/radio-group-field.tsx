import { Activity } from 'react';

import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';

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
export const RadioGroupField: React.FC<Props> = ({ options }) => {
  const { handleChange } = useFieldContext();
  return (
    <RadioGroup className="flex flex-col items-end justify-end space-y-0.5" onValueChange={handleChange}>
      {options.map(option => {
        return (
          <label key={option.value} className="flex w-full max-w-90 cursor-pointer rounded-lg border border-border p-2">
            <div className="flex grow flex-col">
              <p className="font-semibold text-sm text-text-positive">{option.label}</p>
              <p className="text-text-positive-weak text-xs">{option.value}</p>
            </div>
            <RadioGroupItem value={option.value} />
          </label>
        );
      })}
    </RadioGroup>
  );
};
