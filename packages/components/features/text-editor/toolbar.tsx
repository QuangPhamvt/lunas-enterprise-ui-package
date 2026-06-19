'use client';

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Code,
  Code2,
  Highlighter,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { type Editor, useEditorState } from '@tiptap/react';
import { LinkDialog } from './link-dialog';
import { ToolbarButton, ToolbarDivider } from './toolbar-primitives';

const HIGHLIGHT_COLORS = [
  { label: 'Yellow', value: '#fde047' },
  { label: 'Green', value: '#86efac' },
  { label: 'Blue', value: '#93c5fd' },
  { label: 'Pink', value: '#f9a8d4' },
  { label: 'Orange', value: '#fdba74' },
  { label: 'Purple', value: '#c4b5fd' },
  { label: 'Red', value: '#fca5a5' },
  { label: 'Cyan', value: '#67e8f9' },
  { label: 'Lime', value: '#bef264' },
  { label: 'Gray', value: '#d1d5db' },
];

const TEXT_COLORS = [
  { label: 'Default', value: '' },
  { label: 'Red', value: '#ef4444' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Yellow', value: '#eab308' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Purple', value: '#a855f7' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Gray', value: '#6b7280' },
  { label: 'Black', value: '#000000' },
];

export interface TextEditorToolbarProps {
  editor: Editor;
  className?: string;
  enableLink?: boolean;
  enableTaskList?: boolean;
  enableHighlight?: boolean;
  enableColor?: boolean;
}

function TextEditorToolbar({ editor, className, enableLink, enableTaskList, enableHighlight, enableColor }: TextEditorToolbarProps) {
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
  const isTaskListActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('taskList'),
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

  const headingLabel = isHeading1Active ? 'H1' : isHeading2Active ? 'H2' : isHeading3Active ? 'H3' : 'P';

  return (
    <div data-slot="text-editor-toolbar" className={cn('flex flex-wrap items-center gap-0.5 border-border border-b bg-muted-muted/50 p-1.5', className)}>
      {/* History */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">
        <Undo className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)">
        <Redo className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Heading dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-slot="toolbar-heading-trigger"
            className={cn(
              'inline-flex h-7 items-center gap-1 rounded px-1.5 font-medium text-xs transition-colors',
              'hover:bg-muted-muted hover:text-text-positive-strong',
              'disabled:pointer-events-none disabled:opacity-40',
              (isHeading1Active || isHeading2Active || isHeading3Active) && 'bg-primary-muted text-primary hover:bg-primary-muted/80 hover:text-primary'
            )}
          >
            <span className="w-5 text-center">{headingLabel}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-32">
          <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
            <span className="text-sm">Paragraph</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <span className="font-bold text-lg">Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <span className="font-semibold text-base">Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <span className="font-semibold text-sm">Heading 3</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToolbarDivider />

      {/* Text formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={isBoldActive} title="Bold (Ctrl+B)">
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={isItalicActive} title="Italic (Ctrl+I)">
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={isUnderlineActive} title="Underline (Ctrl+U)">
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
      {enableTaskList && (
        <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={isTaskListActive} title="Task List">
          <ListChecks className="h-3.5 w-3.5" />
        </ToolbarButton>
      )}

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

      {/* Link */}
      {enableLink && (
        <>
          <ToolbarDivider />
          <LinkDialog editor={editor} />
        </>
      )}

      {/* Color & Highlight */}
      {(enableColor || enableHighlight) && (
        <>
          <ToolbarDivider />
          {enableColor && (
            <Popover>
              <PopoverTrigger asChild>
                <ToolbarButton title="Text Color">
                  <Palette className="h-3.5 w-3.5" />
                </ToolbarButton>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-44 p-2">
                <p className="mb-1.5 font-medium text-text-positive-weak text-xs">Text Color</p>
                <div className="grid grid-cols-5 gap-1">
                  {TEXT_COLORS.map(color => (
                    <button
                      key={color.label}
                      type="button"
                      title={color.label}
                      onClick={() => {
                        if (!color.value) {
                          editor.chain().focus().unsetColor().run();
                        } else {
                          editor.chain().focus().setColor(color.value).run();
                        }
                      }}
                      className={cn(
                        'h-6 w-6 rounded border border-border transition-transform hover:scale-110',
                        !color.value && 'bg-background text-[10px] text-text-positive leading-none'
                      )}
                      style={color.value ? { backgroundColor: color.value } : undefined}
                    >
                      {!color.value && '∅'}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          {enableHighlight && (
            <Popover>
              <PopoverTrigger asChild>
                <ToolbarButton title="Highlight">
                  <Highlighter className="h-3.5 w-3.5" />
                </ToolbarButton>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-44 p-2">
                <p className="mb-1.5 font-medium text-text-positive-weak text-xs">Highlight</p>
                <div className="grid grid-cols-5 gap-1">
                  {HIGHLIGHT_COLORS.map(color => (
                    <button
                      key={color.label}
                      type="button"
                      title={color.label}
                      onClick={() => editor.chain().focus().toggleHighlight({ color: color.value }).run()}
                      className="h-6 w-6 rounded border border-border transition-transform hover:scale-110"
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().unsetHighlight().run()}
                  className="mt-1.5 w-full rounded border border-border py-0.5 text-center text-text-positive-weak text-xs hover:bg-muted-muted"
                >
                  Clear highlight
                </button>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
    </div>
  );
}

export { TextEditorToolbar };
