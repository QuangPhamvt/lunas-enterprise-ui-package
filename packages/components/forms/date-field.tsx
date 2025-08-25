"use client"
import type { FieldPath, FieldValues } from 'react-hook-form'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  description?: string
  isShowErrorMsg?: boolean
  modal?: boolean
}

export const DateField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Date Field',
  placeholder = 'Select a date',
  description = '',
  isShowErrorMsg = false,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <Popover modal>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? format(field.value, 'PPP') : <span> {placeholder || 'Pick a date'}</span>}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date?.toISOString())
                }}
                captionLayout="dropdown"
                disabled={(date) => date < new Date('2022-01-01')}
              />
            </PopoverContent>
          </Popover>
          {!!description && <FormDescription>{description}</FormDescription>}
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
