import { formOptions } from '@tanstack/react-form';

import { nanoid } from 'nanoid';
import type z from 'zod';

import { formBuilderSchema } from './schema';

const formatErrorData = (data: z.infer<typeof formBuilderSchema>): Record<string, string> => {
  const result = formBuilderSchema.safeParse(data);
  if (!result.success) {
    const errorData: Record<string, string> = {};
    result.error.issues.forEach(issue => {
      if (issue.path.length > 0) {
        const issueFieldArr = issue.path.map(segment => (typeof segment === 'number' ? `[${segment}]` : segment));
        let fieldPath: string = '';
        issueFieldArr.forEach(segment => {
          const tempSegment = segment.toString();
          if (fieldPath === '') {
            fieldPath += tempSegment;
          } else if (tempSegment.startsWith('[')) {
            fieldPath += `${tempSegment}`;
          } else {
            fieldPath += `.${tempSegment}`;
          }
        });
        errorData[fieldPath] = issue.message;
      } else {
        errorData['form'] = issue.message;
      }
    });
    return errorData;
  }
  return {};
};

export const formOpts = formOptions({
  defaultState: {},
  defaultValues: {
    sections: [
      {
        name: 'New Section',
        fields: [
          {
            id: `field-${nanoid(10)}`,
            type: 'title-field',
            label: 'New Title',
            description: 'This is a title field',
          },
          {
            id: `field-${nanoid(10)}`,
            type: 'empty',
            name: 'Empty Field',
            camelCaseName: 'emptyField',
          },
        ],
      },
    ],
  } as z.output<typeof formBuilderSchema>,
  validators: {
    onChange: ({ value }) => {
      if (formBuilderSchema.safeParse(value).success) return null;
      return {
        form: 'Invalid data',
        fields: formatErrorData(value),
      };
    },
    onSubmit: ({ value }) => {
      if (formBuilderSchema.safeParse(value).success) return null;
      return {
        form: 'Invalid data',
        fields: formatErrorData(value),
      };
    },
  },
});
