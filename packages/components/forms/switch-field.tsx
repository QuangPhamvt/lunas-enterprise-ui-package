'use client';
import { Activity } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Switch } from '../ui/switch';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  className?: string;
  description?: string;
  isShowErrorMsg?: boolean;
};
export const SwitchField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Switch Field',
  className = '',
  description,
  isShowErrorMsg = false,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FieldContent>
            <Activity mode={label || description ? 'visible' : 'hidden'}>
              <FormLabel>{label}</FormLabel>
              {description && <FormDescription className="text-xs">{description}</FormDescription>}
            </Activity>
          </FieldContent>
          <FormControl>
            <Switch checked={field.value} className="!w-8" onCheckedChange={field.onChange} />
          </FormControl>
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
