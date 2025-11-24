import { useCallback, useReducer } from 'react';

import { arrayMove } from '@dnd-kit/sortable';

import { nanoid } from 'nanoid';

import type { FormBuilderArrayField, FormBuilderEmptyField, FormBuilderField, FormBuilderValue } from '../types';
import { toCamelCase } from '../utils';

const updateRecursiveField = (fieldId: string, updateField: Partial<FormBuilderField>, fieldList: FormBuilderField[]): FormBuilderField[] => {
  if (fieldList.length === 0) return fieldList;

  if (fieldList.some(f => f.id === fieldId)) {
    return fieldList.map(f => {
      if (f.id !== fieldId) return f;
      return {
        ...f,
        ...Object.fromEntries(Object.entries(updateField).filter(([_, v]) => v !== undefined)),
      };
    });
  }

  if (fieldList.some(f => f.type === 'array-field')) {
    return fieldList.map(f => {
      if (f.type === 'array-field') {
        return {
          ...f,
          fields: updateRecursiveField(fieldId, updateField, f.fields) as FormBuilderArrayField[],
        };
      }
      if (f.id === fieldId) {
        return {
          ...f,
          ...Object.fromEntries(Object.entries(updateField).filter(([_, v]) => v !== undefined)),
        };
      }
      return f;
    });
  }

  return fieldList;
};

const createRecursiveFieldInArrayField = (fieldId: string, newField: FormBuilderEmptyField, field: FormBuilderArrayField): FormBuilderArrayField => {
  if (field.fields.length === 0) return field;

  if (fieldId === field.id) {
    return {
      ...field,
      fields: [...field.fields, newField],
    };
  }

  if (field.fields.every(({ type }) => type === 'array-field')) return field;

  return {
    ...field,
    fields: field.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return createRecursiveFieldInArrayField(fieldId, newField, f);
    }),
  };
};

const updateRecursiveFieldInArrayField = (
  arrayFieldId: string,
  fieldId: string,
  field: FormBuilderArrayField,
  updatedField: Partial<FormBuilderField>
): FormBuilderArrayField => {
  if (field.fields.length === 0) return field;

  if (arrayFieldId === field.id) {
    return {
      ...field,
      fields: field.fields.map(field => {
        if (field.id !== fieldId) return field;
        return {
          ...field,
          ...Object.fromEntries(Object.entries(updatedField).filter(([_, v]) => v !== undefined)),
        };
      }),
    };
  }

  if (field.fields.every(f => f.type === 'array-field')) return field;

  return {
    ...field,
    fields: field.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return updateRecursiveFieldInArrayField(arrayFieldId, fieldId, f, updatedField);
    }),
  };
};

const deleteFieldInArrayField = (arrayFieldId: string, itemIndex: number, field: FormBuilderArrayField): FormBuilderArrayField => {
  if (field.fields.length === 0) return field;

  if (arrayFieldId === field.id) {
    return {
      ...field,
      fields: field.fields.filter((_, index) => index !== itemIndex),
    };
  }

  if (!field.fields.some(f => f.type === 'array-field')) {
    return field;
  }

  return {
    ...field,
    fields: field.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return deleteFieldInArrayField(arrayFieldId, itemIndex, f);
    }),
  };
};

const reorderFieldInArrayField = (arrayFieldId: string, fromFieldId: string, toFieldId: string, field: FormBuilderArrayField): FormBuilderArrayField => {
  if (arrayFieldId === field.id) {
    return {
      ...field,
      fields: arrayMove(
        field.fields,
        field.fields.findIndex(f => f.id === fromFieldId),
        field.fields.findIndex(f => f.id === toFieldId)
      ),
    };
  }

  if (field.fields.length === 0) {
    return field;
  }

  if (!field.fields.some(f => f.type === 'array-field')) {
    return field;
  }

  return {
    ...field,
    fields: field.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return reorderFieldInArrayField(arrayFieldId, fromFieldId, toFieldId, f);
    }),
  };
};

type Action =
  | {
      type: 'SECTION_CREATE';

      name: string;
    }
  | {
      type: 'SECTION_UPDATE';

      index: number;
      name: string;
    }
  | {
      type: 'SECTION_DELETE';

      index: number;
    }
  | {
      type: 'SECTION_REORDER';

      fromIndex: number;
      toIndex: number;
    }
  | {
      type: 'FIELD_CREATE';

      sectionIndex: number;
      name: string;
    }
  | {
      type: 'FIELD_UPDATE';

      sectionIndex: number;
      fieldId: string;
      field: Partial<FormBuilderField>;
    }
  | {
      type: 'FIELD_REORDER';

      sectionIndex: number;
      fromFieldId: string;
      toFieldId: string;
    }
  | {
      type: 'FIELD_DELETE';

      sectionIndex: number;
      fieldId: string;
    }
  | {
      type: 'ARRAY_FIELD_CREATE';

      fieldId: string;
      name: string;
    }
  | {
      type: 'ARRAY_FIELD_UPDATE';

      arrayFieldId: string;
      fieldId: string;
      field: Partial<FormBuilderField>;
    }
  | {
      type: 'ARRAY_FIELD_DELETE';

      fieldId: string;
      itemIndex: number;
    }
  | {
      type: 'ARRAY_FIELD_REORDER';

      fieldId: string;
      fromFieldId: string;
      toFieldId: string;
    };

