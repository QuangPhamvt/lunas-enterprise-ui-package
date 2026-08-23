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
  Columns3,
  Highlighter,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Palette,
  Quote,
  Redo,
  Rows3,
  Strikethrough,
  TableCellsMerge,
  Trash2,
  Underline,
  Undo,
} from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { type Editor, useEditorState } from '@tiptap/react';
import { ImageDialog } from './image-dialog';
import { LinkDialog } from './link-dialog';
import { TableInsertMenu } from './table-insert-menu';
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

/** Subset of lowlight's `common` grammar bundle relevant to a blog/docs editor. */
const CODE_LANGUAGES = [
  { label: 'Plain text', value: 'plaintext' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'PHP', value: 'php' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'SQL', value: 'sql' },
  { label: 'Bash', value: 'bash' },
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML/XML', value: 'xml' },
  { label: 'Markdown', value: 'markdown' },
];

export interface TextEditorToolbarProps {
  editor: Editor;
  className?: string;
  enableLink?: boolean;
  enableTaskList?: boolean;
  enableHighlight?: boolean;
  enableColor?: boolean;
  enableImage?: boolean;
  enableTable?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

function TextEditorToolbar({
  editor,
  className,
  enableLink,
  enableTaskList,
  enableHighlight,
  enableColor,
  enableImage,
  enableTable,
  onImageUpload,
}: TextEditorToolbarProps) {
  // Grouped into a handful of object-returning selectors (instead of one hook per
  // boolean) to cut down `useEditorState` subscription overhead on every keystroke —
  // `useEditorState` deep-compares the returned value by default, so batching related
  // flags together is safe and doesn't cause extra re-renders.
  const heading = useEditorState({
    editor,
    selector: ctx => {
      if (ctx.editor.isActive('heading', { level: 1 })) return 1;
      if (ctx.editor.isActive('heading', { level: 2 })) return 2;
      if (ctx.editor.isActive('heading', { level: 3 })) return 3;
      return null;
    },
  });
  const marks = useEditorState({
    editor,
    selector: ctx => ({
      bold: ctx.editor.isActive('bold'),
      italic: ctx.editor.isActive('italic'),
      underline: ctx.editor.isActive('underline'),
      strike: ctx.editor.isActive('strike'),
      code: ctx.editor.isActive('code'),
    }),
  });
  const blocks = useEditorState({
    editor,
    selector: ctx => ({
      bulletList: ctx.editor.isActive('bulletList'),
      orderedList: ctx.editor.isActive('orderedList'),
      taskList: ctx.editor.isActive('taskList'),
      blockquote: ctx.editor.isActive('blockquote'),
      codeBlock: ctx.editor.isActive('codeBlock'),
      codeBlockLanguage: (ctx.editor.getAttributes('codeBlock').language as string | undefined) ?? 'plaintext',
      table: ctx.editor.isActive('table'),
    }),
  });
  const align = useEditorState({
    editor,
    selector: ctx => ({
      left: ctx.editor.isActive({ textAlign: 'left' }),
      center: ctx.editor.isActive({ textAlign: 'center' }),
      right: ctx.editor.isActive({ textAlign: 'right' }),
      justify: ctx.editor.isActive({ textAlign: 'justify' }),
    }),
  });

  const headingLabel = heading ? (`H${heading}` as const) : 'P';

  return (
    <div
      data-slot="text-editor-toolbar"
      role="toolbar"
      aria-label="Định dạng văn bản"
      className={cn('sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-border border-b bg-muted-muted p-1.5', className)}
    >
      {/* History */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} aria-label="Hoàn tác" title="Undo (Ctrl+Z)">
        <Undo className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} aria-label="Làm lại" title="Redo (Ctrl+Y)">
        <Redo className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Heading dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-slot="toolbar-heading-trigger"
            aria-label="Kiểu đoạn văn"
            aria-haspopup="menu"
            className={cn(
              'inline-flex h-8 items-center gap-1 rounded px-1.5 font-medium text-xs transition-colors',
              'hover:bg-muted-muted hover:text-text-positive-strong',
              'disabled:pointer-events-none disabled:opacity-40',
              heading !== null && 'bg-primary-muted text-primary hover:bg-primary-muted/80 hover:text-primary'
            )}
          >
            <span className="w-5 text-center">{headingLabel}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-32">
          <DropdownMenuItem className="px-2 py-1.5" onClick={() => editor.chain().focus().setParagraph().run()}>
            <span className="text-sm">Paragraph</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-1.5" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <span className="font-extrabold text-sm">Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-1.5" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <span className="font-semibold text-sm">Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-1.5" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
            <span className="font-medium text-sm">Heading 3</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToolbarDivider />

      {/* Text formatting */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={marks.bold} aria-label="In đậm" title="Bold (Ctrl+B)">
        <Bold className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={marks.italic} aria-label="In nghiêng" title="Italic (Ctrl+I)">
        <Italic className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={marks.underline}
        aria-label="Gạch chân"
        title="Underline (Ctrl+U)"
      >
        <Underline className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={marks.strike} aria-label="Gạch ngang" title="Strikethrough">
        <Strikethrough className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={marks.code} aria-label="Mã inline" title="Inline Code">
        <Code className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={blocks.bulletList}
        aria-label="Danh sách chấm"
        title="Bullet List"
      >
        <List className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={blocks.orderedList}
        aria-label="Danh sách số"
        title="Ordered List"
      >
        <ListOrdered className="h-3.5 w-3.5" />
      </ToolbarButton>
      {enableTaskList && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={blocks.taskList}
          aria-label="Danh sách công việc"
          title="Task List"
        >
          <ListChecks className="h-3.5 w-3.5" />
        </ToolbarButton>
      )}

      <ToolbarDivider />

      {/* Blocks */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={blocks.blockquote} aria-label="Trích dẫn" title="Blockquote">
        <Quote className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={blocks.codeBlock} aria-label="Khối mã" title="Code Block">
        <Code2 className="h-3.5 w-3.5" />
      </ToolbarButton>
      {blocks.codeBlock && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-slot="toolbar-code-language-trigger"
              aria-label="Ngôn ngữ lập trình"
              aria-haspopup="menu"
              className={cn(
                'inline-flex h-7 items-center gap-1 rounded px-1.5 text-text-positive-weak text-xs transition-colors',
                'hover:bg-muted-muted hover:text-text-positive-strong'
              )}
            >
              <span>{CODE_LANGUAGES.find(l => l.value === blocks.codeBlockLanguage)?.label ?? 'Plain text'}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-72 min-w-40 overflow-y-auto">
            {CODE_LANGUAGES.map(lang => (
              <DropdownMenuItem key={lang.value} onClick={() => editor.chain().focus().updateAttributes('codeBlock', { language: lang.value }).run()}>
                <span className="text-sm">{lang.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} aria-label="Đường kẻ ngang" title="Horizontal Rule">
        <Minus className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Text alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={align.left} aria-label="Căn trái" title="Align Left">
        <AlignLeft className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={align.center} aria-label="Căn giữa" title="Align Center">
        <AlignCenter className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={align.right} aria-label="Căn phải" title="Align Right">
        <AlignRight className="h-3.5 w-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={align.justify} aria-label="Căn đều" title="Align Justify">
        <AlignJustify className="h-3.5 w-3.5" />
      </ToolbarButton>

      {/* Link */}
      {enableLink && (
        <>
          <ToolbarDivider />
          <LinkDialog editor={editor} />
        </>
      )}

      {/* Image */}
      {enableImage && (
        <>
          <ToolbarDivider />
          <ImageDialog editor={editor} onImageUpload={onImageUpload} />
        </>
      )}

      {/* Table */}
      {enableTable && (
        <>
          <ToolbarDivider />
          <TableInsertMenu editor={editor} />
          {blocks.table && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ToolbarButton title="Sửa bảng" aria-label="Sửa bảng">
                  <TableCellsMerge className="h-3.5 w-3.5" />
                </ToolbarButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-44">
                <DropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                  <Rows3 className="mr-2 h-3.5 w-3.5" /> Thêm hàng phía trên
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                  <Rows3 className="mr-2 h-3.5 w-3.5" /> Thêm hàng phía dưới
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Xóa hàng
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                  <Columns3 className="mr-2 h-3.5 w-3.5" /> Thêm cột bên trái
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                  <Columns3 className="mr-2 h-3.5 w-3.5" /> Thêm cột bên phải
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Xóa cột
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()} className="text-danger-strong">
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Xóa bảng
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}

      {/* Color & Highlight */}
      {(enableColor || enableHighlight) && (
        <>
          <ToolbarDivider />
          {enableColor && (
            <Popover>
              <PopoverTrigger asChild>
                <ToolbarButton title="Text Color" aria-label="Màu chữ">
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
                <ToolbarButton title="Highlight" aria-label="Tô sáng">
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
