'use client';

import { useCallback, useRef, useState } from 'react';

import { ImageIcon, Upload } from 'lucide-react';

import { cn } from '@customafk/react-toolkit/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';

import type { Editor } from '@tiptap/react';
import { ToolbarButton } from './toolbar-primitives';

export interface ImageDialogProps {
  editor: Editor;
  onImageUpload?: (file: File) => Promise<string>;
}

function ImageDialog({ editor, onImageUpload }: ImageDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      setUrl('');
      setAlt('');
      setError(null);
    }
    setIsOpen(open);
  }, []);

  const insertImage = useCallback(
    (src: string, altText: string) => {
      editor
        .chain()
        .focus()
        .setImage({ src, alt: altText || undefined })
        .run();
      setIsOpen(false);
    },
    [editor]
  );

  const handleApplyUrl = useCallback(() => {
    const trimmed = url.trim();
    if (!trimmed) return;
    insertImage(trimmed, alt.trim());
  }, [url, alt, insertImage]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file || !onImageUpload) return;

      setError(null);
      setIsUploading(true);
      try {
        const uploadedUrl = await onImageUpload(file);
        // Falls back to the file name (no extension) when the user didn't type an alt text.
        insertImage(uploadedUrl, alt.trim() || file.name.replace(/\.[^./]+$/, ''));
      } catch {
        setError('Tải ảnh lên thất bại. Vui lòng thử lại.');
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUpload, alt, insertImage]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyUrl();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <ToolbarButton title="Chèn ảnh" aria-label="Chèn ảnh" data-slot="toolbar-image-button">
          <ImageIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent data-slot="image-dialog" sideOffset={6} align="start" className="w-72 p-3">
        <p className="mb-2 font-medium text-text-positive-strong text-xs">Chèn ảnh</p>

        {onImageUpload && (
          <>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={cn(
                'flex w-full items-center justify-center gap-1.5 rounded border border-border border-dashed py-2 text-text-positive-weak text-xs',
                'transition-colors hover:border-primary hover:text-primary',
                'disabled:pointer-events-none disabled:opacity-60'
              )}
            >
              {isUploading ? (
                <>
                  <Spinner className="size-3.5" /> Đang tải lên…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" /> Tải ảnh từ máy
                </>
              )}
            </button>
            {error && <p className="mt-1.5 text-danger-strong text-xs">{error}</p>}
            <div className="my-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-text-positive-muted text-xs">hoặc</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        <div className="flex gap-1.5">
          <input
            type="url"
            placeholder="https://example.com/image.png"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Đường dẫn ảnh"
            disabled={isUploading}
            className={cn(
              'flex-1 rounded border border-border bg-transparent px-2.5 py-1.5 text-sm text-text-positive',
              'outline-none placeholder:text-text-positive-muted',
              'focus:border-primary focus:ring-1 focus:ring-primary/30',
              'disabled:pointer-events-none disabled:opacity-60'
            )}
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            disabled={!url.trim() || isUploading}
            className={cn(
              'rounded bg-primary px-2.5 py-1.5 font-medium text-text-negative text-xs',
              'transition-colors hover:bg-primary-strong',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            Chèn
          </button>
        </div>
        <input
          type="text"
          placeholder="Mô tả ảnh (alt text) — tùy chọn"
          value={alt}
          onChange={e => setAlt(e.target.value)}
          aria-label="Mô tả ảnh"
          disabled={isUploading}
          className={cn(
            'mt-1.5 w-full rounded border border-border bg-transparent px-2.5 py-1.5 text-sm text-text-positive',
            'outline-none placeholder:text-text-positive-muted',
            'focus:border-primary focus:ring-1 focus:ring-primary/30',
            'disabled:pointer-events-none disabled:opacity-60'
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

export { ImageDialog };
