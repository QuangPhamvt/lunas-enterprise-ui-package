'use client';

import { cn } from '@customafk/react-toolkit/utils';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { Activity, memo, useCallback } from 'react';
import { type FieldPath, type FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { Flex } from '../layouts/flex';
import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const clearBtnVariant = cva([
  'text-text-positive-weak hover:text-text-positive focus-visible:ring-border absolute inset-y-0 top-3 end-0 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-2',
]);

type CountCharactersProps = {
  name: string;
  isShowClearButton: boolean;
  isShowErrorMsg?: boolean;
  isShowCount?: boolean;
  onClear: (name: string) => void;
};
const CountCharacters = memo(({ name, isShowClearButton, isShowCount, isShowErrorMsg, onClear }: CountCharactersProps) => {
  const valueWatch = useWatch({ name });

  const handleClearInput = useCallback(() => {
    onClear(name);
  }, [onClear, name]);
  return (
    <>
      {isShowClearButton && valueWatch && (
        <button type="button" className={clearBtnVariant()} aria-label="Clear input" onClick={handleClearInput}>
          <XIcon size={14} aria-hidden="true" />
        </button>
      )}
      <Flex width="full" padding="none" justify="end">
        {isShowErrorMsg && <FormMessage className="grow" />}
        {isShowCount && <div className="text-text-positive-weak text-end text-xs">{valueWatch?.length ?? 0} characters</div>}
      </Flex>
    </>
  );
});
CountCharacters.displayName = 'CountCharacters';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  isNested?: boolean;
  isShowLabel?: boolean;
  isShowClearButton?: boolean;
  isShowErrorMsg?: boolean;
  isShowCount?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};
export const TextField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Text Field',
  placeholder = 'Enter text here',
  isNested = false,
  isShowLabel = true,
  isShowClearButton = false,
  isShowErrorMsg = false,
  isShowCount = false,
  description,
  className = '',
  onValueChange,
}: Props<TFieldValues>) => {
  const { resetField } = useFormContext();

  if (isNested) {
    return (
      <FormField
        name={name}
        render={({ field: { onChange, ...field } }) => (
          <FormItem orientation="vertical" className="gap-1">
            <Activity mode={label || description ? 'visible' : 'hidden'}>
              <FieldContent>
                <FormLabel className="text-xs">{label}</FormLabel>
                {!!description && <FormDescription>{description}</FormDescription>}
              </FieldContent>
            </Activity>
            <div className="flex flex-col w-full justify-start">
              <FormControl>
                <Input {...field} placeholder={placeholder} className={cn('w-full', isShowClearButton && 'pr-9')} onValueChange={onValueChange} />
              </FormControl>
              <CountCharacters
                name={name}
                isShowClearButton={isShowClearButton}
                isShowCount={isShowCount}
                isShowErrorMsg={isShowErrorMsg}
                onClear={resetField}
              />
            </div>
          </FormItem>
        )}
      ></FormField>
    );
  }

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FieldContent>
            <Activity mode={label || description ? 'visible' : 'hidden'}>
              {isShowLabel && <FormLabel>{label}</FormLabel>}
              {!!description && <FormDescription>{description}</FormDescription>}
            </Activity>
          </FieldContent>
          <div className="relative basis-3/5">
            <FormControl>
              <Input
                ref={field.ref}
                value={field.value}
                disabled={field.disabled}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={placeholder}
                className={cn('w-full', isShowClearButton && 'pr-9')}
                onValueChange={onValueChange}
              />
            </FormControl>
            <CountCharacters name={name} isShowClearButton={isShowClearButton} isShowCount={isShowCount} isShowErrorMsg={isShowErrorMsg} onClear={resetField} />
          </div>
        </FormItem>
      )}
    />
  );
};
