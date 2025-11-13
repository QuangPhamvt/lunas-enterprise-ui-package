import { Activity } from 'react';

import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';

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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
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
    <Label htmlFor={name} className="flex cursor-pointer items-start gap-x-2 rounded-md border border-border p-2">
      <div className="flex grow flex-col space-y-2">
        <p>{label}</p>
        <p className="text-text-positive-weak text-xs">{description}</p>
      </div>
      <Switch id={name} checked={state.value} className="w-8" onCheckedChange={handleChange} />
    </Label>
  );
};
