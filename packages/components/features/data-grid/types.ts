import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { FieldMeta } from '@tanstack/react-form';

export type DataGridTextField = {
  type: 'text-field';
  name: string;
  rules: {
    required: boolean;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    exactLength?: number | undefined;
  };
};

export type DataGridNumberField = {
  type: 'number-field';
  name: string;
  rules: {
    required: boolean;
    maxValue?: number | undefined;
    minValue?: number | undefined;
    integerOnly?: boolean | undefined;
    positiveOnly?: boolean | undefined;
    exactDigits?: number | undefined;
  };
};

export type DataGridSelectField = {
  type: 'select-field';
  name: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  rules: {
    required: boolean;
  };
};

export type DataGridField = DataGridTextField | DataGridNumberField | DataGridSelectField;

export type DataGridColumnDef<TData extends RowData> = ColumnDef<TData> & {
  field: DataGridField;
};

export type DataGridProps<TData extends RowData> = {
  name?: string;
  columns: DataGridColumnDef<TData>[];
  data: TData[];
  onCreateField?: (props: { name: string; index: number; value: TData }) => Promise<void> | void;
  onUpdateField?: (props: {
    name: string;
    index: number;
    field: {
      [Key in keyof TData]: {
        name: Key;
        value: TData[Key];
        meta: FieldMeta<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>;
      };
    }[keyof TData];
  }) => Promise<void> | void;
  onDeleteField?: (props: { name: string; index: number }) => Promise<void> | void;
};
