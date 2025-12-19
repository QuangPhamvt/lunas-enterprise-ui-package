import { useCallback, useMemo } from 'react';

import { useStore } from '@tanstack/react-form';

import { useDataGridCell, useDataGridFieldContext } from '../../hooks';
import { DataGridErrorTooltip } from '../ui/error-tooltip';
import { DataGridInput } from '../ui/input';
import { TableCell, TableCellContent } from '../ui/table';

export const DataGridTextField: React.FC<{
  id: string;
  columnId: string;
  rowIndex: number;
  cellIndex: number;
}> = ({ id, columnId, rowIndex, cellIndex }) => {
  const field = useDataGridFieldContext<string | null>();

  const _isSubmitting = useStore(field.form.store, ({ isSubmitting }) => isSubmitting);

  const { cellRef, wrapperRef, inputRef, editing } = useDataGridCell();

  const _value = useMemo(() => {
    return field.state.value;
  }, [field.state.value]);

  const _invalid = useMemo(() => {
    return !field.state.meta.isValid;
  }, [field.state.meta.isValid]);

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      if (_isSubmitting) return;
      field.handleChange(event.target.value || null);
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
          <DataGridInput
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={field.name}
            name={field.name}
            aria-invalid={_invalid}
            autoComplete="off"
            value={_value ?? ''}
            onBlur={field.handleBlur}
            onChange={onChange}
          />
        )}
        {!editing && (
          <div aria-invalid={_invalid} className="select-none px-2.5 py-1.5 aria-invalid:pr-8">
            {_value === null && <p className="text-text-positive-muted">Enter text</p>}
            {_value !== null && field.state.value}
          </div>
        )}
        {_invalid && <DataGridErrorTooltip errors={field.state.meta.errors} />}
      </TableCellContent>
    </TableCell>
  );
};
