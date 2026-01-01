import z from 'zod';

export const TanStackFormTitleFieldSchema = z.object({
  id: z.string().nonempty(),
  type: z.literal('title-field'),

  label: z.string().trim().nonempty(),
  description: z.string().optional(),
  helperText: z.string().optional(),
});
