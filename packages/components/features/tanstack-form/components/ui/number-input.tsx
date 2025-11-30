'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { Input } from './input';

const createValidationRegex = (allowNegative: boolean): RegExp => {
  return allowNegative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
};

const formatNumberWithCommas = (num: number | string): string => {
  return Number(num).toLocaleString();
};

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * Description: Value for the text field
   *
   * Default: ''
   *
   * Usage: Value for the text field
   */
  value?: string | number | null;
  /**
   * Description: Disabled state of the text field
   *
   * Default: `false`
   *
   * Usage: Disabled state of the text field
   *
   * Note: If true, the text field will be disabled
   */
  disabled?: boolean;
  /**
   * Description: Readonly state of the text field
   *
   * Default: `false`
   *
   * Usage: Readonly state of the text field
   */
  readOnly?: boolean;
  /**
   * Description: Allow negative value for the text field
   *
   * Default: `false`
   *
   * Usage: Allow negative value for the text field
   */
  allowNegative?: boolean;
  /**
   * Description: Decimal point for the text field
   *
   * Default: `undefined`
   *
   * Usage: Ex: [12,3] => console.log(2323.23) // True
   *
   * Note: IF use this prop, `numberAfterDecimalPoint` will be ignored
   */
  decimal?: [number, number];
  /**
   * Description: Rounding rule for the text field
   *
   * Default: `nearest`
   *
   * Usage: Rounding rule for the text field
   * - 'up': Round up
   * - 'down': Round down
   * - 'nearest': Round to nearest
   * - 'none': No rounding
   *
   * E.g.
   * - Value: 2.135, precision: 2
   *   - 'up' => 2.14
   *   - 'down' => 2.13
   *   - 'nearest' => 2.13
   *   - 'none' => 2.135
   */
  roundingRule?: 'up' | 'down' | 'nearest' | 'none';
  /**
   * Description: Number of digits after the decimal point
   *
   * Default: `2`
   *
   * Usage: Number of digits after the decimal point
   */
  numberAfterDecimalPoint?: number;
  /**
   * Description: Placeholder for the text field
   *
   * Default: ''
   *
   * Usage: Placeholder for the text field
   */
  placeholder?: string;
  /**
   * Description: Unit text for the text field
   *
   * Default: ''
   *
   * E.g. 'kg', 'm', 'USD'...
   */
  unitText?: string;
  /**
   * Description: Invalid state of the text field
   *
   * Default: `false`
   *
   * Usage: Invalid state of the text field
   */
  invalid?: boolean;
  /**
   * Description: Precision for the text field
   *
   * Default: `undefined`
   * E.g.
   * - 2.13 => 2.1 when precision is 1
   * - 2.134 => 2.13 when precision is 2
   */
  precision?: number;
  /**
   * Description: Callback function for the value change
   * Usage: Callback function for the value change
   */
  wrapperClassName?: string;
  onValueChange?: (value?: number) => void;
  onBlur?: () => void;
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
  readOnly = false,
  allowNegative = false,
  numberAfterDecimalPoint = 2,
  roundingRule = 'none',
  value = '',
  unitText,
  decimal,
  placeholder,
  precision,
  wrapperClassName,
  className,
  onChange,
  onValueChange,
  onBlur,
  ...props
}) => {
  const _unitRef = useRef<HTMLSpanElement>(null);
  const _inputRef = useRef<HTMLInputElement>(null);

  const [_value, _setValue] = useState<string>(value?.toString() ?? '');

  // Memoized values for validation and formatting
  const maxDecimalPlaces = useMemo(() => decimal?.[1] ?? numberAfterDecimalPoint, [decimal, numberAfterDecimalPoint]);
  const maxIntegerLength = useMemo(() => decimal && decimal[0] - decimal[1], [decimal]);
  const validationRegex = useMemo(() => createValidationRegex(allowNegative), [allowNegative]);

  // Validation functions
  const isValidDecimalLength = useCallback(
    (value: string): boolean => {
      if (!maxDecimalPlaces && value.includes('.')) return false;
      const decimalPart = value.split('.')[1];
      return !decimalPart || decimalPart.length <= maxDecimalPlaces;
    },
    [maxDecimalPlaces]
  );
  const isValidFormat = useCallback(
    (value: string): boolean => {
      if (!decimal || value === '-') return true;
      const [integerPart, decimalPart = ''] = value.split('.');

      return decimalPart.length <= decimal[1] && (integerPart.startsWith('-') ? integerPart.length - 1 : integerPart.length) <= maxIntegerLength!;
    },
    [decimal, maxIntegerLength]
  );
  const customRoundedValue = useCallback(
    (value: number, precision: number) => {
      if (roundingRule === 'none') return value;

      const factor = 10 ** precision;
      const scaledValue = value * factor;

      switch (roundingRule) {
        case 'up':
          return Math.ceil(scaledValue) / factor;
        case 'down':
          return Math.floor(scaledValue) / factor;
        case 'nearest': {
          if (scaledValue % 1 < 0.1) return Math.floor(scaledValue) / factor;
          if (scaledValue % 1 >= 0.59) return Math.ceil(scaledValue) / factor;
          return (Math.floor(scaledValue) + 0.5) / factor;
        }
        default:
          return value;
      }
    },
    [roundingRule]
  );
  const isDecimalPointGreaterThanLimit = useCallback(
    (value: string) => (!numberAfterDecimalPoint && value.includes('.')) || value.split('.')[1]?.length > numberAfterDecimalPoint,
    [numberAfterDecimalPoint]
  );
  const formattedValue = useCallback(
    (val: string) => {
      if (val === '0') return '0';
      if (!Number(val)) return '';

      const numValue = parseFloat(val);
      const effectivePrecision = Math.min(maxDecimalPlaces - 1, precision || 0);
      const roundedValue = customRoundedValue(numValue, effectivePrecision).toString();
      const [integerPart, decimalPart = ''] = roundedValue.split('.');
      const formattedInteger = formatNumberWithCommas(integerPart);
      return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    },
    [customRoundedValue, maxDecimalPlaces, precision]
  );
  // Validate decimal point is less than or equal to the limit
  const validateDecimalPoint = useCallback(
    (value: string) => {
      if (!decimal || value === '-') return true;

      const [integerPart, decimalPart = ''] = value.split('.');
      const integerLength = integerPart.startsWith('-') ? integerPart.length - 1 : integerPart.length;
      const maxIntegerLength = decimal[0] - decimal[1];

      return decimalPart.length <= decimal[1] && integerLength <= maxIntegerLength;
    },
    [decimal]
  );
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Don't prevent default behavior of input change
      onChange?.(e);

      // Custom event handler for value change
      const { value: inputValue } = e.target;

      // Handle empty input
      if (!inputValue) {
        onValueChange?.(undefined);
        _setValue('');
        return;
      }

      // Handle zero and negative zero
      const isZero = inputValue === '0';
      const isNegativeZero = inputValue === '-' && allowNegative;
      if (isZero || isNegativeZero) {
        onValueChange?.(0);
        _setValue(inputValue);
        return;
      }

      // Validate input format
      if (!validationRegex.test(inputValue) || !isValidFormat(inputValue) || (!decimal && !isValidDecimalLength(inputValue))) return;

      const numericValue = parseFloat(inputValue) || 0;
      onValueChange?.(numericValue);
      _setValue(inputValue);
    },
    [allowNegative, decimal, isValidDecimalLength, isValidFormat, onChange, onValueChange, validationRegex]
  );

  const handleFocus = useCallback(() => {
    if (readOnly) return;
    _setValue(prev => prev.replace(/,/g, '')); // Remove commas for easier editing
  }, [readOnly]);

  const handleBlur = useCallback(() => {
    if (readOnly) return;
    onBlur?.();
    _setValue(prev => formattedValue(prev));
  }, [readOnly, onBlur, formattedValue]);

  // Set initial value
  useEffect(() => {
    const isFocused = document.activeElement === _inputRef.current;

    if (
      !value ||
      !validationRegex.test(value.toString()) ||
      !validateDecimalPoint(value.toString()) ||
      (!decimal && isDecimalPointGreaterThanLimit(value.toString()))
    ) {
      _setValue('');
      return;
    }

    _setValue(prev => {
      if (prev === '-') return '-';
      if (!prev) return '';
      return isFocused ? value.toString() : formattedValue(value.toString());
    });
  }, [decimal, formattedValue, value, isDecimalPointGreaterThanLimit, validateDecimalPoint, validationRegex]);

  // Set padding right for the input field
  useEffect(() => {
    if (!_unitRef.current || !_inputRef.current || !unitText) return;
    const unitWidth = _unitRef.current.offsetWidth;
    _inputRef.current.style.setProperty('padding-right', `${(unitWidth + 10) / 16}rem`);
  }, [unitText]);

  return (
    <div className={cn('relative', wrapperClassName)}>
      <Input
        {...props}
        ref={_inputRef}
        value={_value || (readOnly ? '0' : '')}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={cn(
          'text-end font-number text-sm text-text-positive slashed-zero lining-nums tabular-nums',
          readOnly && 'bg-muted text-muted-foreground',
          className
        )}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {unitText && (
        <span ref={_unitRef} className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-2 text-muted-foreground text-sm">
          {unitText}
        </span>
      )}
    </div>
  );
};
