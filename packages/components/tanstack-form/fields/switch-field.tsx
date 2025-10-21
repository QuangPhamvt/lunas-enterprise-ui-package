import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Activity } from 'react';

type SwitchGroupProps = {
  label: string;
  description?: string;
};
export const TanStackSwitchGroup: React.FC<React.PropsWithChildren<SwitchGroupProps>> = ({ label, description, children }) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
        </div>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};

type Props = CommonFieldProps;
export const SwitchField: React.FC<React.PropsWithChildren<Props>> = ({ label, description }) => {
  const { name, state, handleChange } = useFieldContext<boolean>();
  return (
    <Label htmlFor={name} className="rounded-md p-2 border border-border flex gap-x-2 items-start cursor-pointer">
      <div className="flex flex-col space-y-2 grow">
        <p>{label}</p>
        <p className="text-xs text-text-positive-weak">{description}</p>
      </div>
      <Switch id={name} checked={state.value} className="w-8" onCheckedChange={handleChange} />
    </Label>
  );
};
