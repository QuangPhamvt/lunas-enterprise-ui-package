'use client';
import { Activity } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  disabledValues?: string[];
  options?: { value: string; label: string }[];
  isShowLabel?: boolean;
  isShowErrorMsg?: boolean;
  modal?: boolean;
  description?: string;
  className?: string;
};
export const SelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Select Field',
  placeholder = 'Select an option',
  disabledValues = [],
  options = [],
  isShowLabel = true,
  isShowErrorMsg = false,
  description = '',
  className = '',
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <FieldContent>
              {isShowLabel && <FormLabel>{label}</FormLabel>}
              {!!description && <FormDescription>{description}</FormDescription>}
            </FieldContent>
          </Activity>
          <div className="basis-3/5 flex justify-end">
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="w-full md:max-w-80">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option.value} disabled={disabledValues.includes(option.value)} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isShowErrorMsg && <FormMessage />}
          </div>
        </FormItem>
      )}
    />
  );
};
