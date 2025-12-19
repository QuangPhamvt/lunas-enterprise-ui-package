/** biome-ignore-all lint/suspicious/noExplicitAny: true */
import { useMemo, useState } from 'react';

import { flexRender, getCoreRowModel, type RowData, useReactTable } from '@tanstack/react-table';
import type { FieldMeta } from '@tanstack/react-form';

import { LoaderCircleIcon, MinusIcon, PlusIcon } from 'lucide-react';

import { Table, TableBody, TableHeader, TableHeaderCell, TableHeaderRow, TableRow } from './components/ui/table';
import { useDataGridForm } from './hooks';
import type { DataGridProps } from './types';
import { numberFieldValidation, textFieldValidation } from './utils';

type SubmitFormMeta =
  | {
      action: 'update';
      data?:
        | {
            name: string;
            index: number;
            field: {
              [Key in keyof Record<string, any>]: {
                name: Key;
                value: any;
                meta: FieldMeta<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
              };
            }[keyof Record<string, any>];
          }
        | undefined;
    }
  | {
      action: 'create';
      data?:
        | {
            name: string;
            index: number;
            value: Record<string, any>;
          }
        | undefined;
    }
  | {
      action: 'delete';
      data?:
        | {
            name: string;
            index: number;
          }
        | undefined;
    };

