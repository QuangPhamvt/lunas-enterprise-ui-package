import { useMemo } from 'react';

import { useDataGridCell, useDataGridFieldContext } from '../../hooks';
import { DataGridErrorTooltip } from '../ui/error-tooltip';
import { DataGridSelect, DataGridSelectContent, DataGridSelectGroup, DataGridSelectItem, DataGridSelectTrigger, DataGridSelectValue } from '../ui/select';
import { TableCell, TableCellContent } from '../ui/table';

export const DataGridSelectField: React.FC<
  React.PropsWithChildren<{
    id: string;
    columnId: string;
    rowIndex: number;
    cellIndex: number;
    options: Array<{ label: string; value: string }>;
  }>
> = ({ id, columnId, rowIndex, cellIndex, options }) => {
  const field = useDataGridFieldContext<string>();

  const { cellRef, wrapperRef, inputRef, editing } = useDataGridCell();

  const _value = useMemo(() => {
    return field.state.value ?? '';
  }, [field.state.value]);

  const _invalid = useMemo(() => {
    return !field.state.meta.isValid;
  }, [field.state.meta.isValid]);

  return (
    <TableCell ref={cellRef} id={id} columnId={columnId} data-field={columnId} data-rowindex={rowIndex} data-colindex={cellIndex}>
      <TableCellContent
        ref={wrapperRef as React.RefObject<HTMLDivElement>}
        tabIndex={-1}
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
          <DataGridSelect defaultOpen defaultValue={field.state.value} onValueChange={field.handleChange}>
            <DataGridSelectTrigger ref={inputRef as React.RefObject<HTMLButtonElement>} id={field.name}>
              <DataGridSelectValue />
            </DataGridSelectTrigger>
            <DataGridSelectContent>
              <DataGridSelectGroup>
                {options.map(option => {
                  return (
                    <DataGridSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </DataGridSelectItem>
                  );
                })}
              </DataGridSelectGroup>
            </DataGridSelectContent>
          </DataGridSelect>
        )}
        {!editing && (
          <div className="px-2.5 py-1.5">
            {options.find(option => option.value === _value)?.label || <p className="text-text-positive-muted select-none">Null</p>}
          </div>
        )}
        {_invalid && <DataGridErrorTooltip errors={field.state.meta.errors} />}
      </TableCellContent>
    </TableCell>
  );
};
