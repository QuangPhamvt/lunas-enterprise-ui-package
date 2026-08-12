import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextEditor } from '@/components/features/text-editor';

import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CODE_HIGHLIGHT_CONTENT,
  DEEP_WORK_ARTICLE_CONTENT,
  LONG_ARTICLE_CONTENT,
  mockImageUpload,
  NESTED_LIST_CONTENT,
  RICH_CONTENT,
  TABLE_CONTENT,
  TASK_CONTENT,
} from './text-editor.mock-data';

const meta = {
  title: 'Features/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor placeholder="Start writing..." />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [html, setHtml] = useState('<p>Edit me — watch the HTML update below.</p>');
    return (
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <TextEditor value={html} onChange={setHtml} placeholder="Start writing..." />
        <div className="rounded-md border border-border bg-muted-muted p-3">
          <p className="mb-1 font-medium text-text-positive-weak text-xs">HTML output</p>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all text-text-positive text-xs">{html}</pre>
        </div>
      </div>
    );
  },
};

export const RichContent: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor defaultValue={RICH_CONTENT} />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor defaultValue={RICH_CONTENT} readOnly />
    </div>
  ),
};

export const WithoutToolbar: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor placeholder="Toolbar hidden — keyboard shortcuts still work." showToolbar={false} />
    </div>
  ),
};

export const GhostVariant: Story = {
  render: () => (
    <div className="w-full max-w-2xl rounded-lg border border-border border-dashed p-4">
      <TextEditor
        variant="ghost"
        placeholder="Ghost variant — no border, transparent background."
        defaultValue="<p>Useful inside cards or panels that already provide a container.</p>"
      />
    </div>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor placeholder="This editor has a constrained, scrollable height..." editorClassName="max-h-40 overflow-y-auto" defaultValue={RICH_CONTENT} />
    </div>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        enableLink
        defaultValue="<p>Select text and press <strong>Ctrl+K</strong>, or click the link button in the toolbar to insert a URL.</p><p>Click an existing <a href='https://example.com' target='_blank'>link</a> selection to edit or remove it.</p>"
        placeholder="Type here..."
      />
    </div>
  ),
};

export const WithBubbleMenu: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        enableBubbleMenu
        enableLink
        defaultValue="<p>Select any text in this editor to see the floating bubble menu appear above your selection. It provides quick access to bold, italic, underline, strikethrough, and link formatting.</p>"
      />
    </div>
  ),
};

export const WithTaskList: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor enableTaskList defaultValue={TASK_CONTENT} placeholder="Click the checklist button in the toolbar to create task items..." />
    </div>
  ),
};

/** Nested bullet lists get a distinct marker per depth, and nested ordered lists chain the parent's number (1.1, 1.1.2…) instead of restarting at a/b/c. */
export const WithNestedLists: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor defaultValue={NESTED_LIST_CONTENT} placeholder="Press Tab at the start of a list item to nest it, Shift+Tab to un-nest..." />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        showCharacterCount
        defaultValue="<p>Start typing to see the character and word count update live in the footer below the editor.</p>"
        placeholder="Start writing..."
      />
    </div>
  ),
};

export const MaxLength: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        maxLength={200}
        showCharacterCount
        placeholder="Limited to 200 characters..."
        defaultValue="<p>This editor enforces a character limit. The counter turns amber when within 10% of the cap.</p>"
      />
    </div>
  ),
};

export const WithHighlight: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        enableHighlight
        enableColor
        defaultValue="<p>Select text and use the <strong>Highlighter</strong> or <strong>Palette</strong> buttons in the toolbar to apply background highlights or change text color.</p>"
        placeholder="Select text and try the color tools..."
      />
    </div>
  ),
};

export const AllFeatures: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <TextEditor
        enableLink
        enableBubbleMenu
        enableTaskList
        enableHighlight
        enableColor
        enableImage
        enableTable
        enableSlashCommand
        onImageUpload={mockImageUpload}
        showCharacterCount
        maxLength={5000}
        defaultValue={RICH_CONTENT}
        placeholder="All features enabled — try / for quick commands, links, images, tables, highlight, color..."
      />
    </div>
  ),
};

export const FormIntegration: Story = {
  render: () => {
    const { watch, handleSubmit, setValue } = useForm<{ content: string }>({
      defaultValues: { content: '' },
    });
    const content = watch('content');
    return (
      <div className="w-full max-w-2xl space-y-4">
        <form onSubmit={handleSubmit(data => alert(JSON.stringify(data, null, 2)))} className="space-y-3">
          <label className="block font-medium text-sm text-text-positive">Content</label>
          <TextEditor
            value={content}
            onChange={html => setValue('content', html, { shouldValidate: true })}
            enableLink
            showCharacterCount
            placeholder="Write your content..."
          />
          <button type="submit" className="rounded bg-primary px-4 py-2 font-medium text-sm text-text-negative transition-colors hover:bg-primary-strong">
            Submit
          </button>
        </form>
        <div className="rounded-md border border-border bg-muted-muted p-3">
          <p className="mb-1 font-medium text-text-positive-weak text-xs">HTML output</p>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all text-text-positive text-xs">{content || '(empty)'}</pre>
        </div>
      </div>
    );
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div>
        <p className="mb-2 font-medium text-text-positive-weak text-xs">Small (sm)</p>
        <TextEditor size="sm" placeholder="Small editor..." />
      </div>
      <div>
        <p className="mb-2 font-medium text-text-positive-weak text-xs">Medium (md) — default</p>
        <TextEditor size="md" placeholder="Medium editor..." />
      </div>
      <div>
        <p className="mb-2 font-medium text-text-positive-weak text-xs">Large (lg)</p>
        <TextEditor size="lg" placeholder="Large editor..." />
      </div>
    </div>
  ),
};

