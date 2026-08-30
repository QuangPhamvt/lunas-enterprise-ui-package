import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  List,
  ListChecks,
  ListOrdered,
  type LucideIcon,
  Minus,
  Quote,
  Table as TableIcon,
} from 'lucide-react';

import { type Editor, Extension, type Range, ReactRenderer } from '@tiptap/react';
import { Suggestion } from '@tiptap/suggestion';
import { SlashCommandMenu, type SlashCommandMenuHandle } from './slash-command-menu';

export interface SlashCommandItem {
  label: string;
  icon: LucideIcon;
  command: (editor: Editor, range: Range) => void;
}

export interface SlashCommandExtensionOptions {
  enableTaskList?: boolean;
  enableTable?: boolean;
  enableImage?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

function buildItems(options: SlashCommandExtensionOptions): SlashCommandItem[] {
  const items: SlashCommandItem[] = [
    { label: 'Heading 1', icon: Heading1, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', icon: Heading2, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run() },
    { label: 'Heading 3', icon: Heading3, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run() },
    { label: 'Bullet list', icon: List, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleBulletList().run() },
    { label: 'Ordered list', icon: ListOrdered, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleOrderedList().run() },
  ];

  if (options.enableTaskList) {
    items.push({
      label: 'Task list',
      icon: ListChecks,
      command: (editor, range) => editor.chain().focus().deleteRange(range).toggleTaskList().run(),
    });
  }

  items.push(
    { label: 'Blockquote', icon: Quote, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleBlockquote().run() },
    { label: 'Code block', icon: Code2, command: (editor, range) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run() },
    { label: 'Horizontal rule', icon: Minus, command: (editor, range) => editor.chain().focus().deleteRange(range).setHorizontalRule().run() }
  );

  if (options.enableTable) {
    items.push({
      label: 'Table',
      icon: TableIcon,
      command: (editor, range) => editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    });
  }

  // Slash-triggered image insertion only makes sense when there's an upload target —
  // there's no room in this transient popup to fall back to a "paste a URL" flow.
  if (options.enableImage && options.onImageUpload) {
    const upload = options.onImageUpload;
    items.push({
      label: 'Image',
      icon: ImageIcon,
      command: (editor, range) => {
        editor.chain().focus().deleteRange(range).run();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) return;
          const alt = file.name.replace(/\.[^./]+$/, '');
          upload(file).then(src => editor.chain().focus().setImage({ src, alt }).run());
        };
        input.click();
      },
    });
  }

  return items;
}

/** Builds the `/` slash-command extension, scoped to whichever features are enabled on this editor instance. */
function createSlashCommandExtension(options: SlashCommandExtensionOptions) {
  return Extension.create({
    name: 'slashCommand',

    addProseMirrorPlugins() {
      const editor = this.editor;

      return [
        Suggestion<SlashCommandItem>({
          editor,
          char: '/',
          startOfLine: false,
          command: ({ editor: e, range, props }) => props.command(e, range),
          items: ({ query }) => buildItems(options).filter(item => item.label.toLowerCase().includes(query.toLowerCase())),
          render: () => {
            let component: ReactRenderer<SlashCommandMenuHandle, SlashCommandMenuProps> | undefined;
            let unmount: (() => void) | undefined;

            return {
              onStart: props => {
                component = new ReactRenderer(SlashCommandMenu, {
                  editor: props.editor,
                  props: { items: props.items, command: (item: SlashCommandItem) => props.command(item) },
                });
                unmount = props.mount(component.element);
              },
              onUpdate: props => {
                component?.updateProps({ items: props.items, command: (item: SlashCommandItem) => props.command(item) });
              },
              onKeyDown: props => {
                if (props.event.key === 'Escape') {
                  unmount?.();
                  return true;
                }
                return component?.ref?.onKeyDown(props) ?? false;
              },
              onExit: () => {
                unmount?.();
                component?.destroy();
              },
            };
          },
        }),
      ];
    },
  });
}

interface SlashCommandMenuProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
}

export { createSlashCommandExtension };
