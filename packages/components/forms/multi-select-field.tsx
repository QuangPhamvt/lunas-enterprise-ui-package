'use client'
import type { FieldPath, FieldValues } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { MultipleSelector, type Option } from '../ui/multi-select'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  isShowLabel?: boolean
  isShowErrorMsg?: boolean
  label?: string
  description?: string
  placeholder?: string
  options?: { value: string; label: string }[]
  onAdd?: () => void
}
export const MultiSelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Multi Select Field',
  isShowLabel = true,
  isShowErrorMsg,
  placeholder = 'Select options',
  description = '',
  options = [],
  onAdd,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field: { value, onChange } }) => {
        const val = options.filter((option) => value?.includes(option.value))
        const handleOnChange = (value: Option[]) => {
          const selectedValues = value.map((v) => v.value)
          onChange(selectedValues)
        }
        return (
          <FormItem className="w-full gap-0">
            {isShowLabel && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <MultipleSelector
                placeholder={placeholder}
                emptyIndicator="No options available"
                value={val}
                options={options}
                onChange={handleOnChange}
                onAddNewItem={onAdd}
              />
            </FormControl>
            {!!description && <FormDescription>{description}</FormDescription>}
            {isShowErrorMsg && <FormMessage />}
          </FormItem>
        )
      }}
    />
  )
}
