'use client';

import { useState } from 'react';

import { ChevronDownIcon, PackagePlusIcon } from 'lucide-react';
import type z from 'zod';

import { useIsMobile } from '@customafk/react-toolkit/hooks/useMobile';
import { cn } from '@customafk/react-toolkit/utils';

import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { TanStackFormSelectFieldSchema } from '../../schema';
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

/**
 * Props for the SelectField component, derived from the TanStack Form select field schema.
 */
type Props = Pick<
  z.input<typeof TanStackFormSelectFieldSchema>,
  'label' | 'description' | 'placeholder' | 'defaultValue' | 'options' | 'tooltip' | 'helperText' | 'orientation' | 'clearable'
> & {
  /** Marks the field as required; triggers an empty-state indicator when the value is null. */
  required?: boolean;
};

/**
 * A TanStack Form-connected single-select dropdown field backed by Radix UI Select on desktop
 * and a bottom Drawer sheet on mobile for easier touch interaction.
 *
 * @example
 * import { SelectField } from '@customafk/lunas-ui/features/tanstack-form';
 *
 * <form.Field name="country">
 *   {() => (
 *     <SelectField
 *       label="Country"
 *       placeholder="Select a country"
 *       options={[
 *         { value: 'jp', label: 'Japan' },
 *         { value: 'vn', label: 'Vietnam' },
 *       ]}
 *       required
 *     />
 *   )}
 * </form.Field>
 */
export const SelectField: React.FC<Props> = ({
  label,
  description,
  placeholder,
  orientation = 'responsive',
  tooltip,
  options,
  helperText,
  required = false,
}) => {
  const field = useTanStackFieldContext<string | null>();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const _isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const _isEmpty = required && field.state.value === null;
  const _errors = field.state.meta.errors;

  const selectedLabel = options.find(o => o.value === field.state.value)?.label;

  return (
    <FieldGroup className="gap-y-4 px-4">
      <Field orientation={orientation} data-invalid={_isInvalid}>
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
                aria-invalid={_isInvalid ? 'true' : undefined}
                onBlur={field.handleBlur}
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  'flex w-full items-center justify-between',
                  'outline-1 outline-border -outline-offset-1',
                  'gap-2 rounded bg-transparent px-3 py-2',
                  'rounded shadow-input transition-all cursor-pointer whitespace-nowrap text-sm',
                  'focus-visible:outline-primary-strong focus-visible:ring-4 focus-visible:ring-primary-weak',
                  _isInvalid && 'outline-danger bg-danger-bg-subtle ring-danger-weak',
                  !field.state.value && 'text-text-positive-muted'
                )}
              >
                <span className="line-clamp-1">{selectedLabel ?? placeholder}</span>
                <ChevronDownIcon size={16} className="shrink-0 opacity-50" />
              </button>

              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{label ?? placeholder ?? 'Select an option'}</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col overflow-y-auto pb-safe-bottom">
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
                        No options available
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <Select value={field.state.value ?? ''} onValueChange={field.handleChange}>
              <SelectTrigger aria-invalid={_isInvalid ? 'true' : undefined} onBlur={field.handleBlur}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {!!options.length &&
                  options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                {!options.length && (
                  <div className="flex items-center justify-center gap-x-2 rounded border border-border bg-muted-muted px-4 py-6.5 text-center text-sm text-text-positive-weak">
                    <PackagePlusIcon strokeWidth={1} />
                    No options available
                  </div>
                )}
              </SelectContent>
            </Select>
          )}

          <div className="mt-1 flex w-full flex-col items-end justify-end">
            <FieldError errors={_errors} />
          </div>

          <FieldNote isShow={!!helperText}>{helperText}</FieldNote>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
