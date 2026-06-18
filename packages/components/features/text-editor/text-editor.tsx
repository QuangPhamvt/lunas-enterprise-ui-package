'use client';

import { useEffect, useMemo } from 'react';

import { Bold, Italic, Strikethrough, Underline as UnderlineIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { CharacterCount } from '@tiptap/extension-character-count';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { ListKeymap } from '@tiptap/extension-list-keymap';
import Placeholder from '@tiptap/extension-placeholder';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { type AnyExtension, EditorContent, useEditor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { LinkDialog } from './link-dialog';
import { type TextEditorVariantProps, textEditorVariants } from './text-editor.variants';
import { TextEditorToolbar } from './toolbar';
import { ToolbarButton, ToolbarDivider } from './toolbar-primitives';

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
  // Character count
  maxLength?: number;
  showCharacterCount?: boolean;
  onCharacterCount?: (stats: { characters: number; words: number }) => void;
  // Feature flags
  enableLink?: boolean;
  enableBubbleMenu?: boolean;
  enableTaskList?: boolean;
  enableHighlight?: boolean;
  enableColor?: boolean;
}

function TextEditor({
  value,
  defaultValue,
  onChange,
  placeholder = 'Start writing...',
  readOnly = false,
  showToolbar = true,
  variant,
  size,
  className,
  toolbarClassName,
  editorClassName,
  maxLength,
  showCharacterCount,
  onCharacterCount,
  enableLink,
  enableBubbleMenu,
  enableTaskList,
  enableHighlight,
  enableColor,
}: TextEditorProps) {
  const needsCharCount = maxLength !== undefined || showCharacterCount || onCharacterCount !== undefined;
  const needsTextStyle = enableColor || enableHighlight;

  const extensions = useMemo(() => {
    const base: AnyExtension[] = [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ListKeymap,
    ];

    if (needsTextStyle) base.push(TextStyle);
    if (enableLink) {
      base.push(Link.configure({ openOnClick: false, linkOnPaste: true, defaultProtocol: 'https' }));
    }
    if (enableTaskList) {
      base.push(TaskList, TaskItem.configure({ nested: true }));
    }
    if (enableHighlight) {
      base.push(Highlight.configure({ multicolor: true }));
    }
    if (enableColor) {
      base.push(Color);
    }
    if (needsCharCount) {
      base.push(CharacterCount.configure({ limit: maxLength }));
    }

    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsCharCount, placeholder, maxLength, enableHighlight, needsTextStyle, enableTaskList, enableLink, enableColor]);

  const editor = useEditor({
    extensions,
    content: value ?? defaultValue,
    editable: !readOnly,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
      if (onCharacterCount) {
        const storage = e.storage.characterCount;
        onCharacterCount({ characters: storage.characters(), words: storage.words() });
      }
    },
  });

  useEffect(() => {
    if (!editor || value === undefined) return;
    if (editor.getHTML() === value) return;
    editor.commands.setContent(value);
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!readOnly);
  }, [editor, readOnly]);

  const charCount = useEditorState({
    editor,
    selector: ctx => {
      const storage = ctx.editor?.storage?.characterCount;
      return storage ? (storage.characters() as number) : 0;
    },
  });

  const wordCount = useEditorState({
    editor,
    selector: ctx => {
      const storage = ctx.editor?.storage?.characterCount;
      return storage ? (storage.words() as number) : 0;
    },
  });

  const showCharCount = showCharacterCount || maxLength !== undefined;
  const isNearLimit = maxLength !== undefined && charCount > maxLength * 0.9;

  return (
    <div data-slot="text-editor" className={cn('lunas-text-editor', textEditorVariants({ variant, size }), className)}>
      {showToolbar && !readOnly && editor && (
        <TextEditorToolbar
          editor={editor}
          className={toolbarClassName}
          enableLink={enableLink}
          enableTaskList={enableTaskList}
          enableHighlight={enableHighlight}
          enableColor={enableColor}
        />
      )}

      {enableBubbleMenu && !readOnly && editor && (
        <BubbleMenu
          editor={editor}
          options={{ placement: 'top' }}
          className={cn('flex items-center gap-0.5 rounded-md border border-border bg-popover p-1 shadow-dropdown')}
        >
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold (Ctrl+B)">
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic (Ctrl+I)">
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline (Ctrl+U)">
            <UnderlineIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
            <Strikethrough className="h-3.5 w-3.5" />
          </ToolbarButton>
          {enableLink && (
            <>
              <ToolbarDivider />
              <LinkDialog editor={editor} />
            </>
          )}
        </BubbleMenu>
      )}

      <EditorContent editor={editor} data-slot="text-editor-content" className={cn('flex-1 bg-white text-sm text-text-positive', editorClassName)} />

      {showCharCount && needsCharCount && (
        <div
          data-slot="text-editor-footer"
          className="flex items-center justify-between border-border border-t bg-muted-muted/30 px-3 py-1 text-text-positive-weak text-xs"
        >
          <span>{wordCount} words</span>
          <span data-warning={isNearLimit || undefined} className="data-warning:text-warning-strong">
            {charCount}
            {maxLength ? ` / ${maxLength}` : ''} characters
          </span>
        </div>
      )}
    </div>
  );
}

export { TextEditor };
