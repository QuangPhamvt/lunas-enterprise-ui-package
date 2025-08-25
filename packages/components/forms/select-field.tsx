"use client"
import type { FieldPath, FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  disabledValues?: string[]
  options?: { value: string; label: string }[]
  isShowLabel?: boolean
  isShowErrorMsg?: boolean
  modal?: boolean
  description?: string
  className?: string
}
export const SelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Select Field',
  placeholder = 'Select an option',
  disabledValues = [],
  options = [],
  isShowLabel = true,
  isShowErrorMsg = false,
  description = '',
  className = '',
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {isShowLabel && <FormLabel>{label}</FormLabel>}
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} disabled={disabledValues.includes(option.value)} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!!description && <FormDescription>{description}</FormDescription>}
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
