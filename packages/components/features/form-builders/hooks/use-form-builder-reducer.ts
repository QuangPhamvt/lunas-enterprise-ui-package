import { useCallback, useReducer } from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import type { FormBuilderEmptyField, FormBuilderField, FormBuilderValue } from '../types';
import { toCamelCase } from '../utils';

type Action =
  | {
      type: 'FIELD_CREATE';
      name: string;
    }
  | {
      type: 'FIELD_UPDATE';
      fieldId: string;
      field: Partial<FormBuilderField>;
    }
  | {
      type: 'FIELD_REORDER';
      fromFieldId: string;
      toFieldId: string;
    }
  | {
      type: 'FIELD_DELETE';
      fieldId: string;
    }
  | {
      type: 'ARRAY_FIELD_CREATE';
      fieldId: string;
      name: string;
    }
  | {
      type: 'ARRAY_FIELD_UPDATE';
      fieldId: string;
      itemId: string;
      field: Partial<FormBuilderField>;
    }
  | {
      type: 'ARRAY_FIELD_DELETE';
      fieldId: string;
      itemId: string;
    }
  | {
      type: 'ARRAY_FIELD_REORDER';
      fieldId: string;
      fromItemId: string;
      toItemId: string;
    };

const reducer = (state: FormBuilderValue, action: Action): FormBuilderValue => {
  switch (action.type) {
    case 'FIELD_CREATE': {
      const newField: FormBuilderEmptyField = {
        id: `field-${nanoid(10)}`,
        name: action.name,
        camelCaseName: toCamelCase(action.name),
        type: 'empty',
        label: 'New Field',
        description: '',
      };
      return {
        ...state,
        form: [...state.form, newField],
      };
    }
    case 'FIELD_UPDATE': {
      return {
        ...state,
        form: state.form.map(field => {
          if (field.id !== action.fieldId) return field;
          return {
            ...field,
            ...Object.fromEntries(Object.entries(action.field).filter(([_, v]) => v !== undefined)),
          };
        }),
      };
    }
    case 'FIELD_REORDER': {
      // const currentFormId = action.formId;
      return {
        ...state,
        form: arrayMove(
          state.form,
          state.form.findIndex(field => field.id === action.fromFieldId),
          state.form.findIndex(field => field.id === action.toFieldId)
        ),
      };
    }
    case 'FIELD_DELETE': {
      return {
        ...state,
        form: state.form.filter(field => field.id !== action.fieldId),
      };
    }
    case 'ARRAY_FIELD_CREATE': {
      const newField: FormBuilderEmptyField = {
        id: `field-${nanoid(10)}`,
        name: action.name,
        camelCaseName: toCamelCase(action.name),
        type: 'empty',
        label: 'New Field',
        description: '',
      };
      return {
        ...state,
        form: state.form.map(field => {
          if (field.id !== action.fieldId || field.type !== 'array-field') return field;
          return {
            ...field,
            fields: [...field.fields, newField],
          };
        }),
      };
    }
    case 'ARRAY_FIELD_UPDATE': {
      return {
        ...state,
        form: state.form.map(field => {
          if (field.id !== action.fieldId || field.type !== 'array-field') return field;
          return {
            ...field,
            fields: field.fields.map(item => {
              if (item.id !== action.itemId) return item;
              return {
                ...item,
                ...Object.fromEntries(Object.entries(action.field).filter(([_, v]) => v !== undefined)),
              };
            }),
          };
        }),
      };
    }
    case 'ARRAY_FIELD_DELETE': {
      return {
        ...state,
        form: state.form.map(field => {
          if (field.id !== action.fieldId || field.type !== 'array-field') return field;
          return {
            ...field,
            fields: field.fields.filter(item => item.id !== action.itemId),
          };
        }),
      };
    }
    case 'ARRAY_FIELD_REORDER': {
      return {
        ...state,
        form: state.form.map(field => {
          if (field.id !== action.fieldId || field.type !== 'array-field') return field;
          return {
            ...field,
            fields: arrayMove(
              field.fields,
              field.fields.findIndex(item => item.id === action.fromItemId),
              field.fields.findIndex(item => item.id === action.toItemId)
            ),
          };
        }),
      };
    }
    default:
      throw new Error('Unhandled action type');
  }
};

export const useFormBuilderReducer = (initialState: FormBuilderValue) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFieldCreate = useCallback((name: string) => {
    dispatch({ type: 'FIELD_CREATE', name });
  }, []);

  const onFieldUpdate = useCallback((fieldId: string, field: Partial<FormBuilderField>) => {
    dispatch({ type: 'FIELD_UPDATE', fieldId, field });
  }, []);

  const onFieldReorder = useCallback((fromFieldId: string, toFieldId: string) => {
    dispatch({ type: 'FIELD_REORDER', fromFieldId, toFieldId });
  }, []);

  const onFieldDelete = useCallback((fieldId: string) => {
    dispatch({ type: 'FIELD_DELETE', fieldId });
  }, []);

  const onArrayFieldCreate = useCallback((fieldId: string, name: string) => {
    dispatch({ type: 'ARRAY_FIELD_CREATE', fieldId, name });
  }, []);

  const onArrayFieldUpdate = useCallback((fieldId: string, itemId: string, field: Partial<FormBuilderField>) => {
    dispatch({ type: 'ARRAY_FIELD_UPDATE', fieldId, itemId, field });
  }, []);

  const onArrayFieldDelete = useCallback((fieldId: string, itemId: string) => {
    dispatch({ type: 'ARRAY_FIELD_DELETE', fieldId, itemId });
  }, []);

  const onArrayFieldReorder = useCallback((fieldId: string, fromItemId: string, toItemId: string) => {
    dispatch({ type: 'ARRAY_FIELD_REORDER', fieldId, fromItemId, toItemId });
  }, []);

  return {
    formBuilder: state,
    onFieldCreate,
    onFieldUpdate,
    onFieldReorder,
    onFieldDelete,
    onArrayFieldCreate,
    onArrayFieldUpdate,
    onArrayFieldDelete,
    onArrayFieldReorder,
  };
};
