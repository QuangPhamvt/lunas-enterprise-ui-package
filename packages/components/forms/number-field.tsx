import { Activity } from 'react';
import { type FieldPath, type FieldValues, useWatch } from 'react-hook-form';
import { cn } from '@customafk/react-toolkit/utils';

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
  isNested?: boolean;
  onValueChange?: (value?: number) => void;
};
export const NumberField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Number Field',
  placeholder = '0',
  isShowErrorMsg = false,
  isShowCount = false,
  isNested = false,
  unitText = '',
  description = '',
  onValueChange,
}: Props<TFieldValues>) => {
  const valueWatch = useWatch({ name });

  return (
    <FormField
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem className={cn(isNested && '@md/field-group:flex-col @md/field-group:items-start gap-0')}>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <FieldContent>
              <FormLabel className={cn(isNested && 'text-xs')}>{label}</FormLabel>
              {!!description && <FormDescription>{description}</FormDescription>}
            </FieldContent>
          </Activity>
          <div className={cn('relative basis-3/5 flex justify-end', isNested && 'basis-full w-full justify-start')}>
            <FormControl>
              <NumberInput
                {...field}
                placeholder={placeholder}
                unitText={unitText}
                wrapperClassName={cn('w-full', !isNested && 'md:max-w-60')}
                onValueChange={value => {
                  onChange(value);
                  onValueChange?.(value);
                }}
              />
            </FormControl>
            {isShowCount && <div className="text-muted-foreground text-end text-xs">{valueWatch?.length ?? 0} characters</div>}
            {isShowErrorMsg && <FormMessage />}
          </div>
        </FormItem>
      )}
    />
  );
};
