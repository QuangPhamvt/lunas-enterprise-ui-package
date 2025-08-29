'use client'
import type { FieldPath, FieldValues } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Switch } from '../ui/switch'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  isShowErrorMsg?: boolean
}
export const SwitchField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Switch Field',
  description,
  isShowErrorMsg = false,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <div className="spage-y-1">
          <FormItem className={cn('border-border-weak flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs')}>
            <div className="space-y-0.5">
              <FormLabel className="cursor-pointer text-sm">{label}</FormLabel>
              {description && <FormDescription className="text-xs">{description}</FormDescription>}
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
          {isShowErrorMsg && <FormMessage />}
        </div>
      )}
    />
  )
}
