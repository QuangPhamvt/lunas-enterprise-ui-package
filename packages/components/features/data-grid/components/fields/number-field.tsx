import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { useDataGridCell, useDataGridFieldContext } from '../../hooks';
import { DataGridErrorTooltip } from '../ui/error-tooltip';
import { DataGridNumberInput } from '../ui/number-input';
import { TableCell, TableCellContent } from '../ui/table';

const formatNumberWithCommas = (num: number | string): string => {
  return Number(num).toLocaleString();
};

const formatRoundedValue = (value: number, precision: number) => {
  const factor = 10 ** precision;
  const scaledValue = value * factor;

  if (scaledValue % 1 < 0.1) return Math.floor(scaledValue) / factor;
  if (scaledValue % 1 >= 0.59) return Math.ceil(scaledValue) / factor;
  return (Math.floor(scaledValue) + 0.5) / factor;
};

const formattedValue = (val: string) => {
  if (val === '0') return '0';
  if (!Number(val)) return null;

  const numValue = parseFloat(val);
  const effectivePrecision = 2;
  const roundedValue = formatRoundedValue(numValue, effectivePrecision).toString();
  const [integerPart, decimalPart = ''] = roundedValue.split('.');
  const formattedInteger = formatNumberWithCommas(integerPart);
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const formattedToNumber = (value: unknown) => {
  if (typeof value !== 'string') return null;
  if (Number.isNaN(value)) return null;

  const isZero = value === '0' || value === '-' || /^-0+(\.0+)?$/.test(value) || /^-0*\.$/.test(value);
  if (isZero) return '0';
  return formattedValue(value);
};

export const DataGridNumberField: React.FC<
  React.PropsWithChildren<{
    id: string;
    columnId: string;
    rowIndex: number;
    cellIndex: number;
  }>
> = ({ id, columnId, rowIndex, cellIndex }) => {
  const field = useDataGridFieldContext<number | null>();

  const _isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  const { cellRef, wrapperRef, inputRef, editing } = useDataGridCell();

  const _value = useMemo(() => {
    return field.state.value ?? null;
  }, [field.state.value]);

  const _invalid = useMemo(() => {
    return !field.state.meta.isValid;
  }, [field.state.meta.isValid]);

  const onValueChange = useCallback(
    (value: number | null) => {
      if (_isSubmitting) return;
      field.handleChange(value);
    },
    [_isSubmitting, field.handleChange]
  );

  return (
    <TableCell ref={cellRef} id={id} columnId={columnId} data-field={field.name} data-rowindex={rowIndex} data-colindex={cellIndex}>
      <TableCellContent
        ref={wrapperRef as React.RefObject<HTMLDivElement>}
        tabIndex={-1}
        aria-invalid={_invalid}
        data-slot="data-grid-table-cell-content"
        data-state="view"
        onClick={event => {
          if (editing) return;
          event.preventDefault();
        }}
        onKeyDown={event => {
          if (editing) return;
          event.preventDefault();
        }}
      >
        {editing && (
          <div aria-invalid={_invalid} className="aria-invalid:pr-5.5">
            <DataGridNumberInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              id={field.name}
              value={_value}
              onBlur={field.handleBlur}
              onValueChange={onValueChange}
            />
          </div>
        )}
        {!editing && (
          <div
            aria-invalid={_invalid}
            className="select-none px-2.5 py-1.5 text-end font-number text-sm slashed-zero lining-nums tabular-nums aria-invalid:pr-8"
          >
            {_value === null && <p className="text-text-positive-muted">0.00</p>}
            {_value !== null && formattedToNumber(_value.toString())}
          </div>
        )}
        {_invalid && <DataGridErrorTooltip errors={field.state.meta.errors} />}
      </TableCellContent>
    </TableCell>
  );
};
