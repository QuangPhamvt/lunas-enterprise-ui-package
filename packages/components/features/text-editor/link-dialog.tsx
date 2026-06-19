'use client';

import { useCallback, useState } from 'react';

import { Link2, Link2Off } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { type Editor, useEditorState } from '@tiptap/react';
import { ToolbarButton } from './toolbar-primitives';

export interface LinkDialogProps {
  editor: Editor;
}

function LinkDialog({ editor }: LinkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const isLinkActive = useEditorState({
    editor,
    selector: ctx => ctx.editor.isActive('link'),
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        const existingHref = editor.getAttributes('link').href ?? '';
        setUrl(existingHref);
      }
      setIsOpen(open);
    },
    [editor]
  );

  const handleApply = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed) return;
    editor.chain().focus().setLink({ href: trimmed, target: '_blank' }).run();
    setIsOpen(false);
  }, [editor, url]);

  const handleRemove = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setIsOpen(false);
  }, [editor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApply();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <ToolbarButton isActive={isLinkActive} title="Link (Ctrl+K)" data-slot="toolbar-link-button">
          <Link2 className="h-3.5 w-3.5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent data-slot="link-dialog" sideOffset={6} align="start" className="w-72 p-3">
        <p className="mb-2 font-medium text-text-positive-strong text-xs">{isLinkActive ? 'Edit Link' : 'Insert Link'}</p>
        <div className="flex gap-1.5">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className={cn(
              'flex-1 rounded border border-border bg-transparent px-2.5 py-1.5 text-sm text-text-positive',
              'outline-none placeholder:text-text-positive-muted',
              'focus:border-primary focus:ring-1 focus:ring-primary/30'
            )}
          />
          <button
            type="button"
            onClick={handleApply}
            disabled={!url.trim()}
            className={cn(
              'rounded bg-primary px-2.5 py-1.5 font-medium text-text-negative text-xs',
              'transition-colors hover:bg-primary-strong',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            Apply
          </button>
        </div>
        {isLinkActive && (
          <button type="button" onClick={handleRemove} className="mt-2 flex items-center gap-1 text-danger-strong text-xs hover:underline">
            <Link2Off className="h-3 w-3" />
            Remove link
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { LinkDialog };