const reducer = (state: FormBuilderValue, action: Action): FormBuilderValue => {
  switch (action.type) {
    case 'SECTION_CREATE': {
      return {
        ...state,
        sections: [...state.sections, { name: action.name, fields: [] }],
      };
    }
    case 'SECTION_UPDATE': {
      return {
        ...state,
        sections: state.sections.map((section, index) => {
          if (index !== action.index) return section;
          return { ...section, name: action.name };
        }),
      };
    }
    case 'SECTION_DELETE': {
      return {
        ...state,
        sections: state.sections.filter((_, index) => index !== action.index),
      };
    }
    case 'SECTION_REORDER': {
      return {
        ...state,
        sections: arrayMove(state.sections, action.fromIndex, action.toIndex),
      };
    }
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
        sections: state.sections.map((section, index) => {
          if (index !== action.sectionIndex) return section;
          return {
            ...section,
            fields: [...section.fields, { ...newField }],
          };
        }),
      };
    }
    case 'FIELD_UPDATE': {
      return {
        ...state,
        sections: state.sections.map((section, sIndex) => {
          if (sIndex !== action.sectionIndex) return section;
          return {
            ...section,
            fields: updateRecursiveField(action.fieldId, action.field, section.fields),
          };
        }),
      };
    }
    case 'FIELD_REORDER': {
      return {
        ...state,
        sections: state.sections.map((section, sIndex) => {
          if (sIndex !== action.sectionIndex) return section;
          return {
            ...section,
            fields: arrayMove(
              section.fields,
              section.fields.findIndex(f => f.id === action.fromFieldId),
              section.fields.findIndex(f => f.id === action.toFieldId)
            ),
          };
        }),
      };
    }
    case 'FIELD_DELETE': {
      return {
        ...state,
        sections: state.sections.map((section, sIndex) => {
          if (sIndex !== action.sectionIndex) return section;
          return {
            ...section,
            fields: section.fields.filter(field => field.id !== action.fieldId),
          };
        }),
      };
    }
    case 'ARRAY_FIELD_CREATE': {
      const newEmptyField: FormBuilderEmptyField = {
        id: `field-${nanoid(10)}`,
        name: action.name,
        camelCaseName: toCamelCase(action.name),
        type: 'empty',
        label: 'New Field',
        description: '',
      };
      return {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            if (field.type !== 'array-field') return field;
            return createRecursiveFieldInArrayField(action.fieldId, newEmptyField, field);
          }),
        })),
      };
    }
    case 'ARRAY_FIELD_UPDATE': {
      return {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            if (field.type !== 'array-field') return field;
            return updateRecursiveFieldInArrayField(action.arrayFieldId, action.fieldId, field, action.field);
          }),
        })),
      };
    }
    case 'ARRAY_FIELD_DELETE': {
      return {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            if (field.type !== 'array-field') return field;
            return deleteFieldInArrayField(action.fieldId, action.itemIndex, field);
          }),
        })),
      };
    }
    case 'ARRAY_FIELD_REORDER': {
      return {
        ...state,
        sections: state.sections.map(section => ({
          ...section,
          fields: section.fields.map(field => {
            if (field.type !== 'array-field') return field;
            return reorderFieldInArrayField(action.fieldId, action.fromFieldId, action.toFieldId, field);
          }),
        })),
      };
    }
    default:
      throw new Error('Unhandled action type');
  }
};

export const useFormBuilderReducer = (initialState: FormBuilderValue) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('Form Builder State:', state);

  const onSectionCreate = useCallback((name: string) => {
    dispatch({ type: 'SECTION_CREATE', name });
  }, []);

  const onSectionUpdate = useCallback((index: number, name: string) => {
    dispatch({ type: 'SECTION_UPDATE', index, name });
  }, []);

  const onSectionDelete = useCallback((index: number) => {
    dispatch({ type: 'SECTION_DELETE', index });
  }, []);

  const onSectionReorder = useCallback((fromIndex: number, toIndex: number) => {
    dispatch({ type: 'SECTION_REORDER', fromIndex, toIndex });
  }, []);

  const onFieldCreate = useCallback((sectionIndex: number, name: string) => {
    dispatch({ type: 'FIELD_CREATE', sectionIndex, name });
  }, []);

  const onFieldUpdate = useCallback((sectionIndex: number, fieldId: string, field: Partial<FormBuilderField>) => {
    dispatch({ type: 'FIELD_UPDATE', sectionIndex, fieldId, field });
  }, []);

  const onFieldReorder = useCallback((sectionIndex: number, fromFieldId: string, toFieldId: string) => {
    dispatch({ type: 'FIELD_REORDER', sectionIndex, fromFieldId, toFieldId });
  }, []);

  const onFieldDelete = useCallback((sectionIndex: number, fieldId: string) => {
    dispatch({ type: 'FIELD_DELETE', sectionIndex, fieldId });
  }, []);

  const onArrayFieldCreate = useCallback((arrayFieldId: string, name: string) => {
    dispatch({ type: 'ARRAY_FIELD_CREATE', fieldId: arrayFieldId, name });
  }, []);

  const onArrayFieldUpdate = useCallback((arrayFieldId: string, fieldId: string, field: Partial<FormBuilderField>) => {
    dispatch({ type: 'ARRAY_FIELD_UPDATE', arrayFieldId, fieldId, field });
  }, []);

  const onArrayFieldDelete = useCallback((arrayFieldId: string, itemIndex: number) => {
    dispatch({ type: 'ARRAY_FIELD_DELETE', fieldId: arrayFieldId, itemIndex });
  }, []);

  const onArrayFieldReorder = useCallback((arrayFieldId: string, fromFieldId: string, toFieldId: string) => {
    dispatch({ type: 'ARRAY_FIELD_REORDER', fieldId: arrayFieldId, fromFieldId, toFieldId });
  }, []);

  return {
    formBuilder: state,
    onSectionCreate,
    onSectionUpdate,
    onSectionDelete,
    onSectionReorder,

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
