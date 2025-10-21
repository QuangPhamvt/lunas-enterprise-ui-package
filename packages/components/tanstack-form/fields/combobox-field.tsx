import { Activity } from 'react';

import { ChevronDownIcon, PlusIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';

type Option = {
  label: string;
  value: string;
};
type Props = CommonFieldProps & {
  options: Option[];
  disabledValues?: string[];
  onAddNewItem?: () => void;
};
export const ComboboxField: React.FC<Props> = ({
  isShowLabel = true,
  isShowErrorMsg = true,
  isNested = false,
  disabledValues = [],
  label,
  description,
  placeholder,
  options,
  onAddNewItem,
}) => {
  const { name, state, handleChange } = useFieldContext<string>();
  const isError = state.meta.isTouched && !state.meta.isValid;
  if (isNested) {
    return (
      <Field orientation="vertical" className="gap-1">
        <Activity mode={label || description ? 'visible' : 'hidden'}>
          <FieldContent>
            <FieldLabel htmlFor={name} className="text-xs">
              {label}
            </FieldLabel>
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription className="text-xs">{description}</FieldDescription>
            </Activity>
          </FieldContent>
        </Activity>
        <div className="flex flex-col w-full justify-start">
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                color="muted"
                className={cn(
                  'w-full md:max-w-80',
                  'shadow-input flex justify-between rounded-md px-3',
                  'outline-border-weak font-normal',
                  isError && 'outline-danger',
                  isError && 'focus:!ring-4',
                  isError && 'focus:!ring-danger-weak',
                  isError && 'focus:!outline-danger-strong',
                  isError && 'focus:!outline-1',
                  isError && 'data-[state=open]:!ring-4',
                  isError && 'data-[state=open]:!ring-danger-weak',
                  isError && 'data-[state=open]:!outline-danger-strong',
                  isError && 'data-[state=open]:!outline-1'
                )}
              >
                <Activity mode={state.value ? 'visible' : 'hidden'}>
                  <p className="flex flex-1 min-w-0 text-start items-center gap-2">{options?.find(({ value }) => value === state.value)?.label}</p>
                </Activity>
                <Activity mode={state.value ? 'hidden' : 'visible'}>
                  <p className="text-text-positive-muted text-start flex-1">{placeholder}</p>
                </Activity>
                <ChevronDownIcon size={16} className="text-text-positive-weak shrink-0" aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
              <Command className="border-none">
                <CommandInput placeholder={placeholder ?? 'Tìm kiếm'} />
                <CommandList>
                  <CommandGroup className="max-h-40 overflow-y-auto">
                    <Activity mode={options ? 'visible' : 'hidden'}>
                      {options.map(({ value, label }) => (
                        <CommandItem key={value} value={label} onSelect={() => handleChange(value)} disabled={disabledValues.includes(value)}>
                          {label}
                        </CommandItem>
                      ))}
                    </Activity>
                  </CommandGroup>
                  <Activity mode={onAddNewItem ? 'visible' : 'hidden'}>
                    <CommandSeparator />
                    <CommandGroup>
                      <Button type="button" variant="ghost" className="w-full justify-start font-normal" onClick={onAddNewItem}>
                        <PlusIcon size={14} className="-ms-2 opacity-60" aria-hidden="true" />
                        Thêm mới
                      </Button>
                    </CommandGroup>
                  </Activity>
                </CommandList>
                <CommandEmpty>Không có kết quả</CommandEmpty>
              </Command>
            </PopoverContent>
          </Popover>
          <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
            <FieldError errors={state.meta.errors} />
          </Activity>
        </div>
      </Field>
    );
  }
  return (
    <>
      <Field orientation="responsive" data-invalid={state.meta.isTouched && !state.meta.isValid}>
        <FieldContent>
          <Activity mode={label || description ? 'visible' : 'hidden'}>
            <Activity mode={isShowLabel ? 'visible' : 'hidden'}>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </Activity>
          </Activity>
          <Activity mode={description ? 'visible' : 'hidden'}>
            <Activity mode={description ? 'visible' : 'hidden'}>
              <FieldDescription>{description}</FieldDescription>
            </Activity>
          </Activity>
        </FieldContent>
        <div className="basis-3/5 flex flex-col items-end">
          <div className="w-full md:max-w-80 flex flex-col space-y-0.5">
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  color="muted"
                  className={cn(
                    'w-full md:max-w-80',
                    'shadow-input flex justify-between rounded-md px-3',
                    'outline-border-weak font-normal',
                    '[&_div]:w-full',
                    '[&_span]:w-full',
                    '[&_div]:justify-between',
                    'hover:outline-border',
                    'data-[state=open]:text-text-positive-muted',
                    'data-[state=open]:outline-1',
                    'data-[state=open]:outline-primary-strong',
                    'data-[state=open]:ring-primary-weak',
                    'data-[state=open]:ring-4',
                    'focus:!ring-4',
                    'focus:!ring-primary-weak',
                    'focus:!outline-1',
                    'focus:!outline-primary-strong',
                    'focus:bg-background',
                    isError && 'outline-danger',
                    isError && 'focus:!ring-4',
                    isError && 'focus:!ring-danger-weak',
                    isError && 'focus:!outline-danger-strong',
                    isError && 'focus:!outline-1',
                    isError && 'data-[state=open]:!ring-4',
                    isError && 'data-[state=open]:!ring-danger-weak',
                    isError && 'data-[state=open]:!outline-danger-strong',
                    isError && 'data-[state=open]:!outline-1'
                  )}
                >
                  <Activity mode={state.value ? 'visible' : 'hidden'}>
                    <p className="flex flex-1 min-w-0 text-start items-center gap-2">{options?.find(({ value }) => value === state.value)?.label}</p>
                  </Activity>
                  <Activity mode={state.value ? 'hidden' : 'visible'}>
                    <p className="text-text-positive-muted text-start flex-1">{placeholder}</p>
                  </Activity>
                  <ChevronDownIcon size={16} className="text-text-positive-weak shrink-0" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command className="border-none">
                  <CommandInput placeholder={placeholder ?? 'Tìm kiếm'} />
                  <CommandList>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      <Activity mode={options ? 'visible' : 'hidden'}>
                        {options.map(({ value, label }) => (
                          <CommandItem key={value} value={label} onSelect={() => handleChange(value)} disabled={disabledValues.includes(value)}>
                            {label}
                          </CommandItem>
                        ))}
                      </Activity>
                    </CommandGroup>
                    <Activity mode={onAddNewItem ? 'visible' : 'hidden'}>
                      <CommandSeparator />
                      <CommandGroup>
                        <Button type="button" variant="ghost" className="w-full justify-start font-normal" onClick={onAddNewItem}>
                          <PlusIcon size={14} className="-ms-2 opacity-60" aria-hidden="true" />
                          Thêm mới
                        </Button>
                      </CommandGroup>
                    </Activity>
                  </CommandList>
                  <CommandEmpty>Không có kết quả</CommandEmpty>
                </Command>
              </PopoverContent>
            </Popover>
            <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
              <FieldError errors={state.meta.errors} />
            </Activity>
          </div>
        </div>
      </Field>
      <FieldSeparator />
    </>
  );
};
