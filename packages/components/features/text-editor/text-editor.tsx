'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Bold, Italic, Strikethrough, Underline as UnderlineIcon } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import { TaskItem } from '@tiptap/extension-task-item';
import { TaskList } from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { type AnyExtension, EditorContent, ReactNodeViewRenderer, useEditor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import DOMPurify, { type Config as SanitizeConfig } from 'dompurify';
import { ImageNodeView } from './image-node-view';
import { lowlight } from './languages';
import { LinkDialog } from './link-dialog';
import { createSlashCommandExtension } from './slash-command';
import { type TextEditorVariantProps, textEditorVariants } from './text-editor.variants';
import { TextEditorToolbar } from './toolbar';
import { ToolbarButton, ToolbarDivider } from './toolbar-primitives';

// Adds a centered wrapper + small "source" caption link below every image — purely a
// live-rendering affordance (both editing and `readOnly`), not persisted: the caption is
// derived from `src` on the fly, so `getHTML()` output is unaffected (still a plain `<img>`).
const ImageWithCaption = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

// Node types every configuration can produce, regardless of feature flags.
const BASE_ALLOWED_TAGS = ['p', 'h1', 'h2', 'h3', 'strong', 'em', 's', 'u', 'code', 'pre', 'blockquote', 'ul', 'ol', 'li', 'hr', 'br'];
const BASE_ALLOWED_ATTR = ['class', 'style'];

interface SanitizeFlags {
  enableLink?: boolean;
  enableHighlight?: boolean;
  enableColor?: boolean;
  enableTaskList?: boolean;
  enableImage?: boolean;
  enableTable?: boolean;
}

/**
 * Builds a DOMPurify allowlist scoped to exactly the node/mark types the currently
 * enabled extensions can produce — not a generic "allow all HTML" config.
 */
function buildSanitizeConfig(flags: SanitizeFlags): SanitizeConfig {
  const tags = new Set(BASE_ALLOWED_TAGS);
  const attr = new Set(BASE_ALLOWED_ATTR);

  if (flags.enableLink) {
    tags.add('a');
    attr.add('href').add('target').add('rel');
  }
  if (flags.enableHighlight) {
    tags.add('mark');
    attr.add('data-color');
  }
  if (flags.enableColor) {
    tags.add('span');
  }
  if (flags.enableTaskList) {
    for (const t of ['label', 'input', 'div', 'span']) tags.add(t);
    for (const a of ['data-type', 'data-checked', 'type', 'checked', 'disabled']) attr.add(a);
  }
  if (flags.enableImage) {
    tags.add('img');
    for (const a of ['src', 'alt', 'title']) attr.add(a);
  }
  if (flags.enableTable) {
    for (const t of ['table', 'tbody', 'thead', 'tr', 'td', 'th', 'colgroup', 'col']) tags.add(t);
    for (const a of ['colspan', 'rowspan', 'colwidth']) attr.add(a);
  }

  return { ALLOWED_TAGS: Array.from(tags), ALLOWED_ATTR: Array.from(attr) };
}

// The only CSS properties the enabled extensions emit (TextAlign, Color, Highlight, table column widths).
const ALLOWED_STYLE_PROPERTIES = new Set(['color', 'background-color', 'text-align', 'width', 'min-width']);
const UNSAFE_STYLE_VALUE = /url\(|expression\(|@import|javascript:/i;

/** Keeps only allowlisted, non-resource-loading declarations of a `style` attribute value. */
function filterStyle(style: string): string {
  return style
    .split(';')
    .map(declaration => declaration.trim())
    .filter(declaration => {
      const separator = declaration.indexOf(':');
      if (separator <= 0) return false;
      const property = declaration.slice(0, separator).trim().toLowerCase();
      return ALLOWED_STYLE_PROPERTIES.has(property) && !UNSAFE_STYLE_VALUE.test(declaration);
    })
    .join('; ');
}

let purifier: ReturnType<typeof DOMPurify> | null = null;

/**
 * A private DOMPurify instance, so the `style` hook never leaks into other DOMPurify usage in the
 * consuming app (the default export is a shared singleton).
 */
function getPurifier(): ReturnType<typeof DOMPurify> {
  if (purifier) return purifier;
  purifier = DOMPurify(window);
  purifier.addHook('uponSanitizeAttribute', (_node, data) => {
    if (data.attrName !== 'style') return;
    data.attrValue = filterStyle(data.attrValue);
    if (!data.attrValue) data.keepAttr = false;
  });
  return purifier;
}

/** No-op on the server — DOMPurify needs a DOM, and SSR content gets sanitized again on hydration anyway. */
function sanitizeHtml(html: string, config: SanitizeConfig): string {
  if (typeof window === 'undefined') return html;
  return getPurifier().sanitize(html, config);
}

/** Best-effort alt text for drag/drop/paste image inserts, which have no dialog to ask for one. */
function imageAltFromFile(file: File): string {
  return file.name.replace(/\.[^./]+$/, '');
}

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
  enableImage?: boolean;
  enableTable?: boolean;
  /** Enables the `/` slash-command menu for quickly inserting blocks (headings, lists, table, image, etc.). */
  enableSlashCommand?: boolean;
  /** Called when the user picks/drops/pastes an image file. Return the URL to embed. Without it, only pasting an image URL as text works. */
  onImageUpload?: (file: File) => Promise<string>;
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
  enableImage,
  enableTable,
  enableSlashCommand,
  onImageUpload,
}: TextEditorProps) {
  const needsCharCount = maxLength !== undefined || showCharacterCount || onCharacterCount !== undefined;
  const needsTextStyle = enableColor || enableHighlight;

  const sanitizeConfig = useMemo(
    () => buildSanitizeConfig({ enableLink, enableHighlight, enableColor, enableTaskList, enableImage, enableTable }),
    [enableLink, enableHighlight, enableColor, enableTaskList, enableImage, enableTable]
  );

  const extensions = useMemo(() => {
    const base: AnyExtension[] = [
      // StarterKit v3 already bundles Underline, ListKeymap and Link — configure them here instead
      // of registering separate copies. `codeBlock` is off because CodeBlockLowlight replaces it.
      StarterKit.configure({
        codeBlock: false,
        link: enableLink ? { openOnClick: false, linkOnPaste: true, defaultProtocol: 'https' } : false,
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: 'plaintext' }),
    ];

    if (needsTextStyle) base.push(TextStyle);
    if (enableTaskList) {
      base.push(TaskList, TaskItem.configure({ nested: true }));
    }
    if (enableHighlight) {
      base.push(Highlight.configure({ multicolor: true }));
    }
    if (enableColor) {
      base.push(Color);
    }
    if (enableImage) {
      // `allowBase64: false` is deliberate — base64 images would bloat the stored HTML
      // (the API column has no size cap) instead of going through `onImageUpload`.
      base.push(ImageWithCaption.configure({ inline: false, allowBase64: false }));
    }
    if (enableTable) {
      base.push(Table.configure({ resizable: true }), TableRow, TableHeader, TableCell);
    }
    if (enableSlashCommand) {
      base.push(createSlashCommandExtension({ enableTaskList, enableTable, enableImage, onImageUpload }));
    }
    if (needsCharCount) {
      base.push(CharacterCount.configure({ limit: maxLength }));
    }

    return base;
  }, [
    needsCharCount,
    placeholder,
    maxLength,
    enableHighlight,
    needsTextStyle,
    enableTaskList,
    enableLink,
    enableColor,
    enableImage,
    enableTable,
    enableSlashCommand,
    onImageUpload,
  ]);

  // Computed once at mount via lazy initializer — `content` is only read the first time
  // `useEditor` builds the editor, so there's no dependency array to keep in sync.
  const [initialContent] = useState(() => {
    const html = value ?? defaultValue;
    return html ? sanitizeHtml(html, sanitizeConfig) : html;
  });

  // Debounce the outward-facing `onChange` — typing itself is always instant (ProseMirror
  // manages its own state independent of React), but serializing the whole doc to HTML,
  // sanitizing it, and pushing it into (often form) state on every keystroke is what causes
  // visible lag when typing fast, especially once the doc has tables/images/code blocks.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const emitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Flushes any pending debounced emit immediately — called on blur and on unmount so a
  // "type the last word then instantly submit/close" sequence never drops the final edit
  // (the debounce alone would silently discard it if it fires within the 200ms window).
  const flushPendingChange = (html: string) => {
    if (!emitTimerRef.current) return;
    clearTimeout(emitTimerRef.current);
    emitTimerRef.current = null;
    onChangeRef.current?.(sanitizeHtml(html, sanitizeConfig));
  };
  const flushRef = useRef(flushPendingChange);
  flushRef.current = flushPendingChange;

  const editor = useEditor({
    extensions,
    content: initialContent,
    editable: !readOnly,
    // v3 default — kept explicit so a future `useEditor` option addition doesn't
    // accidentally reintroduce a re-render on every transaction/keystroke.
    shouldRerenderOnTransaction: false,
    editorProps: {
      handleDrop: (_view, event) => {
        if (!enableImage || !onImageUpload) return false;
        const file = event.dataTransfer?.files?.[0];
        if (!file?.type.startsWith('image/')) return false;
        event.preventDefault();
        onImageUpload(file).then(src =>
          editor
            ?.chain()
            .focus()
            .setImage({ src, alt: imageAltFromFile(file) })
            .run()
        );
        return true;
      },
      handlePaste: (_view, event) => {
        if (!enableImage || !onImageUpload) return false;
        const file = Array.from(event.clipboardData?.items ?? [])
          .find(item => item.type.startsWith('image/'))
          ?.getAsFile();
        if (!file) return false;
        event.preventDefault();
        onImageUpload(file).then(src =>
          editor
            ?.chain()
            .focus()
            .setImage({ src, alt: imageAltFromFile(file) })
            .run()
        );
        return true;
      },
    },
    onUpdate: ({ editor: e }) => {
      if (onCharacterCount) {
        const storage = e.storage.characterCount;
        onCharacterCount({ characters: storage.characters(), words: storage.words() });
      }
      if (!onChangeRef.current) return;
      if (emitTimerRef.current) clearTimeout(emitTimerRef.current);
      emitTimerRef.current = setTimeout(() => {
        if (!e.isDestroyed) flushPendingChange(e.getHTML());
      }, 200);
    },
    onBlur: ({ editor: e }) => flushPendingChange(e.getHTML()),
  });

  // Unmount-only flush. Reads `flushRef`/`editor` via refs (not the effect's own closure)
  // so it always uses the latest editor instance and sanitize config, not whatever they
  // were on first render.
  const editorRef = useRef(editor);
  editorRef.current = editor;
  useEffect(
    () => () => {
      const current = editorRef.current;
      if (current && !current.isDestroyed) flushRef.current(current.getHTML());
    },
    []
  );

  useEffect(() => {
    // A Suspense boundary hiding this tree destroys the editor before React reconnects these
    // effects; `useEditor` recreates it on the next render, so skip the stale instance.
    if (!editor || editor.isDestroyed || value === undefined) return;
    const sanitized = sanitizeHtml(value, sanitizeConfig);
    if (editor.getHTML() === sanitized) return;
    editor.commands.setContent(sanitized);
  }, [editor, value, sanitizeConfig]);

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
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

  // Grouped for the same reason as `toolbar.tsx`'s selectors: a single deep-compared
  // object subscription instead of reading `editor.isActive()` straight in JSX, which
  // would silently go stale now that `TextEditor` itself doesn't re-render per transaction.
  const bubbleMarks = useEditorState({
    editor,
    selector: ctx =>
      ctx.editor
        ? {
            bold: ctx.editor.isActive('bold'),
            italic: ctx.editor.isActive('italic'),
            underline: ctx.editor.isActive('underline'),
            strike: ctx.editor.isActive('strike'),
          }
        : { bold: false, italic: false, underline: false, strike: false },
  });

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
          enableImage={enableImage}
          enableTable={enableTable}
          onImageUpload={onImageUpload}
        />
      )}

      {enableBubbleMenu && !readOnly && editor && (
        <BubbleMenu
          editor={editor}
          options={{ placement: 'top' }}
          className={cn('z-50 flex items-center gap-0.5 rounded-md border border-border bg-popover p-1 shadow-dropdown')}
        >
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={bubbleMarks.bold} aria-label="In đậm" title="Bold (Ctrl+B)">
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={bubbleMarks.italic}
            aria-label="In nghiêng"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={bubbleMarks.underline}
            aria-label="Gạch chân"
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={bubbleMarks.strike}
            aria-label="Gạch ngang"
            title="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </ToolbarButton>
          {!!enableLink && (
            <>
              <ToolbarDivider />
              <LinkDialog editor={editor} />
            </>
          )}
        </BubbleMenu>
      )}

      {/* No hardcoded font-size here — it inherits from `textEditorVariants`'s `size` class
      on the root (sm/md/lg), which is what lets the whole typography scale in
      `text-editor.css` (headings, paragraphs, lists use `em`) actually respond to `size`. */}
      <EditorContent editor={editor} data-slot="text-editor-content" className={cn('flex-1 bg-white text-text-positive', editorClassName)} />

      {!!showCharCount && !!needsCharCount && (
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
