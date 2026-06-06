'use client';

import { useId } from 'react';

import { PackagePlusIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useTanStackFieldContext } from '../../tanstack-form';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
};

export const SimpleSelectField: React.FC<Props> = ({ label, placeholder, required, options }) => {
  const id = useId();
  const { state, handleBlur, handleChange } = useTanStackFieldContext<string | null>();

  const _invalid = state.meta.isTouched && !state.meta.isValid;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-danger-strong">*</span>}
        </Label>
      )}
      <Select value={state.value ?? ''} onValueChange={handleChange}>
        <SelectTrigger id={id} aria-invalid={_invalid ? 'true' : undefined} onBlur={handleBlur}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length > 0 ? (
            options.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="flex items-center justify-center gap-x-2 rounded border border-border bg-muted-muted px-4 py-6.5 text-center text-sm text-text-positive-weak">
              <PackagePlusIcon strokeWidth={1} />
              No options available
            </div>
          )}
        </SelectContent>
      </Select>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
