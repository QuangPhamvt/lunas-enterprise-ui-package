import { cva, type VariantProps } from 'class-variance-authority';

export const textEditorVariants = cva(['flex flex-col overflow-hidden rounded-md'], {
  variants: {
    variant: {
      outline: 'border border-border bg-background shadow-xs',
      ghost: 'border-0',
    },
    size: {
      sm: 'text-xs [&_.ProseMirror]:min-h-24 [&_.ProseMirror]:px-2.5 [&_.ProseMirror]:py-1.5',
      md: '',
      lg: 'text-base [&_.ProseMirror]:min-h-56 [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export type TextEditorVariantProps = VariantProps<typeof textEditorVariants>;
