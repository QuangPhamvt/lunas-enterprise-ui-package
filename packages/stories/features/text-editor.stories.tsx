import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextEditor } from '@/components/features/text-editor';

import type { Meta, StoryObj } from '@storybook/react-vite';

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

const RICH_CONTENT = `
<h1>Document Title</h1>
<p>This is a paragraph with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s> text.</p>
<h2>Heading 2</h2>
<p>You can write <code>inline code</code> or switch to a full code block:</p>
<pre><code>const greeting = 'Hello, World!';
console.log(greeting);</code></pre>
<h3>Heading 3 — Lists</h3>
<ul>
  <li>Bullet item one</li>
  <li>Bullet item two</li>
  <li>Bullet item three</li>
</ul>
<ol>
  <li>First ordered item</li>
  <li>Second ordered item</li>
  <li>Third ordered item</li>
</ol>
<blockquote>
  <p>This is a blockquote. Great for callouts or citations.</p>
</blockquote>
<hr>
<p style="text-align: center">Centered paragraph below the rule.</p>
`.trim();

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

const TASK_CONTENT = `<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"></label><div><p>Design the new editor API</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Implement link extension</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Write Storybook stories</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"></label><div><p>Add character count footer</p></div></li></ul>`;

export const WithTaskList: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TextEditor enableTaskList defaultValue={TASK_CONTENT} placeholder="Click the checklist button in the toolbar to create task items..." />
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
        showCharacterCount
        maxLength={5000}
        defaultValue={RICH_CONTENT}
        placeholder="All features enabled — links, bubble menu, task list, highlight, color, character count..."
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
          showCharacterCount
          editorClassName="flex-1 overflow-y-auto min-h-[60vh]"
          placeholder="Start writing your document..."
          defaultValue={RICH_CONTENT}
        />
      </div>
    </div>
  ),
};
