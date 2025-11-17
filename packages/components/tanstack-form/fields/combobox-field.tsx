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
        <div className="flex w-full flex-col justify-start">
          <Popover modal>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                color="muted"
                className={cn(
                  'w-full md:max-w-80',
                  'flex justify-between rounded-md px-3 shadow-input',
                  'font-normal outline-border-weak',
                  isError && 'outline-danger',
                  isError && 'focus:ring-4!',
                  isError && 'focus:ring-danger-weak!',
                  isError && 'focus:outline-danger-strong!',
                  isError && 'focus:outline-1!',
                  isError && 'data-[state=open]:ring-4!',
                  isError && 'data-[state=open]:ring-danger-weak!',
                  isError && 'data-[state=open]:outline-danger-strong!',
                  isError && 'data-[state=open]:outline-1!'
                )}
              >
                <Activity mode={state.value ? 'visible' : 'hidden'}>
                  <p className="flex min-w-0 flex-1 items-center gap-2 text-start">{options?.find(({ value }) => value === state.value)?.label}</p>
                </Activity>
                <Activity mode={state.value ? 'hidden' : 'visible'}>
                  <p className="flex-1 text-start text-text-positive-muted">{placeholder}</p>
                </Activity>
                <ChevronDownIcon size={16} className="shrink-0 text-text-positive-weak" aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
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
        <div className="flex basis-3/5 flex-col items-end">
          <div className="flex w-full flex-col space-y-0.5 md:max-w-80">
            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  color="muted"
                  className={cn(
                    'w-full md:max-w-80',
                    'flex justify-between rounded-md px-3 shadow-input',
                    'font-normal outline-border-weak',
                    '[&_div]:w-full',
                    '[&_span]:w-full',
                    '[&_div]:justify-between',
                    'hover:outline-border',
                    'data-[state=open]:text-text-positive-muted',
                    'data-[state=open]:outline-1',
                    'data-[state=open]:outline-primary-strong',
                    'data-[state=open]:ring-primary-weak',
                    'data-[state=open]:ring-4',
                    'focus:ring-4!',
                    'focus:ring-primary-weak!',
                    'focus:outline-1!',
                    'focus:outline-primary-strong!',
                    'focus:bg-background',
                    isError && 'outline-danger',
                    isError && 'focus:ring-4!',
                    isError && 'focus:ring-danger-weak!',
                    isError && 'focus:outline-danger-strong!',
                    isError && 'focus:outline-1!',
                    isError && 'data-[state=open]:ring-4!',
                    isError && 'data-[state=open]:ring-danger-weak!',
                    isError && 'data-[state=open]:outline-danger-strong!',
                    isError && 'data-[state=open]:outline-1!'
                  )}
                >
                  <Activity mode={state.value ? 'visible' : 'hidden'}>
                    <p className="flex min-w-0 flex-1 items-center gap-2 text-start">{options?.find(({ value }) => value === state.value)?.label}</p>
                  </Activity>
                  <Activity mode={state.value ? 'hidden' : 'visible'}>
                    <p className="flex-1 text-start text-text-positive-muted">{placeholder}</p>
                  </Activity>
                  <ChevronDownIcon size={16} className="shrink-0 text-text-positive-weak" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
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
