'use client';

import { useMemo, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';
import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldTooltip } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTanStackFieldContext } from '../../tanstack-form';

/**
 * Props for the ComboboxField component.
 */
type ComboboxFieldProps = {
  /** Visible label rendered above the combobox trigger. */
  label: string;
  /** Optional supporting text displayed beneath the label. */
  description?: string;
  /** Placeholder shown inside the trigger button and the search input when no value is selected. */
  placeholder?: string;
  /** Tooltip content rendered next to the label via an icon button. */
  tooltip?: string;
  /** Layout orientation of the label/field pair. Defaults to `'responsive'`. */
  orientation?: 'horizontal' | 'vertical' | 'responsive';
  /** Array of selectable options, each with a string `value` and display `label`. */
  options: Array<{ value: string; label: string }>;
};

/**
 * A TanStack Form-connected searchable combobox field powered by Radix UI Popover
 * and a Command menu on desktop, and a bottom Drawer sheet with Command search on mobile.
 *
 * @example
 * import { ComboboxField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="city">
 *   {() => (
 *     <ComboboxField
 *       label="City"
 *       placeholder="Search city…"
 *       options={[
 *         { value: 'tokyo', label: 'Tokyo' },
 *         { value: 'hanoi', label: 'Hanoi' },
 *       ]}
 *     />
 *   )}
 * </form.Field>
 */
export const ComboboxField: React.FC<ComboboxFieldProps> = ({ label, description, placeholder, tooltip, orientation = 'responsive', options }) => {
  const field = useTanStackFieldContext<string | null>();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const _isInvalid = useMemo(() => {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }, [field.state.meta.isTouched, field.state.meta.isValid]);

  const _errors = useMemo(() => {
    return field.state.meta.errors;
  }, [field.state.meta.errors]);

  const selectedLabel = options.find(({ value }) => value === field.state.value)?.label;

  const triggerButton = (onClick?: () => void) => (
    <Button
      variant="outline"
      color="muted"
      size="lg"
      className={cn(
        'flex items-center justify-start rounded outline-border',
        'hover:bg-transparent',
        'focus:outline-1 focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',
        'data-[state=open]:text-text-positive-muted data-[state=open]:outline-1 data-[state=open]:outline-primary-strong data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
        !field.state.value && 'text-text-positive-muted'
      )}
      onClick={onClick}
    >
      {selectedLabel ? (
        <p className="flex min-w-0 flex-1 items-center gap-2 text-start">{selectedLabel}</p>
      ) : (
        <p className="flex-1 text-start text-text-positive-muted">{placeholder}</p>
      )}
    </Button>
  );

  const commandList = (
    <Command className="border-none">
      <CommandInput placeholder={placeholder ?? 'Search…'} />
      <CommandList>
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
      <CommandEmpty className='min-h-30 flex items-center justify-center text-sm text-text-positive-weak'>Không tìm thấy kết quả nào phù hợp.</CommandEmpty>
    </Command>
  );

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} data-invalid={_isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>
            {label}
            {tooltip && <FieldTooltip tooltip={tooltip} />}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain className="flex justify-end">
          <div className="flex w-full flex-col">
            {isMobile ? (
              <>
                {triggerButton(() => setDrawerOpen(true))}
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{label}</DrawerTitle>
                    </DrawerHeader>
                    <div className="overflow-y-auto pb-safe-bottom">{commandList}</div>
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

            <div className="mt-1 flex w-full flex-col items-end justify-end">
              <FieldError errors={_errors} />
            </div>
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
