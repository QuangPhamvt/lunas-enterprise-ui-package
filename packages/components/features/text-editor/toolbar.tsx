'use client';

import { useEditorState, type Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';
import { cn } from '@customafk/react-toolkit/utils';

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function ToolbarButton({ isActive, className, children, ...props }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      data-slot="toolbar-button"
      data-active={isActive || undefined}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded text-sm text-black transition-colors',
        'hover:bg-muted-muted hover:text-text-positive-strong',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive && 'bg-primary-muted text-primary hover:bg-primary-muted/80 hover:text-primary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div data-slot="toolbar-divider" className="mx-0.5 h-5 w-px shrink-0 bg-border" />;
}

export interface TextEditorToolbarProps {
  editor: Editor;
  className?: string;
}

function TextEditorToolbar({ editor, className }: TextEditorToolbarProps) {
  const isHeading1Active = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('heading', { level: 1 }),
  });
  const isHeading2Active = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('heading', { level: 2 }),
  });
  const isHeading3Active = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('heading', { level: 3 }),
  });
  const isParagraphActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('paragraph'),
  });
  const isBoldActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('bold'),
  });
  const isItalicActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('italic'),
  });
  const isUnderlineActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('underline'),
  });
  const isStrikeActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('strike'),
  });
  const isCodeActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('code'),
  });
  const isBulletListActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('bulletList'),
  });
  const isOrderedListActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('orderedList'),
  });
  const isBlockquoteActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('blockquote'),
  });
  const isCodeBlockActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('codeBlock'),
  });
  const isAlignLeftActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive({ textAlign: 'left' }),
  });
  const isAlignCenterActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive({ textAlign: 'center' }),
  });
  const isAlignRightActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive({ textAlign: 'right' }),
  });
  const isAlignJustifyActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive({ textAlign: 'justify' }),
  });
  return (
    <div data-slot="text-editor-toolbar" className={cn('flex flex-wrap items-center gap-0.5 border-border border-b bg-muted-muted/50 p-1.5', className)}>
      {/* History */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
        <Undo className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
        <Redo className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Headings */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={isHeading1Active} title="Heading 1">
        <Heading1 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={isHeading2Active} title="Heading 2">
        <Heading2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={isHeading3Active} title="Heading 3">
        <Heading3 className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Text formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={isBoldActive} title="Bold">
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={isItalicActive} title="Italic">
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={isUnderlineActive} title="Underline">
        <Underline className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={isStrikeActive} title="Strikethrough">
        <Strikethrough className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={isCodeActive} title="Inline Code">
        <Code className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={isBulletListActive} title="Bullet List">
        <List className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={isOrderedListActive} title="Ordered List">
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={isBlockquoteActive} title="Blockquote">
        <Quote className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={isCodeBlockActive} title="Code Block">
        <Code2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
        <Minus className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Text alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={isAlignLeftActive} title="Align Left">
        <AlignLeft className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={isAlignCenterActive} title="Align Center">
        <AlignCenter className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={isAlignRightActive} title="Align Right">
        <AlignRight className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={isAlignJustifyActive} title="Align Justify">
        <AlignJustify className="h-3.5 w-3.5" />
      </ToolbarButton>
    </div>
  );
}

export { TextEditorToolbar };
