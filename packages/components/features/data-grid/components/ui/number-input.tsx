'use client';
import { useCallback, useEffect, useState } from 'react';

import { cn } from '@customafk/react-toolkit/utils';

import { DataGridInput } from './input';

const createValidationRegex = /^-?\d*\.?\d*$/;

const formatNumberWithCommas = (num: number | string): string => {
  return Number(num).toLocaleString();
};

const formatRoundedValue = (value: number, precision: number, roundingRule: 'up' | 'down' | 'nearest' | 'none') => {
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
    default: {
      return value;
    }
  }
};

const formattedValue = (val: string) => {
  if (val === '0') return '0';
  if (!Number(val)) return null;

  const numValue = parseFloat(val);
  const effectivePrecision = 2;
  const roundedValue = formatRoundedValue(numValue, effectivePrecision, 'none').toString();
  const [integerPart, decimalPart = ''] = roundedValue.split('.');
  const formattedInteger = formatNumberWithCommas(integerPart);
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

type TProps = Omit<React.ComponentProps<'input'>, 'value'> & {
  ref?: React.RefObject<HTMLInputElement>;
  /**
   * Description: Value for the text field
   *
   * Default: ''
   *
   * Usage: Value for the text field
   */
  value?: number | null | undefined;
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
   * Description: Placeholder for the text field
   *
   * Default: ''
   *
   * Usage: Placeholder for the text field
   */
  placeholder?: string;
  /**
   * Description: Invalid state of the text field
   *
   * Default: `false`
   *
   * Usage: Invalid state of the text field
   */
  invalid?: boolean;
  /**
   * Description: Callback function for the value change
   * Usage: Callback function for the value change
   */
  wrapperClassName?: string;
  /**
   * Description: Callback function for the value change
   * Usage: Callback function for the value change
   */
  onValueChange?: (value: number | null) => void;
  /**
   * Description: Callback function for the blur event
   * Usage: Callback function for the blur event
   */
  onBlur?: () => void;
};
/**
 * ## Unit Text Field Component
 *
 * **Description**: This component is to display common text field with unit
 *
 * **Usage**: Text field with unit example: 1000 (kg), 100 (m), 1000 (USD)...
 */
export const DataGridNumberInput: React.FC<TProps> = ({
  ref,
  disabled = false,
  readOnly = false,
  value = null,
  placeholder,
  wrapperClassName,
  className,
  onChange,
  onValueChange,
  onBlur,
  ...props
}) => {
  const [_value, _setValue] = useState<string | null>(value?.toString() ?? null);

  // Validate decimal point is less than or equal to the limit
  const validateDecimalPoint = useCallback((value: string) => {
    if (value === '-') return true;

    const [integerPart, _ = ''] = value.split('.') as [string, string];
    const integerPartLength = integerPart.startsWith('-') ? integerPart.length - 1 : integerPart.length;

    return integerPartLength <= Infinity;
  }, []);

  const handleZeroCase = useCallback(
    (value: string) => {
      // Check for zero
      const isZero = value === '0';
      // Check for negative zero patterns. E.g., '-0', '-0.0', '-0.000', '-0.'
      const isNegativeZero = value === '-' || /^-0+(\.0+)?$/.test(value) || /^-0*\.$/.test(value);
      if (isZero) {
        onValueChange?.(0);
        _setValue(value);
        return;
      }
      if (isNegativeZero) {
        _setValue(() => {
          onValueChange?.(0);
          return value;
        });
        return;
      }
    },
    [onValueChange]
  );

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    e => {
      // Don't prevent default behavior of input change
      onChange?.(e);

      // Custom event handler for value change
      const { value: inputValue } = e.target;

      // Handle empty input
      if (inputValue === '' || inputValue === undefined) {
        onValueChange?.(null);
        _setValue(null);
        return;
      }

      // Handle zero and negative zero
      handleZeroCase(inputValue);

      // Validate input format
      if (!createValidationRegex.test(inputValue) || !validateDecimalPoint(inputValue)) return;

      const numericValue = parseFloat(inputValue) || 0;
      onValueChange?.(numericValue);
      _setValue(inputValue);
    },
    [validateDecimalPoint, onChange, onValueChange, handleZeroCase]
  );

  const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
    e => {
      if (readOnly) return;
      onBlur?.(e);
      _setValue(prev => {
        if (prev === null) return null;
        const isZero = prev === '0' || prev === '-' || /^-0+(\.0+)?$/.test(prev) || /^-0*\.$/.test(prev);
        if (isZero) return '0';
        return typeof prev === 'string' ? formattedValue(prev) : null;
      });
    },
    [readOnly, onBlur]
  );

  // Set initial value
  useEffect(() => {
    const isFocused = document.activeElement === ref?.current;

    if (value === undefined || value === null || !createValidationRegex.test(value.toString()) || !validateDecimalPoint(value.toString())) {
      _setValue(null);
      return;
    }

    _setValue(prev => (isFocused ? prev : formattedValue(value.toString())));
  }, [value, validateDecimalPoint, ref]);

  useEffect(() => {
    if (!ref?.current) return;
    const handleFocus = () => {
      if (readOnly) return;
      _setValue(prev => (typeof prev === 'string' ? prev.replace(/,/g, '') : null));
    };

    ref.current?.addEventListener('focus', handleFocus);
    return () => {
      ref.current?.removeEventListener('focus', handleFocus);
    };
  }, [ref, readOnly]);

  return (
    <div className={cn('relative', wrapperClassName)}>
      <DataGridInput
        {...props}
        ref={ref}
        value={_value || (readOnly ? '0' : '')}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={cn('text-end font-number text-sm slashed-zero lining-nums tabular-nums', className)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
