import { createContext, use, useMemo, useState } from 'react';

import { useFormBuilderReducer } from '../hooks/use-form-builder-reducer';
import type { FIELD, FIELD_ID, FORM_BUILDER, FormBuilderField, FormBuilderValue } from '../types';

const INITIAL_FORM_BUILDERS: FormBuilderValue = {
  name: 'New Form Builder',
  description: 'Description for the new form builder',
  form: [],
};

export type TFormBuilderField = {
  id: FIELD_ID;
  accepts: (FIELD | FORM_BUILDER)[];
};

const FormBuilderFields: TFormBuilderField[] = [
  {
    id: 'text-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'textarea-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'number-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'date-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'switch-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'radio-group-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'select-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'combobox-field',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
];

// Contexts
// ------------------------------

// Form Builder Items Context
type TFormBuilderFieldContext = {
  fields: TFormBuilderField[];
  setFields: React.Dispatch<React.SetStateAction<TFormBuilderField[]>>;
};
const FormBuilderFieldContext = createContext<TFormBuilderFieldContext | null>(null);
// biome-ignore lint/style/useComponentExportOnlyModules: true
export const useFormBuilderFieldContext = () => {
  const ctx = use(FormBuilderFieldContext);
  if (!ctx) {
    throw new Error('useFormBuilderContext must be used within a FormBuilderProvider');
  }

  return ctx;
};

// Form Builder Values Context
type TFormBuilderValueContext = {
  formBuilder: FormBuilderValue;
  onFieldCreate: (name: string) => void;
  onFieldUpdate: (fieldId: string, field: Partial<FormBuilderField>) => void;
  onFieldReorder: (fromFieldId: string, toFieldId: string) => void;
  onFieldDelete: (fieldId: string) => void;
};
const FormBuilderValueContext = createContext<TFormBuilderValueContext | null>(null);
// biome-ignore lint/style/useComponentExportOnlyModules: true
export const useFormBuilderValueContext = () => {
  const ctx = use(FormBuilderValueContext);
  if (!ctx) {
    throw new Error('useFormBuilderValueContext must be used within a FormBuilderProvider');
  }
  return ctx;
};

export const FormBuilderProvider: React.FC<
  React.PropsWithChildren<{
    initialFormBuilders?: FormBuilderValue;
  }>
> = ({ initialFormBuilders = INITIAL_FORM_BUILDERS, children }) => {
  const [fields, setFields] = useState<TFormBuilderField[]>(FormBuilderFields);

  const { formBuilder, onFieldCreate, onFieldUpdate, onFieldReorder, onFieldDelete } = useFormBuilderReducer(initialFormBuilders);

  const fieldValueContext = useMemo<TFormBuilderFieldContext>(() => {
    return { fields, setFields };
  }, [fields]);

  const formBuilderValueContext = useMemo<TFormBuilderValueContext>(() => {
    return {
      formBuilder,
      onFieldCreate,
      onFieldUpdate,
      onFieldReorder,
      onFieldDelete,
    };
  }, [formBuilder, onFieldCreate, onFieldUpdate, onFieldReorder, onFieldDelete]);

  return (
    <FormBuilderFieldContext.Provider value={fieldValueContext}>
      <FormBuilderValueContext.Provider value={formBuilderValueContext}>{children}</FormBuilderValueContext.Provider>
    </FormBuilderFieldContext.Provider>
  );
};
