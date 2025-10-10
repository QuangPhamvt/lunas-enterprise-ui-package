'use client';
import { Activity } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { MultipleSelector, type Option } from '../ui/multi-select';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  isShowLabel?: boolean;
  isShowErrorMsg?: boolean;
  className?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  onAdd?: () => void;
};
export const MultiSelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Multi Select Field',
  isShowLabel = true,
  isShowErrorMsg,
  placeholder = 'Select options',
  description = '',
  className = '',
  options = [],
  onAdd,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field: { value, onChange } }) => {
        const val = options.filter(option => value?.includes(option.value));
        const handleOnChange = (value: Option[]) => {
          const selectedValues = value.map(v => v.value);
          onChange(selectedValues);
        };
        return (
          <FormItem className={className}>
            <Activity mode={label || description ? 'visible' : 'hidden'}>
              <FieldContent>
                {isShowLabel && <FormLabel>{label}</FormLabel>}
                {!!description && <FormDescription>{description}</FormDescription>}
              </FieldContent>
            </Activity>
            <div className="basis-3/5 flex justify-end">
              <FormControl>
                <MultipleSelector
                  placeholder={placeholder}
                  emptyIndicator="No options available"
                  value={val}
                  options={options}
                  className="w-full md:max-w-80"
                  onChange={handleOnChange}
                  onAddNewItem={onAdd}
                />
              </FormControl>
              {isShowErrorMsg && <FormMessage />}
            </div>
          </FormItem>
        );
      }}
    />
  );
};
