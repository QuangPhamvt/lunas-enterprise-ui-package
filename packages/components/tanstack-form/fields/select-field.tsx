import { Activity } from 'react';

import { PackagePlusIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';

type Option = {
  label: string;
  value: string;
};

type Props = CommonFieldProps & {
  disabledValues?: string[];
  options: Option[];
};
export const SelectField: React.FC<Props> = ({
  isShowLabel = true,
  isShowErrorMsg = true,
  isNested = false,
  disabledValues = [],
  label,
  description,
  placeholder,
  options,
}) => {
  const { name, state, handleChange } = useFieldContext<string>();
  const isError = state.meta.isTouched && !state.meta.isValid;
  if (isNested) {
    return (
      <Field orientation="vertical" className="gap-1">
        <Activity mode={label || description ? 'visible' : 'hidden'}>
          <FieldContent>
            <FieldLabel htmlFor={name} className="text-xs">
              {label}
            </FieldLabel>
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription className="text-xs">{description}</FieldDescription>
            </Activity>
          </FieldContent>
        </Activity>
        <div className="flex flex-col w-full justify-start">
          <Select defaultValue={state.value} onValueChange={handleChange}>
            <SelectTrigger
              className={cn(
                'w-full md:max-w-80',
                isError && 'border-danger',
                isError && 'data-[state=open]:ring-danger-weak',
                isError && 'data-[state=open]:border-danger-strong',
                isError && 'focus:ring-danger-weak',
                isError && 'focus:border-danger-strong'
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {!!options.length &&
                options.map(({ value, label }) => (
                  <SelectItem key={value} disabled={disabledValues.includes(value)} value={value}>
                    {label}
                  </SelectItem>
                ))}
              {!options.length && (
                <div className="px-4 py-6.5 text-center text-sm text-text-positive-weak flex items-center gap-x-2 justify-center">
                  <PackagePlusIcon strokeWidth={1} />
                  No options available
                </div>
              )}
            </SelectContent>
          </Select>
          <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
            <FieldError errors={state.meta.errors} />
          </Activity>
        </div>
      </Field>
    );
  }
  return (
    <>
      <Field orientation="responsive" data-invalid={state.meta.isTouched && !state.meta.isValid}>
        <FieldContent>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <Activity mode={isShowLabel ? 'visible' : 'hidden'}>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </Activity>
          </Activity>
          <Activity mode={description ? 'visible' : 'hidden'}>
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription>{description}</FieldDescription>
            </Activity>
          </Activity>
        </FieldContent>
        <div className="basis-3/5 flex flex-col items-end">
          <div className="w-full md:max-w-80 flex flex-col space-y-0.5">
            <Select defaultValue={state.value} onValueChange={handleChange}>
              <SelectTrigger
                className={cn(
                  'w-full',
                  isError && 'border-danger',
                  isError && 'data-[state=open]:ring-danger-weak',
                  isError && 'data-[state=open]:border-danger-strong',
                  isError && 'focus:ring-danger-weak',
                  isError && 'focus:border-danger-strong'
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {!!options.length &&
                  options.map(({ value, label }) => (
                    <SelectItem key={value} disabled={disabledValues.includes(value)} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                {!options.length && (
                  <div className="px-4 py-6.5 text-center text-sm text-text-positive-weak flex items-center gap-x-2 justify-center">
                    <PackagePlusIcon strokeWidth={1} />
                    No options available
                  </div>
                )}
              </SelectContent>
            </Select>
            <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
              <FieldError errors={state.meta.errors} />
            </Activity>
          </div>
        </div>
      </Field>
      <FieldSeparator />
    </>
  );
};
