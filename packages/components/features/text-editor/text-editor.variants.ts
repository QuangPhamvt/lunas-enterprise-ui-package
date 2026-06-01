import { cva, type VariantProps } from 'class-variance-authority';

export const textEditorVariants = cva(['flex flex-col overflow-hidden rounded-md'], {
  variants: {
    variant: {
      outline: 'border border-border bg-background shadow-xs',
      ghost: 'border-0',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

export type TextEditorVariantProps = VariantProps<typeof textEditorVariants>;