export const DataGrid = <TData extends RowData>(props: DataGridProps<TData>) => {
  const { name = 'array', data = [], columns, onCreateField, onUpdateField, onDeleteField } = props;

  const [createItemIndexSet, setCreateItemIndexSet] = useState<Set<number>>(new Set());

  const [_tableData, _setTableData] = useState<TData[]>(data);

  const _initialItem = useMemo(() => {
    const names = columns.map(col => col.field.name);
    return names.reduce(
      (acc, curr) => {
        acc[curr] = null;
        return acc;
      },
      {} as Record<string, null>
    );
  }, [columns]);

  const form = useDataGridForm({
    defaultValues: {
      [name]: data,
    } as Record<string, unknown[]>,
    listeners: {
      onChangeDebounceMs: 500,
      onChange: ({ fieldApi, formApi }) => {
        // Field Change
        const name = fieldApi.name.split('[')[0];
        const indexMatch = fieldApi.name.match(/\[(\d+)\]/);
        const index = indexMatch ? parseInt(indexMatch[1], 10) : -1; // Extract Index
        const fieldNameMatch = fieldApi.name.match(/\.(\w+)$/); // Extract Field Name
        const fieldName = fieldNameMatch ? (fieldNameMatch[1] as keyof TData) : null; // Extract Field Name

        _setTableData(formApi.state.values[name] as TData[]);

        // Update Field
        if (fieldApi.state.meta.isDirty && fieldApi.state.meta.isValid && !fieldApi.state.meta.isValidating && !createItemIndexSet.has(index)) {
          formApi.handleSubmit({
            action: 'update',
            data: {
              name,
              index,
              field: {
                name: fieldName as string,
                value: fieldApi.state.value as TData[keyof TData],
                meta: fieldApi.state.meta,
              },
            },
          });
        }
      },
    },
    onSubmitInvalid: async props => {
      console.log('Form Submit Invalid:', props.formApi.getAllErrors());
    },
    onSubmitMeta: {
      action: 'update',
      data: undefined,
    } as SubmitFormMeta,
    onSubmit: async ({ meta, formApi }) => {
      if (meta.data?.index === -1) return;
      try {
        if (meta.action === 'create' && meta.data) {
          await onCreateField?.({
            name: meta.data.name,
            index: meta.data.index,
            value: meta.data.value as TData,
          });
        }
        if (meta.action === 'update' && meta.data) {
          await onUpdateField?.({
            name: meta.data.name,
            index: meta.data.index,
            field: meta.data.field as any,
          });
        }
        if (meta.action === 'delete' && meta.data) {
          await onDeleteField?.({
            name: meta.data.name,
            index: meta.data.index,
          });
          formApi.removeFieldValue(meta.data.name, meta.data.index);
        }
      } catch (error) {
        console.error('DataGrid Form Submit Error:', error);
      }
    },
  });

  const table = useReactTable<TData>({
    data: _tableData,
    columns: columns,
    defaultColumn: {
      minSize: 40,
      size: 150,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',

    enableRowSelection: false,
    enableColumnResizing: true,
    enableMultiRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: column sizing
  const columnSizeCSS = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, number | undefined> = {};
    headers.forEach(header => {
      colSizes[`--header-${header.id}-size`] = header.getSize() || 0;
      colSizes[`--col-${header.id}-size`] = header.column.getSize() || 0;
    });
    return colSizes;
  }, [table.getFlatHeaders, table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <div data-testid="data-grid" className="flex flex-col">
      <div className="relative overflow-x-auto border border-border">
        <form.Subscribe
          selector={state => ({
            submitting: state.isSubmitting,
          })}
          children={({ submitting }) => {
            if (!submitting) return null;
            return (
              <div
                style={{
                  width: table.getTotalSize(),
                }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-background opacity-60"
              >
                <LoaderCircleIcon size={42} className="animate-spin" />
              </div>
            );
          }}
        />
        <Table
          style={{
            ...columnSizeCSS,
            width: table.getTotalSize(),
          }}
        >
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => {
              return (
                <TableHeaderRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHeaderCell key={header.id} id={header.id} header={header}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHeaderCell>
                    );
                  })}
                </TableHeaderRow>
              );
            })}
          </TableHeader>
          <form.Field name={name} mode="array">
            {() => {
              return (
                <TableBody>
                  {table.getRowModel().rows.map((row, rowindex) => {
                    const state = createItemIndexSet.has(rowindex) ? 'create' : 'view';
                    return (
                      <TableRow key={row.id} data-state={state} data-rowindex={rowindex}>
                        {row.getVisibleCells().map((cell, cellIndex) => {
                          const { field } = columns[cellIndex];
                          const { header } = columns[cellIndex];
                          if (field.type === 'text-field') {
                            return (
                              <form.AppField
                                key={`${name}[${rowindex}].${field.name}`}
                                name={`${name}[${rowindex}].${field.name}`}
                                validators={{
                                  onChangeAsyncDebounceMs: 300,
                                  onMount: ({ fieldApi }) => {
                                    const schema = textFieldValidation(header as string, field);
                                    if (!schema) return undefined;
                                    return fieldApi.parseValueWithSchema(schema);
                                  },
                                  onChangeAsync: ({ fieldApi }) => {
                                    const schema = textFieldValidation(header as string, field);
                                    if (!schema) return undefined;
                                    return fieldApi.parseValueWithSchema(schema);
                                  },
                                }}
                                children={({ DataGridTextField }) => {
                                  return (
                                    <DataGridTextField
                                      key={`${name}[${rowindex}].${field.name}`}
                                      id={cell.id}
                                      columnId={cell.column.id}
                                      rowIndex={rowindex}
                                      cellIndex={cellIndex}
                                    />
                                  );
                                }}
                              />
                            );
                          }
                          if (field.type === 'number-field') {
                            return (
                              <form.AppField
                                key={`${name}[${rowindex}].${field.name}`}
                                name={`${name}[${rowindex}].${field.name}`}
                                validators={{
                                  onChangeAsyncDebounceMs: 300,
                                  onMount: ({ fieldApi }) => {
                                    const schema = numberFieldValidation(header as string, field);
                                    if (!schema) return undefined;
                                    return fieldApi.parseValueWithSchema(schema);
                                  },
                                  onChangeAsync: ({ fieldApi }) => {
                                    const schema = numberFieldValidation(header as string, field);
                                    if (!schema) return undefined;
                                    return fieldApi.parseValueWithSchema(schema);
                                  },
                                }}
                                children={({ DataGridNumberField }) => {
                                  return (
                                    <DataGridNumberField
                                      key={`${name}[${rowindex}].${field.name}`}
                                      id={cell.id}
                                      columnId={cell.column.id}
                                      rowIndex={rowindex}
                                      cellIndex={cellIndex}
                                    />
                                  );
                                }}
                              />
                            );
                          }
                          if (field.type === 'select-field') {
                            return (
                              <form.AppField
                                key={`${name}[${rowindex}].${field.name}`}
                                name={`${name}[${rowindex}].${field.name}`}
                                validators={{}}
                                children={({ DataGridSelectField }) => {
                                  const options = field.options || [];
                                  return (
                                    <DataGridSelectField
                                      key={`${name}[${rowindex}].${field.name}`}
                                      id={cell.id}
                                      columnId={cell.column.id}
                                      rowIndex={rowindex}
                                      cellIndex={cellIndex}
                                      options={options}
                                    />
                                  );
                                }}
                              />
                            );
                          }
                          return null;
                        })}
                        <form.Subscribe
                          selector={state => {
                            if (!createItemIndexSet.has(rowindex))
                              return {
                                disabled: true,
                              };
                            const pathFields = Object.keys(state.fieldMeta).filter(f => f.startsWith(`${name}[${rowindex}]`));
                            const invalid = pathFields.some(f => {
                              return !state.fieldMeta[f]?.isValid || state.fieldMeta[f]?.isPristine;
                            });
                            return {
                              values: state.values[name][rowindex],
                              disabled: invalid,
                            };
                          }}
                        >
                          {({ values, disabled }) => {
                            if (!createItemIndexSet.has(rowindex))
                              return (
                                <div
                                  className="invisible absolute inset-y-0 right-2 flex items-center space-x-0.5 group-hover:visible"
                                  onClick={e => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <button
                                    className="z-10 cursor-pointer rounded-full border border-border bg-background p-1 text-text-positive hover:text-text-positive-strong hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-3.5"
                                    onClick={e => {
                                      form.handleSubmit({
                                        action: 'delete',
                                        data: { name, index: rowindex },
                                      });
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MinusIcon />
                                  </button>
                                </div>
                              );
                            return (
                              <div
                                className="invisible absolute inset-y-0 right-2 flex items-center space-x-0.5 group-hover:visible"
                                onClick={e => {
                                  e.stopPropagation();
                                }}
                              >
                                <button
                                  disabled={disabled}
                                  className="z-10 cursor-pointer rounded-full border border-primary-strong bg-primary p-1 text-text-negative hover:text-text-negative-strong hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-3.5"
                                  onClick={async e => {
                                    setCreateItemIndexSet(prev => {
                                      const newSet = new Set(prev);
                                      newSet.delete(rowindex);
                                      return newSet;
                                    });
                                    form.handleSubmit({
                                      action: 'create',
                                      data: { name, index: rowindex, value: values as any },
                                    });
                                    e.stopPropagation();
                                  }}
                                >
                                  <PlusIcon />
                                </button>
                                <button
                                  className="z-10 cursor-pointer rounded-full border border-border bg-background p-1 text-text-positive hover:text-text-positive-strong hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-3.5"
                                  onClick={e => {
                                    form.removeFieldValue(name, rowindex);
                                    e.stopPropagation();
                                  }}
                                >
                                  <MinusIcon strokeWidth={1} />
                                </button>
                              </div>
                            );
                          }}
                        </form.Subscribe>
                      </TableRow>
                    );
                  })}
                </TableBody>
              );
            }}
          </form.Field>
        </Table>
      </div>
      <div className="py-1">
        <form.Subscribe
          selector={state => {
            return {
              disabled: state.isSubmitting || !state.isValid,
            };
          }}
        >
          {({ disabled }) => {
            return (
              <button
                disabled={disabled}
                className="flex cursor-pointer items-center space-x-1.5 rounded border border-border px-1.5 py-1 text-text-positive-weak text-xs hover:text-text-positive disabled:cursor-not-allowed disabled:opacity-50 [&>svg]:size-3"
                onClick={e => {
                  const lastIndex = form.getFieldValue(name).length - 1;
                  setCreateItemIndexSet(prev => {
                    const newSet = new Set(prev);
                    newSet.add(lastIndex + 1);
                    return newSet;
                  });
                  form.pushFieldValue(name, _initialItem, { dontRunListeners: true });
                  _setTableData(prev => {
                    return [...prev, _initialItem as TData];
                  });
                  e.preventDefault();
                }}
              >
                <PlusIcon />
                Add Row
              </button>
            );
          }}
        </form.Subscribe>
      </div>
    </div>
  );
};
