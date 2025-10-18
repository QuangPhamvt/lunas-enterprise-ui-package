'use client';

import { cn } from '@customafk/react-toolkit/utils';
import { cva } from 'class-variance-authority';
import { XIcon } from 'lucide-react';
import { Activity, useCallback } from 'react';
import { type FieldPath, type FieldValues, useWatch } from 'react-hook-form';
import { Flex } from '../layouts/flex';
import { FieldContent } from '../ui/field';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from '../ui/form';
import { Input } from '../ui/input';

const clearBtnVariant = cva([
  'text-text-positive-weak hover:text-text-positive focus-visible:ring-border absolute inset-y-0 top-3 end-0 flex h-fit w-8 cursor-pointer items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-2',
]);

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
  const { resetField } = useFormField();
  const valueWatch = useWatch({ name });

  const handleClearInput = useCallback(() => {
    resetField(name);
  }, [resetField, name]);

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
              {isShowClearButton && valueWatch && (
                <button type="button" className={clearBtnVariant()} aria-label="Clear input" onClick={handleClearInput}>
                  <XIcon size={14} aria-hidden="true" />
                </button>
              )}
              <Flex width="full" padding="none" justify="end">
                {isShowErrorMsg && <FormMessage className="grow" />}
                {isShowCount && <div className="text-text-positive-weak text-end text-xs">{valueWatch?.length ?? 0} characters</div>}
              </Flex>
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
              <Input {...field} placeholder={placeholder} className={cn('w-full', isShowClearButton && 'pr-9')} onValueChange={onValueChange} />
            </FormControl>
            {isShowClearButton && valueWatch && (
              <button type="button" className={clearBtnVariant()} aria-label="Clear input" onClick={handleClearInput}>
                <XIcon size={14} aria-hidden="true" />
              </button>
            )}
            <Flex width="full" padding="none" justify="end">
              {isShowErrorMsg && <FormMessage className="grow" />}
              {isShowCount && <div className="text-text-positive-weak text-end text-xs">{valueWatch?.length ?? 0} characters</div>}
            </Flex>
          </div>
        </FormItem>
      )}
    />
  );
};
