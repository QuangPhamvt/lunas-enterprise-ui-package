'use client';

import { lazy, Suspense, use, useEffect, useMemo } from 'react';

import { Bold, Italic, Strikethrough, Underline as UnderlineIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { ListKeymap } from '@tiptap/extension-list-keymap';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { type AnyExtension, EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { LinkDialog } from './link-dialog';
import { type TextEditorVariantProps, textEditorVariants } from './text-editor.variants';
import { TextEditorToolbar } from './toolbar';
import { ToolbarButton, ToolbarDivider } from './toolbar-primitives';

/**
 * `Link`, `TaskList`/`TaskItem`, `Highlight`, `Color`/`TextStyle`, and `CharacterCount` are only
 * ever added to the editor's extension list when their matching feature flag is on — dynamically
 * importing them (instead of the previous unconditional top-level imports) keeps every one of
 * these ProseMirror-backed packages out of a consumer's bundle unless that consumer actually
 * enables the flag. Cached by module specifier so multiple editors / re-renders share one fetch.
 */
const moduleCache = new Map<string, Promise<unknown>>();
function loadModule<T>(specifier: string, loader: () => Promise<T>): Promise<T> {
  let cached = moduleCache.get(specifier) as Promise<T> | undefined;
  if (!cached) {
    cached = loader();
    moduleCache.set(specifier, cached);
  }
  return cached;
}

type OptionalExtensionFlags = {
  needsTextStyle: boolean;
  enableLink: boolean;
  enableTaskList: boolean;
  enableHighlight: boolean;
  enableColor: boolean;
  needsCharCount: boolean;
  maxLength?: number;
};

async function loadOptionalExtensions(flags: OptionalExtensionFlags): Promise<AnyExtension[]> {
  const tasks: Promise<AnyExtension | AnyExtension[]>[] = [];

  if (flags.needsTextStyle) {
    tasks.push(loadModule('@tiptap/extension-text-style', () => import('@tiptap/extension-text-style')).then(m => m.TextStyle));
  }
  if (flags.enableLink) {
    tasks.push(
      loadModule('@tiptap/extension-link', () => import('@tiptap/extension-link')).then(m =>
        m.Link.configure({ openOnClick: false, linkOnPaste: true, defaultProtocol: 'https' })
      )
    );
  }
  if (flags.enableTaskList) {
    tasks.push(
      Promise.all([
        loadModule('@tiptap/extension-task-list', () => import('@tiptap/extension-task-list')),
        loadModule('@tiptap/extension-task-item', () => import('@tiptap/extension-task-item')),
      ]).then(([{ TaskList }, { TaskItem }]) => [TaskList, TaskItem.configure({ nested: true })])
    );
  }
  if (flags.enableHighlight) {
    tasks.push(loadModule('@tiptap/extension-highlight', () => import('@tiptap/extension-highlight')).then(m => m.Highlight.configure({ multicolor: true })));
  }
  if (flags.enableColor) {
    tasks.push(loadModule('@tiptap/extension-text-style', () => import('@tiptap/extension-text-style')).then(m => m.Color));
  }
  if (flags.needsCharCount) {
    tasks.push(
      loadModule('@tiptap/extension-character-count', () => import('@tiptap/extension-character-count')).then(m =>
        m.CharacterCount.configure({ limit: flags.maxLength })
      )
    );
  }

  return (await Promise.all(tasks)).flat();
}

const BubbleMenu = lazy(() => import('@tiptap/react/menus').then(m => ({ default: m.BubbleMenu })));

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

type TextEditorEngineProps = TextEditorProps & {
  needsCharCount: boolean;
  optionalExtensionsPromise: Promise<AnyExtension[]>;
};

function TextEditorEngine({
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
  needsCharCount,
  optionalExtensionsPromise,
}: TextEditorEngineProps) {
  const optionalExtensions = use(optionalExtensionsPromise);

  const extensions = useMemo(
    () => [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ListKeymap,
      ...optionalExtensions,
    ],
    [placeholder, optionalExtensions]
  );

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
        <Suspense fallback={null}>
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
        </Suspense>
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

function TextEditor(props: TextEditorProps) {
  const { maxLength, showCharacterCount, onCharacterCount, enableColor, enableHighlight, enableLink, enableTaskList } = props;

  const needsCharCount = maxLength !== undefined || !!showCharacterCount || onCharacterCount !== undefined;
  const needsTextStyle = !!enableColor || !!enableHighlight;

  const optionalExtensionsPromise = useMemo(
    () =>
      loadOptionalExtensions({
        needsTextStyle,
        enableLink: !!enableLink,
        enableTaskList: !!enableTaskList,
        enableHighlight: !!enableHighlight,
        enableColor: !!enableColor,
        needsCharCount,
        maxLength,
      }),
    [needsTextStyle, enableLink, enableTaskList, enableHighlight, enableColor, needsCharCount, maxLength]
  );

  return (
    <Suspense fallback={null}>
      <TextEditorEngine {...props} needsCharCount={needsCharCount} optionalExtensionsPromise={optionalExtensionsPromise} />
    </Suspense>
  );
}

export { TextEditor };
