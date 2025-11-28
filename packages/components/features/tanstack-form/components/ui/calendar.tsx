'use client';
import { type HTMLAttributes, type ThHTMLAttributes, useEffect, useRef } from 'react';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button.variants';

import { type CalendarWeek, type CustomComponents, type DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

const CalendarRoot = ({
  rootRef,
  className,
  ...props
}: {
  rootRef?: React.Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLDivElement>) => {
  return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
};

const CalendarChevron = (props: { className?: string; size?: number; disabled?: boolean; orientation?: 'up' | 'down' | 'left' | 'right' }) => {
  if (props.orientation === 'left') {
    return <ChevronLeftIcon size={16} className={props.className} {...props} />;
  }

  if (props.orientation === 'right') {
    return <ChevronRightIcon size={16} className={props.className} {...props} />;
  }

  return <ChevronDownIcon size={16} className={props.className} {...props} />;
};

const CalendarDayButton = ({ className, day, modifiers, color: _, ...props }: React.ComponentProps<typeof DayButton>) => {
  const defaultClassNames = getDefaultClassNames();

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      color="muted"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex aspect-square size-9 flex-col rounded font-normal text-sm tabular-nums leading-none',
        'data-[selected-single=true]:bg-primary',
        'data-[selected-single=true]:text-white',
        'data-[range-middle=true]:bg-muted-muted',
        'data-[range-middle=true]:text-text-positive',
        'data-[range-start=true]:bg-primary-muted',
        'data-[range-start=true]:text-text-positive-strong',
        'data-[range-end=true]:bg-primary',
        'data-[range-end=true]:text-text-positive-strong',
        'group-data-[focused=true]/day:border-primary-strong',
        'group-data-[focused=true]/day:relative',
        'group-data-[focused=true]/day:z-10',
        'data-[range-end=true]:rounded',
        'data-[range-end=true]:rounded-r',
        'data-[range-middle=true]:rounded-none',
        'data-[range-start=true]:rounded',
        'data-[range-start=true]:rounded-l',
        '[&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
};

const CalendarWeekNumber = ({
  children,
  ...props
}: {
  week: CalendarWeek;
} & ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td {...props}>
      <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
    </td>
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-3',
        '[--cell-size:--spacing(8)]',
        'in-data-[slot=card-content]:bg-transparent',
        'in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date => date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: 'outline', color: 'muted' }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', color: 'muted' }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next
        ),
        month_caption: cn('flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)', defaultClassNames.month_caption),
        dropdowns: cn('w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5', defaultClassNames.dropdowns),
        dropdown_root: cn(
          'relative has-focus:border-primary-strong border border-border-weak shadow-xs has-focus:ring-primary-weak has-focus:ring-[3px] rounded',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label' && 'text-sm',
          captionLayout !== 'label' && 'rounded shadow-xs px-2 flex items-center gap-0.5 text-sm h-8 [&>svg]:text-text-positive [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn('text-text-positive rounded flex-1 font-normal text-[0.8rem] select-none', defaultClassNames.weekday),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn('text-[0.8rem] select-none text-text-positive', defaultClassNames.week_number),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l [&:last-child[data-selected=true]_button]:rounded-r group/day aspect-square select-none',
          defaultClassNames.day
        ),
        range_start: cn('rounded-l bg-muted-muted', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r bg-muted-muted', defaultClassNames.range_end),
        today: cn('bg-muted-muted text-text-positive rounded data-[selected=true]:rounded-none', defaultClassNames.today),
        outside: cn('[&>button]:text-text-positive-muted aria-selected:text-text-positive'),
        disabled: cn('bg-muted-muted text-text-positive opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot as CustomComponents['Root'],
        Chevron: CalendarChevron as CustomComponents['Chevron'],
        DayButton: CalendarDayButton as CustomComponents['DayButton'],
        WeekNumber: CalendarWeekNumber as CustomComponents['WeekNumber'],
        ...components,
      }}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
