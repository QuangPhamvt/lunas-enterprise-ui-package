import { arrayMove } from '@dnd-kit/sortable';

import type z from 'zod';

import type { formBuilderArrayFieldSchema, formBuilderEmptyFieldSchema, formBuilderSchema } from './schema';

export function updateRecursiveField(
  fieldId: string,
  updateField: Partial<z.input<typeof formBuilderSchema>['sections'][number]['fields'][number]>,
  fieldList: z.infer<typeof formBuilderSchema>['sections'][number]['fields']
): z.infer<typeof formBuilderSchema>['sections'][number]['fields'] {
  if (fieldList.length === 0) return fieldList;

  if (fieldList.some(field => field.id === fieldId)) {
    return fieldList.map(f => {
      if (f.id !== fieldId) return f;
      return {
        ...f,
        ...Object.fromEntries(Object.entries(updateField).filter(([_, v]) => v !== undefined)),
      };
    });
  }

  return fieldList;
}

export function createRecursiveFieldInArrayField(
  fieldId: string,
  newField: z.output<typeof formBuilderEmptyFieldSchema>,
  arrField: z.output<typeof formBuilderArrayFieldSchema>
): z.output<typeof formBuilderArrayFieldSchema> {
  // if (arrField.fields.length === 0)
  //   return {
  //     ...arrField,
  //     fields: [newField],
  //   };

  // if (fieldId === arrField.id) {
  //   return {
  //     ...arrField,
  //     fields: [...arrField.fields, newField],
  //   };
  // }

  if (arrField.fields.every(f => f.type === 'array-field')) return arrField;

  return {
    ...arrField,
    fields: arrField.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return createRecursiveFieldInArrayField(fieldId, newField, f);
    }),
  };
}

export function updateRecursiveFieldInArrayField(
  arrFieldId: string,
  updateFieldId: string,
  arrField: z.infer<typeof formBuilderArrayFieldSchema>,
  updateField: Partial<z.infer<typeof formBuilderSchema>['sections'][number]['fields'][number]>
): z.output<typeof formBuilderArrayFieldSchema> {
  if (arrField.fields.length === 0) return arrField;

  if (arrFieldId === arrField.id) {
    return {
      ...arrField,
      fields: arrField.fields.map(f => {
        if (f.id !== updateFieldId) return f;
        return {
          ...f,
          ...Object.fromEntries(Object.entries(updateField).filter(([_, v]) => v !== undefined)),
        };
      }),
    };
  }

  if (arrField.fields.every(f => f.type === 'array-field')) return arrField;

  return {
    ...arrField,
    fields: arrField.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return updateRecursiveFieldInArrayField(arrFieldId, updateFieldId, f, updateField);
    }),
  };
}

export function deleteFieldInArrayField(
  arrFieldId: string,
  updateFieldIndex: number,
  arrField: z.output<typeof formBuilderArrayFieldSchema>
): z.output<typeof formBuilderArrayFieldSchema> {
  if (arrField.fields.length === 0) return arrField;

  if (arrFieldId === arrField.id) {
    return {
      ...arrField,
      fields: arrField.fields.filter((_, index) => index !== updateFieldIndex),
    };
  }

  if (arrField.fields.every(f => f.type === 'array-field')) return arrField;

  return {
    ...arrField,
    fields: arrField.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return deleteFieldInArrayField(arrFieldId, updateFieldIndex, f);
    }),
  };
}

export function reorderFieldInArrayField(
  arrFieldId: string,
  fromFieldId: string,
  toFieldId: string,
  arrField: z.output<typeof formBuilderArrayFieldSchema>
): z.output<typeof formBuilderArrayFieldSchema> {
  if (arrField.fields.length === 0) return arrField;

  if (arrFieldId === arrField.id) {
    return {
      ...arrField,
      fields: arrayMove(
        arrField.fields,
        arrField.fields.findIndex(f => f.id === fromFieldId),
        arrField.fields.findIndex(f => f.id === toFieldId)
      ),
    };
  }

  if (arrField.fields.every(f => f.type === 'array-field')) return arrField;

  return {
    ...arrField,
    fields: arrField.fields.map(f => {
      if (f.type !== 'array-field') return f;
      return reorderFieldInArrayField(arrFieldId, fromFieldId, toFieldId, f);
    }),
  };
}

/**
 * Converts a normal English prompt/sentence to camelCase
 * @param {string} text - The input text to convert
 * @returns {string} - The camelCase version of the text
 */
export function toCamelCase(text: string): string {
  // Remove special characters and extra spaces, then split into words
  const words = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '') // Remove special characters
    .split(/\s+/) // Split by one or more spaces
    .filter(word => word.length > 0); // Remove empty strings

  // If no words, return empty string
  if (words.length === 0) return '';

  // First word stays lowercase, capitalize first letter of subsequent words
  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}
