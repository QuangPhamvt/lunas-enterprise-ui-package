import { Activity } from 'react';
import { type FieldPath, type FieldValues, useWatch } from 'react-hook-form';

import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { NumberInput } from '../ui/inputs/number-input';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  unitText?: string;
  isShowClearButton?: boolean;
  isShowErrorMsg?: boolean;
  isShowCount?: boolean;
  onValueChange?: (value?: number) => void;
};
export const NumberField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Number Field',
  placeholder = '0',
  isShowErrorMsg = false,
  isShowCount = false,
  unitText = '',
  description = '',
  onValueChange,
}: Props<TFieldValues>) => {
  const valueWatch = useWatch({ name });

  return (
    <FormField
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <FieldContent>
              <FormLabel>{label}</FormLabel>
              {!!description && <FormDescription>{description}</FormDescription>}
            </FieldContent>
          </Activity>
          <FormControl>
            <NumberInput
              {...field}
              placeholder={placeholder}
              className="w-full"
              unitText={unitText}
              onValueChange={value => {
                onChange(value);
                onValueChange?.(value);
              }}
            />
          </FormControl>
          {isShowCount && <div className="text-muted-foreground text-end text-xs">{valueWatch?.length ?? 0} characters</div>}
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
