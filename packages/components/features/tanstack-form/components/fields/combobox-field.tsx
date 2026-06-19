'use client';

import { memo, useId, useState } from 'react';

import { useSelector } from '@tanstack/react-store';

import { XIcon } from 'lucide-react';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useTanStackFieldContext } from '../../tanstack-form';
import {
  Field,
  FieldContent,
  FieldContentMain,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldNote,
  FieldSeparator,
  FieldTooltip,
} from '../ui/field';

import type { ComboboxFieldProps } from '../../types';

export const ComboboxField = memo<ComboboxFieldProps>(
  ({
    label,
    description,
    placeholder,
    tooltip,
    helperText,
    orientation = 'responsive',
    options,
    required = false,
    disabled = false,
    clearable = false,
    showErrorMessage = true,
  }) => {
    const errorId = useId();
    const field = useTanStackFieldContext<string | null>();
    const isMobile = useIsMobile();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isSubmitting = useSelector(field.form.store, ({ isSubmitting }) => isSubmitting);
    const isDisabled = disabled || isSubmitting;

    const _touched = field.state.meta.isDirty || field.state.meta.isTouched;
    const _invalid = _touched && !field.state.meta.isValid;
    const _isEmpty = required && field.state.value === null;
    const _showClear = clearable && !!field.state.value && !isDisabled;

    const selectedLabel = options.find(({ value }) => value === field.state.value)?.label;

    const onClear = () => {
      field.handleChange(null);
      field.handleBlur();
    };

    const triggerButton = (onClick?: () => void) => (
      <Button
        variant="outline"
        color="muted"
        size="lg"
        disabled={isDisabled}
        aria-invalid={_invalid ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          'flex w-full items-center justify-start rounded outline-border',
          'hover:bg-transparent',
          'focus-visible:outline-1 focus-visible:outline-primary-strong focus-visible:ring-4 focus-visible:ring-primary-weak',
          'data-[state=open]:text-text-positive-muted data-[state=open]:outline-1 data-[state=open]:outline-primary-strong data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
          _showClear && 'pr-8',
          !field.state.value && 'text-text-positive-muted'
        )}
        onClick={onClick}
      >
        {selectedLabel ? (
          <p className="flex min-w-0 flex-1 items-center gap-2 truncate text-start">{selectedLabel}</p>
        ) : (
          <p className="flex-1 text-start text-text-positive-muted">{placeholder}</p>
        )}
      </Button>
    );

    const commandList = (
      <Command className="border-none">
        <CommandInput placeholder={placeholder ?? 'Tìm kiếm…'} />
        <CommandList>
          <CommandEmpty className="flex min-h-30 items-center justify-center text-sm text-text-positive-weak">Không tìm thấy kết quả nào phù hợp.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {options.map(({ value, label: optLabel }) => (
              <CommandItem
                key={value}
                value={optLabel}
                onSelect={() => {
                  field.handleChange(value);
                  setDrawerOpen(false);
                }}
              >
                {optLabel}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );

    return (
      <FieldGroup className="gap-y-4 px-4">
        <Field orientation={orientation} data-invalid={_invalid}>
          <FieldContent>
            <FieldLabel aria-required={_isEmpty} htmlFor={field.name}>
              {label}
              {tooltip && <FieldTooltip tooltip={tooltip} />}
            </FieldLabel>
            <FieldDescription>{description}</FieldDescription>
          </FieldContent>

          <FieldContentMain className="flex justify-end">
            <div className="flex w-full flex-col">
              <div className="relative">
                {isMobile ? (
                  <>
                    {triggerButton(() => setDrawerOpen(true))}
                    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>{label}</DrawerTitle>
                        </DrawerHeader>
                        <div className="overflow-y-auto pb-safe-bottom">
                          {_showClear && (
                            <DrawerClose asChild>
                              <button
                                type="button"
                                className="flex w-full items-center gap-x-2 px-4 py-3 text-left text-sm text-danger-strong transition-colors hover:bg-danger-bg-subtle"
                                onClick={onClear}
                              >
                                <XIcon size={14} />
                                Clear selection
                              </button>
                            </DrawerClose>
                          )}
                          {commandList}
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>{triggerButton()}</PopoverTrigger>
                    <PopoverContent align="end" side="bottom" className="flex w-fit rounded p-0" onBlur={field.handleBlur}>
                      {commandList}
                    </PopoverContent>
                  </Popover>
                )}

                {_showClear && (
                  <button
                    type="button"
                    aria-label="Xóa lựa chọn"
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex size-4 cursor-pointer items-center justify-center rounded-md text-text-positive-weak outline-none transition-[color,transform] hover:text-text-positive focus-visible:text-primary-strong focus-visible:[&>svg]:scale-125 [&>svg]:size-3.5 [&>svg]:transition-transform"
                    onClick={onClear}
                  >
                    <XIcon aria-hidden="true" />
                  </button>
                )}
              </div>

              {_touched && showErrorMessage && <FieldError id={errorId} className="mt-1" errors={field.state.meta.errors} />}
              <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
            </div>
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    );
  }
);

ComboboxField.displayName = 'ComboboxField';
