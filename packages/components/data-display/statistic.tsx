import { memo, useCallback, useMemo } from 'react';
import { cn } from '@customafk/react-toolkit/utils';

import { Flex } from '../layouts/flex';

type Props = {
  decimalSeparator?: string;
  groupSeparator?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number; // Số chữ số thập phân
  roundingMode?: 'round' | 'floor' | 'ceil'; // Kiểu làm tròn
  showTrailingZeros?: boolean; // Hiển thị số 0 cuối
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Kích thước của component
  value: number | string;
};
export const Statistic = memo(
  ({
    decimalSeparator = '.',
    groupSeparator = ',',
    prefix: Prefix,
    suffix: Suffix,
    precision,
    roundingMode = 'round',
    showTrailingZeros = false,
    size = 'lg',
    value,
  }: Props) => {
    // Memoize rounding function
    const applyRounding = useCallback(
      (num: number, precisionValue: number): number => {
        const multiplier = Math.pow(10, precisionValue);

        switch (roundingMode) {
          case 'floor':
            return Math.floor(num * multiplier) / multiplier;
          case 'ceil':
            return Math.ceil(num * multiplier) / multiplier;
          case 'round':
          default:
            return Math.round(num * multiplier) / multiplier;
        }
      },
      [roundingMode]
    );

    // Memoize number formatting options
    const formatOptions = useMemo((): Intl.NumberFormatOptions => {
      const options: Intl.NumberFormatOptions = {};

      if (typeof precision === 'number' && precision >= 0) {
        if (showTrailingZeros) {
          options.minimumFractionDigits = precision;
          options.maximumFractionDigits = precision;
        } else {
          options.maximumFractionDigits = precision;
        }
      }

      return options;
    }, [precision, showTrailingZeros]);

    const formatNumber = useCallback(
      (num: number): string => {
        let processedNum = num;

        // Áp dụng làm tròn nếu có precision
        if (typeof precision === 'number' && precision >= 0) {
          processedNum = applyRounding(num, precision);
        }

        return processedNum.toLocaleString('en-US', formatOptions);
      },
      [applyRounding, formatOptions, precision]
    );

    // Memoize value processing
    const processedValue = useMemo((): string => {
      // Xử lý giá trị number
      if (typeof value === 'number') {
        if (isNaN(value) || !isFinite(value)) {
          return 'N/A';
        }
        return formatNumber(value);
      }

      // Xử lý giá trị string
      if (typeof value === 'string') {
        const trimmedValue = value.trim();

        // Nếu là chuỗi rỗng
        if (!trimmedValue) {
          return 'N/A';
        }

        // Thử convert sang number
        const numValue = Number(trimmedValue);

        if (isNaN(numValue) || !isFinite(numValue)) {
          // Nếu không phải số, trả về string gốc
          return 'N/A';
        }

        return formatNumber(numValue);
      }

      return 'N/A';
    }, [value, formatNumber]);

    // Memoize separator replacement
    const finalFormattedValue = useMemo((): string => {
      // Chỉ thay thế separators nếu khác mặc định
      if (decimalSeparator === '.' && groupSeparator === ',') {
        return processedValue;
      }
      return processedValue.replace(/,/g, groupSeparator).replace(/\./g, decimalSeparator);
    }, [processedValue, decimalSeparator, groupSeparator]);

    return (
      <Flex
        padding="none"
        className={cn(
          'text-secondary-foreground font-number text-lg',
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
          size === 'xl' && 'text-xl'
        )}
      >
        {Prefix}
        <p>{finalFormattedValue}</p>
        {Suffix}
      </Flex>
    );
  }
);
Statistic.displayName = 'Statistic';
