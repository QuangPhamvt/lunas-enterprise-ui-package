'use client';

import { useId } from 'react';

import { useSelector } from '@tanstack/react-store';
import { CalendarDaysIcon } from 'lucide-react';

import { format } from '@customafk/react-toolkit/date-fns';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useTanStackFieldContext } from '../../tanstack-form';
import { FieldError } from '../ui/field';

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

export const SimpleDateField: React.FC<Props> = ({ label, placeholder, required, disabled, minDate, maxDate }) => {
  const id = useId();
  const { form, name, state, handleBlur, handleChange } = useTanStackFieldContext<Date | null>();

  const isSubmitting = useSelector(form.store, ({ isSubmitting }) => isSubmitting);

  const _invalid = state.meta.isTouched && !state.meta.isValid;
  const isDisabled = disabled || isSubmitting;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-danger-strong">*</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            color="muted"
            size="lg"
            disabled={isDisabled}
            aria-invalid={_invalid}
            className={cn(
              'flex w-full items-center justify-between rounded outline-border font-normal',
              'hover:bg-transparent',
              'focus:outline-1 focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',
              'data-[state=open]:outline-1 data-[state=open]:outline-primary-strong data-[state=open]:ring-4 data-[state=open]:ring-primary-weak',
              state.value === null && 'text-text-positive-muted'
            )}
          >
            <span>{state.value ? format(state.value, 'PPP') : (placeholder ?? 'Select date')}</span>
            <CalendarDaysIcon strokeWidth={1} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" side="bottom" className="w-fit p-0 rounded" onBlur={handleBlur}>
          <Calendar
            mode="single"
            selected={state.value ?? undefined}
            hidden={{
              before: minDate ?? new Date(1900, 0, 1),
              after: maxDate ?? new Date(2100, 11, 31),
            }}
            onSelect={date => {
              if (!date) return;
              handleChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
      {_invalid && <FieldError errors={state.meta.errors} />}
    </div>
  );
};
