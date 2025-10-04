'use client';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { format } from '@customafk/react-toolkit/date-fns';
import { cn } from '@customafk/react-toolkit/utils';

import { CalendarIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  isShowErrorMsg?: boolean;
  modal?: boolean;
};

export const DateField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Date Field',
  placeholder = 'Select a date',
  description = '',
  isShowErrorMsg = false,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Popover modal>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  color="muted"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    'outline-border-weak font-normal',
                    'hover:outline-border',
                    'data-[state=open]:text-text-positive-muted',
                    'data-[state=open]:outline-1',
                    'data-[state=open]:outline-primary-strong',
                    'data-[state=open]:ring-primary-weak',
                    'data-[state=open]:ring-4',
                    'focus:border-primary-strong',
                    'focus:ring-4',
                    'focus:ring-primary-weak',
                    'focus:outline-1',
                    'focus:outline-primary-strong',
                    !field.value && 'text-text-positive-muted'
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span> {placeholder || 'Pick a date'}</span>}
                  <CalendarIcon className="text-text-positive-weak ml-auto size-4" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={date => {
                  field.onChange(date?.toISOString());
                }}
                captionLayout="dropdown"
                disabled={date => date < new Date('2022-01-01')}
              />
            </PopoverContent>
          </Popover>
          {!!description && <FormDescription>{description}</FormDescription>}
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
