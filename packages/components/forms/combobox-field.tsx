'use client';
import { Activity } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import { ChevronDownIcon, PlusIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldContent } from '../ui/field';

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  isShowErrorMsg?: boolean;
  modal?: boolean;
  description?: string;
  onAddNewItem?: () => void;
};

export const ComboboxField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Combobox',
  placeholder = 'Chọn một mục',
  description,
  options,
  onAddNewItem,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <Activity mode={label || description ? 'visible' : 'hidden'}>
              <FieldContent>
                <FormLabel>{label}</FormLabel>
                {!!description && <FormDescription>{description}</FormDescription>}
              </FieldContent>
            </Activity>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    color="muted"
                    className={cn(
                      'shadow-input flex justify-between rounded-md px-3',
                      'outline-border-weak font-normal',
                      '[&_div]:w-full',
                      '[&_div]:justify-between',
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
                      'focus:outline-primary-strong'
                    )}
                  >
                    {field.value ? (
                      <span className="flex min-w-0 items-center gap-2">{options?.find(({ value }) => value === field.value)?.label}</span>
                    ) : (
                      <span className="text-text-positive-muted">{placeholder}</span>
                    )}
                    <ChevronDownIcon size={16} className="text-text-positive-weak shrink-0" aria-hidden="true" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command className="border-none">
                  <CommandInput placeholder={placeholder ?? 'Tìm kiếm'} />
                  <CommandList>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      {options?.map(({ value, label }) => (
                        <CommandItem key={value} value={label} onSelect={() => field.onChange(value)}>
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {onAddNewItem && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <Button type="button" variant="ghost" className="w-full justify-start font-normal">
                            <PlusIcon size={14} className="-ms-2 opacity-60" aria-hidden="true" />
                            Thêm mới
                          </Button>
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                  <CommandEmpty>Không có kết quả</CommandEmpty>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        );
      }}
    />
  );
};
