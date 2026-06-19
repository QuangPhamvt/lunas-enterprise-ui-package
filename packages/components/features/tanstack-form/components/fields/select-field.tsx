'use client';

import { memo, useId, useState } from 'react';

import { useSelector } from '@tanstack/react-store';

import { ChevronDownIcon, PackagePlusIcon, XIcon } from 'lucide-react';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

import type { SelectFieldProps as Props } from '../../types';

export const SelectField = memo<Props>(
  ({
    label,
    description,
    placeholder,
    orientation = 'responsive',
    tooltip,
    options,
    helperText,
    clearable = false,
    required = false,
    disabled = false,
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

    const selectedLabel = options.find(o => o.value === field.state.value)?.label;

    const onClear = () => {
      field.handleChange(null);
      field.handleBlur();
    };

    return (
      <FieldGroup className="gap-y-4 px-4">
        <Field orientation={orientation} data-invalid={_invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name} aria-required={_isEmpty}>
              {label}
              {tooltip && <FieldTooltip tooltip={tooltip} />}
            </FieldLabel>
            <FieldDescription>{description}</FieldDescription>
          </FieldContent>

          <FieldContentMain className="flex flex-col">
            {isMobile ? (
              <>
                <button
                  id={field.name}
                  type="button"
                  disabled={isDisabled}
                  aria-invalid={_invalid ? 'true' : undefined}
                  aria-describedby={errorId}
                  onBlur={field.handleBlur}
                  onClick={() => setDrawerOpen(true)}
                  className={cn(
                    'flex w-full items-center justify-between',
                    'outline-1 outline-border -outline-offset-1',
                    'gap-2 rounded bg-transparent px-3 py-2',
                    'rounded shadow-input transition-all cursor-pointer whitespace-nowrap text-sm',
                    'focus-visible:outline-primary-strong focus-visible:ring-4 focus-visible:ring-primary-weak',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    _invalid && 'outline-danger bg-danger-bg-subtle ring-danger-weak',
                    !field.state.value && 'text-text-positive-muted'
                  )}
                >
                  <span className="line-clamp-1">{selectedLabel ?? placeholder}</span>
                  <ChevronDownIcon size={16} className="shrink-0 opacity-50" />
                </button>

                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{label ?? placeholder ?? 'Chọn một tùy chọn'}</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col overflow-y-auto pb-safe-bottom">
                      {_showClear && (
                        <DrawerClose asChild>
                          <button
                            type="button"
                            className="flex w-full items-center gap-x-2 px-4 py-3 text-left text-sm text-danger-strong transition-colors hover:bg-danger-bg-subtle"
                            onClick={onClear}
                          >
                            <XIcon size={14} />
                            Xóa lựa chọn
                          </button>
                        </DrawerClose>
                      )}
                      {options.length > 0 ? (
                        options.map(option => (
                          <DrawerClose key={option.value} asChild>
                            <button
                              type="button"
                              className={cn(
                                'flex w-full items-center px-4 py-3 text-left text-sm transition-colors',
                                'hover:bg-muted-muted active:bg-muted-muted',
                                field.state.value === option.value && 'bg-primary-bg-subtle font-medium text-primary'
                              )}
                              onClick={() => {
                                field.handleChange(option.value);
                                setDrawerOpen(false);
                              }}
                            >
                              {option.label}
                            </button>
                          </DrawerClose>
                        ))
                      ) : (
                        <div className="flex items-center justify-center gap-x-2 px-4 py-8 text-center text-sm text-text-positive-weak">
                          <PackagePlusIcon strokeWidth={1} />
                          Không có tùy chọn
                        </div>
                      )}
                    </div>
                  </DrawerContent>
                </Drawer>
              </>
            ) : (
              <div className="relative">
                <Select value={field.state.value ?? ''} disabled={isDisabled} onValueChange={field.handleChange}>
                  <SelectTrigger aria-invalid={_invalid ? 'true' : undefined} aria-describedby={errorId} onBlur={field.handleBlur}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.length > 0 ? (
                      options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="flex items-center justify-center gap-x-2 rounded border border-border bg-muted-muted px-4 py-6.5 text-center text-sm text-text-positive-weak">
                        <PackagePlusIcon strokeWidth={1} />
                        No options available
                      </div>
                    )}
                  </SelectContent>
                </Select>

                {_showClear && (
                  <button
                    type="button"
                    aria-label="Xóa lựa chọn"
                    className="absolute right-7 top-1/2 -translate-y-1/2 flex size-4 cursor-pointer items-center justify-center rounded-md text-text-positive-weak outline-none transition-[color,transform] hover:text-text-positive focus-visible:text-primary-strong focus-visible:[&>svg]:scale-125 [&>svg]:size-3.5 [&>svg]:transition-transform"
                    onClick={onClear}
                  >
                    <XIcon aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            {_touched && showErrorMessage && <FieldError id={errorId} className="mt-1" errors={field.state.meta.errors} />}

            <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
          </FieldContentMain>
        </Field>
        <FieldSeparator />
      </FieldGroup>
    );
  }
);

SelectField.displayName = 'SelectField';
