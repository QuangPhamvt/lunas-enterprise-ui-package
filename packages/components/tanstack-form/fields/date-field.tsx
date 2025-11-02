import { Activity } from 'react';

import { CalendarIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFieldContext } from '../config';
import type { CommonFieldProps } from '../types';

type Props = CommonFieldProps;
export const DateField: React.FC<Props> = ({ isNested = false, isShowLabel = true, isShowErrorMsg = true, label, description, placeholder }) => {
  const { name, state, handleChange, handleBlur } = useFieldContext<Date>();
  const isError = state.meta.isTouched && !state.meta.isValid;

  if (isNested) {
    return (
      <Field orientation="vertical" className="gap-1">
        <Activity mode={label || description ? 'visible' : 'hidden'}>
          <FieldContent>
            <FieldLabel htmlFor={name} className="text-xs">
              {label}
            </FieldLabel>
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
                <Activity mode={state.value ? 'visible' : 'hidden'}>{format(state.value, 'PPP')}</Activity>
                <Activity mode={state.value ? 'hidden' : 'visible'}>{placeholder || 'Pick a date'}</Activity>
                <CalendarIcon className="text-text-positive-weak ml-auto size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit p-0" onBlur={handleBlur}>
              <Calendar
                mode="single"
                selected={state.value}
                onSelect={date => {
                  if (!date) return;
                  handleChange(date);
                }}
                captionLayout="dropdown"
                disabled={date => date < new Date('2022-01-01')}
              />
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
    <FieldGroup>
      <Field orientation="responsive" data-invalid={isError}>
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
          <div className="w-full md:max-w-62 flex flex-col space-y-0.5">
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
                  <Activity mode={state.value ? 'visible' : 'hidden'}>{format(state.value, 'PPP')}</Activity>
                  <Activity mode={state.value ? 'hidden' : 'visible'}>{placeholder || 'Pick a date'}</Activity>
                  <CalendarIcon className="text-text-positive-weak ml-auto size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit p-0" onBlur={handleBlur}>
                <Calendar
                  mode="single"
                  selected={state.value}
                  onSelect={date => {
                    if (!date) return;
                    handleChange(date);
                  }}
                  captionLayout="dropdown"
                  disabled={date => date < new Date('2022-01-01')}
                />
              </PopoverContent>
            </Popover>
            <Activity mode={isShowErrorMsg ? 'visible' : 'hidden'}>
              <FieldError errors={state.meta.errors} />
            </Activity>
          </div>
        </div>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
