import { createContext, use, useMemo, useState } from 'react';

import { nanoid } from 'nanoid';
import { useFormBuilderReducer } from '../hooks/use-form-builder-reducer';
import type { FIELD, FIELD_ID, FORM_BUILDER, FormBuilderField, FormBuilderValue } from '../types';

const INITIAL_FORM_BUILDERS: FormBuilderValue = {
  sections: [
    {
      name: 'Section 1',
      fields: [
        {
          id: `field-${nanoid(10)}`,
          type: 'title-field',
          name: 'Title',
          camelCaseName: 'title',
          label: 'Welcome to the Form',
          description: 'Please fill out the form below.',
        },
      ],
    },
  ],
};

export type TFormBuilderField = {
  id: FIELD_ID;
  tab: 'TYPOGRAPHY' | 'FORM_FIELDS';
  accepts: (FIELD | FORM_BUILDER)[];
};

const FormBuilderFields: TFormBuilderField[] = [
  {
    id: 'title-field',
    tab: 'TYPOGRAPHY',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'text-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'textarea-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'number-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'select-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'date-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'switch-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'radio-group-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'combobox-field',
    tab: 'FORM_FIELDS',
    accepts: ['FIELD', 'FORM_BUILDER'],
  },
  {
    id: 'array-field',
    tab: 'FORM_FIELDS',
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

  // Section handlers
  onSectionCreate: (name: string) => void;
  onSectionUpdate: (index: number, name: string) => void;
  onSectionReorder: (fromSectionIndex: number, toSectionIndex: number) => void;
  onSectionDelete: (index: number) => void;

  // Field handlers
  onFieldCreate: (sectionIndex: number, name: string) => void;
  onFieldUpdate: (sectionIndex: number, fieldId: string, field: Partial<FormBuilderField>) => void;
  onFieldReorder: (sectionIndex: number, fromFieldId: string, toFieldId: string) => void;
  onFieldDelete: (sectionIndex: number, fieldId: string) => void;

  // Array field handlers
  onArrayFieldCreate: (arrayFieldId: string, name: string) => void;
  onArrayFieldUpdate: (arrayFieldId: string, fieldId: string, field: Partial<FormBuilderField>) => void;
  onArrayFieldDelete: (arrayFieldId: string, itemIndex: number) => void;
  onArrayFieldReorder: (arrayFieldId: string, fromFieldId: string, toFieldId: string) => void;
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

  const {
    formBuilder,

    onSectionCreate,
    onSectionUpdate,
    onSectionReorder,
    onSectionDelete,

    onFieldCreate,
    onFieldUpdate,
    onFieldReorder,
    onFieldDelete,

    onArrayFieldCreate,
    onArrayFieldUpdate,
    onArrayFieldDelete,
    onArrayFieldReorder,
  } = useFormBuilderReducer(initialFormBuilders);

  const fieldValueContext = useMemo<TFormBuilderFieldContext>(() => {
    return { fields, setFields };
  }, [fields]);

  const formBuilderValueContext = useMemo<TFormBuilderValueContext>(() => {
    return {
      formBuilder,

      onSectionCreate,
      onSectionUpdate,
      onSectionReorder,
      onSectionDelete,

      onFieldCreate,
      onFieldUpdate,
      onFieldReorder,
      onFieldDelete,

      onArrayFieldCreate,
      onArrayFieldUpdate,
      onArrayFieldDelete,
      onArrayFieldReorder,
    };
  }, [
    formBuilder,

    onSectionCreate,
    onSectionUpdate,
    onSectionReorder,
    onSectionDelete,

    onFieldCreate,
    onFieldUpdate,
    onFieldReorder,
    onFieldDelete,

    onArrayFieldCreate,
    onArrayFieldUpdate,
    onArrayFieldDelete,
    onArrayFieldReorder,
  ]);

  return (
    <FormBuilderFieldContext.Provider value={fieldValueContext}>
      <FormBuilderValueContext.Provider value={formBuilderValueContext}>{children}</FormBuilderValueContext.Provider>
    </FormBuilderFieldContext.Provider>
  );
};
