'use client'
import React from 'react'

import { cn } from '@customafk/react-toolkit/utils'

import { Input } from '../input'

const createValidationRegex = (allowNegative: boolean): RegExp => {
  return allowNegative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/
}

const formatNumberWithCommas = (num: number | string): string => {
  return Number(num).toLocaleString()
}

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * Description: Value for the text field
   *
   * Default: ''
   *
   * Usage: Value for the text field
   */
  value?: string | number
  /**
   * Description: Disabled state of the text field
   *
   * Default: `false`
   *
   * Usage: Disabled state of the text field
   *
   * Note: If true, the text field will be disabled
   */
  disabled?: boolean
  /**
   * Description: Readonly state of the text field
   *
   * Default: `false`
   *
   * Usage: Readonly state of the text field
   */
  readonly?: boolean
  /**
   * Description: Allow negative value for the text field
   *
   * Default: `false`
   *
   * Usage: Allow negative value for the text field
   */
  allowNegative?: boolean
  /**
   * Description: Decimal point for the text field
   *
   * Default: `undefined`
   *
   * Usage: Ex: [12,3] => console.log(2323.23) // True
   *
   * Note: IF use this prop, `numberAfterDecimalPoint` will be ignored
   */
  decimal?: [number, number]
  /**
   * Description: Rounding rule for the text field
   *
   * Default: `nearest`
   *
   * Usage: Rounding rule for the text field
   */
  roundingRule?: 'up' | 'down' | 'nearest' | 'none'
  /**
   * Description: Number of digits after the decimal point
   *
   * Default: `2`
   *
   * Usage: Number of digits after the decimal point
   */
  numberAfterDecimalPoint?: number
  /**
   * Description: Placeholder for the text field
   *
   * Default: ''
   *
   * Usage: Placeholder for the text field
   */
  placeholder?: string
  /**
   * Description: Unit text for the text field
   *
   * Default: ''
   *
   * E.g. 'kg', 'm', 'USD'...
   */
  unitText?: string
  /**
   * Description: Invalid state of the text field
   *
   * Default: `false`
   *
   * Usage: Invalid state of the text field
   */
  invalid?: boolean
  /**
   * Description: Precision for the text field
   *
   * Default: `undefined`
   * E.g.
   * - 2.13 => 2.1 when precision is 1
   * - 2.134 => 2.13 when precision is 2
   */
  precision?: number
  /**
   * Description: Callback function for the value change
   * Usage: Callback function for the value change
   */
  onValueChange?: (value?: number) => void
  onBlur?: () => void
}
/**
 * ## Unit Text Field Component
 *
 * **Description**: This component is to display common text field with unit
 *
 * **Usage**: Text field with unit example: 1000 (kg), 100 (m), 1000 (USD)...
 */
