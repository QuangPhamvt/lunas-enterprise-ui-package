'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { cn } from '@customafk/react-toolkit/utils';
import { textEditorVariants, type TextEditorVariantProps } from './text-editor.variants';
import { TextEditorToolbar } from './toolbar';

export interface TextEditorProps extends TextEditorVariantProps {
  value?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
  className?: string;
  toolbarClassName?: string;
  editorClassName?: string;
}

function TextEditor({
  value,
  defaultValue,
  onChange,
  placeholder = 'Start writing...',
  readOnly = false,
  showToolbar = true,
  variant,
  className,
  toolbarClassName,
  editorClassName,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Placeholder.configure({ placeholder }), TextAlign.configure({ types: ['heading', 'paragraph'] })],
    content: value ?? defaultValue,
    editable: !readOnly,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
    },
  });
  console.log('editor', editor);
  console.log('editor', editor.isActive('heading', { level: 1 }));
  console.log('editor', editor.isActive('paragraph'));

  // Sync controlled value into the editor without re-triggering onChange
  useEffect(() => {
    if (!editor || value === undefined) return;
    if (editor.getHTML() === value) return;
    editor.commands.setContent(value);
  }, [editor, value]);

  // Sync editable state
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!readOnly);
  }, [editor, readOnly]);

  return (
    <div data-slot="text-editor" className={cn('lunas-text-editor', textEditorVariants({ variant }), className)}>
      {showToolbar && !readOnly && editor && <TextEditorToolbar editor={editor} className={toolbarClassName} />}
      <EditorContent editor={editor} data-slot="text-editor-content" className={cn('flex-1 text-sm text-text-positive bg-background', editorClassName)} />
    </div>
  );
}

export { TextEditor };
