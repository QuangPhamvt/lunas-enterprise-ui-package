import { useMemo } from 'react';

import { CalendarDaysIcon } from 'lucide-react';

import { endOfToday, endOfTomorrow, endOfYesterday, format, lastDayOfMonth, startOfMonth, subDays } from '@customafk/react-toolkit/date-fns';
import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';

import { useTanStackFieldContext } from '../../tanstack-form';
import { Calendar } from '../ui/calendar';
import { Field, FieldContent, FieldContentMain, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type DateFieldProps = {
  label: string;
  description?: string;
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal' | 'responsive';
};

export const DateField: React.FC<DateFieldProps> = ({ label, description, placeholder, orientation }) => {
  const field = useTanStackFieldContext<Date | null>();

  const _isInvalid = useMemo(() => {
    return field.state.meta.isTouched && !field.state.meta.isValid;
  }, [field.state.meta.isTouched, field.state.meta.isValid]);

  return (
    <FieldGroup className="px-4">
      <Field orientation={orientation} data-invalid={_isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          <FieldDescription>{description}</FieldDescription>
        </FieldContent>

        <FieldContentMain className="flex justify-end">
          <div className="flex w-full flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  color="muted"
                  size="lg"
                  className={cn(
                    'flex items-center justify-between rounded font-normal outline-border',
                    'hover:bg-transparent',
                    'focus:outline-1 focus:outline-primary-strong focus:ring-4 focus:ring-primary-weak',
                    'data-[state=open]:text-text-positive-muted',
                    'data-[state=open]:outline-1',
                    'data-[state=open]:outline-primary-strong',
                    'data-[state=open]:ring-4',
                    'data-[state=open]:ring-primary-weak',
                    field.state.value === null && 'text-text-positive-muted'
                  )}
                >
                  <p>{field.state.value === null ? placeholder || 'Select date' : format(field.state.value, 'PPPP')}</p>
                  <CalendarDaysIcon strokeWidth={1} />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" side="bottom" className="flex w-fit overflow-y-auto rounded p-0" onBlur={field.handleBlur}>
                <div className="flex h-full flex-col space-y-2 border-r border-r-border p-2 [&>button]:justify-start [&>button]:text-sm">
                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(endOfToday());
                    }}
                  >
                    Today
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(endOfTomorrow());
                    }}
                  >
                    Tomorrow
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(endOfYesterday());
                    }}
                  >
                    Yesterday
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(subDays(endOfToday(), 3));
                    }}
                  >
                    Last 3 Days
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(subDays(endOfToday(), 7));
                    }}
                  >
                    Last 7 Days
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(subDays(endOfToday(), 30));
                    }}
                  >
                    Last 30 Days
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(startOfMonth(endOfToday()));
                    }}
                  >
                    This Month
                  </Button>

                  <Button
                    variant="ghost"
                    color="muted"
                    className="w-32"
                    onClick={() => {
                      field.handleChange(lastDayOfMonth(endOfToday()));
                    }}
                  >
                    Last Month
                  </Button>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="border-b border-b-border p-2">
                    <Calendar
                      mode="single"
                      selected={field.state.value ?? undefined}
                      onSelect={date => {
                        if (!date) return;
                        field.handleChange(date);
                      }}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </FieldContentMain>
      </Field>
      <FieldSeparator />
    </FieldGroup>
  );
};