export const NumberInput: React.FC<IProps> = ({
  disabled = false,
  readonly = false,
  allowNegative = false,
  numberAfterDecimalPoint = 2,
  roundingRule = 'none',
  value: initialValue = '',
  unitText,
  decimal,
  placeholder,
  precision,
  onChange,
  onValueChange,
  onBlur,
  ...props
}) => {
  const _unitRef = React.useRef<HTMLSpanElement>(null)
  const _inputRef = React.useRef<HTMLInputElement>(null)

  const [value, setValue] = React.useState<string>(initialValue.toString())

  // Memoized values for validation and formatting
  const maxDecimalPlaces = decimal?.[1] ?? numberAfterDecimalPoint
  const maxIntegerLength = decimal && decimal[0] - decimal[1]
  const validationRegex = React.useMemo(() => createValidationRegex(allowNegative), [allowNegative])

  // Validation functions
  const isValidDecimalLength = React.useCallback(
    (value: string): boolean => {
      if (!maxDecimalPlaces && value.includes('.')) return false
      const decimalPart = value.split('.')[1]
      return !decimalPart || decimalPart.length <= maxDecimalPlaces
    },
    [maxDecimalPlaces],
  )
  const isValidFormat = React.useCallback(
    (value: string): boolean => {
      if (!decimal || value === '-') return true
      const [integerPart, decimalPart = ''] = value.split('.')

      return decimalPart.length <= decimal[1] && (integerPart.startsWith('-') ? integerPart.length - 1 : integerPart.length) <= maxIntegerLength!
    },
    [decimal, maxIntegerLength],
  )
  const customRoundedValue = React.useCallback(
    (value: number, precision: number) => {
      if (roundingRule === 'none') return value

      const factor = Math.pow(10, precision)
      const scaledValue = value * factor

      switch (roundingRule) {
        case 'up':
          return Math.ceil(scaledValue) / factor
        case 'down':
          return Math.floor(scaledValue) / factor
        case 'nearest': {
          if (scaledValue % 1 < 0.1) return Math.floor(scaledValue) / factor
          if (scaledValue % 1 >= 0.59) return Math.ceil(scaledValue) / factor
          return (Math.floor(scaledValue) + 0.5) / factor
        }
        default:
          return value
      }
    },
    [roundingRule],
  )
  const isDecimalPointGreaterThanLimit = React.useCallback(
    (value: string) => (!numberAfterDecimalPoint && value.includes('.')) || value.split('.')[1]?.length > numberAfterDecimalPoint,
    [numberAfterDecimalPoint],
  )
  const formattedValue = React.useCallback(
    (val: string) => {
      if (val === '0') return '0'
      if (!Number(val)) return ''

      const numValue = parseFloat(val)
      const effectivePrecision = Math.min(maxDecimalPlaces - 1, precision || 0)
      const roundedValue = customRoundedValue(numValue, effectivePrecision).toString()
      const [integerPart, decimalPart = ''] = roundedValue.split('.')
      const formattedInteger = formatNumberWithCommas(integerPart)
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger
    },
    [customRoundedValue, maxDecimalPlaces, precision],
  )
  // Validate decimal point is less than or equal to the limit
  const validateDecimalPoint = React.useCallback(
    (value: string) => {
      if (!decimal || value === '-') return true

      const [integerPart, decimalPart = ''] = value.split('.')
      const integerLength = integerPart.startsWith('-') ? integerPart.length - 1 : integerPart.length
      const maxIntegerLength = decimal[0] - decimal[1]

      return decimalPart.length <= decimal[1] && integerLength <= maxIntegerLength
    },
    [decimal],
  )
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Don't prevent default behavior of input change
      onChange?.(e)

      // Custom event handler for value change
      const { value: inputValue } = e.target

      // Handle empty input
      if (!inputValue) {
        onValueChange?.(undefined)
        setValue('')
        return
      }

      // Handle zero and negative zero
      const isZero = inputValue === '0'
      const isNegativeZero = inputValue === '-' && allowNegative
      if (isZero || isNegativeZero) {
        onValueChange?.(0)
        setValue(inputValue)
        return
      }

      // Validate input format
      const isValid = validationRegex.test(inputValue) && isValidFormat(inputValue) && (decimal || isValidDecimalLength(inputValue))
      if (!isValid) return

      const numericValue = parseFloat(inputValue) || 0
      onValueChange?.(numericValue)
      setValue(inputValue)
    },
    [allowNegative, decimal, isValidDecimalLength, isValidFormat, onChange, onValueChange, validationRegex],
  )

  const handleFocus = React.useCallback(() => {
    if (readonly) return
    setValue((prev) => prev.replace(/,/g, '')) // Remove commas for easier editing
  }, [readonly])

  const handleBlur = React.useCallback(() => {
    if (readonly) return
    onBlur?.()
    setValue((prev) => formattedValue(prev))
  }, [readonly, onBlur, formattedValue])

  // Set initial value
  React.useEffect(() => {
    const isFocused = document.activeElement === _inputRef.current

    if (
      !initialValue ||
      !validationRegex.test(initialValue.toString()) ||
      !validateDecimalPoint(initialValue.toString()) ||
      (!decimal && isDecimalPointGreaterThanLimit(initialValue.toString()))
    ) {
      setValue('')
      return
    }

    setValue((prev) => {
      if (prev === '-') return '-'
      if (!prev) return ''
      return isFocused ? initialValue.toString() : formattedValue(initialValue.toString())
    })
  }, [decimal, formattedValue, initialValue, isDecimalPointGreaterThanLimit, validateDecimalPoint, validationRegex])

  // Set padding right for the input field
  React.useEffect(() => {
    if (!_unitRef.current || !_inputRef.current || !unitText) return
    const unitWidth = _unitRef.current.offsetWidth
    _inputRef.current.style.setProperty('padding-right', `${(unitWidth + 10) / 16}rem`)
  }, [disabled, unitText])

  return (
    <div className="relative">
      <Input
        {...props}
        ref={_inputRef}
        value={value || (readonly ? '0' : '')}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        className={cn('font-number text-end', readonly && 'bg-muted text-muted-foreground')}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {unitText && (
        <span ref={_unitRef} className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-sm">
          {unitText}
        </span>
      )}
    </div>
  )
}
