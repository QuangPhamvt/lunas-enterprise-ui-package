import { useCallback, useReducer } from 'react';

import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import type { FormBuilderEmptyField, FormBuilderField, FormBuilderValue } from '../types';

type Action =
  | {
      type: 'FIELD_CREATE';
    }
  | {
      type: 'FIELD_UPDATE';
      fieldId: string;
      field: FormBuilderField;
    }
  | {
      type: 'FIELD_REORDER';
      fromFieldId: string;
      toFieldId: string;
    }
  | {
      type: 'FIELD_DELETE';
      fieldId: string;
    };

const reducer = (state: FormBuilderValue, action: Action): FormBuilderValue => {
  switch (action.type) {
    case 'FIELD_CREATE': {
      // const currentFormId = action.id;
      const newField: FormBuilderEmptyField = {
        id: `field-${nanoid(10)}`,
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
            ...action.field,
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
    default:
      throw new Error('Unhandled action type');
  }
};

export const useFormBuilderReducer = (initialState: FormBuilderValue) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFieldCreate = useCallback(() => {
    dispatch({ type: 'FIELD_CREATE' });
  }, []);

  const onFieldUpdate = useCallback((fieldId: string, field: FormBuilderField) => {
    dispatch({ type: 'FIELD_UPDATE', fieldId, field });
  }, []);

  const onFieldReorder = useCallback((fromFieldId: string, toFieldId: string) => {
    dispatch({ type: 'FIELD_REORDER', fromFieldId, toFieldId });
  }, []);

  const onFieldDelete = useCallback((fieldId: string) => {
    dispatch({ type: 'FIELD_DELETE', fieldId });
  }, []);

  return {
    formBuilder: state,
    onFieldCreate,
    onFieldUpdate,
    onFieldReorder,
    onFieldDelete,
  };
};