export const DocEditor: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex min-h-screen flex-col bg-muted-muted/40 p-8">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <h1 className="mb-4 font-bold text-2xl text-text-positive-strong">Document Editor</h1>
        <TextEditor
          variant="outline"
          size="lg"
          enableLink
          enableBubbleMenu
          enableTaskList
          enableHighlight
          enableColor
          enableImage
          enableTable
          enableSlashCommand
          onImageUpload={mockImageUpload}
          showCharacterCount
          editorClassName="flex-1 overflow-y-auto min-h-[60vh]"
          placeholder="Start writing your document... try typing / for quick commands"
          defaultValue={RICH_CONTENT}
        />
      </div>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        enableImage
        onImageUpload={mockImageUpload}
        placeholder="Click the image button, drop a file, or paste an image..."
        defaultValue="<p>Use the image button in the toolbar, or drag-and-drop / paste an image directly into the editor.</p>"
      />
    </div>
  ),
};

export const WithTable: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor enableTable defaultValue={TABLE_CONTENT} placeholder="Insert a table from the toolbar..." />
    </div>
  ),
};

export const WithCodeHighlight: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor defaultValue={CODE_HIGHLIGHT_CONTENT} placeholder="Type ``` or use the code block button..." />
    </div>
  ),
};

export const WithSlashCommand: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor
        enableSlashCommand
        enableTaskList
        enableTable
        enableImage
        onImageUpload={mockImageUpload}
        placeholder="Type / on an empty line to open the quick-insert menu..."
      />
    </div>
  ),
};

/**
 * A realistic, long-form blog post exercising every feature at once — multiple heading
 * levels, long paragraphs, lists, a task list, a table, two syntax-highlighted code blocks,
 * two images, links, highlight/color, and horizontal rules. Long enough to require real
 * scrolling, which is what actually exercises the sticky toolbar and the debounced
 * `onChange` path under sustained typing/editing — a single short paragraph never triggers
 * either.
 */
export const LongArticle: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="flex min-h-screen flex-col bg-muted-muted/40 p-8">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <p className="mb-4 text-text-positive-weak text-xs">
          Bài viết dài, đủ mọi tính năng cùng lúc — cuộn xuống để kiểm tra sticky toolbar và cảm nhận gõ có bị lag không.
        </p>
        <TextEditor
          variant="outline"
          size="lg"
          enableLink
          enableBubbleMenu
          enableTaskList
          enableHighlight
          enableColor
          enableImage
          enableTable
          enableSlashCommand
          onImageUpload={mockImageUpload}
          showCharacterCount
          editorClassName="flex-1 overflow-y-auto"
          placeholder="Start writing..."
          defaultValue={LONG_ARTICLE_CONTENT}
        />
      </div>
    </div>
  ),
};

/**
 * A different, prose-heavy ~2500-word article (no editor chrome at all — `readOnly` hides
 * the toolbar) rendered as a "published post" reader view: byline header above, article body
 * at a comfortable reading width. Deliberately a different topic/content from `LongArticle`
 * so this reads as a genuine article rather than the same fixture reused. The article's own
 * `<h1>` is the page title — no separate title element is rendered above it.
 */
export const ReadOnlyArticle: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <article className="min-h-screen bg-background px-8 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-2 font-medium text-primary text-xs uppercase tracking-wide">Năng suất làm việc</p>
        <div className="mb-8 flex items-center gap-2 text-text-positive-weak text-sm">
          <span>Đội ngũ Vận hành</span>
          <span aria-hidden="true">·</span>
          <time dateTime="2026-08-07">7 tháng 8, 2026</time>
          <span aria-hidden="true">·</span>
          <span>12 phút đọc</span>
        </div>
        {/* Every extension present in `DEEP_WORK_ARTICLE_CONTENT` must stay enabled here too —
        `readOnly` only disables editing, it doesn't change which node/mark types Tiptap's
        schema accepts; anything unregistered (link, highlight, task list, table, image)
        would otherwise be silently dropped when the stored HTML is parsed back in. */}
        <TextEditor
          readOnly
          variant="ghost"
          size="lg"
          enableLink
          enableTaskList
          enableHighlight
          enableColor
          enableImage
          enableTable
          defaultValue={DEEP_WORK_ARTICLE_CONTENT}
          className="border-0"
        />
      </div>
    </article>
  ),
};
