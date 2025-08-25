"use client"
import { type FieldPath, type FieldValues, useWatch } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  isShowErrorMsg?: boolean
  isShowCount?: boolean
  rows?: number
  onValueChange?: (value: string) => void
}
export const TextareaField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Textarea Field',
  placeholder = 'Enter text here',
  isShowErrorMsg = false,
  isShowCount = false,
  description,
  rows = 3,
  onValueChange,
}: Props<TFieldValues>) => {
  const valueWatch = useWatch({ name })

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              className="w-full"
              rows={rows}
              onValueChange={onValueChange}
            />
          </FormControl>
          {isShowCount && (
            <div className="text-muted-foreground text-end text-xs">{valueWatch?.length ?? 0} characters</div>
          )}
          {!!description && <FormDescription>{description}</FormDescription>}
          {isShowErrorMsg && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
