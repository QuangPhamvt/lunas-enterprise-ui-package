import { useCallback, useReducer } from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import type { FormBuilderEmptyField, FormBuilderField, FormBuilderValue } from '../types';

type Action =
  | {
      type: 'CREATE';
      id: string;
      name: string;
    }
  | {
      type: 'UPDATE';
    }
  | {
      type: 'DELETE';
      id: string;
    }
  | {
      type: 'FIELD_CREATE';
      id: string;
    }
  | {
      type: 'FIELD_UPDATE';
      formId: string;
      fieldId: string;
      field: FormBuilderField;
    }
  | {
      type: 'FIELD_REORDER';
      formId: string;
      fromFieldId: string;
      toFieldId: string;
    }
  | {
      type: 'FIELD_DELETE';
      formId: string;
      fieldId: string;
    };

const reducer = (state: FormBuilderValue[], action: Action): FormBuilderValue[] => {
  switch (action.type) {
    case 'CREATE': {
      const newForm = { id: action.id, name: action.name, form: [] };
      return [...state, newForm];
    }
    case 'UPDATE':
      return state;
    case 'DELETE': {
      return state.filter(formBuilder => formBuilder.id !== action.id);
    }
    case 'FIELD_CREATE': {
      const currentFormId = action.id;
      return state.map(formBuilder => {
        if (formBuilder.id === currentFormId) {
          const newField: FormBuilderEmptyField = {
            id: `field-${nanoid(10)}`,
            type: 'empty',
            label: 'New Field',
            description: '',
          };
          return {
            ...formBuilder,
            form: [...formBuilder.form, newField],
          };
        }
        return formBuilder;
      });
    }
    case 'FIELD_UPDATE': {
      return state.map(formBuilder => {
        if (formBuilder.id !== action.formId) return formBuilder;
        return {
          ...formBuilder,
          form: formBuilder.form.map(field => {
            if (field.id !== action.fieldId) return field;
            return {
              ...field,
              ...action.field,
            };
          }),
        };
      });
    }
    case 'FIELD_REORDER': {
      const currentFormId = action.formId;
      return state.map(formBuilder => {
        if (formBuilder.id === currentFormId) {
          const fromIndex = formBuilder.form.findIndex(field => field.id === action.fromFieldId);
          const toIndex = formBuilder.form.findIndex(field => field.id === action.toFieldId);
          return {
            ...formBuilder,
            form: arrayMove(formBuilder.form, fromIndex, toIndex),
          };
        }
        return formBuilder;
      });
    }
    case 'FIELD_DELETE': {
      const currentFormId = action.formId;
      return state.map(formBuilder => {
        if (formBuilder.id === currentFormId) {
          return {
            ...formBuilder,
            form: formBuilder.form.filter(field => field.id !== action.fieldId),
          };
        }
        return formBuilder;
      });
    }
    default:
      throw new Error('Unhandled action type');
  }
};

export const useFormBuilderReducer = (initialState: FormBuilderValue[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onCreateNewFormBuilder = useCallback(
    (name: string) => {
      if (!state) return;
      dispatch({ type: 'CREATE', id: `form-builder-${nanoid(10)}`, name });
    },
    [state]
  );

  const onDeleteFormBuilder = useCallback((id: string) => {
    dispatch({ type: 'DELETE', id });
  }, []);

  const onFieldCreate = useCallback((formId: string) => {
    dispatch({ type: 'FIELD_CREATE', id: formId });
  }, []);

  const onFieldUpdate = useCallback((formId: string, fieldId: string, field: FormBuilderField) => {
    dispatch({ type: 'FIELD_UPDATE', formId, fieldId, field });
  }, []);

  const onFieldReorder = useCallback((formId: string, fromFieldId: string, toFieldId: string) => {
    dispatch({ type: 'FIELD_REORDER', formId, fromFieldId, toFieldId });
  }, []);

  const onFieldDelete = useCallback((formId: string, fieldId: string) => {
    dispatch({ type: 'FIELD_DELETE', formId, fieldId });
  }, []);

  return {
    formBuilders: state,
    onCreateNewFormBuilder,
    onDeleteFormBuilder,
    onFieldCreate,
    onFieldUpdate,
    onFieldReorder,
    onFieldDelete,
  };
};
