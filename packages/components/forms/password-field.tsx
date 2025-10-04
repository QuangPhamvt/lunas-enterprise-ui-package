'use client';
import { Activity } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { PasswordInput } from '../ui/inputs/password-input';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  isShowErrorMsg?: boolean;
  onValueChange?: (value: string) => void;
};
export const PasswordField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Text Field',
  placeholder = 'Enter text here',
  isShowErrorMsg = false,
  description,
  onValueChange,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <FieldContent>
              <FormLabel>{label}</FormLabel>
              {!!description && <FormDescription>{description}</FormDescription>}
            </FieldContent>
          </Activity>
          <FormControl>
            <PasswordInput placeholder={placeholder} {...field} onValueChange={onValueChange} />
          </FormControl>
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
