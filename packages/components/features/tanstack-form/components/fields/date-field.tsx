'use client';

import { memo, useId, useState } from 'react';

import { useSelector } from '@tanstack/react-store';

import { CalendarDaysIcon } from 'lucide-react';

import { endOfToday, endOfTomorrow, endOfYesterday, format, lastDayOfMonth, startOfMonth, subDays } from '@customafk/react-toolkit/date-fns';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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

import type { DateFieldProps as Props } from '../../types';

export const DateField = memo<Props>(
  ({
    label,
    description,
    placeholder,
    orientation = 'responsive',
    tooltip,
    helperText,
    showErrorMessage = true,
    required = false,
    disabled = false,
    minDate,
    maxDate,
  }) => {
    const errorId = useId();
    const field = useTanStackFieldContext<Date | null>();
    const [popoverOpen, setPopoverOpen] = useState(false);

    const isSubmitting = useSelector(field.form.store, ({ isSubmitting }) => isSubmitting);
    const isDisabled = disabled || isSubmitting;

    const _touched = field.state.meta.isDirty || field.state.meta.isTouched;
    const _isInvalid = _touched && !field.state.meta.isValid;
    const _isEmpty = required && field.state.value === null;

    const handleSelect = (date: Date) => {
      field.handleChange(date);
      setPopoverOpen(false);
    };

    return (
      <FieldGroup className="px-4">
        <Field orientation={orientation} data-invalid={_isInvalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name} aria-required={_isEmpty}>
              {label}
              {tooltip && <FieldTooltip tooltip={tooltip} />}
            </FieldLabel>
            <FieldDescription>{description}</FieldDescription>
          </FieldContent>

          <FieldContentMain className="flex flex-col space-y-1">
            <div className="flex w-full flex-col">
              <Popover
                open={popoverOpen}
                onOpenChange={open => {
                  setPopoverOpen(open);
                  if (!open) field.handleBlur();
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    color="muted"
                    size="lg"
                    disabled={isDisabled}
                    aria-invalid={_isInvalid ? true : undefined}
                    aria-describedby={errorId}
                    className={cn(
                      'flex items-center justify-between rounded font-normal outline-border',
                      'hover:bg-transparent',
                      'focus:outline-1 focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',
                      'data-[state=open]:outline-1 data-[state=open]:outline-primary-strong data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
                      field.state.value === null && 'text-text-positive-muted',
                      _isInvalid && 'outline-danger bg-danger-bg-subtle ring-4 ring-danger-weak'
                    )}
                  >
                    <p>{field.state.value === null ? (placeholder ?? 'Select date') : format(field.state.value, 'PPPP')}</p>
                    <CalendarDaysIcon strokeWidth={1} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" side="bottom" className="flex w-fit min-w-0 overflow-y-auto rounded p-0">
                  <div className="flex h-full flex-col space-y-2 border-r border-r-border p-2 [&>button]:justify-start [&>button]:text-sm">
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(endOfToday())}>
                      Hôm nay
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(endOfTomorrow())}>
                      Ngày mai
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(endOfYesterday())}>
                      Hôm qua
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(subDays(endOfToday(), 3))}>
                      3 ngày qua
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(subDays(endOfToday(), 7))}>
                      7 ngày qua
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(subDays(endOfToday(), 30))}>
                      30 ngày qua
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(startOfMonth(endOfToday()))}>
                      Tháng này
                    </Button>
                    <Button variant="ghost" color="muted" className="w-32" onClick={() => handleSelect(lastDayOfMonth(endOfToday()))}>
                      Tháng trước
                    </Button>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="min-w-73 border-b border-b-border p-2">
                      <Calendar
                        mode="single"
                        selected={field.state.value ?? undefined}
                        hidden={{
                          before: minDate ?? new Date(1900, 0, 1),
                          after: maxDate ?? new Date(2100, 11, 31),
                        }}
                        onSelect={date => {
                          if (!date) return;
                          handleSelect(date);
                        }}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

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

DateField.displayName = 'DateField';
