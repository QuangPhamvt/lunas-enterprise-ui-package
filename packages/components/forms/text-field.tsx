'use client'
import React from 'react'
import { type FieldPath, type FieldValues, useWatch } from 'react-hook-form'
import { XIcon } from 'lucide-react'

import { cn } from '@customafk/react-toolkit/utils'

import { Flex } from '../layouts/flex'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from '../ui/form'
import { Input } from '../ui/input'

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  placeholder?: string
  isShowLabel?: boolean
  isShowClearButton?: boolean
  isShowErrorMsg?: boolean
  isShowCount?: boolean
  className?: string
  onValueChange?: (value: string) => void
}
export const TextField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = 'Text Field',
  placeholder = 'Enter text here',
  isShowLabel = true,
  isShowClearButton = false,
  isShowErrorMsg = false,
  isShowCount = false,
  description,
  className = '',
  onValueChange,
}: Props<TFieldValues>) => {
  const { resetField } = useFormField()
  const valueWatch = useWatch({ name })

  const handleClearInput = React.useCallback(() => {
    resetField(name)
  }, [resetField, name])

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full gap-0', isShowCount || (!!description && 'space-y-1'), className)}>
          {isShowLabel && <FormLabel>{label}</FormLabel>}
          <div className="relative">
            <FormControl>
              <Input {...field} placeholder={placeholder} className={cn('w-full', isShowClearButton && 'pr-9')} onValueChange={onValueChange} />
            </FormControl>
            {isShowClearButton && valueWatch && (
              <button
                type="button"
                className="text-text-positive-weak hover:text-text-positive focus-visible:ring-border absolute inset-y-0 end-0 flex h-full w-8 cursor-pointer items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-2"
                aria-label="Clear input"
                onClick={handleClearInput}
              >
                <XIcon size={14} aria-hidden="true" />
              </button>
            )}
          </div>
          <Flex width="full" padding="none" justify="end">
            {isShowErrorMsg && <FormMessage className="grow" />}
            {isShowCount && <div className="text-text-positive-weak text-end text-xs">{valueWatch?.length ?? 0} characters</div>}
          </Flex>
          {!!description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
