import { TextEditor } from '@/components/features/text-editor';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

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
